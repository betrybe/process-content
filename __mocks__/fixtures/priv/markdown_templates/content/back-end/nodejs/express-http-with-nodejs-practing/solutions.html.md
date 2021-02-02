## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

### Exercício 1
> index.js

```language-javascript
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

function verifyEmail(email) {
  const emailRegex = /^([a-zA-Z0-9_-]+)@mail\.com$/gm;
  return emailRegex.test(email);
}
function verifypassword(password) {
  const passwordRegex = /^\d{4,8}$/gm;
  return passwordRegex.test(password);
}

app.post('/login', (req, res) => {
  const { body } = req;
  const emailIsValid = verifyEmail(body.email);
  const passwordIsValid = verifypassword(body.password);
  if (emailIsValid && passwordIsValid) {
    const token = crypto.randomBytes(6).toString('hex');
    return res.status(200).json({ token });
  } else {
    return res.status(401).json('email or password is incorrect.');
  }
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 2
> index.js

```language-javascript
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

function verifyToken(token) {
  const tokenRegex = /^(\d|\w){12}$/gm;
  return tokenRegex.test(token);
}

app.get('/btc/price', async (req, res) => {
  const { authorization: token } = req.header;
  const tokenIsValid = verifyToken(token);
  if (tokenIsValid) {
    const btcEndpoint = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
    const btcData = await axios.get(btcEndpoint).then(({ data }) => data);
    return res.status(200).json({ btcData });
  } else {
    return res.status(401).json('email or password is incorrect.');
  }
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 3
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

const posts = [
  {
    id: 2,
    author: 'Antonio Neto',
    comment: 'Hoje o dia está maneiro!',
  },
  {
    id: 3,
    author: 'Rodrigo Garga',
    comment: 'To aqui também',
  },
];

app.get('/posts/:id', (req, res) => {
  const { id: reqId } = req.params;
  const post = posts.find(({ id }) => id === reqId);
  if (post) {
    return res.status(200).json(post);
  }
  return res.status(404).json('id not found.');
});

app.get('/posts', (_req, res) => res.status(200).json(posts));

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 4
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

const users = [
  {
    id: 2,
    user: 'antonio',
    comments: ['Hoje o dia está maneiro!', 'Agora não está muito'],
  },
  {
    id: 3,
    user: 'rodrigo',
    comments: ['To aqui também', 'Agora não tô'],
  },
];

app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  const user = users.find(({ user: userName }) => userName === name);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json('user not found.');
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 5
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/:operacao/:numero1/:numero2', (req, res) => {
  const { operacao, numero1, numero2 } = req.params;
  let result;
  switch (operacao) {
    case 'soma':
      result = numero1 + numero2;
      res.status(200).json(result);
      break;

    case 'subtração':
      result = numero1 - numero2;
      res.status(200).json(result);
      break;

    case 'divisão':
      result = numero1 / numero2;
      res.status(200).json(result);
      break;

    case 'multiplicação':
      result = numero1 * numero2;
      res.status(200).json(result);
      break;

    default:
      res.status(400).json({'invalid operation'});
      break;
  }
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 6
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

const recipes = [
  {
    id: 12345,
    name: 'farofa de bacon',
    ingredientes: ['farofa', 'bacon'],
  },
  {
    id: 12346,
    name: 'ovo mexido',
    ingredientes: ['ovo'],
  },
];

function deleteFromDb(recipeToDeleteId) {
  const recipeToDeleteIndex = recipes.findIndex(({ id }) => id === recipeToDeleteId);
  if (recipeToDeleteIndex === -1) {
    return null;
  }

  const deletedElement = recipes.splice(recipeToDeleteIndex, 1)[0];
  return deletedElement;
}

app.delete('/recipe/:id', (req, res) => {
  const { id } = req.params;
  const deletedRecipe = deleteFromDb(id);
  if (deletedRecipe) {
    return res.status(200).json(deletedRecipe);
  }
  res.status(404).json('recipe not found');
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 7
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

const recipes = [
  {
    id: 12345,
    name: 'farofa de bacon',
    ingredientes: ['farofa', 'bacon'],
  },
  {
    id: 12346,
    name: 'ovo mexido',
    ingredientes: ['ovo'],
  },
];

function updateFromDb({ id: recipeToUpdateId, name, ingredientes }) {
  const recipeToUpdateIndex = recipes.findIndex(
    ({ id }) => id === recipeToUpdateId,
  );
  if (recipeToUpdateIndex === -1) {
    return null;
  }
  const newRecipe = {
    id: recipeToUpdateId,
    name,
    ingredientes,
  };
  recipes.splice(recipeToUpdateId, 1, newRecipe);
  return newRecipe;
}

app.put('/recipe/:id', (req, res) => {
  const { id } = req.params;
  const { name, ingredientes } = req.body;
  const updatedRecipe = updateFromDb({ id, name, ingredientes });
  if (updatedRecipe) {
    return res.status(200).json(updatedRecipe);
  }
  res.status(404).json('recipe not found');
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 8
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

const users = [
  {
    id: 2,
    user: 'antonio',
    comments: ['Hoje o dia está maneiro!', 'Agora não está muito'],
  },
  {
    id: 3,
    user: 'rodrigo',
    comments: ['To aqui também', 'Agora não tô'],
  },
];

app.get('/comments', (req, res) => {
  const { filter } = req.query;
  const comments = users.reduce((acc, { comments: userComments }) => [...acc, ...userComments], []);
  if (filter) {
    const filteredComments = comments.filter((comment) => comment.includes(filter));
    return res.status(200).json(filteredComments);
  }

  res.status(200).json(comments);
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 9
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

const users = [
  {
    id: 2,
    user: 'marcos',
    isActive: true,
  },
  {
    id: 3,
    user: 'paulo',
    isActive: true,

  },
  {
    id: 3,
    user: 'roger',
    isActive: false,
  },
];

function updateUserStatus(idToFind, status) {
  const userIndex = users.findIndex(({ id }) => id === idToFind);
  if (userIndex === -1) {
    return null;
  }
  users[userIndex].isActive = status;
  return users[userIndex];
}

app.patch('/user/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (typeof status !== 'boolean') {
    return res.status(400).json("status isn't a boolean");
  }
  const updatedUser = updateUserStatus(id, status);

  if (updatedUser) {
    return res.status(200).json(updatedUser);
  }
  return res.status(404).json('user isn\'t found');
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```

### Exercício 10
> index.js

```language-javascript
const express = require('express');

const app = express();
const PORT = 3000;

const recipes = [
  {
    id: 12345,
    name: 'farofa de bacon',
    ingredientes: ['farofa', 'bacon'],
  },
  {
    id: 12346,
    name: 'ovo mexido',
    ingredientes: ['ovo'],
  },
];
function findRecipeIndex(idToFind) {
  const recipeIndex = recipes.findIndex(({ id }) => id === idToFind);
  return recipeIndex === -1 ? null : recipeIndex;
}
function removeIngredient(recipeIndex, ingredientsToRemove) {
  const { ingredientes } = recipes[recipeIndex];
  const newIngredients = ingredientes.filter(
    (ingredient) => !ingredientsToRemove.includes(ingredient),
  );
  recipes[recipeIndex].ingredientes = newIngredients;
}
function insertIngredient(recipeIndex, ingredientsToAdd) {
  const { ingredientes } = recipes[recipeIndex];
  const newIngredients = [...ingredientes, ingredientsToAdd];
  recipes[recipeIndex].ingredientes = newIngredients;
}

app.patch('/recipe/:id/ingredients', (req, res) => {
  const { remove, insert } = req.body;
  const id = req.params;
  const recipeIndex = findRecipeIndex(id);
  if (!recipeIndex) {
    return res.status(404).json('recipe not found');
  }

  if (remove) {
    removeIngredient(recipeIndex, remove);
  }
  if (insert) {
    insertIngredient(recipeIndex, insert);
  }
  return res.status(200).json(recipes[recipeIndex]);
});

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
```
