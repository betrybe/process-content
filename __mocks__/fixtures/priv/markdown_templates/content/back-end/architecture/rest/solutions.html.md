## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para o exercício proposto.

##### Solução

> controllers/productController.js

```language-javascript
const express = require('express');
const ProductModel = require("../models/productModel");
const router = express.Router();

router.get('/', async (req, res, next) => {
  const products = await ProductModel.getAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res, next) => {
  const product = await ProductModel.getById(req.params.id);

  if (product === null) {
    res.status(404).send({ message: 'Produto não encontrado' });
  }

  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  const { name, brand } = req.body;

  try {
    const newProduct = await ProductModel.add(name, brand);

    res.status(200).json(newProduct);
  } catch (e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const products = await ProductModel.exclude(req.params.id);

    res.status(200).json(products);
  } catch (e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, brand } = req.body;

  try {
    const products = await ProductModel.update(req.params.id, name, brand);

    res.status(200).json(products);
  } catch (e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;
```

### Bônus

> controllers/productController.js

```language-javascript
const express = require('express');
const ProductModel = require("../models/productModel");
const router = express.Router();

router.get('/', async (req, res, next) => {
  const products = await ProductModel.getAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res, next) => {
  const product = await ProductModel.getById(req.params.id);

  if (product === null) {
    res.status(404).send({ message: 'Produto não encontrado' });
  }

  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  const { name, brand } = req.body;

  try {
    const newProduct = await ProductModel.add(name, brand);

    res.status(200).json(newProduct);
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const products = await ProductModel.exclude(req.params.id);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.put('/:id', async (req, res) => {
  const { name, brand } = req.body;

  try {
    const products = await ProductModel.update(req.params.id, name, brand);

    res.status(200).json(products);
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

module.exports = router;
```

> models/connections.js

```language-javascript
const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

const connection = () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('rest_example'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
   });
};

module.exports = connection;
```

> models/productModel.js

```language-javascript
const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function getAll() {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    return products;
  }

async function getById(id) {
  const db = await connection();
  if(!ObjectId.isValid(id)) return null;
  return db.collection('products').findOne(ObjectId(id));
}

async function add(name, brand) {
  const db = await connection();
  const addProduct = await db.collection('products').insertOne({name, brand});
  return addProduct;
}

async function exclude (id) {
  const db = await connection();
  if(!ObjectId.isValid(id)) return null;
  const product = await getBytId(id);
  await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return product;
}

async function update(id) {
  const db = await connection();
  if(!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: name, brand });
  if(!product) return add(name, brand);
  return product;
}


module.exports = { add, getAll, getById, update, exclude };
```
