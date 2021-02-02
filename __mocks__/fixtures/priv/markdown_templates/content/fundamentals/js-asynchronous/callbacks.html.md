## O que vamos aprender?

Páginas da web não existem sozinhas. Elas carregam imagens, iframes, conteúdo ou recuperam todo tipo de informações de outros lugares que não seus próprios servidores. E depender de algo externo ao seu sistema para fazer algo traz uma problemática: e se o serviço do qual eu dependo sair do ar? E se os servidores dele estiverem lentos? O que acontece com minha página?

Numa lógica normal, _sequencial_ de programação, sua página esperaria o serviço dar retorno ou voltar ao ar para continuar. Ou seja, a página ficaria quebrada, ou teria todo o seu carregamento freado em função de um problema totalmente fora do seu controle. Para lidar com esse problema e outros de natureza similar, existe um conceito que é muito poderoso e presente no ***JavaScript***: a *assincronicidade*. Em vez de o programa ser carregado todo em sequência, uma linha após a outra, linhas que podem trazer esse tipo de problema podem "ficar carregando", enquanto o resto do seu programa executa normalmente. A execução dessa linha, a espera pela disponibilidade desse serviço, corre *paralelamente* ao desenvolver do restante do código. É uma execução *assíncrona*. E isso tem muito poder.

Pareceu interessante?! Pois bem. Para começar, nesta aula você vai aprender dois conceitos importantes:

* Operações assíncronas;

* `callbacks`.

---

### Você será capaz de:

* Aplicar corretamente operações assíncronas;

* Utilizar `callbacks` corretamente.

---

## Por que isso é importante?

Até então, você tem programado de uma forma basicamente similar à seguinte:

1. Execute o passo `A`;
2. Execute o passo `B`;
3. Execute o passo `C`.

E você, naturalmente, espera que o passo `A` seja executado antes do `B`, e que o `B` seja executado antes do `C`.

Entretanto, você consegue ir além no ***JavaScript***. 🚀

Suponha que você tenha uma operação `A` que gaste muito tempo, e que você tenha uma operação `B` em sequência que independe totalmente de `A`.
`B` ter que esperar por `A` é um problema, haja vista que `B` não depende de forma alguma de `A`. Como você faz para contornar esse problema?

**Resposta: assincronicidade**

Com assincronicidade, a operação `A` começa a executar e, logo em seguida, `B` também, sem ter que esperar `A` terminar.

Essa forma de trabalho é natural, e você faz isso o tempo todo sem perceber! Um exemplo clássico: são 20h de uma segunda-feira, você está em casa com fome e decide pedir uma pizza. 🍕 Você fica esperando, sem fazer nada, enquanto a pizza não chega? Você pode fazer o que quiser nesse meio tempo, como escutar música ou ver vídeos no _YouTube_, por exemplo. E assim que a pizza chegar, você dedica seu tempo para poder jantar.

Nesse exemplo da pizza, o ato de pedir a pizza corresponde a uma operação assíncrona, e os atos de escutar música e ver vídeos no _YouTube_ são exemplos de operações que independem de pedir a pizza.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Operações assíncronas

Operações em JavaScript são tradicionalmente síncronas, ou seja, para que uma cadeia de operações seja realizada, é necessário que uma operação termine para que outra comece. Em uma linha de produção de automóveis por exemplo, várias etapas de produção são codependentes. Podemos relacionar estas etapas de produção às **operações síncronas** em JavaScript. Observe o exemplo abaixo para que esta analogia fique mais clara:

```language-javascript
console.log('1 - Receber roda');
console.log('2 - Encaixar parafusos');
console.log('3 - Fixar roda no carro');
```

Note que existe uma ordem específica de etapas que não pode ser quebrada pois uma afeta diretamente a outra. Sem roda, não adianta encaixar parafusos, sem encaixar parafusos, fixar a roda não é possível.

Agora imagine que o nosso estoque de parafusos está chegando ao fim e é necessário que façamos uma reposição para que a linha de produção não pare. No entanto, nossa operação não cobre este tipo situação e nossa linha de produção para enquanto uma pessoa funcionária irá comprar os parafusos e repor o estoque.

```language-javascript
console.log('1 - Comprar parafusos');
console.log('2 - Adicionar ao estoque');
console.log('3 - Receber roda');
console.log('4 - Encaixar parafusos');
console.log('5 - Fixar roda no carro');
```

Observe que estamos trabalhando de forma ineficiente e adicionando etapas desnecessárias à nossa produção pois se tivermos parafusos suficientes em estoque, não precisamos parar a montagem para que mais parafusos sejam comprados e repostos. Assim como na nossa linha de produção, existem operações que não possuem esta codependência em JavaScript, e com objetivo de cobrir justamente este tipo de situação surgem as **operações assíncronas**.

Rode em seu editor o código abaixo e veja como nossa linha de produção já não depende mais das etapas de compra de parafusos e de reposição do estoque. 

Não se preocupe com o código em si, falaremos da função `setTimeout` logo mais! 😉

```language-javascript
setTimeout(() => {
  console.log('Comprar parafusos') // Comprar parafusos
  console.log('Adicionar ao estoque') // Adicionar ao estoque
}, 2000);

console.log('1 - Receber roda'); // 1 - Receber roda
console.log('2 - Encaixar parafusos'); // 2 - Encaixar parafusos
console.log('3 - Fixar roda no carro'); // 3 - Fixar roda no carro
```

Note que `console.log('Comprar parafusos')` e `console.log('Adicionar ao estoque')` foram declarados antes das etapas `1`, `2` e `3`, mesmo assim o retorno das chamadas só ocorre ao final. Isto acontece pois utilizamos a função `setTimeout`. É muito comum que esta função seja utilizada para simular comportamentos assíncronos. Na prática vivenciaremos situações em que nossa aplicação depende de uma informação externa, como por exemplo, solicitar uma informação a um banco de dados. É aí que o conceito de assincronicidade entra a nosso favor para que nossa aplicação não perca eficiência.

Agora, vamos ver um pouco da prática realizando este exercício de fixação. Copie o código para ser executado na sua máquina:

```language-javascript
const assert = require('assert');

const pushNumber = (list, number) => list.push(number);

let numbers = [];

pushNumber(numbers, 1);
pushNumber(numbers, 2);
pushNumber(numbers, 3);

assert.deepStrictEqual(numbers, [1, 2, 3]);
```

```language-javascript
const assert = require('assert');

const pushNumber = (list, number) => list.push(number);

let numbers = [];

setTimeout(() => pushNumber(numbers, 1), 3000);
pushNumber(numbers, 2);
pushNumber(numbers, 3);

assert.deepStrictEqual(numbers, [1, 2, 3]); // essa validação falha
```

Por que a validação referente ao primeiro código funciona, e a referente ao segundo não? O teste espera receber o array `[1, 2, 3]`, mas apenas recebe o `[2, 3]`. Isso ocorre por causa da função `setTimeout`. Ela é uma função assíncrona, que espera alguns milissegundos para executar a função passada a ela como parâmetro. No código acima, ela espera 3000 milissegundos (3 segundos) para executar o `pushNumber(numbers, 1)`.

Para passar no teste, é necessário testar o numbers após 3000 milissegundos:

```language-javascript
const assert = require('assert');

const pushNumber = (list, number) => {
  list.push(number);
  console.log(list);
};

let numbers = [];

setTimeout(() => pushNumber(numbers, 1), 3000);
pushNumber(numbers, 2);
pushNumber(numbers, 3);

setTimeout(() => assert.deepStrictEqual(numbers, [2, 3, 1]), 3000);
```

Observe que, além de adicionar o `setTimeout`, o array `[1, 2, 3]` foi modificado para `[2, 3, 1]`. Isso se dá, pois, como a função é assíncrona, o código continua rodando, mesmo que ela ainda não tenha terminado de executar. Ou seja, o array recebe primeiro o `2`, depois o `3`, e após os 3 segundos do `setTimeout`, ele recebe o `1`.

Para saber mais a respeito de `setTimeout`, acesse [este link.](https://www.w3schools.com/jsref/met_win_settimeout.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

### Callbacks

Agora que o conceito de assincronicidade está mais claro, é hora de dar luz a `callbacks`!

De forma resumida, `callback` é uma função passada como parâmetro para outra função. Sem perceber você viu um exemplo de `função callback` quando chamamos a função `setTimeout`. Esta função recebe dois parâmetros, o primeiro é a `função callback` que passamos através de uma `arrow function`, e o segundo é o tempo que o interpretador irá esperar para executar a função. 

Agora veremos um exemplo prático de como podemos utilizar de `funções callback`. Copie e analise com calma cada trecho da implementação do código, se necessário volte na explicação para que a implementação seja bem compreendida!

```language-javascript
const myExpenses = [
  {
    gym: 99,
  },
  {
    ifood: 200,
  },
  {
    phone: 60,
  },
  {
    internet: 100,
  },
];

const myIncome = 1000;
```

Neste primeiro trecho de código temos duas declarações de variáveis. A primeira delas `myExpenses`, é um array de objetos que representa os gastos de uma pessoa no mês. A segunda, `myIncome`, representa o quanto esta pessoa recebeu neste mesmo mês.

Nosso próximo passo será implementar uma função que trate estas informações para que tenhamos como resultado um balanço de entradas e saídas do mês.

```language-javascript
const monthlyBudget = (myIncome, myExpenses, callback) => {

  const totalExpenses = callback(myExpenses);
  const totalAfterExpenses = myIncome - totalExpenses;

  console.log(`Balanço do mês:
    Recebido: R$${myIncome},00
    Gasto: R$${totalExpenses},00
    Saldo: R$${totalAfterExpenses},00 `);
};
```

Neste trecho da implementação podemos notar que foi adicionada uma função `monthlyBudget` que recebe três parâmetros, `myIncome`, `myExpenses`, e `callback`. Acredito que você deve estar pensando, "O que este parâmetro `callback` está fazendo nesta função?".

Como vimos anteriormente, `callback` é basicamente uma função passada por parâmetro para outra função. Neste exemplo o parâmetro `callback` receberá uma função que retornará o quanto gastamos no mês, ou seja, nossa `função callback` irá realizar a lógica necessária para somar todos os gastos contidos no array de objetos `myExpenses`, e retornará este valor para a constante `totalExpenses`.

```language-javascript
const handleExpenses = myExpenses => {
  const eachValue = myExpenses.map((item) => Object.values(item)[0]);
  const totalExpense = eachValue.reduce((acc, curr) => acc + curr , 0);
  return totalExpense;
};

monthlyBudget(myIncome, myExpenses, handleExpenses);
```

Por fim podemos observar a implementação da nossa `função callback` representada pela função `handleExpenses`. Esta função está tratando as informações contidas no array de objetos `myExpenses` e retornando o valor total de gastos.

Em síntese o que fizemos foi:

1. Criamos variáveis que representam o quanto recebemos no mês e o quanto gastamos no mês.
2. Implementamos a função `monthlyBudget` que recebe três parâmetros, nossos gastos, nossa renda e a `função callback`.
3. Realizamos a implementação da `função callback` representada por `handleExpenses` que recebe nossos gastos mensais e retorna um valor de gastos total.
4. Adicionamos `handleExpenses` na chamada da função `monthlyBudget` e como resultado temos o balanço mensal.

```language-javascript
const myExpenses = [
  {
    gym: 99,
  },
  {
    ifood: 200,
  },
  {
    phone: 60,
  },
  {
    internet: 100,
  },
];

const myIncome = 1000;

const monthlyBudget = (myIncome, myExpenses, callback) => {
  const totalExpenses = callback(myExpenses);
  const totalAfterExpenses = myIncome - totalExpenses;

  console.log(`Balanço do mês:
    Recebido: R$${myIncome},00
    Gasto: R$${totalExpenses},00
    Saldo: R$${totalAfterExpenses},00 `);
};

const handleExpenses = myExpenses => {
  const eachValue = myExpenses.map((item => Object.values(item)));
  const totalExpense = eachValue.reduce((acc, curr) => acc += curr[0] , 0);
  return totalExpense;
};

monthlyBudget(myIncome, myExpenses, handleExpenses);

// Balanço do mês:
//     Recebido: R$1000,00
//     Gasto: R$459,00
//     Saldo: R$541,00 
```

Reparou que você já estava usando `callbacks` desde a semana de **JavaScript**, com `eventListeners`, e até a semana passada, com `filter`, `map` e `reduce`? A função que você passa como parâmetro para cada uma delas é exemplo de função `callback`. 😉

Além disso, lembra-se do exemplo da pizza mencionado no *Por que isso é importante*? O que você faz quando o pedido da pizza chega, que nesse caso é jantar, corresponde a um `callback`.

Antes de seguir para os exercícios de fixação propostos abaixo, veja o vídeo a seguir para garantir o entendimento sobre `callbacks`:

<%= vimeo "487848340" %>

Agora, faça estes exercícios de fixação:

1. No código abaixo você tem a função `getUser`, que retorna uma pessoa qualquer. Complete a função `getUser` de forma que ela receba uma outra função como parâmetro para que possa realizar as operações abaixo sobre a pessoa retornada.

```language-javascript
const assert = require('assert');

const userFullName = ({ firstName, lastName }) => `Hello! My name is ${firstName} ${lastName}`;
const userNationality = ({ firstName, nationality }) => `${firstName} is ${nationality}`;

const getUser = () => {
  const userToReturn = {
    firstName: "Ivan",
    lastName: "Ivanovich",
    nationality: "Russian"
  };
};

assert.strictEqual(getUser(), "Hello! My name is Ivan Ivanovich"); // complete a chamada da função de getUser
assert.strictEqual(getUser(), "Ivan is Russian"); // complete a chamada da função de getUser
```

2. No código abaixo você tem a função `getUser` modificada, que agora funciona de modo assíncrono e imprime dados de uma pessoa qualquer depois de um certo tempo. Complete a função `getUser` de forma que ela receba um `callback` para que possa realizar as operações abaixo sobre a pessoa.

```language-javascript
const userFullName = ({ firstName, lastName }) => `Hello! My name is ${firstName} ${lastName}`;
const userNationality = ({ firstName, nationality }) => `${firstName} is ${nationality}`;

const delay = (maxMilliseconds = 5000) => Math.floor(Math.random() * maxMilliseconds);

const getUser = () => {
  setTimeout(() => {
    const user = {
      firstName: "Ivan",
      lastName: "Ivanovich",
      nationality: "Russian",
    };
    console.log(user);
  }, delay());
};

getUser(userFullName); // deve imprimir "Hello! My name is Ivan Ivanovich" depois de um certo tempo
getUser(userNationality); // deve imprimir "Ivan is Russian" depois de um certo tempo
```
_Obs: note e averigue o comportamento assíncrono da função `getUser` ao chamar `getUser(userFullName)` seguido de `getUser(userNationality)`. Tem hora que é impresso antes no console o nome da pessoa, e tem hora que é impressa antes a nacionalidade da pessoa!_

### Lidando com erros em operações assíncronas

No último exercício, você deve ter reparado que está usando em conjunto `callbacks` e assincronicidade, que nesse caso correspondem a:

* operação assíncrona: retorno de `user` depois de um certo tempo, que varia;

* `callbacks`: as funções `userFullName` e `userNationality`, que são chamadas depois que o usuário é retornado.

Nesse caso, a operação assíncrona sempre finaliza com sucesso, e existe um `callback` que atua sobre o resultado desse sucesso. Mas isso não reflete por completo todas as operações assíncronas.

Suponha que você esteja pegando dados de usuário via requisição em uma _API_. Podemos garantir que essa requisição vai ocorrer sempre com sucesso? E se houver uma falha de conexão? E se a _API_ não estiver funcionando no momento da requisição? Esses casos são exemplos de fatores externos, sobre os quais não se tem controle algum, que precisam ser tratados.

Ou seja, da mesma forma que se tem um `callback` para quando a operação assíncrona tem sucesso, também precisaria ter um `callback` para quando a operação assíncrona termina com erro.

Vamos botar tudo isso em prática com este exercício de fixação:

A função `getCountry` abaixo tem aproximadamente 50% de chance de obter com sucesso um país, tendo um `callback` para poder ser feita qualquer operação sobre o país retornado. Adicione um outro `callback` para `getCountry`, de forma que trate a mensagem de erro retornada.

```language-javascript
const countryName = ({ name }) => console.log(`Returned country is ${name}`);
const countryCurrency = ({ name, currency }) => console.log(`${name}'s currency is the ${currency}`);

const delay = (maxMilliseconds = 5000) => Math.floor(Math.random() * maxMilliseconds);

const printErrorMessage = (error) => console.log(`Error getting country: ${error}`);

const getCountry = (onSuccess) => {
  setTimeout(() => {
    const didOperationSucceed = Math.random() >= 0.5;
    if(didOperationSucceed) {
      const country = {
        name: "Brazil",
        hdi: 0.759,
        currency: "Real",
      };
      onSuccess(country);
    }
    else {
      const errorMessage = "Country could not be found";
    }
  }, delay());
};

// Deve imprimir "Returned country is Brazil" no sucesso, ou "Error getting country: Country could not be found" em falha
getCountry(countryName, printErrorMessage);

// Deve imprimir "Brazil's currency is the Real" no sucesso, ou "Error getting country: Country could not be found" em falha
getCountry(countryCurrency, printErrorMessage);
```

### Fetch API

No contexto do Front-end, a maioria dos casos em que precisamos utilizar funções assíncronas são em requisições.
Um bom exemplo é a função `fetch()` da _Fetch API_!

A _Fetch API_ contém uma série de recursos desenvolvidos para lidar com **requisições http** no JavaScript. A função primária é a `fetch()`, utilizada para fazer chamadas às _URL's_ das _APIs_. Trata-se de uma função assíncrona, baseada em uma promise. 

Uma API, por sua vez, é uma forma de trafegar dados entre aplicações. Por exemplo: existe uma API que todos os dias possui uma piada diferente. A _URL_ da API é `https://api.jokes.one`. Portanto, se quisermos ter acesso a essa piada, precisamos fazer uma requisição para a _URL_ da API, solicitando os dados. A API, por sua vez, vai analisar a requisição e responder os dados pedidos. Note que há um tempo entre a requisição ser enviada e a resposta ser devolvida. Por isso, precisamos que a requisição seja assíncrona.

A função `fetch` recebe dois parâmetros:

  1. _URL_ do serviço alvo da requisição;
  2. Um objeto contendo algumas informações sobre requisição de API. Esse objeto contém chaves com informações específicas para aquela chamada. Essas especificações estão sempre presentes na documentação de uso daquela API específica. **Não se preocupe muito em como obter essas informações por agora**; nesse início, daremos essas informações para que vocês se acostumem a usar o `.fetch()`.

O retorno da chamada varia conforme a _API_ utilizada, não só em conteúdo, mas também formato. Como nosso maior foco é JavaScript, lidaremos principalmente com respostas em formato JSON, ou respostas que possam ser reformatadas para tal.

Até o momento, não é necessário que você saiba utilizar a função `fetch`. No próximo conteúdo você irá aprofundar no assunto!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver como aplicar operações assíncronas e `callbacks`.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática

1. Dado o código abaixo, qual a ordem de finalização de execução das linhas comentadas?

```language-javascript
const planetDistanceFromSun = ({ name, distanceFromSun: { value, measurementUnit } }) =>
  `${name} is ${value} ${measurementUnit} apart from the Sun`;

const mars = {
  name: "Mars",
  distanceFromSun: {
    value: 227900000,
    measurementUnit: "kilometers",
  },
};

const venus = {
  name: "Venus",
  distanceFromSun: {
    value: 108200000,
    measurementUnit: "kilometers",
  },
};

const jupiter = {
  name: "Jupiter",
  distanceFromSun: {
    value: 778500000,
    measurementUnit: "kilometers",
  },
};

console.log(planetDistanceFromSun(mars)); // A
console.log(planetDistanceFromSun(venus)); // B
console.log(planetDistanceFromSun(jupiter)); // C
```

2. Agora, dado o código abaixo, qual a ordem de finalização de execução das linhas comentadas?

```language-javascript
const planetDistanceFromSun = ({ name, distanceFromSun: { value, measurementUnit } }) =>
  `${name} is ${value} ${measurementUnit} apart from the Sun`;

const mars = {
  name: "Mars",
  distanceFromSun: {
    value: 227900000,
    measurementUnit: "kilometers",
  },
};

const venus = {
  name: "Venus",
  distanceFromSun: {
    value: 108200000,
    measurementUnit: "kilometers",
  },
};

const jupiter = {
  name: "Jupiter",
  distanceFromSun: {
    value: 778500000,
    measurementUnit: "kilometers",
  },
};

console.log(planetDistanceFromSun(mars)); // A
setTimeout(() => console.log(planetDistanceFromSun(venus)), 3000); // B
setTimeout(() => console.log(planetDistanceFromSun(jupiter)), 2000); // C
```

3. A função `getPlanet` abaixo imprime o planeta Marte de forma síncrona. Modifique `getPlanet`, de forma que Marte seja impresso assincronamente, depois de 4 segundos.

```language-javascript
const getPlanet = () => {
  const mars = {
    name: "Mars",
    distanceFromSun: {
      value: 227900000,
      measurementUnit: "kilometers",
    },
  };
  console.log("Returned planet: ", mars);
};

getPlanet(); // imprime Marte depois de 4 segundos
```

4. Suponha que você precise simular uma mensagem enviada do robô [Curiosity](https://mars.nasa.gov/) {: .external-link target="_blank" rel="noreferrer noopener" } de Marte para a Terra. O `Curiosity` envia para a Terra a temperatura atual em Marte, gastando um tempo variável de até 5 segundos para que termine o envio. Crie a função `sendMarsTemperature`, que imprime a temperatura em Marte.

```language-javascript
const messageDelay = () => Math.floor(Math.random() * 5000);

const getMarsTemperature = () => {
  const maxTemperature = 58;
  return Math.floor(Math.random() * maxTemperature);
};

// crie a função sendMarsTemperature abaixo


sendMarsTemperature(); // imprime "Mars temperature is: 20 degree Celsius", por exemplo
```

  5. Agora que você fez a função que envia a temperatura de Marte, suponha que você consiga enviar para o robô `Curiosity` o que você deseja fazer, uma vez obtida com sucesso a temperatura em Marte. Logo, adicione na função `sendMarsTemperature` um `callback` que contenha as ações a serem tomadas em cima da temperatura.

```language-javascript
const messageDelay = () => Math.floor(Math.random() * 5000);

const getMarsTemperature = () => {
  const maxTemperature = 58;
  return Math.floor(Math.random() * maxTemperature);
};

const toFahrenheit = (degreeCelsius) => (degreeCelsius * 9/5) + 32;
const temperatureInFahrenheit = (temperature) => console.log(`It is currently ${toFahrenheit(temperature)}ºF at Mars`);
const greet = (temperature) => console.log(`Hi there! Curiosity here. Right now is ${temperature}ºC at Mars`);

// definição da função sendMarsTemperature...


sendMarsTemperature(temperatureInFahrenheit); // imprime "It is currently 47ºF at Mars", por exemplo
sendMarsTemperature(greet); // imprime "Hi there! Curiosity here. Right now is 53ºC at Mars", por exemplo
```

  6. Por fim, o robô `Curiosity` tem uma taxa de sucesso de envio de mensagem de 60% devido ao fato de o robô já estar muito ocupado com outras operações. Logo, adicione na função `sendMarsTemperature` um outro `callback` que contenha as ações a serem tomadas em caso de falha.

```language-javascript
const messageDelay = () => Math.floor(Math.random() * 5000);

const getMarsTemperature = () => {
  const maxTemperature = 58;
  return Math.floor(Math.random() * maxTemperature);
}

const toFahrenheit = (degreeCelsius) => (degreeCelsius * 9/5) + 32;
const temperatureInFahrenheit = (temperature) => console.log(`It is currently ${toFahrenheit(temperature)}ºF at Mars`);
const greet = (temperature) => console.log(`Hi there! Curiosity here. Right now is ${temperature}ºC at Mars`);

const handleError = (errorReason) => console.log(`Error getting temperature: ${errorReason}`);

// definição da função sendMarsTemperature...


// imprime "It is currently 47ºF at Mars", por exemplo, ou "Error getting temperature: Robot is busy"
sendMarsTemperature(temperatureInFahrenheit, handleError);

// imprime "Hi there! Curiosity here. Right now is 53ºC at Mars", por exemplo, ou "Error getting temperature: Robot is busy"
sendMarsTemperature(greet, handleError);
```

---

## Recursos adicionais

* [Marie Chatfield — What is asynchronous code execution?](http://mariechatfield.com/tutorials/explanations/asynchronous-code.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Medium - JavaScript: What the heck is a Callback?](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced) {: .external-link target="_blank" rel="noreferrer noopener" }

* [MDN - Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Scotch - Callbacks, Promises, and Async](https://scotch.io/courses/10-need-to-know-javascript-concepts/callbacks-promises-and-async) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Medium - Entendendo funções callback em JavaScript](https://medium.com/totvsdevelopers/entendendo-funções-callback-em-javascript-7b500dc7fa22) {: .external-link target="_blank" rel="noreferrer noopener" }



---

## Próximo

No próximo passo, você irá aprender como fazer uso de _Promises_ em ***JavaScript***.

<%= next_button(@conn) %>
