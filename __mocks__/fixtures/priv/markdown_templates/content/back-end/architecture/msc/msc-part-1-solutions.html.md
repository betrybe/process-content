## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

### Solução

Crie uma aplicação que permita criar, visualizar, editar e deletar usuários. Sua aplicação deve utilizar camada de `model` que você aprendeu a desenvolver hoje, juntamente com a conexão ao banco de dados `MySQL`. Além disso a aplicação deve conter os seguintes endpoints:

1. `POST /user` - Cria um usuário no banco com os seguintes dados:

  - `id`: Id única gerada automaticamente pelo banco;
  - `first_name`: Nome do usuário (string obrigatória);
  - `last_name`: Sobrenome do usuário (string obrigatória);
  - `email`: Email do usuário (string obrigatória);
  - `password`: Senha do usuário (string com pelos menos 6 caracteres obrigatória);
  - O endpoint deve retornar um `JSON` com a mensagem `Usuário criado com sucesso`, juntamente com o `status 201`;
  - Caso os dados não estejam de acordo com as regras de negócio o endpoint deve retornar um objeto com a mensagem `Dados inválidos` juntamente com o `status 200`.

2. `GET /user` - Retorna um array com todos os usuários cadastrados no banco de dados, sendo cada usuário um objeto diferente. Além disso o endpoint deve retornar também o `status 200`.

3. `GET /user/:id` - Retorna o objeto do usuário cujo `id` seja igual ao parâmetro `id` informado na URL. Além disso o endpoint deve retornar também o `status 200`.

  - Caso não exista um usuário com `id` informado o endpoint deve retornar um `JSON` com mensagem `Usuário não encontrado`, juntamente com o `status 404`.

4. `PUT /user/:id` - Edita informações do usuário cujo `id` seja igual ao parâmetro `id` informado na URL.

  - O endpoint deve retornar um `JSON` com a mensagem `Usuário editado com sucesso`, juntamente com o `status 200`;
  - Caso os dados não estejam de acordo com as regras de negócio o endpoint deve retornar um objeto com a mensagem `Dados inválidos` juntamente com o `status 200`.

5. `DELETE /user/:id` - Deleta o usuário cujo `id` seja igual ao parâmetro `id` informado na URL.

  - Endpoint deve retornar um objeto com a mensagem `Usuário deletado com sucesso`, juntamente com o `status 200`.

> model/connection.js

```language-javascript
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'users_crud'});

module.exports = connection;
```

> model/userModel.js

```language-javascript
const connection = require('./connection');

const isValid = (firstName, lastName, email, password) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (!email || typeof email !== 'string') return false;
  if (!password || password.length < 6) return false;

  return true;
};

const createUser = async (firstName, lastName, email, password) =>
  connection.execute(
    'INSERT INTO users_crud.users (first_name, last_name, email, password) VALUES (?,?,?,?)',
    [firstName, lastName, email, password]
  );

const getAllUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users_crud.users;');

  return users.map(({ id, first_name, last_name, email, password }) => ({
    id,
    firstName: first_name,
    lastName: last_name,
    email,
    password,
  }));
};

const getUserById = async (id) => {
  const [
    user,
  ] = await connection.execute('SELECT * FROM users_crud.users WHERE id = ?', [
    id,
  ]);

  if (!user) return null;

  return {
    id: user[0].id,
    firstName: user[0].first_name,
    lastName: user[0].last_name,
    email: user[0].email,
    password: user[0].password,
  };
};

const updateUser = (id, firstName, lastName, email, password) =>
  connection.execute(
    'UPDATE users_crud.users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
    [firstName, lastName, email, password, id]
  );

const deleteUser = async (id) =>
  connection.execute('DELETE FROM users_crud.users WHERE id = ?', [id]);

module.exports = {
  isValid,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
```

> index.js

```language-javascript
const express = require('express');
const bodyParser = require('body-parser');
const Users = require('./models/usersModel');

const app = express();

app.use(bodyParser.json());

app.post('/user', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const isValid = Users.isValid(firstName, lastName, email, password);

  if (!isValid) return res.status(400).json({ message: 'Dados inválidos' });

  await Users.createUser(firstName, lastName, email, password);

  return res.status(201).json({ message: 'Usuário criado com sucesso' });
});

app.get('/user', async (_req, res) => {
  const users = await Users.getAllUsers();

  return res.status(200).json(users);
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  const user = await Users.getUserById(id);

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  return res.status(200).json(user);
});

app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  const isValid = Users.isValid(firstName, lastName, email, password);

  if (!isValid) return res.status(400).json({ message: 'Dados inválidos' });

  await Users.updateUser(id, firstName, lastName, email, password);

  return res.status(200).json({ message: 'Usuário editado com sucesso' });
});

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;

  await Users.deleteUser(id);

  return res.status(200).json({ message: 'Usuário deletado com sucesso' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
```

### Bônus

Refatore o exercício anterior para acessar o MongoDB ao invés do MySQL.

> model/connection.js

```language-javascript
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('users_crud'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
```

> model/userModel.js

```language-javascript
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const isValid = (firstName, lastName, email, password) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (!email || typeof email !== 'string') return false;
  if (!password || password.length < 6) return false;

  return true;
};

const createUser = async (firstName, lastName, email, password) =>
  connection().then((db) =>
    db.collection('users').insertOne({ firstName, lastName, email, password })
  );

const getAllUsers = async () =>
  connection().then((db) => db.collection('users').find({}).toArray());

const getUserById = async (id) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne(ObjectId(id))
  );

  if (!user) return null;

  return user;
};

const updateUser = (id, firstName, lastName, email, password) =>
  connection().then((db) =>
    db
      .collection('users')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { firstName, lastName, email, password } }
      )
  );

const deleteUser = async (id) =>
  connection().then((db) =>
    db.collection('users').deleteOne({ _id: ObjectId(id) })
  );

module.exports = {
  isValid,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
```
