## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para o exercício proposto.

##### Solução

> index.js

```language-javascript
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const booksController = require("/controllers/booksController");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/books", booksController.getAll);
app.get("/book/:id", booksController.getById);
app.post("/book", booksController.createNew);
app.post("/book/:id", booksController.updateById);
app.delete("/book/:id", booksController.deleteById());

app.listen(3000);
```

> controllers/controller.js

```language-javascript
const { Book } = require("../models");

const getAll = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200);
    res.json(books);
  } catch (e) {
    res.status(500).send({ message: "Algo deu errado" });
  }
};

const getById = async (req, res) => {
  try {
    const books = await Book.findByPk(req.params.id);
    res.status(200);
    res.json(books);
  } catch (e) {
    res.status(500).send({ message: "Algo deu errado" });
  }
};

const createNew = async (req, res) => {
  try {
    const { title, author, pageQuantity = 0 } = req.body;
    const book = await Book.create({
      title,
      author,
      pageQuantity,
    });
    res.status(200);
    res.json(book);
  } catch (e) {
    res.status(500).send({ message: "Algo deu errado" });
  }
};

const updateById = async (req, res) => {
  const { title, author, pageQuantity = 0 } = req.body;
  try {
    const result = await Book.update(
      {
        title,
        author,
        pageQuantity,
      },
      { where: { id: req.params.id } }
    );
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(500).send({ message: "Algo deu errado" });
  }
};

const deleteById = async (req, res) => {
  try {
    const bookToDelete = await Book.findByPk(req.params.id);
    await bookToDelete.destroy();
    res.status(200);
    res.json(bookToDelete);
  } catch (e) {
    res.status(500).send({ message: "Algo deu errado" });
  }
};

module.exports = {
  deleteById,
  getAll,
  getById,
  updateById,
  createNew,
};
```

> migrations/nome_da_migration.js

```language-javascript
"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      author: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pageQuantity: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Books");
  },
};
```

> models/Book.js

```language-javascript
const Book = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    pageQuantity: DataTypes.INTEGER,
  });
  return Book;
};

module.exports = {
  Book,
};
```
