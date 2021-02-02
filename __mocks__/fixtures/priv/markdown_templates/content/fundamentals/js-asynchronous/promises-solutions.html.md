## Gabarito dos exercícios

A seguir, temos possíveis soluções para os exercícios:

---

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

- Agora, vamos tentar fazer as requisições a _API_ usando `fetch`. Essa função recebe dois parâmetros.

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

- A função `fetch` **é uma _Promise_**; como tal, dependendo de seus desdobramentos, podemos encadear procedimentos a serem feitos, utilizando as cláusulas `.then`(em caso de sucesso) e `.catch`(em caso de falha). A requisição `fetch` retorna um objeto _Response_. Utilizando `.then`, verifique a estrutura da resposta usando um `console.log` na `response` retornada pelo `fetch`.

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

Código final:

```language-javascript
const API_URL = 'https://icanhazdadjoke.com/';

const fetchJoke = () => {
  fetch(API_URL, { headers: { Accept: 'application/json' } })
    .then(response => response.json())
    .then(data =>
      document.getElementById('jokeContainer').innerText = data.joke
    );
}

window.onload = () => fetchJoke();
```

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Best jokes ever</title>
    <script src="draft.js" ></script>
  </head>
  <body>
    <h1>Get ready for a great joke!</h1>
    <h2 id="jokeContainer"></h2>
  </body>
</html>
```

2. Agora, um passo para trás: vamos fazer, passo a passo, uma _Promise_. Primeiramente, instancie uma _Promise_. Dentro dela, você deve produzir um _array_ com dez números aleatórios de 1 a 50 e elevá-los todos ao quadrado. Se a soma de todos esses elementos for inferior a 8000, a promise deve ser resolvida. Caso contrário, ela deve ser rejeitada. Acresça um `then` e um `catch` à _Promise_ com qualquer coisa dentro só para que o código funcione.

```language-javascript
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      { length: 10 },
      () =>  Math.floor(Math.random() * 50) + 1
    );
    const sum = myArray.map(number => number * number)
                       .reduce((number, acc) => number + acc, 0);

    (sum < 8000) ? resolve() : reject();
  });

  myPromise
    .then(() => console.log('Deu bom'))
    .catch(() => console.log('Deu ruim'));
};

fetchPromise();
```

3. Quando a promise for resolvida com sucesso, retorne o resultado da divisão desse número por 2, 3, 5 e 10 em um array.

```language-javascript
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      { length: 10 },
      () =>  Math.floor(Math.random() * 50) + 1
    );
    const sum = myArray.map(number => number * number)
                       .reduce((number, acc) => number + acc, 0);

    (sum < 8000) ? resolve(sum) : reject();
  });

  myPromise
    .then(sum => [2, 3, 5, 10].map(number => sum / number))
    .catch(() => console.log('Deu ruim!'));
};

fetchPromise();
```

4. Quando a _Promise_ for rejeitada, imprima, via `console.log`, a frase "É mais de oito mil! Essa promise deve estar quebrada!"

```language-javascript
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      { length: 10 },
      () =>  Math.floor(Math.random() * 50) + 1
    );
    const sum = myArray.map(number => number * number)
                       .reduce((number, acc) => number + acc, 0);

    (sum < 8000) ? resolve(sum) : reject();
  });

  myPromise
    .then(sum => [2, 3, 5, 10].map(number => sum / number))
    .catch(() =>
      console.log('É mais de oito mil! Essa promise deve estar quebrada!')
    );
};

fetchPromise();
```

5. Quando a _Promise_ for bem-sucedida, encadeie nela uma segunda _Promise_ que some os elementos do array.

```language-javascript
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      { length: 10 },
      () =>  Math.floor(Math.random() * 50) + 1
    );
    const sum = myArray.map(number => number * number)
                       .reduce((number, acc) => number + acc, 0);

    (sum < 8000) ? resolve(sum) : reject();
  });

  myPromise
    .then(sum => [2, 3, 5, 10].map(number => sum / number))
    .then(array => array.reduce((number, acc) => number + acc, 0))
    .catch(() =>
      console.log('É mais de oito mil! Essa promise deve estar quebrada!')
    );
};

fetchPromise();
```

**Bônus**

* Utilize somente Higher Order Functions para fazer as operações com o array;

Todas as soluções acima realizaram esse bonus.

* Refatore a _Promise_ para utilizar somente `async` e `await`.

```language-javascript
const sumRandomNumbers = () => {
  const myArray = Array.from(
    { length: 10 },
    () =>  Math.floor(Math.random() * 50) + 1
  );
  const sum = myArray.map(number => number * number)
                     .reduce((number, acc) => number + acc, 0);

  if (sum > 8000) throw new Error();

  return sum;
};

const generateArrayFromSum = sum => [2, 3, 5, 10].map(number => sum / number);

const fetchPromise = async () => {
  try {
    const sum = await sumRandomNumbers();
    const array = await generateArrayFromSum(sum);

    console.log(array);
  } catch(e) {
    console.log('É mais de oito mil! Essa promise deve estar quebrada!');
  }
}

fetchPromise();
```
