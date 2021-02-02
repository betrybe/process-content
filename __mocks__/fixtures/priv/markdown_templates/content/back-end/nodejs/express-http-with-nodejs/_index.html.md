## O que vamos aprender?

Você vai relembrar alguns conceitos importantes sobre o que é o HTTP, além de entender o que é uma API e para que elas servem.

Você vai aprender como utilizar um dos mais famosos e importantes frameworks na construção de APIs com Node: o **Express**!

Você vai entender como ele funciona e como seu sistema de rotas e middlewares se encaixam para formar uma aplicação pronta para ir para a produção.

---

### Você será capaz de:

- Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o **Express**

- Escrever APIs utilizando Node e Express;

- Entender a estrutura de uma aplicação Express e como organizar seu código;

- Criar rotas e aplicar middlewares.

---

## Por que isso é importante?

O protocolo HTTP é a fundação da web moderna. Ele é a base da comunicação de boa parte do que acontece na web e, portanto, entender bem seu funcionamento é essencial para desenvolver boas aplicações web.

Agora, imagine que você tem uma aplicação com dois clientes: uma aplicação web e um app mobile. Ambas as aplicações têm exatamente as mesmas funcionalidades, mas são escritas em linguagens diferentes.

Para que as pessoas que utilizam esses apps possam, por exemplo, fazer o mesmo processo de login nas duas plataformas, o seu servidor com que elas se comunicam precisa ser o mesmo tanto na web quanto no mobile.

É aí que entram as APIs! Elas serão a interface entre seus apps e o seu servidor. 🙂

O Express, por sua vez, é responsável por abstrair várias funções que precisaríamos utilizar caso fôssemos trabalhar com requisições HTTP diretamente no Node. Ele nos ajuda a criar APIs HTTP robustas, ao mesmo tempo que não nos atrapalha nas tomadas de decisões importantes sobre como queremos tratar as coisas em nossas aplicações.

O legal é que a camada de abstração é "fina", ou seja, ela mantém-se bastante flexível para que possamos utilizá-la em praticamente qualquer situação!

**Vamos fazer ainda mais, com menos código!**

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### HTTP

Vamos relembrar o que compõe uma requisição HTTP. Para isso, vamos analisar a requisição que é feita pelo navegador quando abrimos a página `https://developer.mozilla.org`, e quais são as informações enviadas nessa requisição:

```language-javascript
GET / HTTP/1.1 // O método da requisição (GET), o caminho (/) e a versão do protocolo (1.1)
Host: developer.mozilla.org // O endereço do host (endereço que estamos acessando)
```
{: .line-numbers}

- O método HTTP, definido por um verbo em inglês. Nesse caso, utilizamos o `GET`, que normalmente é utilizado para "buscar" algo do servidor, e é também o método padrão executado por browsers quando acessamos uma URL. Veremos mais sobre verbos HTTP em breve.

- O local onde está o recurso que se está tentando acessar, ou seja, a URL ou o endereço IP do meu servidor. Nesse caso, utilizamos `https://developer.mozilla.org`, mas poderia ser `http://localhost:3000`, caso você esteja trabalhando localmente.

- A versão do protocolo (1.1 é a versão nesse exemplo).

- Os **Headers**. São informações adicionais a respeito de uma requisição, ou de uma resposta. Eles podem ser enviados pelo cliente ao servidor, ou vice-versa. Um exemplo bem comum são os tokens de autenticação, em que o cliente informa ao servidor quem está tentando acessar aquele recurso: `authorization: Bearer {token-aqui}`. Alguns exemplos extras de headers podem ser vistos [aqui.](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers) {: .external-link target="_blank" rel="noreferrer noopener" }


Esses são os dados transmitidos em uma request do tipo `GET`. No entanto, o `GET` não é o único método HTTP existente. Na verdade, existem 39 métodos diferentes! Os mais comuns são cinco: `GET`, `PUT`, `POST`, `DELETE` e `PATCH`, além do método `OPTIONS`, utilizado por clientes para entender como deve ser realizada a comunicação com servidores.

A principal diferença entre os métodos é o seu significado. Cada método costuma dizer para o servidor que uma operação diferente deve ser executada. O método `POST`, por exemplo, costuma ser utilizado para criar um determinado recurso naquele servidor.

Além da diferença de significado, requisições do tipo `POST`, `PUT` e `PATCH` carregam mais uma informação para o servidor: o corpo, ou **Body**. É no corpo da requisição que as informações de um formulário, por exemplo, são transmitidas.

Quando um servidor recebe uma requisição, ele envia de volta uma **resposta**, que se parece mais ou menos assim:

```language-javascript
HTTP/1.1 200 OK // A versão do protocolo e o código da resposta
// Daqui pra baixo: Headers
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html // Nesse caso, recebemos uma página HTML que será renderizada pelo navegador

<!DOCTYPE html... (here comes the 29769 bytes of the requested web page)
```
{: .line-numbers}

A composição da resposta é definida por:

- A versão do protocolo (1.1 no nosso exemplo).

- O código do status, que diz se a requisição foi um sucesso ou não (nesse caso, deu certo, pois recebemos um código **200**), acompanhado de uma pequena mensagem descritiva (**OK**, nesse caso).

- Os **Headers**, no mesmo esquema da requisição. No caso do exemplo acima, o **Content-Type** diz para o navegador o que ele precisa fazer. No caso do HTML, ele deve renderizar o documento na página.

- Um **Body**, que é opcional. Caso, por exemplo, você submeta um formulário registrando um pedido em uma loja virtual, no corpo da resposta pode ser retornado o número do pedido ou algo do tipo.

Após a resposta, a conexão TCP é fechada ou guardada para futuras requisições (seu navegador faz essa parte por você).

Note que tanto requisições quanto respostas podem ter headers e um body. No entanto, é importante não confundir uma coisa com a outra: o body e os headers da **requisição** representam a informação que **o cliente está enviando para o servidor**, ao passo que o body e os headers da **resposta** representam a informação que **o servidor está *devolvendo* para o cliente**.

### APIs

**API** é uma sigla para **A**pplication **P**rogramming **I**nterface. Ou seja, _Interface de programação de aplicação_.

Isso quer dizer que uma API é, basicamente, qualquer coisa que permita a comunicação, de forma programática, com uma determinada aplicação.

Um tipo muito comum de API são as APIs HTTP, que permitem que códigos se comuniquem com aplicações através de requisições HTTP. É desse tipo de API que boa parte da web é feita.

Elas são extremamente importantes nos dias de hoje, em que temos múltiplos clients (web, apps mobile, tvs, smartwatches etc.) se comunicando com o mesmo servidor! É assim que seu Netflix está sempre sincronizado entre seu celular, seu computador e sua televisão. 😃

Nos projetos de front-end, você integrou várias APIs com suas aplicações.

Agora, veja o vídeo abaixo com mais detalhes sobre o que é uma API:

<%= youtube_video "vGuqKIRWosk" %>

### Contextualizando

A partir de agora, você irá criar APIs, que vão receber requisições e devolver dados, passando por validações, regras de negócio, acesso ao banco de dados, manipulação de dados etc.

O que importa, nesse momento, é entender qual o contexto em que você estará trabalhando, que no caso se parece com a imagem abaixo:

<%= figure(%{src: "/back-end/nodejs/express-http-with-nodejs/rest_api.png", caption: "Imagem que demonstra a arquitetura da ligação back-end e front-end", width: "600em", heigh: "auto"}) %>

> **Nota**: Não se preocupe com o termo *Rest* no momento, você irá aprender sobre isso mais à frente.

Imagine que uma API se comporta como uma esteira de um centro de distribuição. Pacotes entram pela esteira. Esses pacotes, no contexto das APIs, são as requisições. Cada requisição, ou pacote, possui um destino. O destino, nesse contexto, é a resposta que será enviada ao usuário dono do pacote. O que define o destino são as informações presentes na embalagem do pacote. Nas requisições, essas informações são os métodos (_GET_, *POST*, *PUT*, *DELETE*), as rotas e os headers. Mas calma! Não tem só isso. Lembre-se de que em uma esteira pode haver pacotes com defeito ou em que estejam faltando informações! Mais à frente veremos qual a solução que o Express nos dá para resolver esses problemas. 

### E o Express?

> O Express é um framework para aplicativos web escritos em Node.js, mínimo e flexível, que fornece um conjunto robusto de recursos.

A definição acima foi feita pela própria equipe responsável pelo Express. Ela realmente o descreve muito bem e de uma maneira simples.

Porém, vamos adicionar duas informações que julgamos importantes a essa definição:

- Express foi lançado inicialmente no final de 2010, ou seja, é um framework maduro e "testado em batalha";

- Express é um `"unopinionated framework"` (framework sem opinião). Isso significa que ele não impõe um padrão de desenvolvimento na hora de escrever sua aplicação.

Outro ponto importante para citarmos é que, hoje, o Express faz parte da [Node.js Foundation](https://openjsf.org/) {: .external-link target="_blank" rel="noreferrer noopener" }. Isso demonstra o quão relevante ele é para a comunidade.

O framework foi construído pensando em um padrão de construção de APIs chamado de REST, que você vai estudar mais à frente.

### Com o que ele se parece?

O código, de maneira geral, é bem simples. Nossa constante `app` representa a aplicação do express. É nela que registramos o que deve acontecer em cada *rota* da nossa aplicação. Você verá mais sobre rotas a seguir.

```language-javascript
const express = require('express');
/* Chama a função express para instanciar a aplicação do framework
   e armazenar na variável app para ser utilizada no código */
const app = express();

/* Ouve por requisições, utilizando o método GET, no caminho '/' */
app.get('/', function (req, res) {
  /* Retorna a resposta */
  res.send('Hello World!');
});

/* Ouve a porta 3000 */
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

Para escrever o mesmo código sem utilizar o express, precisaríamos importar o [módulo `http` do node](https://nodejs.org/api/http.html) e utilizar a função [`createServer`](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener), para a qual passaríamos uma callback. Dentro da callback passada, adicionaríamos uma série de `if`s para verificar qual o tipo da requisição e o caminho, para decidir como responder. Seria bem mais trabalhoso, e complexo.

Utilizando o express, o código fica mais organizado e fácil de ser compreendido.

### Roteamento

Quando falamos de roteamento, estamos basicamente falando sobre como um endpoint responde a uma solicitação. **Uma rota (ou endpoint) é definida pelo caminho e pelo método HTTP**.

No Express, nós declaramos uma rota utilizando a assinatura `app.METODO(caminho, callback)`, onde a função de callback recebe três parâmetros: `request`, `response` e `next`.

- `request`: comumente chamado de `req`; contém as informações enviadas pelo cliente ao servidor.
- `response`: geralmente chamado de `res`; permite o envio de informações do servidor de volta ao cliente.
- `next`: função que diz para o express que aquele callback terminou de ser executado, e que ele deve prosseguir para executar o próximo callback para aquela rota. Você entederá melhor o uso do `next` logo mais.

**As rotas respondem a requisições que satisfaçam a condição método HTTP + caminho**.

```language-javascript
/* Rota com caminho '/', utilizando o método GET */
app.get('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/', utilizando o método POST */
app.post('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/' para qualquer método HTTP */
app.all('/', function (req, res) {
  res.send('hello world');
});

/* Ou podemos encadear as requisições para evitar repetir o caminho */
app
  .route('/')
  .get(function (req, res) {
    res.send('hello world get');
  })
  .post(function (req, res) {
    res.send('hello world post');
  });
```

Existe também a possibilidade de se passar N callbacks para a mesma rota:

```language-javascript
app.get(
  '/ping',
  function (req, res, next) {
    console.log('fiz alguma coisa');
    /* Chama a próxima callback */
    next();
  },
  function (req, res) {
    /* A segunda (e última) callback envia a resposta para o cliente */
    res.send('pong!');
  }
);
```

##### Caminhos

Por vezes, numa API, precisamos ajustar a resposta de acordo com informações recebidas no caminho da request. Por exemplo, na [Star Wars API](https://swapi.dev), podemos buscar uma pessoa pelo seu ID com a URL `https://swapi.dev/api/people/1/`. Nesse caso, `1` é um parâmetro, e a rota é `GET /api/people/:id`. Se fôssemos extrair o parâmetro ID na mão, teríamos uma grande dificuldade para fazê-lo e para tratar todos os casos possíveis. Ainda bem que temos o Express! 😌

O framework nos dá métodos específicos para lidar com esses casos:

```language-javascript
/* :id vira um atributo dentro do objeto params,
   que por sua vez está dentro do objeto req */
app.get('/api/people/:id', function (req, res) {
  res.send(req.params.id);
});
```

Note que definimos um parâmetro `id` na rota, utilizando a sintaxe `:id`. Esse parâmetro pode, depois, ser acessado através da propriedade `params`, presente em `req` utilizando `req.params.id`. O express suporta a definição de mais de um parâmetro no caminho da rota, e cada um deles vira uma propriedade no objeto `params`.

Inclusive podemos usar [expressões regulares](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions), o famoso RegEx:

```language-javascript
/* Qualquer rota que tem o padrão de terminar com "be".
   Exemplo: trybe, wannabe, letitbe */
app.get(/.*be$/, function (req, res) {
  res.send('/.*be$/');
});
```

##### Query String

Em outros casos, precisamos receber uma informação na URL que não faz parte do caminho. Um caso de uso muito comum é quando temos um endpoint que permite realizar uma pesquisa. O mais comum é passarmos esses parâmetros num formato conhecido como `Query String`. Esse formato consiste em passar uma string contendo o nome de cada parâmetro, seguido pelo seu valor, separando vários parâmetros através do caractere `&`. A QueryString é separada do caminho utilizando o caractere `?`.

Por exemplo: `https://minha-api.com/endpoint/1?name=exemplo&number=10`.

No exemplo acima, estamos passando um parâmetro chamado `name` que contém o valor `exemplo`, e um parâmetro chamado `number` cujo valor é `10`.

No back-end, podemos acessar esses valores através da propriedade `query` da request, de forma similar ao que fazemos com os parâmetros no caminho:

```language-js
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  const name = req.query.name;

  res.status(200)
    .json({ message: `Hello, ${name}` });
})
```

**⚠️ Atenção ⚠️**: O valor dos parâmetros passados através da query string sempre é... Bom... Uma string 😅. Isso quer dizer que, quando quiser receber um número através da query string, você precisará realizar a conversão de string para número utilizando a função `parseInt`.

### Middlewares Pattern

Vamos dar um passo atrás e voltar para a analogia da esteira. O `Middleware` é a solução pro problema da falta de informações ou erro no pacote levantado anteriormente. Claro, ele pode também servir em muitos cenários, como autenticação. Imagine que todos os pacotes que entrarem pela esteira e que tenham como destino as rotas `/products` e `/purchases` precisem de uma assinatura no pacote para poderem chegar ao destino. Faz sentido que seja criada uma única máquina que, após a analise do destino dos pacotes, atravesse a esteira e retire os pacotes que não possuem autorização para estar lá. 

Os `Middlewares`, apesar de ser mais comum encontrá-los trabalhando simultaneamente em várias rotas, também podem estar presentes em uma rota específica apenas. Por exemplo, imagine que na rota `/cars` seja necessário que dentro do pacote estejam presentes os dados `name`, `year` e `brand`. É possível e recomendável que uma máquina, ou um `Middleware`, seja criado pra validar se todos esses dados estão dentro do pacote.

Muitas vezes precisamos realizar a mesma ação para várias rotas. Por exemplo, para rotas que exigem autenticação, sempre precisaremos validar se o Header de autenticação foi mesmo enviado e, se sim, verificar se ele está correto. Outro exemplo é que podemos querer escrever no console o método e caminho de todas as requisições que nossa API receber, para manter um log detalhado. Para esses casos, o express adota o uso de **middlewares**.

O conceito Middleware, na verdade, não é algo criado pelo Express e também não é de uso exclusivo do framework. Middleware é, na verdade, um padrão de software que acabou se popularizando por causa do Express.

Esse `pattern` funciona muito bem com JavaScript, de maneira geral, por conta da capacidade que a linguagem tem de passar funções como parâmetros para outra função.

Ele consiste em, basicamente, uma ou mais funções que vão rodar antes ou depois da callback da sua rota (**essa callback pode ser chamada de controller**) e depois do servidor receber a requisição. Ou seja, **entre a requisição HTTP e a resposta final**.

Um uso bem comum de middlewares é em autenticação, em que nossos endpoints precisam de um token para performar certa ação, por exemplo, e nós queremos que essa autenticação ocorra antes de chegar até nosso controller, de forma sequencial.

A assinatura de um middleware é a mesma do callback de uma rota: `function (req, res, next) {}`. O middleware pode fazer alterações tanto no request quanto na response.

Como os middlewares ficam "no meio" de uma operação, provavelmente vamos querer que em algum momento nosso controller ou o próximo middleware seja chamado. É aí que essa função `next` entra.

```language-javascript
/* app.use é utilizado para registrar um middleware */
/* Nesse caso, toda vez que um request for recebido, vamos logar o método HTTP e o caminho */
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path}`)
  /* Termina a operação no middleware e chama o próximo middleware ou rota */
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});
```

Outro detalhe é a maneira como um middleware pode ser utilizado. No exemplo acima, você pode ver o uso do `app.use`. A função tem o objetivo de **"registrar" o middleware para todas as nossas rotas de forma sequencial**.

Isso significa que, se registrarmos mais de um middleware, eles serão executados na sequência em que foram registrados:

```language-javascript
/* Primeiro a ser chamado */
app.use(middleware1);
/* Segundo a ser chamado */
app.use(middleware2);
```

Outra aplicação comum é passar dados de um middleware para outro ou para nossa callback da rota.

```language-javascript
const express = require('express');
const app = express();

const requestTimeMiddleware = function (req, res, next) {
  /* Modificamos o objeto req, adicionando o campo requestTime */
  req.requestTime = Date.now();
  /* Chamamos a próxima função */
  next();
};

/* Registramos nosso middleware */
app.use(requestTimeMiddleware);

app.get('/', function (req, res) {
  const responseText = `Request feito às ${req.requestTime}`;
  res.send(responseText);
});

app.listen(3000);
```

#### Organização

Você deve estar pensando: **"Nossa! Mas, com tudo isso, meu arquivo principal vai ficar gigante!" 😱**

Calma! O Express tem uma solução bem interessante para organizar nossas rotas: o **Router**.

O `Router` pode ser visto como uma versão menor do `app`, onde são declaradas apenas as rotas e middlewares. Ele é depois "plugado" no "app principal".

Tomemos como exemplo uma API que retorna dados sobre os Simpsons:

```language-javascript
// simpsons.js
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/homer', function (req, res) {
  res.send('Hello Homer!');
});

module.exports = router;
```

```language-javascript
// index.js
const simpsons = require('./simpsons');

/* Todas as rotas com /simpsons/<alguma-coisa> entram aqui e vão para o roteador. */
app.use('/simpsons', simpsons);
```
tiverem
No exemplo acima, as rotas `/simpsons` e `/simpsons/homer` estão criadas e serão ouvidas pela aplicação.

Voltando à analogia da esteira, quando fazemos o código `app.use('/simpsons', simpsons)` está sendo criada uma máquina, ou, no caso, um `Middleware`. Esse `Middleware` é responsável por alternar os destinos de acordo com a rota presente na embalagem do pacote. Esse tipo de `Middleware` é chamado de Middleware de Rota. Mas é importante destacar que ele também pode ser usado pra um método específico, como, por exemplo: caso não tivéssemos feito o código acima e quiséssemos apenas o método `GET` para o endpoint `/simpsons`, bastaria fazer `app.get('/simpsons', simpsons)`.

##### Níveis de Middleware

Os exemplos dados acima são de middlewares **em nível de aplicação**, ou seja, eles serão usados por todos os requests recebidos pelo nosso app.

Podemos também definir os escopos desses middlewares. Um exemplo é um middleware que se aplica a apenas uma rota específica, que pode ser passado como um dos parâmetros na hora de definir uma rota:

```language-javascript
const logRouteIdMiddleware = (req, res, next) => {
  console.log('ID:', req.params.id);
  next();
}

app.get('/simpsons/people/:id', logRouteIdMiddleware, (req, res) => {
  res.send('Hello, Homer!');
});
```

Os middlewares podem ser utilizados em conjunto com um **Router** também. Nesse caso, eles se aplicam apenas às rotas que fazem parte desse roteador:

```language-javascript
// simpsons.js
const express = require('express');
const router = express.Router();

/* Se aplica somente às rotas que fazem parte desse Router */
router.use(function (req, res, next) {
  console.log('Hora:', Date.now());
  next();
});

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/homer', function (req, res) {
  res.send('Hello Homer!');
});

module.exports = router;
```

Para aprofundar-se mais no assunto sobre middlewares, vale assistir a este vídeo.

<%= vimeo "412790359" %>

##### Lidando com erros ☠

O Express tem um padrão para lidar com erros chamado de **error first (erro primeiro)**, em que o erro é passado como primeiro parâmetro para as funções, que devem ser registradas como **midlewares de erro**.

A diferença de um middleware de erro para um middleware comum é que a assinatura dele **recebe quatro parâmetros** ao invés de três, ficando assim: `function (err, req, res, next) {}`.

```language-javascript
app.use(middleware1);
app.get('/' /* ... */);
app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});
```

É importante notar que:

- Middlewares de erro **sempre devem vir depois de rotas e outros middlewares**;

- Middlewares de erro **sempre devem receber quatro parâmetros**.

O Express utiliza a quantidade de parâmetros que uma função recebe para determinar se ela é um middleware de erro ou um middleware comum. Ou seja, mesmo que você não vá utilizar os parâmetros `req`, `res` ou `next`, seu middleware de erro **precisa recebê-los**. Você pode adicionar um underline no começo do nome dos parâmetros que não vai usar. Isso é uma boa prática e sinaliza para quem está lendo o código que aquele parâmetro não é utilizado. Por exemplo: `function (err, _req, res, _next) {}`.

Também é possível encadear middlewares de erro, no mesmo esquema dos outros middlewares, simplesmente colocando-os na sequência em que devem ser executados.

```language-javascript
app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  // passa o erro para o próximo middleware
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(500);
  res.send({ error: err });
});
```

Repare que estamos fazendo `next(err)` na linha 4. Isso diz ao express que ele não deve continuar executando nenhum middleware ou rota que não seja de erro. Esse detalhe é importante, pois se um erro acontece dentro de uma rota ou middleware e nós não o capturamos e o passamos para a função `next`, os middlewares de erro não serão chamados para tratar aquele erro, o que quer dizer que nossa API ficará sem responder àquela requisição, ou até mesmo que o erro encerrará o processo do Node. Por isso, lembre-se: **sempre realize tratamento de erros nas suas rotas e middlewares, passando o erro para a função `next`, caso necessário.**

O pacote [`express-rescue`](https://www.npmjs.com/package/express-rescue) está disponível no npm e nos ajuda com a tarefa de garantir que os erros sempre sejam tratados. Seu uso é muito simples. Por exemplo, no código abaixo:

```language-js
const fs = require('fs').promises

app.get('/:fileName', async (req, res) => {
  const file = await fs.readFile('./fileName')
});
```

Para adicionarmos os `express-rescue`, basta passarmos nossa callback para ele, e passar seu retorno para o express, da seguinte forma:

```language-js
const rescue = require('express-rescue')
// const fs = require('fs').promises

app.get('/:fileName', rescue(async (req, res) => {
//   const file = await fs.readFile('./fileName')
}));
```

O que ele faz é simplesmente executar a função de callback dentro de um bloco de `try ... catch`, fazendo com que qualquer erro não tratado dentro do callback seja passado para a função `next`.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver alguns exemplos de código e estruturação de uma _API em NodeJS utilizando Express_.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>


### Agora a prática

1. Inicie os exercícios criando uma aplicação NodeJS, com os comandos já aprendidos.

2. Crie uma aplicação express que receba uma requisição do tipo GET no caminho `/ping` e retorne o JSON `{ "message": "Pong!" }`.

3. Crie um endpoint que receba requisições do tipo POST no caminho `/hello`, contendo o JSON `{ "name": "<nome do usuário>" }` e retorne um JSON `{ "message": "Hello, <nome do usuário>!" }`;

4.  Crie um endpoint que receba requisições do tipo POST no caminho `/hello`, contendo o JSON `{ "name": "<nome do usuário>", "age": "<idade do usuário>" }`. Caso o usuário tenha idade superior a 17 anos, retorne um JSON `{ "message": "Hello, <nome do usuário>!" }` com o `status code 200`. Caso contrário, retorne o JSON `{ "message": "Unauthorized"}` com o `status code 401`;

5. Crie um endpoint que receba requisições do tipo PUT no caminho `/users/:name/:age` e retorne o JSON `{ "message": "Seu nome é <name> e você tem <age> anos de idade" }`.

6. Agora você vai criar uma API de listagem dos personagens da série Simpsons. Como fonte de dados, você vai utilizar um arquivo JSON.

Crie um arquivo chamado `simpsons.json` e popule com os seguintes dados:

```language-json
[
  {
  "id": "1",
  "name": "Homer Simpson"
  },
  {
  "id": "2",
  "name": "Marge Simpson"
  },
  {
  "id": "3",
  "name": "Bart Simpson"
  },
  {
  "id": "4",
  "name": "Lisa Simpson"
  },
  {
  "id": "5",
  "name": "Maggie Simpson"
  },
  {
  "id": "6",
  "name": "Ned Flanders"
  },
  {
  "id": "7",
  "name": "Montgomery Burns"
  },
  {
  "id": "8",
  "name": "Nelson Muntz"
  },
  {
  "id": "9",
  "name": "Krusty"
  },
  {
  "id": "10",
  "name": "Milhouse Van Houten"
  }
]
```

- Utilize o modulo `fs` do Node para ler/escrever arquivos.

- Caso algo dê errado em nível de código, deve ser retornado um código 500 (Internal Server Error).

- Caso dê tudo certo, a resposta deve voltar com **status 200 OK**.

- Foque os contratos das APIs (o que elas devem receber e o que devem retornar).

- Para testar sua API durante o desenvolvimento, utilize ferramentas que permitem fazer requisições HTTP, como [Postman](https://www.postman.com/) {: .external-link target="_blank" rel="noreferrer noopener" } e [Insomnia.](https://insomnia.rest/) {: .external-link target="_blank" rel="noreferrer noopener" }

7. Crie um endpoint do tipo `GET` na rota `/simpsons` que deve retornar a lista completa de personagens.

8. Crie um endpoint do tipo `GET` na rota `/simpsons/:id` que deve retornar apenas o personagem com o id informado na URL da requisição.

- Caso não exista nenhum personagem com o `id` especificado, deve ser retornado um array vazio.

9. Crie um endpoint do tipo `POST` na rota `/simpsons` que será responsável por cadastrar novos personagens.

- O corpo da requisição deve receber os campos `id` e `name`;

**Bônus**: A operação só deve ser realizada caso o campo `id` seja único. Caso contrário, deve ser retornado **status 400**.

### Bônus

1. Caso algum endpoint que não consta nessa lista receba uma requisição, a resposta deve voltar com **status 404 Not Found**, sem corpo.

2. Todos os endpoints devem receber um token de autenticação. Esse token deve vir no seguinte modelo: `authorization: {token-aqui}`. Nesse momento, como você não está salvando os tokens gerados no cadastro em nenhum lugar, só é preciso verificar que as requisições recebem um token no header que possua 16 caracteres.

- Caso o token seja inválido ou inexistente, a resposta deve voltar com **status 401 Unauthorized** e `{ message: 'Token inválido!' }` no corpo.

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

---

## Recursos adicionais

- [Documentação Express - Rotas](https://expressjs.com/pt-br/guide/routing.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação Express - Middleware](https://expressjs.com/pt-br/guide/writing-middleware.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Página do *MDN* sobre Node + Express](https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Express_Nodejs/Introdu%C3%A7%C3%A3o) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Rest with Node and Express](https://www.robinwieruch.de/node-express-server-rest-api) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Middleware [Node js Design Patterns]](https://www.youtube.com/watch?v=lI2MiMEn9HQ) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, vamos colocar tudo que aprendemos em prática! Utilizando express vamos separar a turma em grupos e criar algumas rotas para por em prova nossa novas habilidades!

<%= next_button(@conn) %>
