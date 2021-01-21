## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

## Solução

**Exercício 1**: Modifique sua aplicação, substituindo o MySQL pelo MongoDB, mantendo exatamente o mesmo comportamento. Concentre suas mudanças na camada de modelo e tente alterar o mínimo possível nas outras camadas.

```language-javascript
> models/connection.js
// const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//       user: 'root',
//       host: 'localhost',
//       password: 'senha123',
//       database: 'mvc_example',
// });

const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
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

> models/CEP.js

```language-javascript

const connection = require('./connection');
const apiService = require('../services/apiService');

const lookup = async (cep) => {
  if (!isValid(cep)) throw new Error('CEP inválido');

  const cepData = await findCEP(cep);

  if (cepData) return cepData;

  const cepFound = await apiService.findCEP(cep);
  await saveCEP(cepFound);
  return cepFound;
}

const isValid = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

const findCEP = async (cep) => {
  const db = await connection();

  const results = await db.collection('ceps')
    .findOne({ cep })


  if (!results) return null;

  return results;
}

const saveCEP = async (cepData) => {
  const { uf, cidade, bairro, logradouro, cep } = cepData;

  const db = await connection();

  const result = await db.collection('ceps')
    .insertOne({ uf, cidade, bairro, logradouro, cep })

  return result;
}

module.exports = {
  lookup,
};
```

**Exercício 2**: Remova a camada de view da aplicação, transformando-a em uma API que recebe e retorna JSON. Concentre as alterações na camada de controller. Idealmente, o modelo não deve ser alterado.

> controllers/cepController.js

```language-javascript

// const CEP = require('../models/CEP');

// const lookupCEP = async (req, res) => {
//   try {
    
//     const cep = await CEP.lookup(req.query.cep);
    res.json({ cep, message: null });
  // } catch (err) {
    res.json('cep', { cep: null, message: err.message });
//   }
// };

// module.exports = {
//   lookupCEP,
// };
```

> index.js

```language-javascript

const express = require('express');

const cepController = require('./controllers/cepController');

const app = express();

app.get('/', cepController.lookupCEP);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
```


**Exercício 3**: Vamos incrementar a API cep-lookup com algumas estatísticas. Vamos armazenar informações sobre quantidade de consultas a CEPs, agrupando por estado e cidade. Por exemplo, se houve duas consultas a CEPs de Florianópolis e uma de Joinville, teremos nos banco estas informações:

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

> models/CEP.js

```language-javascript

// const connection = require('./connection');

// const isValid = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

// const lookup = async (cep) => {
//   if (!isValid(cep)) throw new Error('CEP inválido');

//   const cepData = await findCEP(cep);

//   if (cepData) return cepData;

//   const cepFound = await apiService.findCEP(cep);
//   await saveCEP(cepFound);
//   return cepFound;
// };

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

const logUF = async (uf) => {
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
const logCity = async (cidade) => {
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

module.exports = {
  saveCEP,
  findCEP,
  logUF,
  logCity,
};
```

> services/cepService.js

```language-javascript

const apiService = require('../services/apiService');
const cepModel = require('../models/CEP');

const isValid = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

const lookup = async (cep) => {
  if (!isValid(cep)) throw new Error('CEP inválido');

  const cepData = await cepModel.findCEP(cep);

  if (cepData) {
    const { uf, cidade } = cepData;
    await cepModel.logUF(uf);
    await cepModel.logCity(cidade);
    return cepData;
  }

  const cepFound = await apiService.findCEP(cep);
  await cepModel.saveCEP(cepFound);
  return cepFound;
};

module.exports = { lookup };
```

> controllers/cepController.js

```language-javascript

const CEP = require('../services/cepService');

// const lookupCEP = async (req, res) => {
//   try {
    
//     const cep = await CEP.lookup(req.query.cep);
//     res.json({ cep, message: null });
//   } catch (err) {
//     res.json('cep', { cep: null, message: err.message });
//   }
// };

// module.exports = {
//   lookupCEP,
// };
```
