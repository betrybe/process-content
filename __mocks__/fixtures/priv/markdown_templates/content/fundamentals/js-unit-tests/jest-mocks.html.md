## O que vamos aprender?

As `Mock functions` são ferramentas que nos permitem simular o comportamento de funções reais.

Imagine o seguinte cenário: em um teste, você tem funções com retornos variáveis, como requisições (imagine uma API que retorne um erro de indisponibilidade em vez do resultado esperado, por exemplo) e funções de retorno aleatório. Não há como testar se de fato elas, ou a lógica que depende delas, estão funcionando. A depender do retorno, o teste às vezes passará, e às vezes não.

Para adereçar esse problema, podemos _simular_ o comportamento de tais funções no contexto do teste. No Jest, as `Mock functions` simulam o comportamento de uma função real, apenas no escopo do teste, e nos dão controle sobre qual retorno essa função envia e quantas vezes ela foi chamada, entre outras coisas.

---

### Você será capaz de:

*  Utilizar o mock functions do Jest para simular funções e seus retornos;

*  Testar requisições a uma API sem a necessidade de ter uma conexão real com ela.

---

## Por que isso é importante?

* Em uma aplicação real, testamos o código centenas e centenas de vezes, e não podemos ficar à mercê de testes que demoram minutos para rodar ou que possam falhar em suas requisições;

* Simular ou `mockar` funções é a forma mais prática e performática de realizar testes **confiáveis** e controlar seu comportamento.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Os Mocks

O objetivo de se _mockar_ uma função, módulo ou requisição é permitir a quem desenvolve ter controle sobre todo o funcionamento de seus testes. Pense no projeto bônus do bloco 5, o `Adivinhe a cor`, em que era necessário gerar cores aleatórias. Como testar essas cores, se não sabemos quais serão geradas? Pense também em uma requisição de API que constantemente muda seu retorno. Como ter certeza do seu retorno e, principalmente, de que seu teste não está caindo em um **falso-positivo**?

No exemplo abaixo, podemos ver um caso em que simular o comportamento da função seria necessário para o teste:

```language-javascript
const retornaNumeroAleatorio = () => Math.floor(Math.random() * 100);

const divisivelPorDois = () => (retornaNumeroAleatorio() % 2) === 0;

test('quando o número aleatório é par, a função retorna `true`', () => {
  expect(divisivelPorDois()).toBe(true); // Como garantimos que o número retornado será par?
});
```

_Mockar_ o comportamento da função `retornaNumeroAleatorio()` para garantir que ela está, nesse teste, retornando um número par, seria a solução pra esse impasse!

Dentre as principais formas de se _mockar_ algo em Jest, destacam-se três:

- jest.fn();
- jest.mock();
- jest.spyOn();

### Mockando funções

O método **jest.fn()** configura-se como a forma mais simples de se mockar algo: ele transforma uma função em uma simulação. Ou seja: ao _mockar_ uma função com o `jest.fn()` e fazer a chamada da mesma, o comportamento definido no _mock_ será chamado, em vez da função original.

Ele é muito útil para casos como o do projeto `Adivinhe a cor`, em que precisamos ter controle das cores geradas aleatoriamente para testar tudo corretamente.

Imagine que a função geradora de cor aleatória seja essa e esteja no arquivo `service.js`:

```language-javascript
function randomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
module.exports = { randomRgbColor };
```

Fazendo o teste para saber se a função é chamada, temos:

```language-javascript
const service = require('./service');

test("#randomRgbColor", () => {
  // testando se a função foi chamada
  service.randomRgbColor();
  expect(service.randomRgbColor).toHaveBeenCalled();
});
```

Esse teste deveria passar, não? Afinal, a função foi chamada logo acima dele. Mas ele não passa, e o erro nos indica o que fazer:

>  **Matcher error**: received value must be a mock or spy function

Esse erro acontece porque a propriedade _toHaveBeenCalled_, assim como outras que serão ensinadas a seguir, são exclusivas para funções simuladas. Ou seja: se você não simula uma função, a propriedade não funciona corretamente.

Portanto, vamos utilizar o jest.fn() para testar a chamada dessa função:

```language-javascript
const service = require('./service');

test("#randomRgbColor", () => {
  // testando se a função foi chamada. Não simulamos nenhum comportamento aqui, pois, para esse teste, isso não importa! Queremos saber se ela foi chamada e ponto final.
  service.randomRgbColor = jest.fn();

  service.randomRgbColor();
  expect(service.randomRgbColor).toHaveBeenCalled();
});
```

Ao declarar `service.randomRgbColor = jest.fn();`, estamos dizendo ao teste que, a partir daquele momento, estamos tomando controle da função `service.randomRgbColor` e que ela será uma simulação da função original.

Por ser uma simulação, podemos especificar qual vai ser o retorno da função. Basicamente, o que podemos dizer é: _"No contexto deste teste, quando essa função for chamada, ela retornará o valor que eu defini, ao invés de um valor aleatório!"_. Duas propriedades nos permitem fazer essa declaração: `mockReturnValue(value)` e `mockReturnValueOnce(value)`. O `mockReturnValue` define um valor padrão de retorno. Já o `mockReturnValueOnce` retorna o valor definido apenas uma vez, e é importante, pois pode ser encadeado para que chamadas sucessivas retornem valores diferentes.

```language-javascript
const service = require('./service');

test("#randomRgbColor", () => {
  // testando se a função foi chamada e qual seu retorno
  service.randomRgbColor = jest.fn().mockReturnValue("rgb(255, 255, 255)");

  service.randomRgbColor();
  expect(service.randomRgbColor).toHaveBeenCalled();
  expect(service.randomRgbColor()).toBe("rgb(255, 255, 255)");
});
```

Na terceira linha do exemplo acima, estamos manualmente chamando a função _service.randomRgbColor();_. Caso isso não seja feito, o teste _expect(service.randomRgbColor).toHaveBeenCalled()_ irá falhar. Isso acontece porque _mockar_ uma função redefine seu comportamento, mas não a executa. A propriedade _toHaveBeenCalled()_ espera que a função dentro do `expect` tenha sido executada por alguma chamada anterior a essa linha dentro do contexto desse teste.

Além disso, podemos também testar quantas vezes a função foi chamada. Para isso, utilizamos a propriedade `toHaveBeenCalledTimes(number)`:

```language-javascript
const service = require('./service');

test("#randomRgbColor", () => {
  // testando quantas vezes a função foi chamada e qual seu retorno
  service.randomRgbColor = jest
    .fn()
    .mockReturnValue('default value')
    .mockReturnValueOnce('first call')
    .mockReturnValueOnce('second call');

  expect(service.randomRgbColor).toHaveBeenCalledTimes(0);

  expect(service.randomRgbColor()).toBe("first call");
  expect(service.randomRgbColor).toHaveBeenCalledTimes(1);

  expect(service.randomRgbColor()).toBe("second call");
  expect(service.randomRgbColor).toHaveBeenCalledTimes(2);

  expect(service.randomRgbColor()).toBe("default value");
  expect(service.randomRgbColor).toHaveBeenCalledTimes(3);
});
```

É possível implementar vários comportamentos em uma simulação. No exemplo acima, note que a implementação _mockReturnValueOnce_ se sobrepõe em relação a _mockReturnValue_, que se torna um padrão apenas após os retornos de _mockReturnValueOnce_ serem executados.

### Mockando Módulos

Diferente do `jest.fn()`, que simula apenas uma função por vez, temos o `jest.mock()`, que tem como principal diferencial `mockar` todo um pacote de dependências ou módulo de uma vez.

Por exemplo: em um arquivo chamado `math.js`, temos as seguintes funções:

```language-javascript
const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const somar = async (a, b) => { await sleep(10000); return a + b }; // Função de somar mais lenta do mundo
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

module.exports = { somar, subtrair, multiplicar, dividir };
```

Utilizando o `jest.fn()`, teríamos que `mockar` todas as funções uma a uma.
Com o `jest.mock()`, podemos `mockar` todas com um só comando:

> jest.mock('./math');

Uma vez que _mockarmos_ todo o arquivo `math.js` e, portanto, passemos a simular o comportamento de todas as suas funções, caso passemos os parâmetros 1 e 2 para a função `somar`, por exemplo, o retorno será "undefined". Isso se dá porque a simulação deixou de acessar o comportamento da função original do `math.js`. Apesar de podermos definir um retorno com `mockReturnValue`, há casos em que é útil ir além dessa capacidade de retornar valores e criar um novo comportamento para a função simulada. É o que o método `mockImplementation(func)` faz. Ele aceita uma função que deve ser usada como implementação.

Veja um exemplo:

```language-javascript
const math = require('./math');
jest.mock("./math");

test("#somar", () => {
  // Aqui testamos se função foi chamada, quantas vezes foi chamada, quais parâmetros foram usados e qual seu retorno

  math.somar.mockImplementation((a, b) => a + b);
  math.somar(1, 2);

  expect(math.somar).toHaveBeenCalled();
  expect(math.somar).toHaveBeenCalledTimes(1);
  expect(math.somar).toHaveBeenCalledWith(1, 2);
  expect(math.somar(1, 2)).toBe(3);
});
```

No exemplo acima, utilizamos também o método `toHaveBeenCalledWith(...args)`, que valida quais parâmetros foram passados para a função.

Assim como o `mockReturnValueOnce`, podemos também implementar uma funcionalidade para apenas uma chamada com `mockImplementationOnce`.

### Trabalhando com mock e funções originais

Você já aprendeu que ter controle sobre uma função e usar _matchers_ como o `toHaveBeenCalled` são ferramentas essenciais para quem desenvolve. Mas há casos em que
é útil verificar os efeitos colaterais de uma função, como em uma alteração de página. Como fazer isso se, ao se _mockar_ uma função, ela perde sua implementação original, mas, sem _mockar_, não podemos testá-la com o matcher?

O **jest.spyOn()** é capaz de resolver esse problema. Ele "espia" a chamada da função simulada, enquanto deixa a implementação original ativa.

```language-javascript
const math = require('./math');

test("#somar", () => {
  // testando se a função foi chamada, quantas vezes foi chamada, quais parâmetros foram usados e qual seu retorno
  const mockSomar = jest.spyOn(math, "somar");

  mockSomar(1, 2);
  expect(mockSomar).toHaveBeenCalled();
  expect(mockSomar).toHaveBeenCalledTimes(1);
  expect(mockSomar).toHaveBeenCalledWith(1, 2);
  expect(mockSomar(1, 2)).resolves.toBe(3);
});
```

Podemos notar no exemplo que a simulação da função é criada, mas sua implementação é mantida, e a soma realizada.

Há também como limpar, resetar ou restaurar `mocks`. Existem três métodos capazes de fazer isso:

* `mock.mockClear()`
  - Útil quando você deseja limpar os dados de uso de uma simulação entre dois `expect`s;

* `mock.mockReset()`
  - Faz o que o `mockClear()` faz;
  - Remove qualquer retorno estipulado ou implementação;
  - Útil quando você deseja resetar uma simulação para seu estado inicial;

* `mock.mockRestore()`
  - Faz tudo que `mockReset()` faz;
  - Restaura a implementação original;
  - Útil para quando você quer simular funções em certos casos de teste e restaurar a implementação original em outros;

Como exemplo, imagine que você queira testar a função _mockada_ `somar` implementando para ela um método de subtração, mas que depois você queira redefinir as implementações do `mock`.

```language-javascript
const math = require('./math');

test("#somar", () => {
  // testando a implementação original, o mock e o mock resetado

  // implementação original
  expect(math.somar(1, 2)).resolves.toBe(3);

  // criando o mock e substituindo a implementação para uma subtração
  math.somar = jest.fn().mockImplementation((a, b) => a - b);

  math.somar(5, 1);
  expect(math.somar).toHaveBeenCalledTimes(1);
  expect(math.somar(5, 1)).toBe(4);
  expect(math.somar).toHaveBeenCalledTimes(2);
  expect(math.somar).toHaveBeenLastCalledWith(5, 1);

  // resetando o mock
  math.somar.mockReset();
  expect(math.somar(1, 2)).toBe(undefined);
  expect(math.somar).toHaveBeenCalledTimes(1);
  expect(math.somar).toHaveBeenLastCalledWith(1, 2);
});
```

No exemplo acima, por termos usado o jest.fn(), não há como restaurar as implementações originais da função, pois suas funcionalidades não permitem. A única ferramenta que nos permite transitar entre simulação e comportamento original é o **jest.spyOn()**.

```language-javascript
const math = require('./math');

test("#somar", () => {
  // testando a implementação original, o mock e a restauração da função original

  // implementação original
  expect(math.somar(1, 2)).resolves.toBe(3);

  // criando o mock e substituindo a implementação para uma subtração
  const mockSomar = jest
    .spyOn(math, "somar")
    .mockImplementation((a, b) => a - b);

  math.somar(5, 1);
  expect(mockSomar).toHaveBeenCalledTimes(1);
  expect(mockSomar(5, 1)).toBe(4);
  expect(mockSomar).toHaveBeenCalledTimes(2);
  expect(mockSomar).toHaveBeenLastCalledWith(5, 1);

  // restaurando a implementação original
  math.somar.mockRestore();
  expect(math.somar(1, 2)).resolves.toBe(3);
});
```

### Mock e funções assíncronas

Os testes que dependem de requisições são os mais beneficiados com o uso do `mock`. Excluem problemáticas como falha na API, instabilidade de internet e tamanho de retorno.

Requisições para APIs podem levar vários segundos para serem realizadas, descartando todas as problemáticas listadas acima. Imagine que você precise fazer 15 testes que dependem dessas requisições. Se torna inviável fazer 15 requisições, pois pode aumentar muito o tempo para a realização de todos os testes, além de sobrecarregar a API com chamadas cada vez que for fazer um teste!

Da mesma maneira que podemos _mockar_ funções síncronas, podemos fazê-lo com as assícronas. A diferença se dá nas implementações.

Nas funções assíncronas, utilizamos o `mockResolvedValue(value)` ou o `mockRejectedValue(value)`. Assim como nas demais implementações, podemos definir o retorno para apenas uma chamada com `mockResolvedValueOnce(value)` ou `mockRejectedValueOnce(value)`.

Temos, num arquivo `api.js`, uma requisição para a API Estúdios Ghibli:

```language-javascript
function fetchURL() {
  return fetch('https://ghibliapi.herokuapp.com/species').then(response =>
    response
      .json()
      .then(json =>
        response.ok ? Promise.resolve(json) : Promise.reject(json)
      )
  );
}
module.exports = { fetchURL };
```

O retorno dessa requisição será um array com de 200 posições no seguinte formato:

```language-javascript
[
  {
    id: "b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    name: "Spirit",
    classification: "Spirit",
    eye_colors: "Red",
    hair_colors: "Light Orange",
    url:
      "https://ghibliapi.herokuapp.com/species/b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    people: [
      "https://ghibliapi.herokuapp.com/people/ca568e87-4ce2-4afa-a6c5-51f4ae80a60b"
    ],
    films: [
      "https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6"
    ]
  },
 // ...
];
```

No próximo exemplo vamos _mockar_ a requisição e fazer dois testes: implementar um valor para quando a promise for resolvida e para quando ela for rejeitada.

```language-javascript
const api = require("./api");

describe("testando a requisição", () => {
  const apiURL = jest.spyOn( api, "fetchURL");
  afterEach(apiURL.mockReset);

  test("testando requisição caso a promise resolva", async () => {
    apiURL.mockResolvedValue('requisição realizada com sucesso');

    apiURL();
    expect(apiURL).toHaveBeenCalled();
    expect(apiURL).toHaveBeenCalledTimes(1);
    expect(apiURL()).resolves.toBe('requisição realizada com sucesso');
    expect(apiURL).toHaveBeenCalledTimes(2);
  });

  test("testando requisição caso a promise seja rejeitada", async () => {
    apiURL.mockRejectedValue('a requisição falhou');

    expect(apiURL).toHaveBeenCalledTimes(0);
    expect(apiURL()).rejects.toMatch('a requisição falhou');
    expect(apiURL).toHaveBeenCalledTimes(1);
  });
});
```

Caso queira simular os efeitos colaterais da API, você pode definir o retorno como um objeto JSON. No exemplo abaixo, ao invés de carregar um array de 200 objetos, vamos definir o retorno com apenas 1.

```language-javascript
const api = require("./api");

const requestReturn = [
  {
    id: "b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    name: "Spirit",
    classification: "Spirit",
    eye_colors: "Red",
    hair_colors: "Light Orange",
    url:
      "https://ghibliapi.herokuapp.com/species/b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    people: [
      "https://ghibliapi.herokuapp.com/people/ca568e87-4ce2-4afa-a6c5-51f4ae80a60b"
    ],
    films: [
      "https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6"
    ]
  }
];

test("testando requisição caso a promise resolva", async () => {
  apiURL = jest.fn().mockResolvedValue(requestReturn);

  // Mesma aplicação dos testes do exemplo anterior...
});
```

A grande vantagem desse exemplo é que, neste teste, sequer fazemos uma requisição à API real! Assim evitamos todos os problemas que mencionamos anteriormente.

### Para fixar

Utilize as funções do arquivo 'math.js' para realizar os exercícios:

```language-javascript
const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const somar = async (a, b) => { await sleep(10000); return a + b }; // Função de somar mais lenta do mundo
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

module.exports = { somar, subtrair, multiplicar, dividir };
```

1. Faça o _mock_ da funcão **subtrair** e teste sua chamada.
2. Faça o _mock_ da função **multiplicar** e implemente como retorno padrão o valor '10'. Teste a chamada e o retorno.
3. Faça o _mock_ da função **somar** e implemente uma função que recebe dois valores e retorna sua soma. Teste a chamada, o retorno e os parâmetros passados.
4. Faça o _mock_ da função **dividir** e implemente um retorno padrão com o valor '15'. Implemente também os seguintes valores para a primeira e segunda chamadas: '2' e '5'. Teste a chamada, o retorno, os parâmetros e quantas vezes a função foi chamada.
5. Faça o _mock_ da função **subtrair** de maneira que seja possível restaurar sua implementação original. Defina como retorno padrão o valor '20'. Teste o número de chamadas e o retorno. Restaure a implementação original da função e teste sua execução.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática

1. Crie uma função que gere um número aleatório entre 0 e 100. Você irá criar também os testes para essa função. Utilizando o mock, defina o retorno padrão como 10. Teste se a função foi chamada, qual seu retorno e quantas vezes foi chamada.

2. Com a mesma função do exercício anterior, utilizando o mock, crie uma nova implementação, que deve receber dois parâmetros e retornar a divisão do primeiro pelo segundo. Essa implementação deve ocorrer uma única vez. Faça os testes necessários.

3. Ainda com a mesma função do primeiro exercício, utilizando o mock, crie uma nova implementação que receba três parâmetros e retorne sua multiplicação. Após fazer os devidos testes para ela, resete sua implementação e crie uma nova, que receba um parâmetro e retorne seu dobro. Faça os testes necessários.

4. Dentro de um mesmo arquivo, crie três funções. A primeira deve receber uma string e retorná-la em caixa alta. A segunda deve também receber uma string e retornar só a primeira letra. A terceira deve receber duas strings e concatená-las. Faça o mock do arquivo. Faça uma nova implementação para a primeira função, mas agora ela deve retornar a string em caixa baixa. Para a segunda função, uma nova implementação deve retornar a última letra de uma string. A terceira deve receber três strings e concatená-las.

5. Utilizando as mesmas funções do exercício anterior, repita a implementação para a primeira função. Após repetir a implementação, restaure a implementação original e crie os testes necessários para validar.

6. Crie uma função que faça requisição para a api [dog pictures](https://dog.ceo/dog-api/) {: .external-link target="_blank" rel="noreferrer noopener" }. _Mocke_ a requisição e crie dois testes. O primeiro deve interpretar que a requisição se resolveu e teve como valor "request sucess". O segundo deve interpretar que a requisição falhou e ter como valor "request failed". Crie todos os testes que achar necessário.

**Bônus**

1. O código abaixo utiliza uma API de piadas e implementa o `fetchJoke`, que é um _gerador de piadas ruins_. As piadas são geradas aleatoriamente através do _endpoint_ armazenado em `API_URL`. Faça um teste que verifique a chamada dessa _API_ para um resultado específico. Para isso, faça um _mock_ do `fetch`, que faz a chamada à _API_, utilizando os seguintes dados:

```language-javascript
{
  'id': '7h3oGtrOfxc',
  'joke': 'Whiteboards ... are remarkable.',
  'status': 200
}
```
**Código do exercício**

```language-javascript
const API_URL = 'https://icanhazdadjoke.com/';

const fetchJoke = () => {
  return fetch(API_URL, { headers: { Accept: 'application/json' }})
    .then(response => response.json())
    .then(data => data.joke);
};
```

---

## Recursos adicionais (opcional)

* [Mock Functions](https://devhints.io/jest#mock-functions) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Jest - Mocking basics - Video](https://www.youtube.com/watch?v=3PjdxjWK0F0) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Understanding jest mocks](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Jest documentation](https://jestjs.io/docs/pt-BR/mock-function-api) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo dia, você se dedicará ao trabalho prático do bloco!

<%= next_button(@conn) %>
