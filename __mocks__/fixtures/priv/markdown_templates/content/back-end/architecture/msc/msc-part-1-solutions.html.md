## Gabarito dos exercícios de fixação

#### Listando livros com MySQL

Depois de criar a tabela no banco de dados, faça as seguintes implementações.

1. Crie um modelo Book e defina o método `getAll` para retornar a lista de todos os livros.

Crie o arquivo `Book.js` dentro da pasta models e adicione o seguinte código.

```language-javascript
const connection = require('./connection');

const getAll = async () => {
  const [books] = await connection.execute('SELECT * FROM model_example.books;');

  return books.map(({ id, title, author_id }) => ({
    id,
    title
    authorId: author_id
  }));
};

module.exports = {
  getAll
}
```

2. Crie uma rota `books` para trazer a lista de todos os livros.

```language-javascript
// const express = require('express');
//const bodyParser = require('body-parser');

// const Author = require('../models/Author');
const Book = require('./models/Book');

// ...

// Adicione o código antes do app.listen

app.get('/books', async (req, res) => {
  const books = await Book.getAll();
  res.status(200).json(books);
});
```


3. Altere o middleware criado no passo 2 para que quando for enviado a query string com a chave `author_id`, retorne apenas os livros associados com o `author_id`.

Comece implementando um novo método no arquivo `models/Book.js`.

```language-javascript
const getByAuthorId = async (authorId) => {
  const [books] = await connection.execute('SELECT * FROM model_example.books WHERE author_id=?;', [authorId]);

  return books.map(({ id, title, author_id }) => ({
    id,
    title
    authorId: author_id
  }));
}

// module.exports = {
//  getAll,
    getByAuthorId
// }
```

Agor no arquivo `index.js`, altere o middleware da rota `/books` para ficar da seguinte forma.

```language-javascript

app.get('/books', async (req, res) => {
  const { author_id } = req.query;

  const books = (author_id) 
    ? await Book.getByAuthorId(author_id) 
    : await Book.getAll();

  res.status(200).json(books);
});
```

#### Pegando detalhes de um livro com MySQL

Continuando o exercício anterior faça o seguinte.

1. Crie uma rota `/books/:id` e retorne o livro de acordo com o id passado por parâmetro. Se não existir retorne um json no seguinte formato `{ message: 'Not found' }`.

Comece implementando um novo método no arquivo `models/Book.js`.

```language-javascript
const getById = async (id) => {
  const [books] = await connection.execute('SELECT * FROM model_example.books WHERE id=?;', [id]);

  if (books.length === 0) return null;

  return books.map(({ id, title, author_id }) => ({
    id,
    title
    authorId: author_id
  }))[0];
}

// module.exports = {
//  getAll,
//  getByAuthorId,
    getById,
// }
```

Agora no arquivo `index.js`, altere o middleware da rota `/books` para ficar da seguinte forma.

```language-javascript

app.get('/book/:id', async (req, res) => {
  const { id } = req.params;

  const book = await Book.getById(id);

  if (!book) return res.status(400).json({ message: 'Not found' })

  res.status(200).json(book);
});
```

#### Criando um livro com MySQL

1. Ainda usando a tabela books como referência crie uma rota `books` do tipo `POST`. Faça as seguintes validações:

* Título não pode ser vazio;
* Título precisa ter pelo menos três caracteres;
* O campo `author_id` não pode ser vazio;
* O campo `author_id` só é válido se existir um autor com esse id;

Se algum dos requisitos anteriores não for atendido, retornar um json no seguinte formato `{ message: 'Dados inválidos' }` com `status 400`. Caso contrário, insira o livro na tabela `books` e retorne o json `{ message: 'Livro criado com sucesso! '}` com o `status 201`.

No arquivo `models/Book.js`, acrescente os dois métodos abaixo

```language-javascript
const isValid = async (title, authorId) => {
  if (!title || typeof title !== 'string' || title.length < 3) return false;
  if (!authorId || typeof authorId !== 'number' || !(await Author.findById(authorId))) return false;
  
  return true;
};

const create = async (title, authorId) => connection.execute(
  'INSERT INTO mvc_example.books (title, author_id) VALUES (?,?,?)',
  [title, authorId],
);

// module.exports = {
//   getAll,
//   getByAuthorId,
//   getById,
     isValid,
     create
// }
```

No arquivo index.js, acrescente a nova rota.

```language-javascript
app.post('/books', async (req, res) => {
const { title, author_id } = req.body;

if (!await Book.isValid(title, author_id)) {
  return res.status.(400).json({ message: 'Dados inválidos' });
}

await Book.create(title, author_id);

res.status(201).({ message: 'Livro criado com sucesso! '});
});
```

#### Listando os livros... mas do MongoDB

1. Refatore o método `getAll` de `models/Book` para utilizar o mongo como banco de dados.

```language-javascript
const connection = require('./connection');

const getAll = () => connection()
    .then((db) => db.collection('books').find({}).toArray())

module.exports = {
  getAll,
}
```

2. Refatore o método `getByAuthorId` de `models/Book` para utilizar o mongo como banco de dados.

```language-javascript
// ...

const getByAuthorId = (authorId) => connection()
    .then((db) => db.collection('books').find({author_id: authorId}).toArray())


// module.exports = {
//   getAll,
     getByAuthorId
// }
```

#### Obtendo detalhes de um livro

1. Refatore o método `getById` de `models/Book` para utilizar o mongo como banco de dados.

```language-javascript
// const connection = require('./connection');
const { ObjectId } = require('mongodb');
// ...

const findById = async (id) => { 
  const book = await connection()
    .then((db) => db.collection('books').findOne(ObjectId(id)));

  if (!book) return null;

  return book;
}

// module.exports = {
//   getAll,
//   getByAuthorId,
     findById
// }
```

#### Criando um novo livro

1. Refatore o método `isValid` de `models/Book` para utilizar o mongo como banco de dados.

```language-javascript
// const connection = require('./connection');
// const { ObjectId } = require('mongodb');
const Author = require('./Author');

// ...

const isValid = async (title, authorId) => {
  if (!title || typeof title !== 'string') return false;
  if (!authorId || typeof authorId !== 'number' || !(await Author.findById(ObjectId(authorId)))) return false;

  return true;
}


// module.exports = {
//   getAll,
//   getByAuthorId,
//   findById,
     isValid
// }
```

2. Refatore o método `create` de `models/Book` para utilizar o mongo como banco de dados.

```language-javascript
// ...

const create = (title, authorId) => connection()
    .then((db) => db.collection('books').insertOne({ title, authorId}))

// module.exports = {
//   getAll,
//   getByAuthorId,
//   findById,
//   isValid,
     create
// }
```


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
