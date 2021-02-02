## O que vamos aprender?

Hoje você vai aprender sobre outra _Higher Order Functions_: `Array.reduce`

Essa função é, talvez, uma das mais poderosas funções para manipulação e criação de arrays. Ela deixará seu código mais legível, conciso e expressivo.

---

### Você será capaz de:

* Utilizar a função `Array.reduce` para manipular e construir arrays;

---

## Por que isso é importante?

Como já viu na primeira parte, as _HOFs_ ajudam bastante a reduzir o código e deixá-lo mais compreensível. A _HOF_ de hoje é um pouco mais desafiadora, mas você usará ela bastante no seu código daqui pra frente e logo estará tirando-a de letra!

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Array.reduce

O reduce é diferente das outras _HOFs_: ele possui um parâmetro a mais para a função que recebe como parâmetro. Esse parâmetro é chamado de **acumulador**, comumente referido como `acc`. E o que ele faz? Ele serve para **acumular dentro de si** os resultados das funções. Pense assim: caso não exista segundo parâmetro no `reduce`, para um array de cinco elementos, o `reduce` executará a função passada como parâmetro quatro vezes. O valor inicial de `acc` será a primeira posição do array. Na primeira iteração ele realiza a função com o primeiro valor do _array_ que está em `acc` com a segunda posição que está em seu segundo parâmetro `curr`, que é chamado de **current**. Na segunda vez, `acc` conterá o retorno da primeira iteração, na terceira, o retorno da primeira e da segunda, e assim por diante. Olhe no exemplo abaixo:

- A função soma todos os valores de um array:
- Apenas com o `for`:

```language-javascript
const numbers = [32, 15, 3, 2, -5, 56, 10];
let sumNumbers = 0; // A variável 'acumula', a cada iteração do for, o resultado da operação feita lá!
for(let i = 0; i < numbers.length; i += 1){
  sumNumbers = sumNumbers + numbers[i];
}
console.log(sumNumbers); // 113
```
- Com `.reduce`:

```language-javascript
const numbers = [32, 15, 3, 2, -5, 56, 10];

const sumNumbers = numbers.reduce((result, number) => result + number); // O parâmetro `result` é o acumulador. Ele recebe, do `reduce`, o retorno da função a cada iteração.
console.log(sumNumbers); // 113

// Ou seja:

const getSum = (result, number) => result + number;
const sumNumbers = numbers.reduce(getSum);
console.log(sumNumbers); // 113
```

Dissecando as funções:

Usando `for`:

  * Necessidade de criar uma variável para acumular o resultado de cada iteração do `for`, a soma de cada resultado - `let sumNumbers`;
  * Necessidade de setar um valor inicial para variável - `sumNumbers = 0`;

Usando `.reduce`:

  * A função passada por parâmetro recebe dois parâmetros, o acumulador `result` e o elemento do array de cada iteração, `number`;
  * Como a função é uma _arrow function_ que possui apenas uma linha, o retorno de cada iteração será: `result + number`;
  * O retorno é salvo no primeiro parâmetro , `result`. É como se você estivesse fazendo igual à primeira função, `sumNumbers = sumNumbers + numbers[i]`, mas nesse caso seria `result = result + number`;

Para entender melhor como o `reduce` funciona, veja a animação e o código abaixo.

<%= figure(%{src: "/fundamentals/arrays-and-hof/images/reduce.gif", caption: "GIF ilustrando o método .reduce()", class: "rounded mx-auto d-block text-center", width: "500px", height: "auto"}) %>

```language-javascript
const collection = [1, 2, 3, 4, 5];

const getSum = (accumulator, number) => {
  console.log(accumulator); // 1 3 6 10
  return accumulator + number;
};

const sumNumbers = collection.reduce(getSum);
console.log(sumNumbers); // 15
```

O reduce possui uma outra diferença: você pode passar um segundo parâmetro **para o reduce, logo após a função**. Veja a seguir, será usado o último exemplo dado da soma dos números:

```language-javascript
const numbers = [32, 15, 3, 2, -5, 56, 10];

const getSum = (result, number) => {
  console.log(result); // 32 47 50 52 47 103
  return result + number;
};

const sumNumbers = numbers.reduce(getSum);
console.log(sumNumbers); // 113
```

Com a alteração:

```language-javascript
const numbers = [32, 15, 3, 2, -5, 56, 10];

const getSum = (result, number) => {
  console.log(result); // 0 32 47 50 52 47 103
  return result + number;
  };
const sumNumbers = numbers.reduce(getSum, 0); // Parâmetro adicionado ao reduce: o "0"
console.log(sumNumbers); // 113
```

Pode ver que mudou em nada o resultado da função. Mas veja que o primeiro valor do result não foi `32`, mas sim `0`.

Agora mude o `0` para `10` ou qualquer outro valor.

```language-javascript
const numbers = [32, 15, 3, 2, -5, 56, 10];

const getSum = (result, number) => {
  console.log(result); // 10 42 57 60 62 57 113
  return result + number;
  };
const sumNumbers = numbers.reduce(getSum, 10);
console.log(sumNumbers); // 123
```

Agora o resultado mudou para `123`, e o primeiro número impresso foi o `10`. Entendeu? Ao adicionar esse segundo parâmetro você está colocando um valor inicial na variável `result`, ou seja, no **acumulador**. Ele é o valor inicial do `reduce`. Caso nenhum parâmetro seja passado, o seu valor inicial será a primeira posição do array.

Hora de olhar outro exemplo para fixar e mostrar outras formas de se usar o `reduce`. Neste exemplo, serão comparados valores para buscar o maior valor em um array.
Tente criar essa função apenas com `for` e depois tente com `reduce`. Caso não consiga, olhe a solução abaixo:

```language-javascript
const numbers = [50, 85, -30, 3, 15];

const getBigger = (bigger, number) => (bigger > number) ? bigger : number;

const bigger = numbers.reduce(getBigger, 0);
console.log(bigger); // 85
```

A função passada agora pode possuir dois tipos de retorno:

1.  O retorno do próprio acumulador `bigger` (no caso `true` do ternário), o que significa que ele não será modificado; ou

2.  O valor do elemento do array, `number`, que indica que possui um valor maior que `bigger`.

Modifique o segundo parâmetro passado, o `0`, no reduce para `100` e execute o programa. O retorno agora é `100`, já que nenhum número de dentro do array é maior que o valor inicial passado. Então veja: a cada iteração, o `reduce` mantém o valor do acumulador igual ou o atualiza de acordo com a comparação que é feita. Ao final, você tem o maior valor do array. Adicione um `console.log` à função do `reduce` para ver isso acontecendo em detalhes, se quiser!

Para fixar ainda mais conceito de `reduce`, faça uma função que some todos os números pares do array:

```language-javascript
const numbers = [18, 19, 23, 53, 4, 5, 76, 23, 54];
```

Solução é está a seguir, mas tente realizar a função sem vê-la. Tente criar uma usando `reduce` e `filter`, e outra apenas usando `reduce`.

Solução usando `filter` e `reduce`:

```language-javascript
const numbers = [18, 19, 23, 53, 4, 5, 76, 23, 54];

const getEven = (number) => number % 2 === 0;
const sumPair = (currentValue, number) => currentValue + number;

const sumNumbers = (array) => array.filter(getEven).reduce(sumPair); // Olhe que código pequeno e conciso!

console.log(sumNumbers(numbers)); // 152
```

Solução usando apenas `reduce`:

```language-javascript
const numbers = [18, 19, 23, 53, 4, 5, 76, 23, 54];

const sumPair = (currentValue, number) => (
  (number % 2 === 0) ? currentValue + number : currentValue;
);

const sumNumbers = (array) => array.reduce(sumPair, 0);

console.log(sumNumbers(numbers)); // 152
```

Agora crie uma função usando os dados dos estudantes que usamos no conteúdo do dia anterior, para mostrar na tela um relatório que diz em qual matéria o estudante foi melhor. Você usará tanto o `map` quanto, dentro dele, o `reduce`!

```language-javascript
const estudantes = [
  {
    nome: 'Jorge',
    sobrenome: 'Silva',
    idade: 14,
    turno: 'Manhã',
    materias: [
      { name: 'Matemática', nota: 67 },
      { name: 'Português', nota: 79 },
      { name: 'Química', nota: 70 },
      { name: 'Biologia', nota: 65 }
    ]
  },
  {
    nome: 'Mario',
    sobrenome: 'Ferreira',
    idade: 15,
    turno: 'Tarde',
    materias: [
      { name: 'Matemática', nota: '59' },
      { name: 'Português', nota: '80' },
      { name: 'Química', nota: '78' },
      { name: 'Biologia', nota: '92' }
    ]
  },
  {
    nome: 'Jorge',
    sobrenome: 'Santos',
    idade: 15,
    turno: 'Manhã',
    materias: [
      { name: 'Matemática', nota: '76' },
      { name: 'Português', nota: '90' },
      { name: 'Química', nota: '70' },
      { name: 'Biologia', nota: '80' }
    ]
  },
  {
    nome: 'Maria',
    sobrenome: 'Silveira',
    idade: 14,
    turno: 'Manhã',
    materias: [
      { name: 'Matemática', nota: '91' },
      { name: 'Português', nota: '85' },
      { name: 'Química', nota: '92' },
      { name: 'Biologia', nota: '90' }
    ]
  },
  {
    nome: 'Natalia',
    sobrenome: 'Castro',
    idade: 14,
    turno: 'Manhã',
    materias: [
      { name: 'Matemática', nota: '70' },
      { name: 'Português', nota: '70' },
      { name: 'Química', nota: '60' },
      { name: 'Biologia', nota: '50' }
    ]
  },
  {
    nome: 'Wilson',
    sobrenome: 'Martins',
    idade: 14,
    turno: 'Manhã',
    materias: [
      { name: 'Matemática', nota: '80' },
      { name: 'Português', nota: '82' },
      { name: 'Química', nota: '79' },
      { name: 'Biologia', nota: '75' }
    ]
  },
]
```

Resultado esperado:

```language-javascript
[
  { name: 'Jorge', materia: 'Português' },
  { name: 'Mario', materia: 'Biologia' },
  { name: 'Jorge', materia: 'Português' },
  { name: 'Maria', materia: 'Química' },
  { name: 'Natalia', materia: 'Português' },
  { name: 'Wilson', materia: 'Português' },
]
```


Solução:

```language-javascript
const getBestClass = (acc, materia) => {
  if (acc.nota > materia.nota) return acc;
  return materia;
};

const reportBetter = (students) => {
  return students.map((student) => {
    return {
      name: student.nome,
      materia: student.materias.reduce(getBestClass).name,
    };
  });
};

console.log(reportBetter(estudantes));
```

---

E aí, achou interessante? Veja agora [esse artigo](https://medium.com/@js_tut/map-filter-and-reduce-animated-7fe391a35a47) {: .external-link target="_blank" rel="noreferrer noopener" } com excelentes animações ilustrando como funcionam o `map`, o `reduce` e o `filter`!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver alguns exemplos de como aplicar o `reduce`.

Aula ao vivo! Vamos para o Slack onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Hora de por a mão na massa!

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Nos exercícios a seguir, você trabalhará com uma estrutura de dados representando uma lista de livros, contendo informações como nome do livro, gênero, pessoa autora do livro e data de lançamento.

Em cada exercício, será pedido que você encontre ou produza alguma informação a respeito dessa lista utilizando as funções que você aprendeu hoje. Todos os exercícios contêm um código base. Você deverá copiar esse código e salvá-lo em um arquivo nomeado conforme o número do exercício, completando a função em branco.

Por exemplo, o exercício 1 deve ser salvo no arquivo `exercise1.js`, e assim por diante. Em cada exercício existe uma ou mais chamadas de funções do módulo [assert](https://www.w3schools.com/nodejs/ref_assert.asp) {: .external-link target="_blank" rel="noreferrer noopener" }. Estas funções checarão automaticamente se seu código retorna o resultado esperado.

Sua solução só será considerada correta se **todos** os _asserts_ do arquivo forem executados sem erros. No _Visual Studio Code_, você pode executar o código do exemplo _clicando_ com o botão direito e escolhando a opção `Run Code`.

Quando todos os _asserts_ passam, isto é, nenhum deles encontra um resultado diferente esperado, nada de diferente do normal é reportado:

```language-javascript
const assert = require('assert');

function foo() {
  return 'bar';
}

assert.strictEqual(foo(), 'bar');
```

```language-sh
[Running] node "/Users/leandro/example.js"

[Done] exited with code=0 in 0.087 seconds
```

Quando algum _assert_ falha, é exibido, entre outras coisas, a linha onde o erro aconteceu e sua causa:

```language-javascript
const assert = require('assert');

function foo() {
  return 'bar';
}

assert.strictEqual(foo(), 'baz');
```

```language-sh
[Running] node "/Users/leandro/example.js"
assert.js:92
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: 'bar' == 'baz'
    at Object.<anonymous> (/Users/leandro/example.js:7:8)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
    at internal/main/run_main_module.js:17:11 {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: 'bar',
  expected: 'baz',
  operator: '=='
}

[Done] exited with code=1 in 0.075 seconds
```

Atente para a linha que diz por que a execução falhou: `AssertionError [ERR_ASSERTION]: 'bar' == 'baz'`. Isso significa que o resultado da função `foo` (`bar`) é diferente do esperado (`baz`).

### Agora a prática

Todos os exercícios devem ser realizados utilizando `reduce`, e se necessário outra _HOF_, a informação será citada no enunciado.

1. Dada uma matriz de matrizes, transforme em uma única matriz.

```language-javascript

const assert = require('assert');

const arrays = [
    ["1", "2", "3"],
    [true],
    [4, 5, 6]
];


function flatten() {
  // escreva seu código aqui
}

assert.deepStrictEqual(flatten(), ["1", "2", "3", true, 4, 5, 6]);
```

2. Crie uma string com os nomes de todas as pessoas autoras.

```language-javascript

const assert = require('assert');

const books = [
  {
    id: 1,
    name: 'As Crônicas de Gelo e Fogo',
    genre: 'Fantasia',
    author: {
      name: 'George R. R. Martin',
      birthYear: 1948
    },
    releaseYear: 1991,
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: {
      name: 'J. R. R. Tolkien',
      birthYear: 1892,
    },
    releaseYear: 1954,
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: {
      name: 'Isaac Asimov',
      birthYear: 1920,
    },
    releaseYear: 1951,
  },
  {
    id: 4,
    name: 'Duna',
    genre: 'Ficção Científica',
    author: {
      name: 'Frank Herbert',
      birthYear: 1920,
    },
    releaseYear: 1965,
  },
  {
    id: 5,
    name: 'A Coisa',
    genre: 'Terror',
    author: {
      name: 'Stephen King',
      birthYear: 1947
    },
    releaseYear: 1986,
  },
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror',
    author: {
      name: 'H. P. Lovecraft',
      birthYear: 1890,
    },
    releaseYear: 1928,
  },
];


function allNames() {
  // escreva seu código aqui
}

assert.deepStrictEqual(allNames(), "Nomes: George R. R. Martin, J. R. R. Tolkien, Isaac Asimov, Frank Herbert, Stephen King, H. P. Lovecraft.");
```

3. Calcule a média de idade que as pessoas autoras tinham quando seus respectivos livros foram lançados.

```language-javascript
const assert = require('assert');

const books = [
  {
    id: 1,
    name: 'As Crônicas de Gelo e Fogo',
    genre: 'Fantasia',
    author: {
      name: 'George R. R. Martin',
      birthYear: 1948
    },
    releaseYear: 1991,
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: {
      name: 'J. R. R. Tolkien',
      birthYear: 1892,
    },
    releaseYear: 1954,
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: {
      name: 'Isaac Asimov',
      birthYear: 1920,
    },
    releaseYear: 1951,
  },
  {
    id: 4,
    name: 'Duna',
    genre: 'Ficção Científica',
    author: {
      name: 'Frank Herbert',
      birthYear: 1920,
    },
    releaseYear: 1965,
  },
  {
    id: 5,
    name: 'A Coisa',
    genre: 'Terror',
    author: {
      name: 'Stephen King',
      birthYear: 1947
    },
    releaseYear: 1986,
  },
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror',
    author: {
      name: 'H. P. Lovecraft',
      birthYear: 1890,
    },
    releaseYear: 1928,
  },
];

const expectedResult = 43;

function averageAge() {
  // escreva seu código aqui
}

assert.strictEqual(averageAge(), expectedResult);
```

4. Encontre o livro com o maior nome.

```language-javascript
const assert = require('assert');

const books = [
  {
    id: 1,
    name: 'As Crônicas de Gelo e Fogo',
    genre: 'Fantasia',
    author: {
      name: 'George R. R. Martin',
      birthYear: 1948
    },
    releaseYear: 1991,
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: {
      name: 'J. R. R. Tolkien',
      birthYear: 1892,
    },
    releaseYear: 1954,
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: {
      name: 'Isaac Asimov',
      birthYear: 1920,
    },
    releaseYear: 1951,
  },
  {
    id: 4,
    name: 'Duna',
    author: {
      name: 'Frank Herbert',
      birthYear: 1920,
    },
    releaseYear: 1965,
  },
  {
    id: 5,
    name: 'A Coisa',
    genre: 'Terror',
    author: {
      name: 'Stephen King',
      birthYear: 1947
    },
    releaseYear: 1986,
  },
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror',
    author: {
      name: 'H. P. Lovecraft',
      birthYear: 1890,
    },
    releaseYear: 1928,
  },
];

const expectedResult = {
  author: {
    birthYear: 1948,
    name: 'George R. R. Martin'
  },
  genre: 'Fantasia',
  id: 1,
  name: 'As Crônicas de Gelo e Fogo',
  releaseYear: 1991
};

function longestNamedBook() {
  // escreva seu código aqui
}

assert.deepStrictEqual(longestNamedBook(), expectedResult);
```

5.  Dada o _array_ de nomes, retorne a quantidade de vezes em que aparecem a letra `a` maiúscula ou minúscula.

```language-javascript

const assert = require('assert');

const names = [
  'Aanemarie',	'Adervandes',	'Akifusa',
  'Abegildo',	'Adicellia',	'Aladonata',
  'Abeladerco',	'Adieidy',	'Alarucha',
];



function containsA() {
  // escreva seu código aqui
}

assert.deepStrictEqual(containsA(), 20);
```

6.  Agora vamos criar um novo array de objetos a partir das informações abaixo, onde cada objeto terá o formato `{ name: nome do aluno, average: media das notas }`. Para isso vamos assumir que a posição 0 de `notas` refere-se ao aluno na posição 0 de `alunos`, aqui além de `reduce` será necessário utilizar também a função `map`. Dica: Você pode acessar o index do array dentro de `map`, e você pode ver o objeto esperado na constante `expected`.

```language-javascript

const assert = require('assert');

const students = ['Pedro Henrique', 'Miguel', 'Maria Clara'];
const grades = [[9, 8, 10, 7, 5], [10, 9, 9, 10, 8], [10, 7, 10, 8, 9]];


function studentAverage() {
  // escreva seu código aqui
}

const expected = [
  { name: 'Pedro Henrique', average: 7.8 },
  { name: 'Miguel', average: 9.2 },
  { name: 'Maria Clara', average: 8.8 },
];

assert.deepStrictEqual(studentAverage(), expected);
```

---

## Recursos adicionais

* [Página do _MDN_ sobre reduce](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Simplify your JavaScript – Use `.map()`, `.reduce()`, and `.filter()`](https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Video sobre `.map` `.reduce` e `.filter`](https://www.youtube.com/watch?v=D_MExaVe95w) {: .external-link target="_blank" rel="noreferrer noopener" }


---

## Próximo

No próximo passo, você aprenderá mais algumas _features_ interessantes do **_ES6_**.

<%= next_button(@conn) %>
