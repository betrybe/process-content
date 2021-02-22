## Gabarito dos exercícios de fixação

> models/Author.js

```language-javascript
const connection = require('./connection');

const getAll = () => connection()
    .then((db) => db.collection('books').find({}).toArray());

const getByAuthorId = (authorId) => connection()
    .then((db) => db.collection('books').find({author_id: authorId}).toArray());

const findById = async (id) => { 
  const book = await connection()
    .then((db) => db.collection('books').findOne(ObjectId(id)));

  if (!book) return null;

  return book;
}

const create = (title, authorId) => connection()
    .then((db) => db.collection('books').insertOne({ title, authorId}))


module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create
}
```

> services/Author.js

```language-javascript
const Author = require('../models/Author');


const isValid = async (title, authorId) => {
  if (!title || typeof title !== 'string') return false;
  if (!authorId || typeof authorId !== 'number' || !(await Author.findById(ObjectId(authorId)))) return false;

  return true;
}

const getAll = async () => {
  return await Book.getAll();
}

const findById = async (id) => {
  return await Book.findById(id);
}

const create = async (title, authorId) => {
  const bookIsValid = isValid(title, authorId);

  if (!bookIsValid) return false;

  const { insertedId } = await Book.create(title, authorId);

  return getNewAuthor({
    id: insertedId,
    title,
    authorId
  });
}

module.exports = {
  getAll,
  findById,
  create
}
```

> controllers/Author.js

```language-javascript
const Book = require('../services/Book');

const getAll = async (req, res) => {
  const books = await Book.getAll();

  res.status(200).json(books);
}

const findById = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) return res.status(404).json({ message: 'Not found' });

  res.status(200).json(book);
}

const create = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  const book = await Book.create(first_name, middle_name, last_name);

  if (!book) return res.status(400).json({ message: 'Dados inválidos' });

  res.status(201).json(book);
}

module.exports = {
  getAll,
  findById,
  create
}
```

> index.js

```language-javascript
// const bodyParser = require('body-parser');
// const express = require('express')
// const app = express()
// const port = 3000

// const Author = require('./controllers/Author');

// app.use(bodyParser.json());

// app.get('/authors', Author.getAll);
// app.get('/authors/:id', Author.findById);
// app.post('/authors', Author.create);


app.get('/books', Book.getAll);
app.get('/books/:id', Book.findById);
app.post('/books', Book.create);

// app.listen(port, () => console.log(`Example app listening on port port!`))
```

## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

### Solução

**Exercício 1**: Nesse exercício, você vai desenvolver uma aplicação MSC para consulta de CEPs, chamada `cep-lookup`. Você utilizará uma API para buscar os dados relacionados a um CEP e salvará esses dados no MongoDB.

Um CEP válido é composto por 8 dígitos, com um hífen opcional separando os três últimos dígitos. Por exemplo, 30310-030 e 30310030 são CEPs válidos. 303100308 e AB897453 não são.

Para consultar um CEP, você deve utilizar a API [CEP lá.](http://cep.la/api) {: .external-link target="_blank" rel="noreferrer noopener" } A página contém instruções sobre como utilizar a API.

O service deve fornecer uma interface para consultar CEPs. Primeiramente, o service deve chamar o modelo para consultar o banco de dados pelo CEP procurado. Se o CEP for encontrado, seus dados são retornados sem consultar a API. Caso contrário, o service deve fazer uma requisição a API. O service então deverá enviar os dados para o modelo, para que ele possa salvar no MongoDB os dados da primeira API que responder com sucesso. Em outras palavras, o banco de dados funcionará como um cache de CEPs, enquanto a API só será consultada se um CEP não for encontrado localmente. Inicialmente, o banco deve estar vazio.

O banco de dados só precisa armazenar as seguintes informações: **CEP**, **UF**, **cidade**, **bairro** e **logradouro**. Um CEP salvo no banco deve conter somente números, sem hífens, e essa chave deve ser única para evitar que o mesmo CEP seja cadastrado duas vezes e otimizar a busca.

O CEP deve ser passado através da rota do endpoint da aplicação como uma `query`, da seguinte forma:

```language-bash
http :3000/lookup?cep=303100308
```

Se o CEP for válido, seus dados devem ser retornados em um `JSON`. Se o CEP não for encontrado, deve ser retornado um `JSON` com o campo mensagem com o texto `CEP não encontrado`. Se for digitado um CEP com formato inválido, deve ser retornado um `JSON` com o campo mensagem com o texto mensagem `CEP inválido`.

> Não se esqueça de enviar também o status da requisição de acordo com a situação.

Note que o CEP pode ser digitado no input com ou sem hífen, mas deve ser salvo no banco sem hífens.

Lembre-se de organizar sua aplicação seguindo a arquitetura MSC, separando as responsabilidades em camadas.

> models/connection.js

```language-javascript
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('cep_exercise'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
```

> models/cepModel.js

```language-javascript
const connection = require('./connection');

const findCEP = async (cep) => {
  const db = await connection();

  const results = await db.collection('ceps').findOne({ cep });

  if (!results) return null;

  return results;
};

const saveCEP = async (cepData) => {
  const { uf, cidade, bairro, logradouro, cep } = cepData;

  const db = await connection();

  const result = await db
    .collection('ceps')
    .insertOne({ uf, cidade, bairro, logradouro, cep });

  return result;
};

module.exports = {
  findCEP,
  saveCEP,
};
```

> services/apiService.js

```language-js
const fetch = require('node-fetch');

const CEP_LA_API = 'http://cep.la';

const headers = {
  Accept: 'application/json',
};

const findCEP = async (cep) => {
  const response = await fetch(`${CEP_LA_API}/${cep}`, { headers });
  const cepData = await response.json();
  return cepData;
};

module.exports = {
  findCEP,
};
```

> services/cepService.js

```language-js
const apiService = require('../services/apiService');
const cepModel = require('../models/cepModel');

const isValid = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

const lookup = async (cep) => {
  if (!isValid(cep)) return { err: { message: 'CEP inválido', code: 400 } };

  const cepData = await cepModel.findCEP(cep);

  if (cepData) return cepData;

  const cepFound = await apiService.findCEP(cep);

  if (cepFound.length === 0)
    return { err: { message: 'CEP não encontrado', code: 404 } };

  await cepModel.saveCEP(cepFound);

  return cepFound;
};

module.exports = { lookup };
```

> controllers/cepController.js

```language-js
const CEP = require('../services/cepService');

const lookupCEP = async (req, res) => {
  try {
    const cep = await CEP.lookup(req.query.cep);

    if (cep.err)
      return res.status(cep.err.code).json({ message: cep.err.message });

    return res.status(200).json({ cep });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  lookupCEP,
};
```

> index.js

```language-javascript
const express = require('express');

const cepController = require('./controllers/cepController');

const app = express();

app.get('/lookup', cepController.lookupCEP);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
```

**Exercício 2**: Vamos incrementar a API `cep-lookup` com algumas estatísticas. Vamos armazenar informações sobre quantidade de consultas a CEPs, agrupando por estado e cidade. Por exemplo, se houve duas consultas a CEPs de Florianópolis e uma de Joinville, teremos nos banco estas informações:

```language-json
{
  "uf": "SC",
  "quantidade" 3
}
{
  "cidade": "Florianópolis",
  "quantidade" 2
}
{
  "uf": "Joinville",
  "quantidade" 1
}
```

Sempre que um CEP for consultado, os documentos relacionados a sua cidade e a seu estado devem ser atualizados, incrementando o contador.

Adicione à API um endpoint que permita consultar estatísticas por cidade e ou estado. Armazene os documentos sobre estatísticas em coleções diferentes no banco. Crie um modelo que forneça uma interface para ler e atualizar essas estatísticas.

As consultas devem ser feitas da seguinte forma:

```language-bash
# Consulta por estado:
http :3000/statistic?uf=MG

# Consulta por cidade:
http :3000/statistic?cidade=Belo Horizonte
```

Em uma requisição de consulta de CEP, será necessário ler ou salvar o CEP no banco e atualizar as estatísticas. Mantenha os modelos com responsabilidades separadas, ou seja, não coloque lógica de estatística no modelo de CEP ou vice-versa. Crie um serviço que acessará ambos os modelos para realizar as operações necessárias e chame esse serviço no controller.

> models/cepModel.js

```language-javascript
// const connection = require('./connection');

// const findCEP = async (cep) => {
//   const db = await connection();

//   const results = await db.collection('ceps').findOne({ cep });

//   if (!results) return null;

//   return results;
// };

// const saveCEP = async (cepData) => {
//   const { uf, cidade, bairro, logradouro, cep } = cepData;

//   const db = await connection();

//   const result = await db
//     .collection('ceps')
//     .insertOne({ uf, cidade, bairro, logradouro, cep });

//   return result;
// };

const updateLogUF = async (uf) => {
  const db = await connection();

  const findUF = await db.collection('uf_logs').findOne({ uf });

  if (!findUF || !findUF.quantidade) {
    return db.collection('uf_logs').insertOne({ uf, quantidade: 1 });
  }
  findUF.quantidade += 1;
  return db
    .collection('uf_logs')
    .updateOne({ uf }, { $set: { quantidade: findUF.quantidade } });
};

const updateLogCity = async (cidade) => {
  const db = await connection();

  const findCity = await db.collection('city_logs').findOne({ cidade });

  if (!findCity || !findCity.quantidade) {
    return db.collection('city_logs').insertOne({ cidade, quantidade: 1 });
  }

  findCity.quantidade += 1;

  return db
    .collection('city_logs')
    .updateOne({ cidade }, { $set: { quantidade: findCity.quantidade } });
};

const logUF = async (uf) => {
  const db = await connection();

  const result = await db.collection('uf_logs').findOne({ uf });

  if (!result) return null;

  return result;
};

const logCity = async (cidade) => {
  const db = await connection();

  const result = await db.collection('city_logs').findOne({ cidade });

  if (!result) return null;

  return result;
};

module.exports = {
  // saveCEP,
  // findCEP,
  updateLogUF,
  updateLogCity,
  logUF,
  logCity,
};
```

> services/cepService.js

```language-javascript
// const apiService = require('../services/apiService');
// const cepModel = require('../models/cepModel');

// const isValid = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

const lookup = async (cep) => {
  // if (!isValid(cep)) return { err: { message: 'CEP inválido', code: 400 } };

  // const cepData = await cepModel.findCEP(cep);

  if (cepData) {
    const { uf, cidade } = cepData;
    await cepModel.updateLogUF(uf);
    await cepModel.updateLogCity(cidade);
    return cepData;
  }

  const cepFound = await apiService.findCEP(cep);

  // if (cepFound.length === 0)
  //   return { err: { message: 'CEP não encontrado', code: 404 } };

  const { uf, cidade } = cepFound;

  // await cepModel.saveCEP(cepFound);
  await cepModel.logUF(uf);
  await cepModel.logCity(cidade);

  // return cepFound;
};

const log = async (uf, cidade) => {
  if (uf) return await cepModel.logUF(uf);

  return await cepModel.logCity(cidade);
};

module.exports = {
  // lookup,
  log,
};
```

> controllers/cepController.js

```language-javascript
// const cepService = require('../services/cepService');
// const CEP = require('../services/cepService');

// const lookupCEP = async (req, res) => {
//   try {
//     const cep = await CEP.lookup(req.query.cep);

//     if (cep.err)
//       return res.status(cep.err.code).json({ message: cep.err.message });

//     return res.status(200).json({ cep });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const statisticCEP = async (req, res) => {
  try {
    const { uf, cidade } = req.query;

    let result;

    if (uf) result = await cepService.log(uf);
    else result = await cepService.log(null, cidade);

    if (!result)
      return res
        .status(404)
        .json({ message: `${uf ? 'Estado' : 'Cidade'} não encontrado` });

    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  // lookupCEP,
  statisticCEP,
};
```

> index.js

```language-javascript
// const express = require('express');

// const cepController = require('./controllers/cepController');

// const app = express();

// app.get('/lookup', cepController.lookupCEP);

app.get('/statistic', cepController.statisticCEP);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Ouvindo a porta ${PORT}`);
// });
```
