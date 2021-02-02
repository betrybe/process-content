## O que vamos aprender?

Hoje você vai aprender sobre outras duas _Higher Order Functions_: `Array.map` e o `Array.filter`

A função `map` é, talvez, uma das mais poderosas (e complexas!) funções para manipulação e criação de arrays. Em conjunto, essas _HOFs_ deixarão seu código mais legível, conciso e expressivo.


---

### Você será capaz de:

* Utilizar a função `Array.map` para manipular e construir arrays;

- Utilizar a função `Array.filter` para filtrar um array;

* Aprender a usar de forma conjunta as _Higher Order Functions_.

---

## Por que isso é importante?

Como já viu na primeira parte, as _HOFs_ ajudam bastante a reduzir o código e deixá-lo mais compreensível. As _HOFs_ de hoje são um pouco mais complicadas, mas você usará elas bastante no seu código daqui pra frente e logo estará tirando-as de letra!

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Array.filter

O `filter` é bem parecido com o `find`. O que o `filter` traz de novo é que, ao vez de retornar apenas um elemento do array, ele retornará outro array com todos os elementos que satisfaçam à condição verificada pela função. Assista a seguir o vídeo em que o Cairão explica como o método `filter` funciona.

<%= youtube_video "VqkmdJyi2-M" %>

A animação abaixo nos mostra como o `filter` pode ser utilizado para filtrar os valores maiores que vinte do array `listaNumeros`. Observe que o retorno da função é um novo array (`maiorVinte`) contendo os números que passaram pelo filtro.

<%= figure(%{src: "/fundamentals/arrays-and-hof/hof-part-2/images/filter.gif", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "GIF método filter."}) %>

No exemplo abaixo, apenas substituiremos o `find` por `filter`.

```language-javascript
const numbers = [19, 21, 30, 3, 45, 22, 15];

const verifyEven = (number) => number % 2 === 0;

const isEven = numbers.filter(verifyEven);

console.log(isEven); // [ 30, 22 ]

// Outra forma de ser realizada sem a necessidade de criar uma nova função.
const isEven2 = numbers.filter((number) => number % 2 === 0);

console.log(isEven2); // [ 30, 22 ]
```

Verifique que o retorno foi um array com os dois números pares do array `numbers`.   

Olhe este outro exemplo de apenas pegar os elementos que não possuem alguma condição. Neste caso, deseja-se apenas as pessoas que não possuem ainda idade para dirigir:

```language-javascript
const objPeople = [
  { name: 'José', age: 21 },
  { name: 'Lucas', age: 19 },
  { name: 'Maria', age: 16 },
  { name: 'Gilberto', age: 18 },
  { name: 'Vitor', age: 15 },
];

const verifyAgeDrive = (arrayOfPeople) => (
  arrayOfPeople.filter((people) => (people.age < 18))
);

console.log(verifyAgeDrive(objPeople)); // [ { name: 'Maria', age: 16 }, { name: 'Vitor', age: 15 } ]
```

Outra forma de se usar o `filter` é retornar um array sem o elemento desejado. É preciso remover o `Ricardo` do objeto agora, já que ele não é mais um estudante.

```language-javascript
const arrayMyStudents = ['Maria', 'Manuela', 'Jorge', 'Ricardo', 'Wilson'];

const removeStudentByName = (name, listStudents) => {
  return listStudents.filter((student) => student !== name); // Filtra todos os estudantes que não têm o nome 'Ricardo' e retorna um array com eles. Na prática, remove o Ricardo do array.
};

const newListStudents = removeStudentByName('Ricardo', arrayMyStudents);
console.log(newListStudents); // [ 'Maria', 'Manuela', 'Jorge', 'Wilson' ]
```

Observe que o `filter` foi usado dentro de uma função que recebe dois parâmetros, o array de valores e uma string, o que será removido. A condição de dentro do `filter` é para retornar sempre que o elemento for diferente do `name` passado. Se tiver ficado confuso, rode esse código por conta própria e altere um pouco o seu funcionamento! Isso ajudará muito.

### Array.map

A função `map` possui a mesma estrutura das outras _HOFs_, o que muda é o seu retorno.

Antes de mais nada, veja mais um vídeo com o Cairo, desta vez falando sobre o `map`.

<%= youtube_video "j0Dp2EtUKes" %>

Veja a diferença entre fazer uma mesma função usando `for` e em seguida usando `map`:

```language-javascript
const persons = [
  { firstName: "Maria", lastName: "Ferreira" },
  { firstName: "João", lastName: "Silva" },
  { firstName: "Antonio", lastName: "Cabral" },
];

const fullNames = [];
for(let i = 0; i < persons.length; i += 1){
  fullNames.push(`${persons[i].firstName} ${persons[i].lastName}`);
}

console.log(fullNames);
```

Agora com a função `map`:

```language-javascript
const persons = [
  { firstName: "Maria", lastName: "Ferreira" },
  { firstName: "João", lastName: "Silva" },
  { firstName: "Antonio", lastName: "Cabral" },
];

const fullNames = persons.map((person) => `${person.firstName} ${person.lastName}`);

console.log(fullNames); // [ 'Maria Ferreira', 'João Silva', 'Antonio Cabral' ]
```

O `for` foi substituído por apenas uma linha de código.

A função juntou o primeiro nome com o sobrenome de cada pessoa e retornou um array novo com cada um dos valores. Observe que o tamanho dos arrays `persons` e `fullNames` é o mesmo (3 elementos).

Outro exemplo é o de realizar um cálculo utilizando os valores dos elementos e retornar um array novo sem alterar o anterior.

Na animação abaixo, podemos observar que o método `map` está invocando uma função callback que multiplica cada elemento do array `listaNumeros` por dois. O retorno do `map` é um novo array (`dobro`) que contém o resultado da multiplicação de cada elemento do array `listaNumeros` por dois. Perceba que o array retornado tem exatamente a mesma quantidade de itens que o array original, que não sofreu nenhuma modificação!

<%= figure(%{src: "/fundamentals/arrays-and-hof/hof-part-2/images/map.gif", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "GIF método map."}) %>

Vamos fazer juntos um outro exemplo numérico, para fixar bem o que o `map` faz. Suponha que é preciso transformar todos os números em negativos e passa-lós para um array novo.

```language-javascript
const numbers = [1, 2, 3, 4, -5];

const negativeNumbers = numbers.map(number => ((number > 0) ? number * (-1) : number));

console.log(negativeNumbers); // [ -1, -2, -3, -4, -5 ]
console.log(numbers); // [ 1, 2, 3, 4, -5 ]
```

E como seria apenas com `for`?

```language-javascript
const numbers = [1, 2, 3, 4, -5];

const negativeNumbers = [];
for (let i = 0; i < numbers.length; i += 1) {
  if (numbers[i] > 0) {
    negativeNumbers.push(numbers[i] * -1);
  } else {
    negativeNumbers.push(numbers[i]);
  }
}

console.log(negativeNumbers); // [ -1, -2, -3, -4, -5 ]
console.log(numbers); // [ 1, 2, 3, 4, -5 ]
```

Outras formas de usar o `.map` é unir dois arrays para criar um novo. Considere que você possui duas listas: o preço do primeiro produto (`Arroz`) é o primeiro elemento da lista `prices` (`2.99`), e assim por diante:

```language-javascript
const products = ['Arroz', 'Feijão', 'Alface', 'Tomate'];
const prices = [2.99, 3.99, 1.5, 2];
```

Deseja-se juntá-las em apenas uma lista de objetos que fique dessa forma:

```language-javascript
const listProducts = [{ Arroz: 2.99 },...]
```

Tente criar uma função que resolva esse problema. Lembre-se, também, que as funções passadas para as _HOFs_ podem receber vários parâmetros, não só o `elemento` sobre o qual ela está sendo iterada! Use isso em seu favor. Caso tenha dúvidas, olhe a solução logo abaixo.

```language-javascript
const products = ['Arroz', 'Feijao', 'Alface', 'Tomate'];

const prices = [2.99, 3.99, 1.5, 2];

const updateProducts = (listProducts, listPrices) => {
  return listProducts.map((product, index) => (
    { [product]: listPrices[index] }
  ));
};

const listProducts = updateProducts(products, prices);
console.log(listProducts);
=> [
  { Arroz: 2.99 },
  { Feijao: 3.99 },
  { Alface: 1.5 },
  { Tomate: 2 },
]
```

E antes de seguir em diante, uma pergunta que provavelmente lhe veio! Qual a diferença, afinal, de `map` para o `forEach`? São duas principais:

  * O `map` aplica sobre os elementos de um array uma função e retorna um array novo, sem modificar o original;

  * A `forEach` não tem tal restrição. Ela pode modificar o array original e retorna nada por padrão - ela pode criar um array novo a partir de um antigo, pode simplesmente buscar por um elemento e retorná-lo, pode não retornar nada, enfim! Ela é _genérica_ e pode fazer diversas coisas.

Ficou mais claro? Em caso de dúvidas, pense neste exemplo:

```language-javascript
const numeros = [1, 2, 3, 4, 5, 6];
console.log(numeros.map(numero => numero * 2)); // Retorno: [2, 4, 6, 8, 10, 12]

const paresMenoresQueCinco = [];
numeros.forEach(numero => {
  if(numero < 5 && numero % 2 === 0) {
    paresMenoresQueCinco.push(numero);
  }
})
console.log(paresMenoresQueCinco); // Retorno: [2, 4]
```

Pense sempre que o `forEach` faz com arrays o que as outras _HOFs_ não conseguem fazer. Ele é genérico!

Agora, hora de ver como pode-se usar as outras _HOFs_ junto com o `map`. Para os exemplos a seguir será usado um array com os dados de estudantes de um colégio.

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

Segue-se alguns exemplos de funções apenas usando `for` e depois como **refatorá-las** para quem usem _HOFs_.

- Função para buscar e imprimir o nome completo de todos os estudantes que estudam no turno da manhã.

```language-javascript
const allNameStudents = [];

for(let i = 0; i < estudantes.length; i += 1 ){
  if(estudantes[i].turno === 'Manhã'){
    allNameStudents.push(`${estudantes[i].nome} ${estudantes[i].sobrenome}`)
  }
}

console.log(allNameStudents)
```
- Com `map` e `filter`.

```language-javascript
const allNameStudents = estudantes.filter((estudante) => (
  estudante.turno === 'Manhã')
).map((estudante)=>`${estudante.nome} ${estudante.sobrenome}`);

console.log(allNameStudents);
```

O que foi feito? Primeiro usou-se o `filter` para filtrar todos os estudantes que estudam no período da manhã. Como o retorno do filter é um array de elementos, você pode usar o `map` logo em seguida para retornar os nomes completos de estudantes presentes nesse novo array. O `map` nesse caso é usado apenas para retornar as informações pedidas, o nome completo, enquanto o `filter` é usado para filtrar o array.

Agora vamos usar um `map` com um `find`.

- Buscar um estudante pelo nome e retornar a situação dele em cada matéria:
- Apenas com `for`:

```language-javascript
const reportStatus = (name, students) => {
  let getStudent;
  for (let i = 0; i < students.length; i += 1 ) {
    if (students[i].nome === name) {
      getStudent = students[i];
      break;
    }
  }

  let report = [];
  for (let i = 0; i < getStudent.materias.length; i += 1) {
    if (getStudent.materias[i].nota >= 60) {
      report.push(`${getStudent.materias[i].name} Aprovado`)
    } else {
      report.push(`${getStudent.materias[i].name} Reprovado`)
    }
  }
  return report;
}

console.log(reportStatus('Natalia', estudantes))
```

Com `find` e `map`:

```language-javascript

const reportStatus = (name, students) => {
  const student = students.find((student) => student.nome === name);
  return student.materias.map((materia) => (
    `${materia.name} ${(materia.nota >= 60) ? 'Aprovado' : 'Reprovado'}`
  ));
};

console.log(reportStatus('Natalia', estudantes));
```

O código foi de **18** para **6** linhas! Primeiro, fizemos um `find` para buscar e retornar os dados do estudante. O objeto foi retornado e salvo na variável `students`, depois o `map` foi usado para percorrer as `matérias` do objeto retornado e salvar o que se queria em um array da forma desejada.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver alguns exemplos de como aplicar o `map` e `filter`.

Aula ao vivo! Vamos para o Slack onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

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

1. Crie um array com strings no formato `NOME_DO_LIVRO - GÊNERO_DO_LIVRO - NOME_DA_PESSOA_AUTORA`

   * Dica: Use a função `map`

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

const expectedResult = [
  'As Crônicas de Gelo e Fogo - Fantasia - George R. R. Martin',
  'O Senhor dos Anéis - Fantasia - J. R. R. Tolkien',
  'Fundação - Ficção Científica - Isaac Asimov',
  'Duna - Ficção Científica - Frank Herbert',
  'A Coisa - Terror - Stephen King',
  'O Chamado de Cthulhu - Terror - H. P. Lovecraft'
];

function formatedBookNames() {
  // escreva seu código aqui
}

assert.deepStrictEqual(formatedBookNames(), expectedResult);
```

2. Construa um array de objetos a partir do array de livros. Cada objeto deve conter uma propriedade `author`, com o nome da pessoa autora do livro, e uma propriedade `age` com a idade dessa pessoa quando o livro foi lançado. O array deve ser ordenado por idade, ou seja, da pessoa mais jovem para a mais velha considerando suas idades quando o livro foi lançado.

   * Dica: use as funções `map`, `sort`

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

const expectedResult = [
  {
    age: 31,
    author: 'Isaac Asimov'
  },
  {
    age: 38,
    author: 'H. P. Lovecraft'
  },
  {
    age: 39,
    author: 'Stephen King'
  },
  {
    age: 43,
    author: 'George R. R. Martin'
  },
  {
    age: 45,
    author: 'Frank Herbert'
  },
  {
    age: 62,
    author: 'J. R. R. Tolkien'
  }
];

function nameAndAge() {
  // escreva seu código aqui
}

assert.deepStrictEqual(nameAndAge(), expectedResult);
```

3. Crie um array com todos os objetos que possuem gênero ficção científica ou fantasia.

   * Dica: use as função `filter`;

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

const expectedResult = [
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
]

function fantasyOrScienceFiction() {
  // escreva seu código aqui
}

assert.deepStrictEqual(fantasyOrScienceFiction(), expectedResult);
```

4. Crie um array ordenado pelos livros com mais de 60 anos de publicação e ordene-o pelo livro mais velho.

   * Dica: use as funções `filter` e `sort`

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

const expectedResult = [
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror',
    author: { name: 'H. P. Lovecraft', birthYear: 1890 },
    releaseYear: 1928
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: { name: 'Isaac Asimov', birthYear: 1920 },
    releaseYear: 1951
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: { name: 'J. R. R. Tolkien', birthYear: 1892 },
    releaseYear: 1954
  }
]

function oldBooks() {
  // escreva seu código aqui
}

assert.deepStrictEqual(oldBooks(), expectedResult);
```

5. Crie um array em ordem alfabética apenas com os nomes de todas as pessoas autoras de ficção científica ou fantasia.

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

const expectedResult = [
  'Frank Herbert',
  'George R. R. Martin',
  'Isaac Asimov',
  'J. R. R. Tolkien'
]

function fantasyOrScienceFictionAuthors() {
  // escreva seu código aqui
}

assert.deepStrictEqual(fantasyOrScienceFictionAuthors(), expectedResult);
```

6. Crie um array com o nome de todos os livros com mais de 60 anos de publicação.

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

const expectedResult = [
  'O Senhor dos Anéis',
  'Fundação',
  'O Chamado de Cthulhu'
]

function oldBooks() {
  // escreva seu código aqui
}

assert.deepStrictEqual(oldBooks(), expectedResult);
```

7. Encontre o nome do livro escrito pela pessoa cujo nome registrado começa com três iniciais. _Dica: cada inicial termina com um ponto._

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

const expectedResult = 'O Senhor dos Anéis';

function authorWith3DotsOnName() {
  // escreva seu código aqui
}

assert.deepStrictEqual(authorWith3DotsOnName(), expectedResult);
```

---

## Recursos adicionais


* [Página do _MDN_ sobre map](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Página do _MDN_ sobre filter](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Simplify your JavaScript – Use `.map()`, `.reduce()`, and `.filter()`](https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Video sobre `.map` `.reduce` e `.filter`](https://www.youtube.com/watch?v=D_MExaVe95w) {: .external-link target="_blank" rel="noreferrer noopener" }


---

## Próximo

No próximo passo, você aprenderá mais algumas _features_ interessantes do ***ES6***.

<%= next_button(@conn) %>
