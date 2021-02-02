## Gabarito dos exercícios

A seguir, encontra-se sugestões de soluções para os exercícios propostos.

**Exercício 1**: Altere o tempo em que seu token vai expirar para 1 minuto. Faça uma primeira requisição na API com esse novo token. Deve funcionar, pois ainda está dentro do tempo de expiração. Espere o tempo passar e, após 1 minuto, tente fazer uma nova requisição e veja o que acontece.

**Resolução**

> controllers/login.js linha 17

```language-javascript
const expires = moment().add(1, 'minutes').valueOf();
```

**Exercício 2**: Escreva um endpoint novo para que seja possível criar novos posts para nosso blog. Porém, só quem poderá criar novos posts são pessoas admin.

**Obs.**: O cadastro de posts pode ser "falso". Porém, a autenticação deverá ser verdadeira. A ideia aqui é testar seu aprendizado de JWT e não de web APIs em Node.js.

**Resolução**

Vamos adicionar uma flag nova `isAdmin` no modelo:

> models/user.js

```language-javascript
[...]
const UserSchema = new mongoose.Schema({
   username: {
     type: String,
     unique: true,
     required: true,
   },
   password: {
     type: String,
     required: true,
   },
   isAdmin: {
     type: Boolean,
     required: true,
   },
   [...]
```

Vamos adicionar essa flag nova na criação de usuário:

> controllers/createUser.js

```language-javascript
[...]
const data = new Model({
  username: req.body.username,
  password: req.body.password,
  isAdmin: req.body.isAdmin,
 });
[...]
```

Aqui, criamos uma função que recebe uma flag `requideAdmin`. Essa função, por sua vez, retorna a função do middleware usando o parâmetro `requireAdmin` para verificar se aquela rota precisa de acesso de admin.

> api/auth/validateJWT.js

```language-javascript
const jwt = require('jsonwebtoken');
const model = require('../../models/user');

const segredo = 'seusecretdetoken';

module.exports = (requireAdmin) => {
  return async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      res.status(400).json({ error: 'Token não encontrado ou informado' });
    }

    try {
      const decoded = jwt.verify(token, segredo);

      if (requireAdmin && !decoded.data.isAdmin) {
        res
          .status(200)
          .json(400, { error: 'Acesso negado. Você não tem permissão de admin'});
      }

      const user = await model.findOne({ _id: decoded.data._id });

      if (!user) {
        res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
      }

      req.user = user;

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Erro: Seu token é inválido' });
    }
  };
}
```

Feito isso, vamos criar uma rota nova e setar a flag de admin para ela no arquivo `server.js`

> controllers/createPost.js

```language-javascript
module.exports = (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(422).json({ message: 'Post sem título ou conteúdo' });
  }

  res.status(200).json({ message: 'Post fake criado', data: req.body });
};
```

> api/routes.js

```language-javascript
module.exports = {
  createPost: require('../controllers/createPost'),
  getPosts: require('../controllers/posts'),
  createUsers: require('../controllers/createUser'),
  login: require('../controllers/login'),
}
```

> api/server.js linhas 18 e 19

Para consultar os posts, você não precisa ser um admin. Mas é necessário para criar novos posts, pois não é qualquer um que tem essa bola toda!

```language-javascript
apiRoutes.get('/api/posts', validateJWT(false), routes.getPosts);
apiRoutes.post('/api/posts', validateJWT(true), routes.createPost);
```
{: .line-numbers}

Agora é só testar!

Criando um user admin:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/createUserAdmin.png", class: "text-center"}) %>

Logando como admin:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/loginUserAdmin.png", class: "text-center"}) %>

Consumindo os posts públicos como admin:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/consumePostsAdmin.png", class: "text-center"}) %>

Criando novos posts como admin:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/adminCreatePost.png", class: "text-center"}) %>

Agora vamos refazer esse passos com um usuário não admin.

Criando um user normal:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/createNoAdmin.png", class: "text-center"}) %>

Logando como usuário normal:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/loginNoAdmin.png", class: "text-center"}) %>

Consumindo os posts públicos como usuário normal:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/consumePostsNoAdmin.png", class: "text-center"}) %>

Criando novos posts como usuário normal:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/createPostNoAdmin.png", class: "text-center"}) %>
