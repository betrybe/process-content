## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

### Solução

1. Criar uma nova pasta onde o script será criado;

2. Executar `npm init` e passar as informações solicitadas;

3. Instalar o pacote `express` com o comando `npm install express`;

4. Criar o arquivo `simpsons.json` e populá-lo;

### Exercício 1

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

### Exercício 2

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

### Exercício 3

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

### Exercício 3 com bônus

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

### Exercício 4

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


### BÔNUS

### Exercício 5

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

### Exercício 6

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
