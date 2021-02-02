## O que vamos aprender?

Hoje você vai aprender o que são _Higher Order Functions_ e vai conhecer algumas destas funções que são utilizadas com arrays.

Essas funções são bastante poderosas, podendo facilitar muito a manipulação e criação de arrays. Resultando em um código mais legível, conciso e expressivo para você.

---

### Você será capaz de:

- Utilizar a função `Array.forEach` para iterar sobre todos os elementos de um array;

- Utilizar a função `Array.find` para encontrar o primeiro elemento de um array que satisfaça a uma condição;

- Utilizar as funções `Array.some` e `Array.every` para testar se os elementos de um array satisfazem a uma condição;

- Utilizar a função `Array.sort` para ordenar arrays de acordo com algum critério.

---

## Por que isso é importante?

Arrays são um dos tipos de dados mais importantes em qualquer linguagem, e com ***JavaScript*** não é diferente. Em qualquer programa não trivial, você terá que lidar com arrays de alguma forma, seja processando a resposta de uma requisição a um servidor, seja iterando sobre o resultado de uma consulta a um banco de dados para realizar uma operação sobre cada item, por exemplo.

Em suas últimas versões, ***JavaScript*** vem adicionando funções que facilitam muito a criação e manipulação de arrays. Essas funções são extremamente poderosas e ajudam a escrever código que é mais legível, expressivo, conciso, menos propenso a conter erros e, comumente, mais eficiente.

Esse tipo de função não é exclusiva de ***JavaScript***; elas também existem em outras linguagens modernas. Então você precisa se acostumar com elas, pois as verá com frequência no seu dia a dia. Depois de um pouco de prática, você não conseguirá viver sem elas!

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

Antes de mais nada, precisamos entender o que é uma _Higher Order Function_ (HOF). Não se deixe assustar pelo termo pomposo. Uma _Higher Order Function_ é simplesmente uma função que recebe outra função como parâmetro ou que retorna uma função. Você já vem utilizando funções assim desde o começo do curso. Por exemplo, quando você escreve um código como este:

```language-javascript
const button = document.getElementById('button');
button.addEventListener('click', function() {
  console.log('Clicou no botão!');
});
```

Você está passando como segundo parâmetro para a função `addEventListener`, uma função contendo o código a ser executado quando o botão for _clicado_ - no caso, a função simplesmente imprime no console `Clicou no botão!`. Está vendo? Você já usa _HOFs_ sem saber. 🤓

_"Mas por que isso é importante?!"_ Você deve estar se perguntando. Além de _event listeners_, ***JavaScript*** possui várias outras funções desse tipo. Os arrays, em particular, possuem várias funções que facilitam sua criação e manipulação, além de deixar seu código muito mais legível e conciso.

Por exemplo: imagine que você tem um array de objetos. Cada objeto é um estudante com seu nome, nota e situação no curso. Para ser aprovado, ele precisa obter uma nota acima de 60. Como você pode ver, o objeto abaixo está desatualizado e precisa ser atualizado: ele não contém a informação acerca da aprovação. Para atualizá-lo, você provavelmente escreveria algo assim, utilizando _loops_:

```language-javascript
const students = [
  { name: 'Maria', grade: 70, approved: '' },
  { name: 'José', grade: 56, approved: '' },
  { name: 'Roberto', grade: 90, approved: '' },
  { name: 'Ana', grade: 81, approved: '' }
];

function verifyGrade (student){
  if (student.grade >= 60) {
    student.approved = 'Aprovado';
  } else {
    student.approved = 'Recuperação';
  }
}

let i;
for (i = 0; i < students.length; i += 1) {
  verifyGrade(students[i]);
}

console.log(students);
=> [
    { name: 'Maria', grade: 70, approved: 'Aprovado' },
    { name: 'José', grade: 56, approved: 'Recuperação' },
    { name: 'Roberto', grade: 90, approved: 'Aprovado' },
    { name: 'Ana', grade: 81, approved: 'Aprovado' }
  ]
```

Usando `forEach`, é assim que você faria a mesma coisa:

```language-javascript

const students = [
  { name: 'Maria', grade: 70, approved: '' },
  { name: 'José', grade: 56, approved: '' },
  { name: 'Roberto', grade: 90, approved: '' },
  { name: 'Ana', grade: 81, approved: '' }
];

function verifyGrade (student){
  if (student.grade >= 60) {
    student.approved = 'Aprovado';
  } else {
    student.approved = 'Recuperação';
  }
}

students.forEach(verifyGrade);

console.log(students);
=> [
    { name: 'Maria', grade: 70, approved: 'Aprovado' },
    { name: 'José', grade: 56, approved: 'Recuperação' },
    { name: 'Roberto', grade: 90, approved: 'Aprovado' },
    { name: 'Ana', grade: 81, approved: 'Aprovado' }
  ]
```

Ok, as duas abordagens geram o mesmo resultado, mas qual a diferença? Vamos analisar as duas soluções e ver em que elas diferem!

Na solução usando `for`, você vai precisar se preocupar mais com os detalhes durante a implementação de sua lógica de execução e menos com a solução do problema que você deseja solucionar - você só quer atualizar uma propriedade de cada estudante, afinal. Você precisa:

* Declarar uma variável para controlar a iteração pelo array;

* Inicializar essa variável com zero, a primeira posição do array;

* Controlar o ponto de parada, quando o fim do array foi alcançado (`i < students.length`);

* Incrementar manualmente a variável de controle do _loop_ a cada iteração (`i += 1`);

* Usar indexação de arrays pra acessar cada elemento/estudante (`students[i]`);

Ufa! Tudo isso só pra atualizar o seu array!

Agora vamos olhar para a segunda solução. Tudo o que você precisa fazer é chamar a função `forEach` no array e passar para ela a função que você criou. E mais nada! Esse é o poder da função `forEach`. 😎

Ainda não está convencido? Então vamos a mais um exemplo. Queremos encontrar e imprimir no console o primeiro elemento de um array que satisfaça a uma determinada condição. Pode ser, por exemplo, encontrar o primeiro número que seja divisível por 5 em uma lista de números.

Primeiro, usando `for` e `if`:

```language-javascript
const numbers = [11, 24, 39, 47, 50, 62, 75, 81, 96, 100];
let firstMultipleOf5;
for (let i = 0; i < numbers.length; i += 1) {
  if (numbers[i] % 5 === 0) {
    firstMultipleOf5 = numbers[i];
    break;
  }
}

console.log(firstMultipleOf5);
=> 50
```

Agora, a mesma coisa usando `Array.find`:

```language-javascript
const numbers = [11, 24, 39, 47, 50, 62, 75, 81, 96, 100];
const firstMultipleOf5 = numbers.find(number => number % 5 === 0);

console.log(firstMultipleOf5);
=> 50
```

Além de muito mais concisa, a solução usando `find` é muito mais fácil de entender, concorda?

Ponto de observação: note que o parâmetro passado para numbers.find(), `number => number % 5 == 0`, é uma arrow function, igual no primeiro exemplo de forEach, em que foi passada a função `verifyGrade`.

Mas essa ideia de passar uma _arrow function_ para uma função ainda está pouco clara, não é mesmo? E esse parâmetro que ela recebe, vem de onde?! Quem passa? Agora vamos ver, em detalhes, a estrutura de uma _HOF_.

### Estrutura de uma _HOF_

As _Higher Order Functions_ que veremos hoje são parecidas entre si: elas mudam em alguns pontos específicos, mas todas possuem a mesma estrutura. Para demonstrar, olhe o exemplo de uma _HOF_ que imprime na tela cada valor do array:

```language-javascript
const arrayOfValues = ['josé', 50, 0.25, { comida: 'Chocolate' }];
arrayOfValues.forEach((element) => {
  console.log('Cada elemento do array:', element);
});

=> Cada elemento do array: josé
   Cada elemento do array: 50
   Cada elemento do array: 0.25
   Cada elemento do array: { comida: 'Chocolate' }
```

Sua estrutura:

```language-javascript
arrayOfValues.forEach((element) => {
  console.log('Cada elemento do array:', element);
});
```

Suas partes:

 * `arrayOfValues` - Nome do array que será percorrido;
 * `.forEach` - A _HOF_, pode ser, `.find`, `.some`, `.every`;
 * `element` - Valor do elemento do array;
 * `(element) => {console.log('Cada elemento do array:', element);` - função a ser executada, pode ser passada igual ao terceiro exemplo do conteúdo com a função `verifyGrade`.

É isso mesmo! Quando você passa uma _arrow function_ para uma _HOF_, o primeiro parâmetro que essa _arrow function_ recebe é o elemento do array. Em português, é como se:

```language-javascript
  meuArray.forEach(elemento => 
    if(elemento % 2 === 0) { 
      console.log(`${elemento}` é divísivel por 2!)
    } 
  )
```

Significasse `Verifique se cada elemento do meu array é múltiplo de 2`.

Uma função como `meuArray.find(elemento => elemento % 5 === 0)`, por outro lado, seria `Encontre o primeiro elemento de meuArray que é múltiplo de cinco`.

Ficou mais claro agora? A própria _Higher Order Function_ se encarrega da lógica de pegar cada elemento do array e passar como parâmetro para a _arrow function_. Com `for` você faria isso manualmente, a proposta aqui é a _HOF_ fazer pra você! Sua única preocupação deve ser "O que eu quero fazer com cada elemento do array?", e não "Como eu acesso cada elemento do array?".

Observe abaixo que podemos passar mais de um parâmetro para a função também. As _HOFs_ disponibilizam para você, caso precisar, acesso a mais informações do array:

```language-javascript
const arrayOfValues = ['josé', 50, 0.25, { comida: 'Chocolate' }];
arrayOfValues.forEach((element, indexOfTheArray, theEntireArray) => {
  console.log('Cada elemento do array:', element);
  console.log('Index, posição do elemento:', indexOfTheArray);
  console.log('Array percorrido:', theEntireArray);
});

=> ---------------
  Cada elemento do array: josé
  Index, posição do elemento: 0
  Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]
  ---------------
  Cada elemento do array: 50
  Index, posição do elemento: 1
  Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]
  ---------------
  Cada elemento do array: 0.25
  Index, posição do elemento: 2
  Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]
  ---------------
  Cada elemento do array: { comida: 'Chocolate' }
  Index, posição do elemento: 3
  Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]
```

A _arrow function_ passada para o `forEach` possui `element`, `index` e `array` como parâmetros, onde:

 * `element` - Valor do elemento do array;
 * `index` - Índice em cada iteração ou posição do elemento no array, começando do 0;
 * `array` - Array original que está sendo percorrido.

Agora que já aprendeu sobre a estrutura, vamos aprender sobre cada _HOF_.

### Array.forEach

Como foi visto nos exemplos anteriores, o `forEach` percorre o array e executa a função passada para cada um dos seus valores. O `forEach` **não retorna nenhum valor**. 

Assista a seguir o vídeo em que o nosso querido Cairo explica como o método `forEach` funciona.

<%= youtube_video "NvTJJDDu7iE" %>

Para praticar o que foi visto no vídeo, você pode brincar com este exemplo abaixo:

```language-javascript
const emailListInData = [
  "roberta@email.com",
  "paulo@email.com",
  "anaroberta@email.com",
  "fabiano@email.com"
];

const showEmailList = (email) => {
  console.log(`O email ${email} esta cadastrado em nosso banco de dados!`);
}

// Use o método forEach chamando a callback showEmailList para apresentar os emails.
```

Para fixar, você pode praticar com este exemplo do [forEach](https://codepen.io/pen/?template=LYZPEwV) {: .external-link target="_blank" rel="noreferrer noopener" } feito no CodePen.

Agora vamos usar o `forEach`, para realizar a tabuada do 2. Veja o exemplo abaixo:

```language-javascript
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const multipliesFor2 = (element) => {
  console.log(`${element} * 2: ${element * 2}`);
};

numbers.forEach(multipliesFor2);
```

No exemplo acima, foi executado para cada elemento do array a função `multipliesFor2`, que imprime o parâmetro `element` * 2 no console.

Agora estamos tratando de uma _HOF_, sendo assim é possível se utilizar também dos demais parâmetros para se resolver um problema. Como se pode fazer isso? Veja este exemplo abaixo com o uso de `index` no `forEach`:

```language-javascript
const names = ["Bianca", "Camila", "Fernando", "Ana Roberta"];

const convertToUpperCase = (name, index) => {
  names[index] = name.toUpperCase();
}

names.forEach(convertToUpperCase);
console.log(names); // [ 'BIANCA', 'CAMILA', 'FERNANDO', 'ANA ROBERTA' ]
```

Não se esqueça, também, de rodar todos os exemplos no console do seu navegador ou na sua máquina! Isso ajuda **muito** a fixar as coisas. Brinque e experimente com as funções!

### Array.find

A função `find` é utilizada para achar o primeiro elemento que satisfaça a condição passada. Então, a função que deverá ser passada precisa retornar true ou false. [Nesta página](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find) {: .external-link target="_blank" rel="noreferrer noopener" } do _MDN_ você pode ver com mais detalhes sobre o `find`. Leia até a seção _Exemplos_.

A animação abaixo nos mostra como o `find` pode ser utilizado para encontrar o primeiro item do array `listaNumeros` maior do que vinte. Essa condição (item > 20) é implementada na função (callback), que será executada para cada elemento de `listaNumeros`. Quando o primeiro item do array `listaNumeros` for maior que vinte, a função (callback) retornará `true` e o `find` irá retornar este elemento que satisfaz a condição passada. Observe que o retorno do método `find` é um único elemento: o primeiro item de `listaNUmeros` maior do que 20.

<%= figure(%{src: "/fundamentals/arrays-and-hof/hof-part-1/images/find.gif", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "GIF ilustrando o método .find()"}) %>

Olhe o exemplo abaixo:

```language-javascript
const numbers = [19, 21, 30, 3, 45, 22, 15];

const verifyEven = (number) => number % 2 === 0;

const isEven = numbers.find(verifyEven);

console.log(isEven); // 30

console.log(verifyEven(9)); // False
console.log(verifyEven(14)); // True

// Outra forma de ser realizada sem a necessidade de criar uma nova função.
const isEven2 = numbers.find((number) => number % 2 === 0);

console.log(isEven2); // 30
```

Esse exemplo mostra duas formas de resolver o mesmo problema, que é retornar o primeiro número par do array.

Primeiro observe a função `verifyEven`. Ela verifica se o número recebido é par. Se sim, seu retorno será true; caso contrário, seu retorno é false.

Quando a passamos como _`callback`_, o find executará a função para cada um dos elementos do array e retornará o primeiro elemento quando o retorno da função for true.

### Array.some e Array.every

As funções `some` e `every` são parecidas. A primeira retorna `true` se **ao menos** um elemento de um array satisfaz a uma condição. A segunda retorna `true` se **todos** os elementos de um array satisfazem a uma condição. O _MDN_ contém explicações mais detalhadas sobre essas funções, além de exemplos. Clique [aqui](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some) {: .external-link target="_blank" rel="noreferrer noopener" } e [aqui](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every) {: .external-link target="_blank" rel="noreferrer noopener" } para ler sobre essas funções. Leia até a seção _Exemplos_.

Para visualizar melhor o retorno dos métodos `some` e `every`, brinque com esses dois exemplos no CodePen nos links abaixo. Você pode alterar os números do array `numbers` para verificar o que a função está retornando para cada caso.

`Array.some`:
[link](https://codepen.io/pen/?template=abZoOZz) {: .external-link target="_blank" rel="noreferrer noopener" }

`Array.every`:
[link](https://codepen.io/pen/?template=NWrKqME) {: .external-link target="_blank" rel="noreferrer noopener" }

O exemplo abaixo usa o `some` para verificar se possui algum nome que começa com a letra desejada:

```language-javascript
const listNames = ['Maria', 'Manuela', 'Jorge', 'Ricardo', 'Wilson'];

const verifyFirstLetter = (letter, names) => {
  return names.some((name) => name[0] === letter);
};

console.log(verifyFirstLetter('J', listNames)); // true
console.log(verifyFirstLetter('x', listNames)); // false
```

O exemplo abaixo usará o `every` para verificar se o estudante passou em todas as matérias:

```language-javascript
const grades = {
  portugues: 'Aprovado',
  matematica: 'Reprovado',
  ingles: 'Aprovado',
};

const verifyGrades = (studentGrades) => {
  return Object.values(studentGrades).every((grade) => grade === 'Aprovado');
};

console.log(verifyGrades(grades));
```

Observe que foi usado `Object.values` junto com o `every`. Como o `Object.values` retorna um array apenas com os valores do objeto, o `every` percorrerá esse array retornado. Interessante essa combinação de funções, hein?! Experimente alguma combinação dessas na sua própria máquina agora!

### Array.sort

Por último, existe a função `sort`. Ela permite ordenar um array de acordo com algum critério estabelecido. Veja este exemplo com um array de strings:

```language-javascript
const food = ['arroz', 'feijão', 'farofa', 'chocolate', 'doce de leite'];
food.sort();
console.log(food);
// [ 'arroz', 'chocolate', 'doce de leite', 'farofa', 'feijão' ]
```

Funcionou bem com um array de strings, não é mesmo? Por tanto, caso queira ordenar de forma alfabética, basta chamar `sort`, sem parâmetros algum na função. Agora, veja este exemplo com um array de números:

```language-javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.sort();
console.log(numbers); // [1, 10, 2, 3, 4, 5, 6, 7, 8, 9]
```

😮 O que aconteceu com esta ordenação?

Como pode notar, a forma como ela organiza os elementos do array não é tão intuitiva. Isso ocorre, pois ela distribui sempre **por ordem alfabética**. No caso, quando há elementos como números, a `sort` coloca de acordo com a ordem alfabética dos códigos desse elemento na tabela de caracteres unicode!

Agora, se deseja ordenar de forma numérica crescente, é necessário passar a função a seguir:

```language-javascript
const points = [40, 100, 1, 5, 25, 10];
points.sort((a, b) => a - b);
console.log(points); // [1, 5, 10, 25, 40, 100]
```

A lógica é a seguinte: a função recebe, da `sort`, todos os elementos do array, em pares `(elemento1, elemento2)`, e vai comparando-os. O formato é `meuArray.sort((elemento1, elemento2) => /* logica da função */)`. Ou seja: para o array `[1, 2, 3, 4]`, a função receberá `(1, 2)`, `(1, 3)`, ..., `(3, 4)` como parâmetros e ordenará o array com base em seu resultado. Se a operação de `elemento1` com `elemento2` der resultado negativo, `elemento1` vai para trás. Caso contrário, vai para frente, para, de forma decrescente, só inverter `elemento1 - elemento2` para `elemento2 - elemento1`. Novamente, o [artigo do MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) {: .external-link target="_blank" rel="noreferrer noopener" } é uma excelente fonte de informação para entender melhor.

Veja agora se realizarmos uma simples modificação no retorno da função que ordena os números e veja o que acontece:

```language-javascript
const points = [40, 100, 1, 5, 25, 10];
points.sort((a, b) => b - a);
console.log(points); // [ 100, 40, 25, 10, 5, 1 ]
```

Para visualizar como o `sort` funciona, brinque com [este exemplo](https://codepen.io/pen/?template=gOMYaXy) {: .external-link target="_blank" rel="noreferrer noopener" } feito no CodePen.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 110 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Nos exercícios a seguir, você trabalhará com uma estrutura de dados representando uma lista de livros, contendo informações como nome do livro, gênero, pessoa autora do livro e data de lançamento.

Em cada exercício, será pedido que você encontre ou produza alguma informação a respeito dessa lista utilizando as funções que você aprendeu hoje. Todos os exercícios contêm um código base. Você deverá copiar esse código e salvá-lo em um arquivo nomeado conforme o número do exercício, completando a função em branco.

Por exemplo, o exercício 1 deve ser salvo no arquivo `exercise1.js`, e assim por diante. Em cada exercício existe uma ou mais chamadas de funções do módulo [assert](https://www.w3schools.com/nodejs/ref_assert.asp) {: .external-link target="_blank" rel="noreferrer noopener" }. Essas funções checarão automaticamente se seu código retorna o resultado esperado.

Sua solução só será considerada correta se **todos** os _asserts_ do arquivo forem executados sem erros. No _Visual Studio Code_, você pode executar o código do exemplo _clickando_ com o botão direito e escolhendo a opção `Run Code`.

Quando todos os _asserts_ passam, isto é, nenhum deles encontra um resultado diferente do esperado, nada de diferente do normal é reportado:

```language-javascript
const assert = require('assert');

function funcaoQualquer() {
  return 'valor1';
}

assert.strictEqual(funcaoQualquer(), 'valor1');
```

```language-sh
[Running] node "/Users/leandro/example.js"

[Done] exited with code=0 in 0.087 seconds
```


Quando algum _assert_ falha, é exibida, entre outras coisas, a linha onde o erro aconteceu e sua causa:

```language-javascript
const assert = require('assert');

function funcaoQualquer() {
  return 'valor1';
}

assert.strictEqual(funcaoQualquer(), 'valor2');
```

```language-sh
[Running] node "/Users/leandro/example.js"
assert.js:92
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: 'valor1' == 'valor2'
    at Object.<anonymous> (/Users/leandro/example.js:7:8)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
    at internal/main/run_main_module.js:17:11 {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: 'valor1',
  expected: 'valor2',
  operator: '=='
}

[Done] exited with code=1 in 0.075 seconds
```

Atente para a linha que diz por que a execução falhou: `AssertionError [ERR_ASSERTION]: 'valor1' == 'valor2'`. Isso significa que o resultado da função `funcaoQualquer,` `valor1`, é diferente do esperado, `valor2`.

### Agora a prática

Estes exercícios praticam os conceitos de _Higher Order Functions_ associados a outros já vistos, como _arrow functions_, _template literals_, _objetos_ e temas dos fundamentos. Essa mistura de conceitos é muito importante para seu aprendizado, então use tudo o que sabe para resolver os exercícios!

1. Encontre o nome da primeira pessoa autora do livro nascida no ano de 1947.

   * Dica: use a função `find`.

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

function authorBornIn1947() {
  // escreva aqui o seu código
}

assert.strictEqual(authorBornIn1947(), 'Stephen King');
```

2. Retorne o nome do livro de menor nome.

   * Dica: use a função `forEach`.

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

function smallerName() {
  let nameBook;
  // escreva aqui o seu código

  // Variável nameBook que receberá o valor do menor nome;
  return nameBook;
}

assert.strictEqual(smallerName(), 'Duna');
```

3. Encontre o primeiro livro cujo nome possui 26 caracteres.

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

function getNamedBook() {
  // escreva seu código aqui
}

assert.deepStrictEqual(getNamedBook(), expectedResult);
```

4. Ordene os livros por data de lançamento em ordem decrescente.

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
    author: { name: 'George R. R. Martin', birthYear: 1948 },
    releaseYear: 1991
  },
  {
    id: 5,
    name: 'A Coisa',
    genre: 'Terror',
    author: { name: 'Stephen King', birthYear: 1947 },
    releaseYear: 1986
  },
  {
    id: 4,
    name: 'Duna',
    genre: 'Ficção Científica',
    author: { name: 'Frank Herbert', birthYear: 1920 },
    releaseYear: 1965
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: { name: 'J. R. R. Tolkien', birthYear: 1892 },
    releaseYear: 1954
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: { name: 'Isaac Asimov', birthYear: 1920 },
    releaseYear: 1951
  },
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror',
    author: { name: 'H. P. Lovecraft', birthYear: 1890 },
    releaseYear: 1928
  }
] ;

function booksOrderedByReleaseYearDesc() {
  // escreva aqui seu código
}


assert.deepStrictEqual(booksOrderedByReleaseYearDesc(), expectedResult);
```

5. Faça uma função que retorne `true`, se todas as pessoas autoras nasceram no século XX, ou `false`, caso contrário.

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

const expectedResult = false

function everyoneWasBornOnSecXX() {
  // escreva seu código aqui
}

assert.strictEqual(everyoneWasBornOnSecXX(), expectedResult);
```

6. Faça uma função que retorne `true`, se algum livro foi lançado na década de 80, e `false`, caso contrário.

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

const expectedResult = true

function someBookWasReleaseOnThe80s() {
  // escreva seu código aqui
}

assert.strictEqual(someBookWasReleaseOnThe80s(), expectedResult);
```

7. Faça uma função que retorne `true`, caso nenhum author tenha nascido no mesmo ano, e `false`, caso contrário.

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

const expectedResult = false;

function authorUnique() {
  // escreva seu código aqui
}

assert.strictEqual(authorUnique(), expectedResult);
```

---

## Recursos adicionais

* [Qual a diferença entre as funções filter e find no javascript?](https://www.youtube.com/watch?v=_vLlU-a8-MA) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Página do _MDN_ sobre forEach](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Página do _MDN_ sobre sort](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você aprenderá mais algumas _HOF_.

<%= next_button(@conn) %>
