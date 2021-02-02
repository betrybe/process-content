## O que vamos aprender?

Hoje você aprenderá o que é o JWT (JSON Web Token), por que utilizá-lo, sua importância, como criar uma API com autenticação JWT e cases de empresas que estão utilizando essa tecnologia!

### Você será capaz de:

- Entender o que há por dentro de um token de autenticação;

- Gerar tokens a partir de informações como login e senha;

- Autenticar rotas do Express, usando o token JWT.

---

## Por que isso é importante?

O JWT é, definitivamente, uma maneira inteligente de obter, com segurança, a identidade de um usuário!

Imagine que você tem uma aplicação em que você precisa verificar se a sessão de uma pessoa ainda está ativa, mesmo depois de ela ter desligado o computador/smartphone. E aí, como faz?

Você poderia usar cookies. Porém, usar cookies, nos dias de hoje, não é uma boa opção por várias razões: o usuário pode não aceitar seus cookies, você não tem controle de onde ele está rodando, o site fica mais pesado dependendo de qual cookie você está usando etc.

Uma alternativa é usar o `JWT`, que te disponibiliza um token/hash/código criptografado que você pode enviar para uma API e validá-lo como preferir.

Além disso, essa tecnologia nos traz outros benefícios:

1. Não utiliza banco de dados: usar o JWT implica menos consultas ao banco de dados, o que nos dá um tempo de resposta mais rápido. Caso você esteja usando serviços pagos, como o [DynamoDB](https://aws.amazon.com/dynamodb/) {: .external-link target="_blank" rel="noreferrer noopener" }, que cobram por consulta, o JWT poderá reduzir os custos de consumo.

2. Mais simples de usar (se você for cuidadoso): se seu projeto não tem uma arquitetura boa para administrar as sessões dos seus cliente, e seus princípios básicos de segurança não forem claros, o tempo de desenvolvimento usando JWT será bem mais rápido, considerando que você pode simplesmente usar alguma biblioteca existente.

3. Utilizado em vários serviços: você pode ter um servidor de autorização que lida com o login/cadastro para gerar o token para o usuário. A partir daí, você pode transitar seu token entre várias aplicações, fazendo o usuário logar apenas uma vez e logo depois estar logado em todas as outras aplicações do seu sistema. No Google, por exemplo, você loga uma única vez e pode usar serviços como Google Drive, Gmail, Google docs, Google fotos etc. sem precisar logar novamente.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é o JWT?

Vamos começar assistindo a um vídeo:

<%= youtube_video "HsSXh2kkMVw" %>

Interessante, né? O JWT (JSON Web Token) é um token gerado a partir de dados "pessoais" que pode ser trafegado pela internet via URL. O tráfego acontece via requisições POST ou em um header HTTP com "segurança". Dizemos que a informação trafega com segurança porque essa informação é, normalmente, criptografada através de algoritmos como [`HMAC`](https://pt.wikipedia.org/wiki/HMAC) {: .external-link target="_blank" rel="noreferrer noopener" }, ou com um par de chaves pública/privada usando [`RSA`](https://pt.wikipedia.org/wiki/RSA_(sistema_criptogr%C3%A1fico)) {: .external-link target="_blank" rel="noreferrer noopener" }.

Abaixo, vamos explicar mais sobre esses sistemas de criptografia, mas não se assuste: não vamos codificá-los na mão; tudo isso está encapsulado nas bibliotecas do JWT.

Como funciona a criptografia ?

A criptografia, basicamente, funciona assim:

1. Aquilo que é escrito e codificado utilizando uma chave privada só pode ser lido com a chave pública correspondente.

2. Aquilo que é escrito e codificado utilizando uma chave pública só pode ser lido com a chave privada correspondente.

##### O que é HMAC?

O [HMAC](https://tools.ietf.org/html/rfc2104) {: .external-link target="_blank" rel="noreferrer noopener" } é um um algoritmo para gerar um `MAC` (código de autenticação de mensagem) criptografado através de algum algoritmo de hash (algoritmos que codificam mensagens), como md5, sha1 ou sha256, a partir de uma chave secreta (uma senha) e de uma mensagem qualquer. Exemplo: você pega uma chave secreta "HDIA7D6S7A5DSAGDUS" e uma mensagem como "oi, fulano, a senha do meu banco é 1234" e usa o HMAC para gerar um código criptografado.

__Curiosidade:__ A fórmula do HMAC é a seguinte:

`HMAC(K, m) = hash(K1 + hash(K2 + m))`

onde:

- `K` é a chave secreta;

- `m` é a mensagem;

- `hash` é a função de hash escolhida (md5, sha1 etc);

- `K1` e `K2` são chaves secretas derivadas da chave original K;

- `+` é a operação de concatenação de strings.

##### O que é RSA?

O RSA utiliza uma chave pública, que pode ser conhecida por todos, e uma chave privada, que deve ser mantida em sigilo. Toda mensagem criptografada, usando uma chave pública, só pode ser descriptografada usando a chave privada que foi usada no momento da criptografia.

As chaves pública/privada são geradas a partir de números aleatórios, que vão ser descartados mais tarde.

Cabe lembrar que a chave pública é geralmente distribuída entre várias aplicações e que a chave privada é mantida em segredo e armazenada em um lugar seguro.

__Curiosidade:__ A fórmula do RSA é a seguinte:

- Escolha dois números primos extensos, `p` e `q`;

- Calcule `n = p * q`; e `z = (p – 1) * (q – 1)`;

- Escolha um número primo em relação a `z` e chame-o de `e`;

- Encontre `d` de forma que `d = e - 1 mod z`. (`mod` é o resto inteiro da divisão);

- Portando, a chave pública `KU` consiste em `KU = {e, n}` e a chave privada `KR` consiste em `KR = {d, n}`.

### Entendendo o JWT

O resultado final do JWT dá-se, normalmente, através da criptografia em `HMAC` ou `RSA` de dois blocos de JSON encriptados em [base64.](https://pt.wikipedia.org/wiki/Base64) {: .external-link target="_blank" rel="noreferrer noopener" } Esses dois blocos JSON encriptados são _header_ (cabeçalho) e _payload_ (carga). A _signature_ (assinatura) é a junção dos hashes gerados a partir do header e payload.

**Header**

O Header contém duas propriedades: o tipo do token, que é JWT, e o tipo do algoritmo de hash, como _HMAC-SHA256_ ou _RSA_:

```language-json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
{: .line-numbers}

**Payload** (dados pessoais do usuário)

Esta é a segunda parte do token, que contém os "dados". Esses "dados" são declarações sobre uma entidade (geralmente, o usuário):

```language-json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
{: .line-numbers}

**Signature**

Para gerar o hash JWT, você deve usar o header e o payload codificados em base64, usando o algoritmo definido no header:

Código de exemplo:

```language-javascript
import { METODO_HMAC_SHA256 } from 'bibliotecaJWT';
import { base64UrlEncode } from 'bibliotecaDeBase64';

const cabecalho = {
  alg: 'HS256',
  type: 'JWT',
};

const payload = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true,
};

const secret = 'MinhaSenhaMuitoComplexa123';

MetodoHmacSHA256(
  base64UrlEncode(cabecalho) + '.' + base64UrlEncode(payload),
  secret
);
```
{: .line-numbers}

~~_PS: vocês vão ver código de verdade daqui a pouco :)_~~

O resultado terá a seguinte estrutura:

`(Header em base64).(Payload em base64).(Signature em base64)`

Exemplo de resultado:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNTQ3OTc0MDgyfQ.2Ye5_w1z3zpD4dSGdRp3s98ZipCNQqmsHRB9vioOx54`

Nesse caso, temos:

- Header: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

- Payload: `eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNTQ3OTc0MDgyfQ`

- Signature: `2Ye5_w1z3zpD4dSGdRp3s98ZipCNQqmsHRB9vioOx54`

Um exemplo de envio de um JWT via header em uma requisição HTTP:

```language-curl
 GET /foo/bar HTTP/1.1
 Host: www.exemplo.com
 Authorization: Bearer (Header em base64).(Payload em base64).(Signature em base64)
```
{: .line-numbers}

Ou seja, por ser algo que é transmitido via HTTP, JWT pode ser usado com qualquer linguagem que suporte os requisitos mínimos para gerar o token e enviar uma requisição HTTP, como, por exemplo, Java, C#, PHP ou Python.

O diagrama abaixo ilustra como um JWT é gerado a partir do header, do payload e da chave secreta.

<%= figure(%{src: "/back-end/nodejs/jwt/images/pipeline.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto", caption: "Geração de um JWT"}) %>

### Show me the code!

Chegou a hora tão esperada. Vamos colocar a mão na massa!

Nesse exemplo, vamos trabalhar com as seguintes tecnologias:

- Nodejs;

- Express;

- Postman;

- MongoDB;

- JWT.

Para começar, vamos usar um projeto base. Esse projeto é, basicamente, uma API Express sem autenticação JWT. [Neste link](https://github.com/tryber/nodejs-jwt-base-project) {: .external-link target="_blank" rel="noreferrer noopener" }, você pode encontrar o código e as instruções para baixá-lo e executá-lo, além de uma explicação de como o projeto base funciona. Se não estiver fazendo muito sentido, não se preocupe, pois o foco desta aula é autenticação via JWT. Em outros momentos, você vai aprender a criar APIs como essa.

**Nota**: Após clonar o projeto, não se esqueça de colocar a URL do MongoDB no arquivo `api/server.js`, na linha 6. A URL da sua instância local do MongoDB ficará disponível assim que você executar o `mongo` no seu terminal. Normalmente, essa URL é `mongodb://127.0.0.1:27017`.

##### Testando nossa API

Imagine que esse é um serviço real que você usará em produção. Tenha isso mente, pois, nesses testes, vamos pegar alguns problemas que o JWT nos ajudará a resolver!

Para testar nossa aplicação, vamos usar o [Postman](https://www.postman.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, um serviço fácil e simples para fazer requisições HTTP.

Caso você ainda não tenha usado o Postman, assista a este vídeo que explica o funcionamento dessa ferramenta:

<%= youtube_video "rI9rhM6iJoI" %>

Aprendido o uso do Postman, vamos ao trabalho!

Para começar a usar a nossa plataforma, precisamos criar um usuário. Para isso, faremos uma requisição POST para o endpoint `/api/users`, passando um nome de usuário e senha:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/createUserReqBase.png", class: "text-center"}) %>

Após enviar essa requisição, obtemos a seguinte respota:

```language-json
{
  "message": "Novo Usuário",
  "data": {
      "_id": "5ea2255783d4bc61173cd1e6",
      "username": "italssodj",
      "password": "senha123"
  }
}
```

Até aí, tudo certo. Não precisamos de autenticação para criar um usuário, mas, para consultar as nossas postagens no blog, precisamos sim! Então, vamos fazer o login. Para isso, fazemos uma requisição `POST` para o endpoint `/api/login`, passando o nome de usuário e senha usados no cadastro:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/loginReqDemo.png", class: "text-center"}) %>

Após enviar essa requisição, recebemos a seguinte resposta:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/loginResBase.png", class: "text-center"}) %>

Legal, estamos logados. Agora já podemos pegar as postagens do nosso blog! Fazemos uma requisição `GET` para o endpoint `/api/posts/`:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/postReqBase.png", class: "text-center"}) %>

E recebemos os posts como resposta:

<%= figure(%{class: "rounded mx-auto d-block", width: "788px", height: "auto", src: "/back-end/nodejs/jwt/images/postResBase.png", class: "text-center"}) %>

Agora, note uma coisa: quando formos utilizar a API com nosso front-end, como é que sabemos que estamos autenticados? Podemos fazer essa verificação no front-end e, caso a requisição de login retorne true, fazemos uma requisição para obter os posts. Mas e se alguém inspecionar as requisições do browser e descobrir o endpoint `/api/post`? Essa pessoa vai poder acessar dados que não deveria. Além disso, se o usuário fechar o browser, terá que logar novamente toda vez que precisar usar a API? E se for um sistema de banco, em que só se pode ficar online por um determinado tempo, como saberemos que a sessão expirou? No back-end, ao chegar uma requisição para `/api/posts`, como fazemos para retornar somente os posts de quem requisitou? Se o acesso for a um recurso que requer um nível de autorização mais elevado, como fazemos para saber se a pessoa é, por exemplo, um admin?

São **MUITAS** dúvidas, mas calma. É aí que o JWT entra. Agora vamos alterar um pouco nossa API para adicionar autenticação via JWT. No final, vamos poder saber se o usuário está de fato autenticado, quem essa pessoa é, setar um tempo de sessão para ela, permitir que ela utilize apenas uma autenticação para trafegar entre várias aplicações etc.

### Implementando JWT

Para começar, vamos instalar o pacote `jsonwebtoken`:

```language-bash
npm install jsonwebtoken
```

Agora, vamos editar o arquivo `controllers/login.js`. Lá, vamos trabalhar na geração do nosso JWT e adicionar os seguintes trechos de código:

```language-javascript
// const User = require('../models/user');
const jwt = require('jsonwebtoken');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
   Em projetos reais, seja cauteloso com essa chave, pois só quem tem acesso
   a ela poderá descriptografar os dados encriptados. */
const secret = 'seusecretdetoken';

// module.exports = async (req, res) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.password;

//     if (!username || !password)
//       return res
//         .status(401)
//         .json({ message: 'É necessário usuário e senha para fazer login' });

//     const user = await User.findUser(username);

//     if (!user || user.password !== password)
//       return res
//         .status(401)
//         .json({ message: 'Usuário não existe ou senha inválida' });

    /* Criamos uma config básica para o nosso JWT, onde:
      expiresIn -> significa o tempo pelo qual esse token será válido;
      algorithm -> algoritmo que você usará para assinar sua mensagem
                  (lembra que falamos do HMAC-SHA256 lá no começo?). */

    /* A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias. '8h' = 8 horas. */
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    /*
      Aqui é quando assinamos de fato nossa mensagem com a nossa "chave secreta".
      Mensagem essa que contém dados do seu usuário e/ou demais dados que você
      quiser colocar dentro de "data".
      O resultado dessa função será equivalente a algo como: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNTQ1OTBiYTQ5NDQ4ZjdlNWZhNzNjMCIsInVzZXJuYW1lIjoiaXRhbHNzb2RqIiwicGFzc3dvcmQiOiJzZW5oYTEyMyIsIl9fdiI6MH0sImlhdCI6MTU4MjU4NzMyNywiZXhwIjoxNTg0Nzc0NzE0OTA4fQ.UdSZi7K105aaVnoKSW-dnw-Kv7H3oKMtE9xv4jwyfSM
      */
    const token = jwt.sign({ data: user }, secret, jwtConfig);

    /* Por fim, nós devolvemos essa informação ao usuário. */
    res.status(200).json({ token });
//   } catch (e) {
//     return res.status(500).json({ message: 'Erro interno', error: e });
//   }
// };
```

Feito isso, nós já podemos nos autenticar de verdade, não é mesmo? Ao fazer uma nova requisição `POST` para `/api/login`, passando nome de usuário e senha corretos, obtemos um resultado semelhante ao seguinte:

```language-json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlYTIyNTU3ODNkNGJjNjExNzNjZDFlNiIsInVzZXJuYW1lIjoidHVsaW9zdGFybGluZyIsInBhc3N3b3JkIjoiMTIzNDU2IiwiX192IjowfSwiaWF0IjoxNTg3Njg1MTAwLCJleHAiOjE1ODk4Nzc1ODU2MTR9.Y0JzzSuSwrl2OXugqDd0UxY7D0g0HpW3gglSLdop4KU"
}
```

Eis o nosso token! É ele que vamos ficar transitando pra lá e pra cá, então ele precisa ser guardado! Mas caso ele seja perdido, não se preocupe; é só gerar outro token. 🙂

Agora temos que usar esse token de alguma forma, não é mesmo? Para isso, vamos criar uma pasta chamada `auth` dentro do diretório `api`; e, dentro dela, um arquivo chamado `validateJWT.js`.

Esse arquivo conterá uma função que será usada como middleware para as nossas requisições, validando todas as rotas em que nós solicitarmos autenticação.

```language-javascript
const jwt = require('jsonwebtoken');
const model = require('../../models/user');

/* Mesma chave privada que usamos para criptografar o token.
   Agora, vamos usá-la para descriptografá-lo.
   Numa aplicação real, essa chave jamais ficaria hardcoded no código assim,
   e muitos menos de forma duplicada, mas aqui só estamos interessados em
   ilustrar seu uso ;) */
const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do
     header Authorization em todas as rotas que queremos que
     sejam autenticadas. */
  const token = req.headers['authorization'];

  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, segredo);
    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          _id: '5e54590ba49448f7e5fa73c0',
          username: 'italssodj',
          password: 'senha123'
        },
        iat: 1582587327,
        exp: 1584774714908
      }
    */

    /* Caso o token esteja expirado, o próprio JWT irá retornar um erro, por isso não é necessário fazer validação
       Caso esteja tudo certo, nós então buscamos o usuário na base para saber
       se esse token não foi gerado através de alguma plataforma de gerador
       de JWT, por exemplo.*/
    const user = await model.findUser(decoded.data.username);

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto res.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência ou para a callback que lida com a requisição. */
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Erro: Seu token é inválido' });
  }
};
```
{: .line-numbers}

No arquivo `api/server.js`, onde definimos as rotas, usamos esse middleware para adicionar autenticação na nossa rota de listagem de posts.

```language-javascript
// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes');

/* Aqui, importamos nossa função que valida se o usuário está ou não autenticado */
   const validateJWT = require('./auth/validateJWT');

// const port = process.env.PORT || 8080;

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const apiRoutes = express.Router();

/* E a usamos como middleware na nossa rota, colocando-a antes do nosso controller. */
   apiRoutes.get('/api/posts', validateJWT, routes.getPosts);
// apiRoutes.post('/api/users', routes.createUsers);
// apiRoutes.post('/api/login', routes.login);

// app.use(apiRoutes);

// app.listen(port);
// console.log('conectado na porta ' + port);
```
{: .line-numbers}

Note que não queremos autenticar o login e nem criação de usuários, pois precisamos deles para o processo de autenticação! Se houvesse outras rotas protegidas na nossa aplicação, usaríamos o middleware nelas também!

Agora que já estamos logados, vamos requisitar nossos posts!

<%= figure(%{src: "/back-end/nodejs/jwt/images/postReqBase.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto"}) %>

<%= figure(%{src: "/back-end/nodejs/jwt/images/postResDemoUnauthenticated.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto"}) %>

Você deve estar pensando: Ué, já fizemos o login, então por que não podemos pegar os posts?
Olhe com mais atenção para a resposta da API. Ela está dizendo que o token não foi informado. Nós conseguimos um token através do endpoint de login, mas não fizemos nada com ele. Nesse caso, vamos mandar o token para a API via `Headers`, que são informações extras que podemos passar em uma requisição.

<%= figure(%{src: "/back-end/nodejs/jwt/images/postHeaders.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto"}) %>

Adicionamos um header chamado `Authorization` porque é o que nosso middleware espera. Se não se lembra, dê uma olhada de novo no arquivo `/api/auth/validateJWT.js`.

Feito isso, é só mandar bala na requisição e ser feliz!

```language-json
{
  "mockPosts": [
    {
      "title": "titulo fake",
      "content": "conteudo conteudo conteudo conteudo conteudo "
    },
    {
      "title": "titulo fake",
      "content": "conteudo conteudo conteudo conteudo conteudo "
    },
    {
      "title": "titulo fake",
      "content": "conteudo conteudo conteudo conteudo conteudo "
    },
    {
      "title": "titulo fake",
      "content": "conteudo conteudo conteudo conteudo conteudo "
    }
  ]
}
```

Voltamos a conseguir recuperar nossos posts. Mas, antes de terminarmos, um último comentário sobre nossa API. Você notou que nossos posts são _fake_ e são sempre os mesmos, independente do usuário logado, certo? Numa API real, buscaríamos esses posts de um banco de dados, por exemplo. Mas como faríamos para recuperar apenas os posts do usuário logado?

Lembra-se de que o middleware de autenticação recupera o usuário do banco de dados e o coloca no `req`? Esse objeto é o mesmo que é passado para todos os middlewares e para a callback da rota.
Dê uma olhada nas funções definidas no middleware e nos controllers. Elas têm a mesma assinatura. Como o middleware é executado antes das funções dos controllers, `req` conterá o usuário logado quando o controller em `/controllers/posts` for executado, e poderíamos utilizá-lo para fazer uma consulta ao banco de dados que trouxesse somente seus posts. Para confirmar isso, basta colocar um `console.log` dentro do controller:

```language-javascript
module.exports = (req, res, next) => {
  console.log(req.user);
  res.status(200).json({ mockPosts });
};
```

Você deverá ver algo assim, no terminal onde executou a API:

```language-javascript
{
  _id: 5ea2255783d4bc61173cd1e6,
  username: 'italssodj',
  password: 'senha123'
}
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver alguns exemplos de JWT em ação.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Vamos juntar tudo o que aprendemos até aqui e exercitar mais ainda nosso aprendizado!

**Exercício 1**: Altere o tempo em que seu token vai expirar para 1 minuto. Faça uma primeira requisição na API com esse novo token. Deve funcionar, pois ainda está dentro do tempo de expiração. Espere o tempo passar e, após 1 minuto, tente fazer uma nova requisição e veja o que acontece.

**Exercício 2**: Escreva um endpoint novo para que seja possível criar novos posts para nosso blog. Porém, só quem poderá criar novos posts são pessoas admin.

**Obs.**: O cadastro de posts pode ser "falso". Porém, a autenticação deverá ser verdadeira. A ideia aqui é testar seu aprendizado de JWT e não de web APIs em Node.js.

### Bônus

Já reparou que as senhas são guardadas no banco como `plaintext`? Qualquer um que puder acessar o banco de dados pode vê-las. Para resolver esse problema, nós podemos usar a biblioteca [`bcrypt`](https://github.com/kelektiv/node.bcrypt.js) {: .external-link target="_blank" rel="noreferrer noopener" }. Essa biblioteca permite armazenar senhas de forma segura. Altere nossa aplicação parar utilizá-la na hora de salvar as senhas no banco.

Nesse desafio, você pode usar o material extra para aprender mais sobre o bcrypt e implementá-lo na nossa API.

---

## Recursos adicionais

- [JWT](https://jwt.io/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do pacote jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Entendendo JWT](https://medium.com/tableless/entendendo-tokens-jwt-json-web-token-413c6d1397f6) {: .external-link target="_blank" rel="noreferrer noopener" }

- [bcrypt](https://www.npmjs.com/package/bcrypt) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Encriptado senhas com bcrypt](https://imasters.com.br/devsecops/encriptando-senhas-com-o-bcrypt) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
