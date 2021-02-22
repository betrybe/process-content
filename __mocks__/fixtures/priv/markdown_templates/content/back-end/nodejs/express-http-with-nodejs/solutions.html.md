## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

### Solução

### Exercício 1

1. Inicie os exercícios criando uma aplicação NodeJS, com os comandos já aprendidos.

> Passos

1. Criar uma nova pasta onde o script será criado;

2. Executar `npm init` e passar as informações solicitadas;

3. Instalar o pacote `express` com o comando `npm install express`;

> index.js

```language-javascript
const express = require('express');
const app = express();

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```
### Exercício 2

2. Crie uma aplicação express que receba uma requisição do tipo GET no caminho `/ping` e retorne o JSON `{ "message": "Pong!" }`.

> index.js

```language-javascript
const express = require('express');
const app = express();

app.get('/ping', (res) => res.json({ "message": "Pong!" }));

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

### Exercício 3

3. Crie um endpoint que receba requisições do tipo POST no caminho `/hello`, contendo o JSON `{ "name": "<nome do usuário>" }` e retorne um JSON `{ "message": "Hello, <nome do usuário>!" }`.

> index.js

```language-javascript
const express = require('express');
const app = express();

app.get('/ping', (res) => res.json({ "message": "Pong!" }));

app.use(bodyParser.json());

app.post('/hello', (req, res) => {
  const { name } = req.body;
  res.status(200).json({ "message": `Hello, ${name}!` })
})

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

### Exercício 4

4.  Crie um endpoint que receba requisições do tipo POST no caminho `/hello`, contendo o JSON `{ "name": "<nome do usuário>", "age": "<idade do usuário>" }`. Caso o usuário tenha idade superior a 17 anos, retorne um JSON `{ "message": "Hello, <nome do usuário>!" }` com o `status code 200`. Caso contrário, retorne o JSON `{ "message": "Unauthorized"}` com o `status code 401`;

> index.js

```language-javascript
const express = require('express');
const app = express();

app.get('/ping', (res) => res.json({ "message": "Pong!" }));

app.use(bodyParser.json());

app.post('/hello', (req, res) => {
  const { name, age } = req.body;
  if(parseInt(age) < 17) return res.status(401).json({ "message": `Unauthorized` })
  res.status(200).json({ "message": `Hello, ${name}!` })
})

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

### Exercício 5

5. Crie um endpoint que receba requisições do tipo PUT no caminho `/users/:name/:age` e retorne o JSON `{ "message": "Seu nome é <name> e você tem <age> anos de idade" }`.

> index.js

```language-javascript
const express = require('express');
const app = express();

app.get('/ping', (res) => res.json({ "message": "Pong!" }));

app.use(bodyParser.json());

app.post('/hello', (req, res) => {
  const { name, age } = req.body;
  if(parseInt(age) < 17) return res.status(401).json({ "message": `Unauthorized` })
  res.status(200).json({ "message": `Hello, ${name}!` })
})

app.put('/hello', (req, res) => {
  const { name, age } = req.body;

  res.status(200).json({ "message": `Seu nome é ${name} e você tem ${age} anos de idade` })
})

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

### Exercício 6
6. Agora você vai criar uma API de listagem dos personagens da série Simpsons. Como fonte de dados, você vai utilizar um arquivo JSON.

> Passos
1. Criar uma nova pasta onde o script será criado;

2. Executar `npm init` e passar as informações solicitadas;

3. Instalar o pacote `express` com o comando `npm install express`;

4. Criar o arquivo `simpsons.json` e populá-lo;

> index.js

```language-javascript
const express = require('express');
const routeSimpsons = require('./routeSimpsons');
const app = express();

app.get('/simpsons', (req, res) => res.status(200).json('status 200 OK'));

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

### Exercício 7
7. Crie um endpoint do tipo `GET` na rota `/simpsons` que deve retornar a lista completa de personagens.

> index.js

```language-javascript
const express = require('express');
const routeSimpsons = require('./routeSimpsons');
const app = express();

app.use('/simpsons', routeSimpsons);

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

> routeSimpsons.js

```language-javascript
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();

const readSimpsonsFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'simpsons.json'));
  return JSON.parse(content.toString('utf-8'));
};

router.get('/', async (req, res) => {
  const result = await readSimpsonsFile();
  res.status(200).send(result);
});

module.exports = router;
```

### Exercício 8

8. Crie um endpoint do tipo `GET` na rota `/simpsons/:id` que deve retornar apenas o personagem com o id informado na URL da requisição.

- Caso não exista nenhum personagem com o `id` especificado, deve ser retornado um array vazio.


> routeSimpsons.js

```language-javascript
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();

const readSimpsonsFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'simpsons.json'));
  return JSON.parse(content.toString('utf-8'));
};

router.get('/', async (req, res) => {
  const result = await readSimpsonsFile();
  res.status(200).send(result);
});

router.get('/:id', async (req, res) => {
  const result = await readSimpsonsFile();
  const id = req.params.id;
  const filteredCharacter = result.find(character => character.id === id);
  res.status(200).send(filteredCharacter);
});

module.exports = router;
```

### Exercício 9

9. Crie um endpoint do tipo `POST` na rota `/simpsons` que será responsável por cadastrar novos personagens.

> index.js

```language-javascript
const express = require('express');
const routeSimpsons = require('./routeSimpsons');
const app = express();

app.use(express.json());
app.use('/simpsons', routeSimpsons);

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

> routeSimpsons.js

```language-javascript
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();

const readSimpsonsFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'simpsons.json'));
  return JSON.parse(content.toString('utf-8'));
};

const writeSimpsonsFile = async (content) => (
  fs.writeFile(
    path.resolve(__dirname, '.', 'simpsons.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    }
  ));

router.get('/', async (req, res) => {
  const simpsons = await readSimpsonsFile();
  res.status(200).send(simpsons);
});

router.get('/:id', async (req, res) => {
  const simpsons = await readSimpsonsFile();
  const id = req.params.id;
  const filteredCharacter = simpsons.find(character => character.id === id);
  res.status(200).send(filteredCharacter);
});

router.post('/', async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400);
  const oldSimpsons = await readSimpsonsFile();
  const newArrayOfSimpsons = [...oldSimpsons, { id, name }];
  await writeSimpsonsFile(newArrayOfSimpsons);
  return res.status(200).json({ message: "character created!" });
});

module.exports = router;
```

### Exercício 9 com bônus

> routeSimpsons.js

```language-javascript
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();

const readSimpsonsFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'simpsons.json'));
  return JSON.parse(content.toString('utf-8'));
};

const writeSimpsonsFile = async (content) => (
  fs.writeFile(
    path.resolve(__dirname, '.', 'simpsons.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    }
  ));

router.get('/', async (req, res) => {
  const simpsons = await readSimpsonsFile();
  res.status(200).send(simpsons);
});

router.get('/:id', async (req, res) => {
  const simpsons = await readSimpsonsFile();
  const id = req.params.id;
  const filteredCharacter = simpsons.find(character => character.id === id);
  res.status(200).send(filteredCharacter);
});

router.post('/', async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).json({ message: "missing data" });

  const oldSimpsons = await readSimpsonsFile();
  const hasCharacter = oldSimpsons.some(character => character.id === id);
  if (hasCharacter) return res.status(400).json({ message: "id duplicated!" });

  const newArrayOfSimpsons = [...oldSimpsons, { id, name }];
  await writeSimpsonsFile(newArrayOfSimpsons);
  return res.status(200).json({ message: "character created!" });
});

module.exports = router;
```

### BÔNUS
### Exercício 1

1. Caso algum endpoint que não consta nessa lista receba uma requisição, a resposta deve voltar com **status 404 Not Found**, sem corpo.

> index.js

```language-javascript
const express = require('express');
const routeSimpsons = require('./routeSimpsons');
const app = express();

app.use(express.json());
app.use('/simpsons', routeSimpsons);

app.use('*', function (req, res) {
  res.status(404).json({ message: "endpoint does not exist! sorry )':" });
});

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```



### Exercício 2

2. Todos os endpoints devem receber um token de autenticação. Esse token deve vir no seguinte modelo: `authorization: {token-aqui}`. Nesse momento, como você não está salvando os tokens gerados no cadastro em nenhum lugar, só é preciso verificar que as requisições recebem um token no header que possua 16 caracteres.

> index.js

```language-javascript
const express = require('express');
const routeSimpsons = require('./routeSimpsons');
const tokenMiddleware = require('./tokenMiddleware');
const app = express();

app.use(express.json());
app.use('/simpsons', tokenMiddleware, routeSimpsons);

app.use('*', function (req, res) {
  res.status(404).json({ message: "endpoint does not exist! sorry )':" });
});

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

> tokenMiddleware.js

```language-javascript
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.length === 16) return next();
  return res.status(401).json({ message: 'Token inválido!' });
}
```

### Exercício 3

3. O caminho do endpoint de autenticação deve ser `/signup`.

- As requisições para esse endpoint deverão utilizar o método `POST` e devem receber, no corpo da requisição, os campos `email`, `password`, `firstName` e `phone`.

- Caso todos os requisitos acima sejam atendidos, um token aleatório, composto por letras e números, com 16 caracteres, deve ser retornado. Para gerar o token você pode utilizar a função `randomBytes`, do módulo `crypto` do node, dessa forma:

> generate-token.js

```language-js
const crypto = require('crypto');

function generateToken () {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;
```

A resposta da requisição deve ser um objeto com o formato `{ token: <novo-token-gerado> }`.


> index.js

```language-javascript
const express = require('express');
const routeSimpsons = require('./routeSimpsons');
const routeSignup = require('./routeSignup');
const tokenMiddleware = require('./tokenMiddleware');
const app = express();

app.use(express.json());
app.use('/simpsons', tokenMiddleware, routeSimpsons);

app.use('/signup', routeSignup);

app.use('*', function (req, res) {
  res.status(404).json({ message: "endpoint does not exist! sorry )':" });
});

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
```

> routeSignup.js

```language-javascript
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const validateData = body => body.email && body.password && body.firstName && body.phone;

router.post('/', async (req, res) => {
  if (!validateData(req.body)) return res.status(400).json({ message: "missing data" });
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;
```
