## O que vamos aprender?

_Callbacks_ são utilizadas em toda parte no _JavaScript_. A depender da complexidade do que você quer fazer, no entanto, as _callbacks_ podem, muito rápido, ficar confusas e pouco legíveis. Para tornar o código mais compreensível, surgem as _Promises_, que você estudará na aula de hoje. E, com as promises, você fará uma pequena página web que colhe dados de um serviço terceiro utilizando a _API_ dele.

---

### Você será capaz de:

* Utilizar _Promises_ para fazer chamadas assíncronas;

* Fazer integrações com _APIs_ de terceiros.

---

## Por que isso é importante?

As _Promises_, embora não sejam muito intuitivas a princípio, foram criadas para facilitar a leitura de códigos assíncronos e tornar sua lógica mais previsível e legível. Elas são uma das formas mais populares de se escrever esse tipo de código em _JavaScript_ hoje em dia. São também a principal forma de você se comunicar com _APIs_.

A comunicação com serviços de terceiros é parte do dia a dia de qualquer pessoa que programa. Seja para coletar _tweets_, seja para abrir um mapa do _Google Maps_, ou até mesmo se comunicar com um banco de dados ou serviço interno da organização, _APIs_ são sempre a forma de se fazer isso. Entender o que são e como usá-las, ou seja, como fazer sua aplicação se comunicar com elas, é absolutamente fundamental. Hoje você entrará em contato com esse conceito e o praticará por todo o restante do curso.

Tenham em mente que **Promises não são um conceito trivial**! Vocês terão muito tempo ao longo do curso para entender esse conceito, então se esforcem para fazer o melhor agora, leiam tudo, façam os exercícios e saibam que haverá tempo para absorver essa lógica com calma.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Application Programming Interface (API)
Em resumo, uma ***API*** permite que aplicações se comuniquem umas com as outras, servindo de "ponte" para elas. Uma API não é um banco de dados ou um servidor, mas a responsável pelo controle dos pontos de acesso a eles, através de um conjunto de rotinas e padrões de programação.

No momento, vamos focar em APIs baseadas na web, como esta vista no modelo abaixo.  Essas APIs retornam dados em ***response*** a um ***request*** do cliente, nos permitindo acesso a dados de fontes externas. 

<%= figure(%{src: "/fundamentals/js-asynchronous/API.png", caption: "Imagem que demonstra o funcionamento de uma API no contexto da web.", width: "100%", heigh: "auto"}) %>

APIs também nos permitem compartilhar dados com outros sites ou aplicações. Você já deve ter observado a opção de "Compartilhar no Facebook" ou "Compartilhar no Twitter". No momento em que vocẽ clica nessa opção, a aplicação que você está visitando se comunica com sua conta do Twitter ou Facebook e altera os dados do seu status, por exemplo, através de uma API.

#### Por que precisamos de APIs?
Imagine a seguinte situação: você está trabalhando em um blog e gostaria de exibir para os visitantes os tweets que fazem referência a ele.

Uma estratégia seria contatar o Twitter e solicitar os tweets por e-mail. Entretanto, esse processo seria extremamente manual e o número de solicitações muito alto. Não teríamos também nossos dados atualizados ou em tempo real.

Por esse motivo, o Twitter cria uma forma de fazermos consultas a esses dados, através de uma API. Ela vai controlar quais dados podemos requisitar, preparar nosso pedido no servidor e nos enviar uma resposta.

#### Quem precisa criar e manter APIs?
APIs públicas e baseadas na web são desenvolvidas e aprimoradas constantemente por grandes empresas de tecnologia (principalmente de mídias sociais), organizações governamentais, startups de software ou qualquer outra empresa ou pessoa que colete dados e precise disponibilizá-los de algum modo.

#### Como uma API se diferencia de um back-end padrão de um site?

>Toda API é um back-end, mas nem todo back-end é uma API. 

Um back-end padrão de um site retorna templates para o front-end de uma única aplicação, através de rotas definidas. Por exemplo, quando você acessa uma página da nossa plataforma, está fazendo um ***request*** ao servidor, que te retorna um template como ***response***.

As APIs também possuem rotas de acesso que permitem a comunicação com o servidor, mas não precisam retornar templates. Geralmente, retornam dados no formato ***JSON***.

#### O que é JSON e por que o usamos?
JSON significa **J**ava**S**cript **O**bject **N**otation e é basicamente uma forma de representarmos dados como objetos Javascript:

```language-javascript
{
  "trybers": [
    {
      "name": "Lauro Cesar",
      "github": "lauroandrade",
      "status": "#vqv"
    }
  ]
}
```

Perceba o quão legível é o formato JSON, já que nossos dados ficam guardados como pares de ***key/value***. A ***key*** fica no lado esquerdo e o ***value*** no lado direito. No array trybers, podem ser adicionados vários outros objetos.

JSON está sempre presente em aplicações web modernas, pois é simples, interpretável e ainda funciona muito bem em aplicações JavaScript. Além disso, é compatível com diversas outras linguagens, que conseguem interpretá-lo e gerar códigos no formato, como Python, Java, PHP, Ruby, entre outras. 

Desse modo, as APIs retornam os dados no formato JSON, a fim de manter uma alta escalabilidade e independência.

#### Como construir uma API?
Para construir uma API, você vai precisar de:

- Um back-end com algumas rotas;
- Um banco de dados que guarda os dados da sua aplicação ou alguma outra fonte de dados de terceiros;
- Um servidor que irá rodar sua API. Nessa etapa, o ***Heroku*** é uma ótima opção para fazer o deploy em nuvem da sua API de forma rápida e simples.

Mas não se preocupe com isso no momento, pois estudaremos a infraestrutura de APIs no nosso módulo de back-end.

#### Como utilizar APIs na minha aplicação? 
APIs podem incrementar as funcionalidades da sua aplicação e colocá-la em um outro patamar. Você pode adicionar mapas, receber dados sobre o tempo e outras informações úteis.

- Encontre uma API pública, que seja bem documentada e mantida;
- Leia a documentação para ter certeza de que aquela API resolve o problema que você deseja solucionar;
- Entenda o formato dos dados disponíveis;
- Faça *requests* e receba *responses* da API com os dados que você deseja receber.

#### Fazendo uma requisição a uma API
Você pode fazer requisições a uma API de várias formas. Uma delas é no terminal.

No exemplo a seguir, vamos fazer um ***request*** do tipo `GET` para uma ***API***, que retorna um ***JSON*** como ***response***.

```language-bash
wget 'https://pokeapi.co/api/v2/pokemon/ditto' -O - -q
```

Você também pode abrir o [link](https://pokeapi.co/api/v2/pokemon/ditto) {: .external-link target="_blank" rel="noreferrer noopener" } dentro do seu browser e observar o retorno dos dados no formato ***JSON***.

### Relembrando o fluxo assíncrono

Vamos relembrar rapidamente como funciona a ordem de execução de funções no _javascript_: as funções são lidas de cima para baixo e suas execuções são colocadas em uma fila. Assim, a primeira função lida é a primeira a ser executada. Quando sua execução termina, ela "entrega seu retorno", permitindo que o mesmo processo ocorra com a próxima função da fila.

![Fila](https://media.giphy.com/media/xT5LMuHy92KbOfnd8A/giphy.gif)

A função assíncrona é diferente! Quando o _javascript_ lê uma função desse tipo, ela é enviada para uma área especial, e a fila síncrona continua correndo. Quando a função assíncrona termina sua execução, ela volta para a fila novamente para "entregar a resposta" de sua execução. Vale lembrar que a área especial das assíncronas não é muito ordenada, ou seja, a primeira função assíncrona que entra não é, necessariamente, a primeira a sair, já que depende do tempo de execução de cada uma. Grave essas informações, elas serão importantes para explicar alguns acontecimentos mais a frente!

<%= figure(%{src: "/fundamentals/js-asynchronous/requisicao_sincrona_assincrona.jpg", caption: "Comparação entre o fluxo síncrono e assíncrono", width: "100%", heigh: "auto"}) %>

Com esse sistema de "filas", fica difícil colocar uma ordem nas funções assíncronas. Como fazer uma função executar somente depois de outra, se não existe uma ordem para sua execução? Para isso, as pessoas desenvolvedoras começaram a usar `callbacks`, o que era excelente a princípio. Porém, em alguns casos, a sequência de callbacks crescia de forma descontrolada, criando o famoso ***callback hell***, que vimos anteriormente. Para contornar o problema, as callbacks deram lugar às ***Promises***!

### Promises

As promises se comportam de forma muito parecida com as funções que já conhecemos, mas existem 3 pontos de destaque das Promises em relação à outras funções:

1. As Promises são ***assíncronas***, ou seja, elas tem um espaço especial para sua execução sem que travem o fluxo de outras funções. 

2. As Promises têm "superpoderes", isto é, funções extras que facilitam o controle do fluxo assíncrono. 

3. As Promises são construídas de um forma distinta: para criar uma nova Promise, usamos um ***Construtor***.

Agora que você já tem uma noção básica do que esperar, vamos passo-a-passo construindo uma Promise para que você entenda cada tijolinho que forma nossa superfunção. Vamos lá?!

![YES](https://media.giphy.com/media/13cptIwW9bgzk6UVyr/giphy.gif)

#### Construtor

Em seu editor, crie um novo arquivo e escreva o seguinte comando:

```language-javascript
const promise = new Promise((resolve, reject) => {

});
```

Para criar a Promise, utilizamos o construtor `Promise` junto com o operador `new`. Um construtor nada mais é do que uma função especial que cria um objeto a partir de uma classe. Se você nunca ouviu falar de classes ou construtores, não se preocupe! Seu entendimento não é necessário para entender Promises. Apenas observe a sintaxe.

O construtor recebe uma função com 2 parâmetros: `resolve` e `reject`. Mantenha a calma que já vamos ver a importância desses dois. Um ponto a se notar aqui é que usamos uma `arrow function` para passar a função como parâmetro pro construtor, mas você pode utilizar qualquer construção, desde que seja uma função com 2 parâmetros.

#### Estados da promise

A promise tem 3 estados. ***Pending***, ***Resolved*** e ***Rejected***.
Quando a Promise é executada, ela entra automáticamente no estado ***Pending***. Aqui é quando ela sai da fila e vai para sua "área especial". Ao retornar, ela pode apresentar um dos 2 estados: ***Resolved***, se ocorreu tudo certo com sua execução ou ***Rejected***, se ocorreu algum erro. É aqui que nossos parâmetros `resolve` e `reject` entram.

Da mesma forma que uma função tem o `return` para retornar uma resposta de sua execução, a Promise tem o `resolve` e o `reject`, que fazem exatamente isso: retornam uma resposta de sua execução. O `resolve` retorna uma resposta positiva, ou seja, você irá utilizá-lo quando quiser transmitir que tudo ocorreu bem. Já o `reject` retorna uma resposta negativa, ou seja, você irá utilizá-lo quando ocorrer algo errado. 

Existe apenas uma pequena diferença entre o `resolve/reject` e o `return`: enquanto o `return` interrompe a excução da função quando é chamado, o `resolve/reject` não o fazem, por isso é importante utilizar um `return` antes de um deles quando não se quer que a execução continue (esse `pattern` se chama 'early-return', mas não se preocupe com nomes agora). Vamos colocar em prática o que vimos aqui!

Para simular uma situação de sucesso e erro, vamos utilizar o `Math.random()` para sortear um valor de 0 a 10. Se o valor for entre 0 e 5 (com 5 incluso), será um fracasso, caso o valor seja entre 6 e 10, será um sucesso. Nosso programa ficaria assim:

```language-javascript
const promise = new Promise((resolve, reject) => {
  const number = Math.floor(Math.random() * 11);

  if (number <= 5) {
    return reject(console.log(`Que fracasso =( Nosso número foi ${number}`));
  }
  resolve(console.log(`Que sucesso =) nosso número foi ${number}`));
});
```

Execute algumas vezes o programa para ver o que acontece.

Uma coisa que você irá reparar é que quando o programa é bem sucedido, seu output aparece normalmente. Já quando ele é mal sucedido, ele lança um `error`! Essa é a principal diferença entre o `resolve` e o `reject`, exatamente o que queríamos demonstrar.
Na próxima sessão vamos ver como tratar este erro.

Repare também como usamos o `return` antes do `reject` para interromper a execução da função. Dessa forma o uso do `else` se torna desnecessário.

Ok, entendemos como funciona as ***Promises***, mas como elas são melhores que as callbacks para gerir o fluxo de execução? Vamos ver agora como gerir o fluxo assíncrono com mais 2 "superpoderes" das promises: `.then()` e `.catch()`!

#### Gestores de fluxo

Existem 2 principais ferramentas que podemos usar para gerir o fluxo assíncrono com promises: o `.then()` e o `.catch()`. Vamos começar falando sobre o `.then()`. Para isso , vamos refatorar nossa promise:

```language-javascript
const promise = new Promise((resolve, reject) => {
  const number = Math.floor(Math.random() * 11);

  if (number <= 5) {
    return reject(console.log(`Que fracasso =( Nosso número foi ${number}`));
  }
  resolve(number);
})
.then(number => `Que sucesso =) nosso número foi ${number}`)
.then(msg => console.log(msg));
```

Aqui demonstramos 2 coisas importantes sobre a sintaxe do `.then()`: 

1. Passamos como argumento uma função. Essa função também recebe 1 argumento que é o retorno do `resolve` da nossa promise. 

2. O `.then()` é usado "em cadeia", um conceito chamado de ***chaining***. Assim, podemos colocar vários `.then()` em cadeia, e o argumento da função interna de um será o retorno do anterior. A parte mais importante é que o `.then()` espera a promise (ou o `.then()` anterior) ser concluída para começar a sua execução. Assim, nosso fluxo está controlado!

Vamos ver o que acontece no código acima. A promise é executada e, após sua execução, caso o número seja algo entre 5 e 10, o `resolve` retorna o número que é passado para o primeiro `.then()` como `number`. Por sua vez, ele retorna a frase `Que sucesso =) nosso número foi ${number}` que é passado como argumento para o segundo `.then()`, que o usa para "logar" no console.

Ok, mas o erro continua acontecendo. O que podemos fazer em relação a isso? Agora entra o `.catch()`! Vamos adicioná-lo ao código:

```language-javascript
const promise = new Promise((resolve, reject) => {
  const number = Math.floor(Math.random()* 11);

  if (number <= 5) {
    return reject(number);
  }
  resolve(number);
})
.then(number => `Que sucesso =) nosso número foi ${number}`)
.then(msg => console.log(msg))
.catch(number => console.log(`Que fracasso =( Nosso número foi ${number}`));
```

Se executarmos o código acima, vamos ver que o erro anterior desapareceu, pois agora ele foi tratado! Assim como o `.then()` recebe o retorno de `resolve`, o `.catch()` recebe o retorno do `reject`, que é passado para ele como argumento de sua função interna. Assim, quando a promise retorna um `reject`, pula todos os `.then()` e executa o primeiro `.catch()` que encontrar. E tem mais! O `.catch()` também "pega" qualquer erro que acontecer dentro de qualquer `.then()` anterior a ele. Por esse motivo é ***geralmente*** usado no final.

E assim, nossa primeia promise está pronta!

![CONGRATULATIONS](https://media.giphy.com/media/26FL2NwYBOq3Z6C6Q/giphy.gif)

Mas como isso entra no nosso dia a dia ? Vamos utilizar promises para fazer requisições a uma API com uma das funções mais usadas pelas pessoas desenvolvedoras, o ***Fetch***!

#### Fetch API

No dia anterior você viu superficialmente o que é e pra que serve a função `fetch`. Hoje você aprenderá a usá-la.
A função `fetch`, como já visto, é responsável por enviar requisições a _APIs_. Porém, essa não é sua única responsabilidade. Ela também possui ferramentas para tratar os dados recebidos e devolvê-los, além de lidar com os erros.

O retorno da chamada varia conforme a _API_ utilizada, não só em conteúdo, mas também formato. Como nosso maior foco é JavaScript, lidaremos principalmente com respostas em formato JSON ou respostas que possam ser reformatadas para tal.

#### Erros comuns

Vamos criar uma promise que faz um fetch apenas para um endpoint específico. Para isso, vamos usar como "endpoint" uma [url](https://api.chucknorris.io/jokes/random?category=dev) {: .external-link target="_blank" rel="noreferrer noopener" } que nos retorna elogios sobre Chuck Norris (elogios, porque ninguém faz piadas com Chuck Norris).

Antes de irmos para o código, como vamos rodar nosso código direto no Node e não no browser, precisamos instalar o `node-fetch`. Execute o comando abaixo caso você ainda não tenha o `package.json`:

```language-bash
npm init -y
```
depois, instale o `node-fetch`:

```language-bash
npm i node-fetch
```

Agora veja o código abaixo:

```language-javascript
const fetch = require('node-fetch');

function verifiedFetch(url) {
  return new Promise((resolve, reject) => {
    if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
      fetch(url)
        .then((r) => r.json())
        .then((r) => resolve(r.value));
    } else {
      reject(new Error('endpoint não existe'));
    }
  });
}
```

Vamos dar uma olhada rápida no código. Primeiro criamos a função `verifiedFetch` e passamos o url do nosso endpoint. Depois retornamos uma _promise_, transformando nossa função em uma função assíncrona. Agora, dentro da _promise_ fazemos uma verificação. Se o endpoint for o certo, usamos o `fetch` para fazer uma chamada ao endpoint, transformamos a resposta em um _json_ utilizando o método `.json()`, e para finalizar usamos o `resolve` para retornar a nossa resposta. Caso o url não seja o certo, levantamos um error. Perceba aqui que usamos o construtor `new Error` para levantar um error. Usar esse construtor dentro do `reject` é uma boa prática importante e vamos usá-lo a partir de agora.

Agora, leia o código abaixo e, sem executá-lo, responda a seguinte pergunta: O que será exibido no console ao se executar `sendJokeToFriend`?

```language-javascript
const fetch = require('node-fetch');

function verifiedFetch(url) {
  return new Promise((resolve, reject) => {
    if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
      fetch(url)
        .then((r) => r.json())
        .then((r) => resolve(r.value));
    } else {
      reject(new Error('endpoint não existe'));
    }
  });
}

function sendJokeToFriend(name) {
  const message = verifiedFetch('https://api.chucknorris.io/jokes/random?category=dev')
    .then((joke) => `Oi ${name}, ouve essa: ${joke}`)
    .catch((err) => err);
  console.log(message);
}

sendJokeToFriend("Anna");
```

Agora execute a função `sendJokeToFriend` e veja se você acertou. Como vemos, recebemos o seguinte log: `Promise { <pending> }`.
Vamos ver o que acontece aqui. Como vimos, `verifiedFetch` é uma promise, logo, é assíncrono. Quando o _javascript_ executa a função, ele manda ela para "área especial" e passa para próxima função que é o console. Como a promise ainda não voltou com o conteúdo de `message`, vemos que a promise ainda está no estado ***pending***. Para visualizar ainda melhor, retire o `fetch` e execute um resolve que retorna qualquer valor, assim a promise terminará sua execução imediatamente. Antes de executar, pense:
Agora que a promise resolve imediatamente, quando o `console.log` for executado a Promise estará em pending ou já terá um resultado ? Execute e veja a resposta.

Como você viu, ela esta em pending, mesmo sendo resolvida imediatamente. Isso aconteceu pois, mesmo resolvendo na hora, a promise vai para sua área e sai da fila. Quando ela retorna, mesmo que de imediato, ela volta pro final da fila e o `console.log` está na frente, sendo executado primeiro. Para resolver esse problema existem 2 maneiras. A primeira é usar o fluxo da promise e colocar o `console.log` dentro do `.then()`. Essa solução e ótima, mas pode ficar dificil de se manter e ler a medida que o número de passos aumenta e a medida que cada passo fica mais complexo também, assim, surgiu a terceira evolução das promises, o `async` e o `await`!

#### async e await

O `async` é uma mão na roda. Essa funcionalidade transforma qualquer função em uma promise. Para começar a usá-la, basta colocar o `async` antes da definição da função. Agora é só transformar o que é `resolve` em `return` e o que é `reject` em `throw` e BOOM! Sua promise com `async` está pronta. Vamos refatorar a função `verifiedFetch` para usar `async`:

```language-javascript
const fetch = require('node-fetch');

async function verifiedFetch(url) {
  if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
    return fetch(url)
      .then((r) => r.json())
      .then((r) => r.value);
  }
  throw new Error('endpoint não existe');
}

function sendJokeToFriend(name) {
  const message = verifiedFetch('https://api.chucknorris.io/jokes/random?category=dev')
    .then((joke) => `Oi ${name}, ouve essa: ${joke}`)
    .catch((err) => err);
  console.log(message);
}

sendJokeToFriend("Anna");
```

Pronto! Perceba que continua funcionado exatamente da mesma forma que anteriormente. Tá achando que acabou? Ainda tem mais!

![Whoo](https://media.giphy.com/media/vQqeT3AYg8S5O/giphy.gif)

A funcionalidade `async` sozinha é fantástica mas não resolve nosso problema com a função `sendJokeToFriend`. Assim, junto com ela vem um bônus, o `await`. O `await` só pode ser usado dentro de uma função com `async` e ela faz exatamente o que diz, faz com o que a função espere uma resposta para continuar sua execução. Vamos refatorar `sendJokeToFriend`:

```language-javascript
const fetch = require('node-fetch');

async function verifiedFetch(url) {
  if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
    return fetch(url)
      .then((r) => r.json())
      .then((r) => (r.value));
  }
  throw new Error('endpoint não existe');
}

async function sendJokeToFriend(name) {
  const message = await verifiedFetch('https://api.chucknorris.io/jokes/random?category=dev')
    .then((joke) => `Oi ${name}, ouve essa: ${joke}`)
    .catch((err) => err);
  console.log(message);
}

sendJokeToFriend("Anna");
```

Pronto! Usando o `await` , o `sendJokeToFriend` espera a `verifiedFetch` terminar toda sua execução (até o ultimo `.then()` ou .`catch()`) para só depois executar o `console.log()`. Assim novamente, a função fica muito mais concisa e fácil de ler.

![it's done](https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif)

Finalmente, chegamos ao fim! Foi muito conteúdo que vimos agora, mas saber promise, com certeza, é algo que vai te levar a outro nível como dev. Agora, não se acomode ainda, levanta, dá uma alongada, pega um café e vamos fazer alguns exercícios para fixar!

### Para fixar

Responda às perguntas a seguir, antes de nossa aula ao vivo, para ter certeza de que você entendeu os textos. Discuta a resposta com o restante da turma (que tal uma pessoa abrir uma conversa no Slack para conversarem a respeito?!). Se bater alguma dúvida, volte aos textos!

1. O que é um código que é executado de modo assíncrono? Qual é a diferença disso para um código que é executado de modo síncrono?
2. Quando você tem que enfileirar várias _callbacks_, que problema surge?
3. Por que as _Promises_ são uma forma de se resolver esse problema?
4. Quando você vai se comunicar com uma _API_, tal comunicação deve ser síncrona ou assíncrona? Lembre-se de que o serviço ao qual você está se conectando pode demorar muito ou pouco para dar retorno, pode estar fora do ar etc.
5. Dada a resposta anterior, o que é `fetch` e para que ele serve?

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Leu os textos?! Respondeu e discutiu as perguntas? Vamos para a aula ao vivo, então! Ela será dividida em dois momentos: primeiro, vamos discutir os exercícios de fixação e tirar dúvidas. **Chegue na aula com os exercícios respondidos, hein?** Depois, teremos uma aula expositiva onde faremos um exemplo de uso de _Promises_ em comunicação com uma _API_, tirando dúvidas ao final.

Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática

1. Como o primeiro exercício, vamos usar a função `fetch`, que vimos na aula ao vivo, para criar um site simples com um _gerador de piadas ruins!_. Como? Vamos fazer juntos!

  - Primeiro, veja o [manual da _API_ do site icanhazdadjoke.com](https://icanhazdadjoke.com/api) {: .external-link target="_blank" rel="noreferrer noopener" }. Ele esclarece como fazer as requisições ao serviço de piadas. Por hora, pode só passar o olho; agora vamos entender como funciona essa _API_:

      - Para começar, vamos fazer uma requisição via browser. Visite o site [icanhazdadjoke.com](https://icanhazdadjoke.com/api) {: .external-link target="_blank" rel="noreferrer noopener" }, e perceba que ele devolve uma página _HTML_ com uma piada aleatória.

      - Em seguida, no terminal, vamos fazer a requisição: `curl -H "Accept: text/html" "https://icanhazdadjoke.com/"`. Perceba que o retorno é um _HTML_ idêntico ao de uma requisição via browser com uma piada aleatória.

      - Para a próxima requisição, vamos usar o comando: `curl -H "Accept: text/plain" "https://icanhazdadjoke.com/"`. Veja que agora recebemos apenas a piada aleatória em formato texto.

      - Por fim, faça a requisição: `curl -H "Accept: application/json" "https://icanhazdadjoke.com/"`. Agora a _API_ retorna um objeto no formato JSON.

        Perceba que, dependendo do que passamos na chave `Accept:` no header, definido por `-H` no comando, o serviço nos retorna uma resposta diferente.

  - Utilize o _HTML_ e o `js` a seguir como base:

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Best jokes ever</title>
  <script src="apiScript.js" ></script>
  </head>
  <body>
    <h1>Get ready for a great joke!</h1>
    <h2 id="jokeContainer"></h2>
  </body>
</html>
```

```language-javascript
const API_URL = 'https://icanhazdadjoke.com/';

const fetchJoke = () => {
  // Adicionar lógica aqui!
};

window.onload = () => fetchJoke();
```

  - Agora vamos tentar fazer as requisições a _API_ usando `fetch`. Essa função recebe dois parâmetros.

      1. O endereço para o qual a requisição será feita, ou seja, a url do serviço.

      2. Um objeto contendo as especificações da requisição. Para essa _API_, atribuiremos a esse objeto as chaves `method:` e `headers:`

```language-javascript
const myObject = {
  method: 'GET',
  headers: { 'Accept': 'application/json' }
};

fetch(API_URL, myObject);
```

  O segundo parâmetro( `myObject` ) define o tipo de request( `method: 'GET'` ) e o formato da resposta( `headers: { 'Accept': 'application/json' }` ), como visto nas requisições via `curl`.

  - A função `fetch` **é uma _Promise_** e, como tal, dependendo de seus desdobramentos, podemos encadear procedimentos a serem feitos, utilizando as cláusulas `.then`(em caso de sucesso) e `.catch`(em caso de falha). A requisição `fetch` retorna um objeto _Response_. Utilizando `.then`, verifique a estrutura da resposta usando um `console.log` na `response` retornada pelo `fetch`.

```language-javascript
fetch(API_URL, myObject)
  .then(response => console.log(response));
```

  - Viu a reponse? Até recebemos uma resposta do serviço, mas como é que eu consigo retirar o texto da piada daí 🤔?

  Para isso, usamos o método `.json()` na resposta da _API_. Esse método converte o conteúdo do `body` da _Response_ e retorna uma outra _Promise_, que, quando bem-sucedida, retorna um _JSON_ contendo as informações da piada.

  A partir do `fetch`, troque o `console.log()` anterior pelo método `.json()` e imprima os dados da requisição.

```language-javascript
fetch(API_URL, myObject)
  .then(response => response.json())
  .then(data => console.log(data));
```

  - Recebemos um objeto, certo? A partir daí, faça a piada aparecer no _DOM_ da sua página!

2. Agora, um passo para trás: vamos fazer, passo a passo, uma _Promise_. Primeiramente, instancie uma _Promise_. Dentro dela, você deve produzir um _array_ com dez números aleatórios de 1 a 50 e elevá-los todos ao quadrado. Se a soma de todos esses elementos for inferior a 8000, a promise deve ser resolvida. Caso contrário, ela deve ser rejeitada. Acresça um `then` e um `catch` à _Promise_ com qualquer coisa dentro só para que o código funcione.

  - Tente usar Higher Order Functions! Lembre-se de que tanto uma quanto a outra recebem, como parâmetro, funções!

3. Quando a promise for resolvida com sucesso, retorne o resultado da divisão desse número por 2, 3, 5 e 10 em um array.

4. Quando a _Promise_ for rejeitada, imprima, via `console.log`, a frase "É mais de oito mil! Essa promise deve estar quebrada!"

5. Quando a _Promise_ for bem-sucedida, encadeie nela uma segunda _Promise_ que some os elementos do array.

### Bonus

* Utilize somente Higher Order Functions para fazer as operações com o array;

* Refatore a _Promise_ para utilizar somente `async` e `await`.

---

## Recursos adicionais

* [Async JavaScript: From Callbacks, to Promises, to Async/Await](https://ui.dev/async-javascript-from-callbacks-to-promises-to-async-await/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [A simple guide to promises](https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Asynchronous JavaScript: From Callback Hell to Async and Await](https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial) {: .external-link target="_blank" rel="noreferrer noopener" }

* [An Overview of JavaScript Promises](https://www.sitepoint.com/overview-javascript-promises/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [fetch() - Working With Data & APIs in JavaScript](https://www.youtube.com/watch?v=tc8DU14qX6I) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Nos próximos dois dias, você se dedicará ao trabalho prático da semana!

<%= next_button(@conn) %>
