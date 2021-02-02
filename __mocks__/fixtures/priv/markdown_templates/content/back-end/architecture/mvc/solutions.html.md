## Gabarito dos exercícios

A seguir, encontram-se sugestões de solução para os exercícios propostos:

### Revisando
> index.js

```language-javascript
const express = require("express");
const app = express();
const {listJokes} = require("./controllers/joke.js")

app.set("view engine", "ejs");

app.set("views", "./views");

app.get("/", listJokes);

app.listen(3000,() => console.log('listen to the port 3000'));
```

> controllers/joke.js

```language-javascript
const jokeModel = require("../models/joke");

async function listJokes(_req, res) {
  const joke = await jokeModel.getJoke();
  console.log(joke)
  return res.render("jokeView", { joke });
}

module.exports = { listJokes };
```

> models/joke.js

```language-javascript
const axios = require("axios");
const URL = "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single";
async function getJoke() {
  return (await axios(URL)).data.joke;
}
module.exports = { getJoke };
```

> views/jokeView.js

```language-javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1> <%%= joke %> </h1>
</body>
</html>
```

## Piadas Chuck Norris
> index.js

```language-javascript
const express = require('express');
const jokesController = require('./controllers/jokesController');
const categoriesController = require('./controllers/categoriesController');

const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/jokes', jokesController.randomJoke);

app.get('/jokes/:category', jokesController.jokeByCategory);

app.get('/categories', categoriesController.getCategories);

app.get('/', categoriesController.redirectToCategories);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listen to port ${PORT}`));
```

> controllers/categoriesController.js

```language-javascript
const Categorie = require('../models/Categorie');

const getCategories = async (_req, res) => {
  const categories = await Categorie.getCategories();
  res.render('categories/index', { categories });
};

const redirectToCategories = (_req, res) => {
  res.redirect('/categories');
};

module.exports = { getCategories, redirectToCategories };
```

> controllers/jokesController.js

```language-javascript
const Joke = require('../models/Joke');

const randomJoke = async (_req, res) => {
  const joke = await Joke.getRandomJoke();
  res.render('jokes/index', { joke });
};

const jokeByCategory = async (req, res) => {
  const { category } = req.params;
  const joke = await Joke.getJokeByCategory(category);
  res.render('jokes/index', { joke });
};

module.exports = { randomJoke, jokeByCategory };
```

> models/Categorie.js

```language-javascript
const axios = require('axios');

const getCategories = async () => (await axios.get('https://api.chucknorris.io/jokes/categories')).data;
module.exports = { getCategories };
```

> models/Joke.js

```language-javascript
const axios = require('axios');

const getRandomJoke = async () => (await axios.get('https://api.chucknorris.io/jokes/random')).data.value;

const getJokeByCategory = async (category) => (
  await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)).data.value;

module.exports = { getRandomJoke, getJokeByCategory };
```

> views/categories/index.ejs

```language-javascript
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./index.css">
    <title>Chuck Norris</title>
</head>
<body>
    <div class='container'>
        <h1>Chuck Norris <spam>Jokes</spam></h1>
        <h2>Categories</h2>
        <ul>
            <li><a href='/jokes'>all</a></li>
            <%% categories.forEach((categorie) => {  %>
                <li >
                    <a href=<%%= `/jokes/${categorie}` %>><%%= categorie %></a>
                </li>
                <%% }) %>

            </ul>
    </div>
</body>
<style>

    spam {
        color:orangered
    }

    a {
        background-color: orangered;
        border-radius: 4px;
        border:1px solid black;
        color: white;
        font-size: 20;
        padding: 3px 8px;
        text-decoration: none;
    }

    li {
        list-style: none;
        margin: 5px;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
    }

    .container {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin: auto;
        position: relative;
        width: 40vw;
    }

    h1 {
        font-size: 3em;
        margin-block-end: 0;
        margin-block-start: 0.2em;
    }

    h2 {
        font-size: 2em;
        margin-block-end: 0;
        margin-block-start: 0.5em;
    }

</style>
</html>
```

> views/jokes/index.ejs

```language-javascript
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <p><%%= joke %></p>
    </div>

    <a href="/">Voltar para página inicial</a>
  </body>
</html>
```


### Bônus

**Exercício 1**: Lembra do exercício que você desenvolveu no segunda dia de `MSC`? Então, agora você terá a oportunidade de refatorá-lo para `MVC`, caso você não tenha o feito você pode partir desse exercício, fazendo a construção da aplicação utilizando a arquitetura `MVC` do zero.

Nesse exercício, você vai desenvolver uma aplicação MVC para consulta de CEPs, chamada `cep-lookup`. Você utilizará uma API para buscar os dados relacionados a um CEP e salvará esses dados no MySQL, caso você esteja refatorando a aplicação deverá substituir o MongoDB pelo MySQL.

Um CEP válido é composto por 8 dígitos, com um hífen opcional separando os três últimos dígitos. Por exemplo, 30310-030 e 30310030 são CEPs válidos. 303100308 e AB897453 não são.

Para consultar um CEP, você deve utilizar a API [CEP lá.](http://cep.la/api) {: .external-link target="_blank" rel="noreferrer noopener" } A página contém instruções sobre como utilizar a API.

O modelo deve fornecer uma interface para consultar CEPs. Primeiramente, o modelo deve consultar o banco de dados pelo CEP procurado. Se o CEP for encontrado, seus dados são retornados sem consultar a API. Caso contrário, o modelo deve fazer uma requisição a API. O modelo então deverá salvar no MySQL os dados da primeira API que responder com sucesso. Em outras palavras, o banco de dados funcionará como um cache de CEPs, enquanto a API só será consultada se um CEP não for encontrado localmente. Inicialmente, o banco deve estar vazio.

O banco de dados só precisa armazenar as seguintes informações: **CEP**, **UF**, **cidade**, **bairro** e **logradouro**. Um CEP salvo no banco deve conter somente números, sem hífens, e essa coluna deve ter um índice único para evitar que o mesmo CEP seja cadastrado duas vezes e otimizar a busca.

A página inicial da sua aplicação deve ter um input, onde a pessoa poderá digitar um CEP, e um botão, que realizará a busca. Se o CEP for válido, seus dados devem ser exibidos abaixo do input. Se o CEP não for encontrado, deve ser exibido o texto `CEP não encontrado`. Se for digitado um CEP com formato inválido, deve ser exibida a mensagem `CEP inválido`.

Note que o CEP pode ser digitado no input com ou sem hífen, mas deve ser salvo no banco sem hífens.

Lembre-se de organizar sua aplicação seguindo a arquitetura MVC, separando as responsabilidades em camadas.

**Solução**

Crie o banco de dados e a tabela na sua instância local do MySQL:

```language-sql
CREATE DATABASE IF NOT EXISTS cep-lookup;

USE cep-lookup;

CREATE TABLE ceps (
    id INT NOT NULL AUTO_INCREMENT,
    cep CHAR(8) NOT NULL,
    uf CHAR(2),
    cidade VARCHAR(50) NOT NULL,
    bairro VARCHAR(50),
    logradouro VARCHAR(100),
    PRIMARY KEY(id),
    UNIQUE INDEX cep_index (cep)
);
```

Crie uma pasta para o projeto:

```language-bash
$ mkdir cep-lookup
$ cd cep-lookup
```

Inicie um novo projeto:

```language-bash
$ npm init -y
```

Instale as dependências:

```language-bash
$ npm install express node-fetch ejs mysql2
```

Crie o `model`, o `controller` e a `view`. Também vamos criar um arquivo `apiService.js` que fará as requisições para a API do `CEP lá`.

> models/connection.js

```language-js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'cep_lookup'});

module.exports = connection;
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

  if (Array.isArray(cepData) && cepData.length === 0) {
    throw new Error('CEP não encontrado');
  }

  return cepData;
};

module.exports = {
  findCEP,
};
```

> models/CEP.js

```language-js
const connection = require('./connection');
const apiService = require('../services/apiService');

const findCEP = async (cep) => {
  const [cepData] = await connection.execute(
    'SELECT uf, cidade, bairro, logradouro FROM cep_lookup.ceps WHERE cep = ?',
    [cep]
  );

  if (!cepData) return null;

  return cepData;
}

const saveCEP = async (cepData) => {
  const { uf, cidade, bairro, logradouro, cep } = cepData;

  await connection.execute(
    'INSERT INTO cep_lookup.ceps (uf, cidade, bairro, logradouro, cep) VALUES (?,?,?,?,?)',
    [uf, cidade, bairro, logradouro, cep],
  );
}

const isValid = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

const lookup = async (cep) => {
  if (!isValid(cep)) throw new Error('CEP inválido');

  const cepData = await findCEP(cep);

  if (cepData) return cepData;

  const cep = await apiService.findCEP(cep);

  await saveCEP(cep);

  return cep;
}

module.exports = {
  lookup,
}
```

> controllers/cepController.js

```language-js
const CEP = require('../models/CEP');

const lookupCEP = async (req, res) => {
  try {
    const cep = await CEP.lookup(req.query.cep);
    res.render('cep', { cep, message: null });
  } catch (err) {
    res.render('cep', { cep: null, message: err.message });
  }
};

module.exports = {
  lookupCEP,
}
```

> views/cep.ejs

```language-html
<!doctype html>
<html>
  <head>
    <title>CEP Lookup</title>
  </head>
  <body>
    <form action="/" method="GET">
      <label for="cep">CEP:</label>
      <input id="cep" name="cep" type="text" />
      <button type="submit">Consultar CEP</button>
    </form>
  </body>
  <%% if (cep) { %>
    <div>
      <p>UF: <%%= cep.uf %></p>
      <p>Cidade: <%%= cep.cidade %></p>
      <p>Bairro: <%%= cep.bairro %></p>
      <p>Logradouro: <%%= cep.logradouro %></p>
    </div>
  <%% } %>
  <%% if (message) { %>
    <h1><%%= message %></h1>
  <%% } %>
</html>
```

> index.js

```language-js
const express = require('express');

const cepController = require('./controllers/cepController');

const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', cepController.lookupCEP);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
```
