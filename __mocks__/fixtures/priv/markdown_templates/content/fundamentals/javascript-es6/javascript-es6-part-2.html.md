## O que vamos aprender?

Hoje você vai aprender sete `features` do ***ES6*** que são muito úteis na hora de desenvolver uma aplicação:

* `spread operator`;
* `parâmetro rest`;
* `object destructuring`;
* `array destructuring`;
* `default destructuring`;
* `abbreviation object literal`;
* `default params`.

---

### Você será capaz de:

* Aplicar corretamente `spread operator`;
* Aplicar corretamente `parâmetro rest`;
* Aplicar corretamente `object destructuring`;
* Aplicar corretamente `array destructuring`;
* Aplicar corretamente `default destructuring`;
* Aplicar corretamente `abbreviation object literal`;
* Aplicar corretamente `default params`.

---

## Por que isso é importante?

Como vimos no bloco passado, o **ES6** introduziu várias `features` que contribuem para melhorar a escrita do seu código. Hoje vamos aprender mais alguns recursos que você definitivamente vai querer ter na sua caixa de ferramentas! Saber usá-los te ajudará a escrever códigos mais concisos e limpos, facilitando a compreensão de quem for lê-lo futuramente. `Object destructuring`, por exemplo, é muito útil na hora de realizar uma tarefa recorrente de desenvolvedor: selecionar certos campos vindos da resposta de uma _API_. Com `object destructuring` você consegue declarativamente realizar essa tarefa, deixando seu código mais legível.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### spread operator

Como você faria para adicionar items a um array? Você pode ter pensado em usar o `push`, como no exemplo abaixo:

```language-javascript
const numbers = [1, 2, 3];
numbers.push(4);

console.log(numbers); // [1, 2, 3, 4];
```
{: .line-numbers}

Essa solução é válida, e o seu raciocínio está correto! Mas...para onde foi parar o array original `numbers`? Observe que quando usamos o `push` para adicionar algo a um array, ele será sobrescrito. Neste exemplo simples, sobrescrever o array `numbers` não foi um problema. No entanto, em aplicações maiores em que você precisa atualizar alguma informação de um array ou objeto, você pode querer manter as informações originais e apenas criar uma cópia do array original com o que precisa ser alterado. Em cenários como esse, vamos deixar o `push` de lado e usar um recurso incrível para adicionar valores a objetos iteráveis: o operador `spread`. E não para por ai! Você verá que o `spread` pode ser utilizado para combinar objetos e arrays, para copiar valores de objetos iteráveis, e em funções que recebem múltiplos argumentos.

Primeiramente, assista a este vídeo que explica o operador **spread**.

 <%= vimeo "484097391" %>

Como vimos no vídeo, o operador `spread` é um recurso do **ES6** que nos permite **espalhar** os valores de um objeto iterável, como um array, em um novo objeto. Dessa forma, apenas copiamos as informações do array original e colamos em outro lugar. Acompanhe o exemplo numérico abaixo para fixar melhor a ideia do `spread`:

```language-javascript
const numbers = [1, 2, 3];

const newArray = [...numbers, 4, 5, 6];
console.log(newArray); // [ 1, 2, 3, 4, 5, 6 ];
console.log(numbers); // [ 1, 2, 3 ];
```
{: .line-numbers}

Muito legal, né? E você pode usar o `spread` em outra posição de `newArray`. Experimente passar o `...numbers` no final do array e veja o que acontece. O `spread` é muito útil também quando precisamos combinar arrays em uma única estrutura, como ilustrado abaixo:

```language-javascript
const spring = ['OUT', 'NOV', 'DEZ'];
const summer = ['JAN', 'FEV', 'MAR'];
const fall = ['ABR', 'MAI', 'JUN'];
const winter = ['JUL', 'AGO', 'SET'];

const months = [...summer, ...fall, ...winter, ...spring];
console.log(months); /* [
  'JAN', 'FEV', 'MAR',
  'ABR', 'MAI', 'JUN',
  'JUL', 'AGO', 'SET',
  'OUT', 'NOV', 'DEZ'
] */
```
{: .line-numbers}

Outro uso interessante do `spread` é no argumento de uma função que recebe vários parâmetros. No próximo exemplo, temos uma função que calcula o IMC (índice de massa corporal) de um paciente. A função recebe como parâmetros o peso e a altura da pessoa, e retorna o resultado arredondado do IMC. Podemos salvar os dados do paciente em um array e utilizar o `spread` para expandir esses valores no argumento da função que calcula o IMC:

```language-javascript
const imc = (peso, altura) => (peso / (altura * altura)).toFixed(2);
const patientInfo = [60, 1.7];

console.log(imc(...patientInfo)); // 20.76
```
{: .line-numbers}

E você pode aplicar esse conceito em funções prontas do Javascript que recebem múltiplos parâmetros, como as funções `Math.max` e `Math.min`. Vamos ver um exemplo?

```language-javascript
const randomNumbers = [57, 8, 5, 800, 152, 74, 630, 98, 40];

console.log(Math.max(...randomNumbers)); // 800
console.log(Math.min(...randomNumbers)); // 5
```
{: .line-numbers}

Outro exemplo que pode ser válido para a sua compreensão é que você também pode fazer o mesmo com objetos. Veja o exemplo abaixo:

```language-javascript
const people = {
  id: 101,
  name: 'Alysson',
  age: 25,
};

const about = {
  address: 'Av. Getúlio Vargas, 1000',
  occupation: "Developer",
};

const customer = {...people, ...about};
console.log(customer); /* {
  id: 101,
  name: 'Alysson',
  age: 25,
  address: 'Av. Getúlio Vargas, 1000',
  occupation: 'Developer'
} */
```
{: .line-numbers}

Para fixar e praticar, vamos fazer uma salada de frutas com itens adicionais que você desejar. Faça uma função chamada `fruitSalad` passando como parâmetro `specialFruit` e `additionalItens`, faça a função retornar uma lista única contendo todos os itens da nossa salada de frutas usando o `spread`.

```language-javascript
// Faça uma lista com as suas frutas favoritas
const specialFruit = ['', '', ''];

// Faça uma lista de complementos que você gostaria de adicionar
const additionalItens = ['', '', ''];

const fruitSalad = (fruit, additional) => {
  // Esreva sua função aqui
};

console.log(fruitSalad(specialFruit, additionalItens));
```
{: .line-numbers}

Lembre-se de continuar praticando e dar asas para a sua imaginação com outras possibilidades.

### Parâmetro rest

Agora que você viu como funciona o `spread operator`, vamos aprender mais um recurso que irá te auxiliar a criar funções que recebem um número ilimitado de argumentos: o parâmetro `rest`.

O parâmetro `rest` é uma `feature` do ES6 que permite com que você crie funções que recebam um número variável de argumentos. Assim, suas funções ficam mais flexíveis. Os argumentos que serão passados como parâmetro são salvos em um array que pode ser acessado de dentro da função. Por isso, podemos passar *qualquer* tipo de parâmetro quando usamos o `rest`. Todos eles serão colocados dentro de um array, o que te permite usar métodos como o `.length`. Acompanhe o exemplo abaixo para entender melhor essa ideia:

```language-javascript
function quantosParams(...args) {
  console.log('parâmetros:', args)
  return `Você passou ${args.length} parâmetros para a função.`;
};

console.log(quantosParams(0, 1, 2)); // Você passou 3 parâmetros para a função.
console.log(quantosParams("string", null, [1, 2, 3], { })); // Você passou 4 parâmetros para a função.
```
{: .line-numbers}

Observe no segundo `console.log` que passamos diferentes tipos de argumentos para a função `quantosParams` e todos foram colocados em um array. Quer ver mais um exemplo onde o `rest` é muito útil? Acompanhe!

```language-javascript
const sum = (...args) => {
  return args.reduce((accumulator, current) => accumulator + current, 0);
};
console.log(sum(4, 7, 8, 9, 60)); // 88
```
{: .line-numbers}

Nós já aprendemos sobre *higher order functions* e vimos como o método `reduce` é útil para somar os elementos de um array. No exemplo acima, a função `sum` calcula a soma de todos os argumentos passados a ela - independente do número. Como o parâmetro `rest` "empacota" todos os argumentos em um array, podemos utilizar o `reduce` para somar tudo o que estiver dentro deste array. Experimente passar mais números como argumento para a função `sum`. Você verá que independente do número de argumentos passados, a função irá executar a soma. Sua função é muito mais flexível quando queremos passar múltiplos parâmetros com o `rest` pois você não precisa especificar quantos argumentos a função irá receber!

### object destructuring

Você certamente já precisou extrair valores de um objeto em Javascript. No exemplo abaixo, como você faria para imprimir o valor de cada propriedade do objeto `product`?

```language-javascript
const product = {
  name: 'Smart TV Crystal UHD',
  price: '1899.05',
  seller: 'Casas de Minas'
};
```
{: .line-numbers}

Uma forma seria acessar os valores utilizando a notação de objeto, como `console.log(product.name)`, e repetir para cada propriedade. Essa tarefa é repetitiva e verbosa...quando lidamos com objetos mais complexos, ela seria até mesmo impraticável. Para a nossa alegria o ES6 introduz mais um recurso para tornar atividades corriqueiras, como acessar os valores de um objeto, mais simples e com menos declarações. Essa `feature` é o que chamamos de desestruturação de objeto ou `object destructuring`.

E como exatamente funciona a desestruturação de objeto? Vamos voltar ao exemplo do objeto `product`. A sintaxe da desestruturação de objetos pede para passarmos o nome das propriedades que queremos acessar do lado esquerdo, entre chaves, e o objeto do lado direito:

```language-javascript
const { name } = product;
console.log(name); // Smart TV Crystal UHD
```
{: .line-numbers}

Se quisermos pegar, além do nome, o vendedor do produto, podemos incluir a propriedade `seller` dentro das chaves para acessar o seu valor correspondente:

```language-javascript
const { name, seller } = product;
console.log(name); // Smart TV Crystal UHD
console.log(seller); // Casas de Minas
```
{: .line-numbers}

Dessa forma, conseguimos extrair o valor da propriedade que precisamos acessar com muito menos código, atribuindo este valor à variáveis. Vale lembrar também que podemos adicionar quantas propriedades forem necessárias dentro das chaves, basta seguirmos a sintaxe da desestruturação de objetos.

Outro truque legal dessa `feature` é que você pode reatribuir o nome da propriedade que deseja acessar ao declará-la como uma variável. Acompanhe o exemplo abaixo.

```language-javascript
const student = {
  a: 'Maria',
  b: 'Turma B',
  c: 'Matematica',
};
```
{: .line-numbers}

As propriedades do objeto `student` não são nada descritivas, não é mesmo? Se fossemos desestruturar esse objeto, as variáveis que seriam criadas ao extrair as propriedades de `students` teriam nomes sem significado...pensando nisso, podemos trocar o nome da variável ao fazermos a desestruturação:

```language-javascript
const student = {
  a: 'Maria',
  b: 'Turma B',
  c: 'Matematica',
};

const { a:name, b:classAssigned, c:subject } = student;

console.log(name); // Maria
console.log(classAssigned); // Turma B
console.log(subject); // Matemática
```
{: .line-numbers}

Nesse exemplo, informamos qual a propriedade que gostaríamos de acessar e a declaramos em uma nova variável seguindo a sintaxe: `{ propriedade:nomeVariável } = objeto`. Essa forma de acessar um valor de um objeto e atribuí-lo a uma variável é equivalente ao que temos abaixo:

```language-javascript
const student = {
  a: 'Maria',
  b: 'Turma B',
  c: 'Matematica',
};
const name = student.a;
console.log(name); // Maria
```
{: .line-numbers}

Você deve estar se perguntando: o que acontece quando tento acessar um campo inexistente? Experimente fazer esse teste! Como sabemos, o Javascript não vai conseguir fazer essa associação porque esse campo não existe e a variável receberá o valor `undefined`.

Por fim, uma outra situação que podemos usar a desestruturação de objetos é quando queremos passar os valores de um objeto como parâmetros para uma função, como no exemplo abaixo:

```language-javascript
const product = {
  name: 'Smart TV Crystal UHD',
  price: '1899.05',
  seller: 'Casas de Minas'
};

const printProductDetails = ({ name, price, seller }) => {
  console.log(`Promoção! ${name} por apenas ${price} é só aqui: ${seller}`)
};

printProductDetails(product); // Promoção! Smart TV Crystal UHD por apenas 1899.05 é só aqui: Casas de Minas
```
{: .line-numbers}

### array destructuring

Agora que você entende como a desestruturação funciona, você pode estar se perguntando: será que ela também se aplica a `arrays`? Afinal de contas, arrays são objetos iteráveis e têm algumas similaridades com os objetos em Javascript... Este questionamento é válido, e a resposta é: SIM! Podemos desestruturar arrays da mesma forma que desestruturamos objetos usando a notação para `array destructuring`.

Como vimos na sessão anterior, podemos utilizar a desestruturação para acessar valores de um objeto e atribuí-los a variáveis. Você certamente já acessou um valor de uma posição do array da seguinte forma:

```language-javascript
const arrayCountries = ['Brazil', 'Japan', 'China', 'Canada'];

const firstCountry = arrayCountries[0];
const secondCountry = arrayCountries[1];
const thirdCountry = arrayCountries[2];
const fourthCountry = arrayCountries[3];

console.log(firstCountry); // Brazil
console.log(secondCountry); // Japan
console.log(thirdCountry); // China
console.log(fourthCountry); // Canada
```
{: .line-numbers}

Com a desestruturação de array podemos declarar todas as variáveis contendo os nomes dos países usando apenas uma única linha de código:

```language-javascript
const arrayCountries = ['Brazil', 'Japan', 'China', 'Canada'];
const [ firstCountry, secondCountry, thirdCountry, fourthCountry ] = arrayCountries;

console.log(firstCountry); // Brazil
console.log(secondCountry); // Japan
console.log(thirdCountry); // China
console.log(fourthCountry); // Canada
```
{: .line-numbers}

Mais uma vez, hora de praticar com exercícios!

1. [Exercício de array destructuring 1.](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-to-assign-variables-from-arrays) {: .external-link target="_blank" rel="noreferrer noopener" }

2. [Exercício de array destructuring 2.](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-with-the-rest-parameter-to-reassign-array-elements) {: .external-link target="_blank" rel="noreferrer noopener" }

### default destructuring

Agora você já sabe como aplicar desestruturação em objetos e arrays. Você se lembra do que acontece quando tentamos acessar:

* uma propriedade que não existe em um objeto?
* um valor em uma posição inexistente em um array?

Ou seja:

```language-javascript
const person = {
    name: "João",
    lastName: "Jr",
    age: 34
};

const { nationality } = person;
```
{: .line-numbers}

Essa desestruturação funciona? E se funciona, qual o valor que aparece se fizer `console.log(nationality)`? Copie esse código e teste você mesmo. 😉

Como vimos nas sessões anteriores, quando tentamos acessar uma propriedade que não existe, como `nationality`,  o valor retornado é `undefined`. E se você quisesse dar um valor padrão para `nationality`, caso essa propriedade não exista no objeto? Você consegue atribuir esse valor padrão utilizando `default destructuring`, que é mais um recurso do ES6:

```language-javascript
const person = {
    name: "João",
    lastName: "Jr",
    age: 34
};

const { nationality = "Brazilian" } = person;
console.log(nationality); // Brazilian
```
{: .line-numbers}

Analogamente, o mesmo pode ser feito na hora de desestruturar um array:

```language-javascript
const position2d = [1.0, 2.0];
const [x, y, z = 0] = position2d;

console.log(z); // 0
```
{: .line-numbers}

Que tal praticarmos `default destructuring` com um exercício de fixação? Do jeito que está, quando passamos `person` para a função `nationality` o retorno é `João is undefined`. Ajuste a função `nationality` para que a chamada `nationality(person)` retorne `João is Brazilian`.

```language-javascript

const nationality = ({ firstName, nationality }) => `${firstName} is ${nationality}`

const person = {
    firstName: "João",
    lastName: "Jr II"
};

const otherPerson = {
    firstName: "Ivan",
    lastName: "Ivanovich",
    nationality: "Russian"
};

console.log(nationality(otherPerson)); // Ivan is Russian
console.log(nationality(person));
```
{: .line-numbers}

### Object property shorthand

Você já deve ter percebido que uma das vantagens do ES6 é que a nova sintaxe elimina códigos repetitivos, contribuindo para a limpeza do código. A `property shorthand` é um recurso muito útil na hora de declarar objetos em Javascript. A função abaixo recebe como parâmetro informações sobre um novo usuário e retorna um objeto contendo esses dados. Observe que as propriedades do objeto retornado e os argumentos que passamos para `newUser` são idênticos. Essa repetição parece desnecessária, não é mesmo?

```language-javascript
const newUser = (id, name, email) => {
  return {
    id: id,
    name: name,
    email: email,
  };
};

console.log(newUser(54, 'isabella', 'isabella@email.com')); // { id: 54, name: 'isabella', email: 'isabella@email.com' }
```
{: .line-numbers}

É exatamente essa repetição que a `feature` `property shorthand` elimina: podemos simplesmente substituir `id: id` por `id` que o Javascript entende que você quer atribuir o valor de `id` a uma propriedade com o mesmo nome que o parâmetro passado:

```language-javascript
const newUser = (id, name, email) => {
  return {
    id,
    name,
    email,
  };
};

console.log(newUser(54, 'isabella', 'isabella@email.com')); // { id: 54, name: 'isabella', email: 'isabella@email.com' }
```
{: .line-numbers}

Muito legal, não é mesmo? Este é mais um recurso que te permite escrever códigos mais concisos! Agora é hora de praticar: altere a função `getPosition` utilizando a `property shorthand`.

```language-javascript
const getPosition = (latitude, longitude) => ({
  latitude: latitude,
  longitude: longitude});

console.log(getPosition(-19.8157, -43.9542));
```
{: .line-numbers}


### default parameters

Por último, mas não menos importante, vamos entender o que é o parâmetro `default`. Imagine que você queira executar a função `greeting` abaixo, que imprime uma saudação para o usuário. O que acontece quando você chama a função sem passar o argumento que ela espera? Faça esse teste com o exemplo no seu editor de códigos!

```language-javascript
const greeting = (user) => console.log(`Welcome ${user}!`);

greeting(); // Welcome undefined!
```
{: .line-numbers}

Você verá que a função retornará `undefined`. Você consegue pensar em uma forma de corrigir esse problema? Afinal, podemos esquecer de chamar a função com o nome do usuário. Uma solução seria:

```language-javascript
const greeting = (user) => {
  user = typeof user === 'undefined' ? 'usuário' : user;
  console.log(`Welcome ${user}!`);
};

greeting(); // Welcome usuário!
```
{: .line-numbers}

Essa solução não parece muito elegante, não é mesmo? Afinal, precisamos de incluir uma linha para checar se o parâmetro é indefinido. Se sim, definimos que `user` será `'usuário'`. Caso contrário, a função irá imprimir a mensagem com o nome do usuário passado como argumento.

Com o ES6, podemos pré-definir um parâmetro padrão para a função. Assim, podemos reescrever o exemplo anterior da seguinte forma:

```language-javascript
const greeting = (user = 'usuário') => console.log(`Welcome ${user}!`);

greeting(); // // Welcome usuário!
```
{: .line-numbers}

Simples assim! Passar um parâmetro como `default` é um pequeno detalhe que torna o seu código muito mais semântico. Assim, o `default` será utilizado caso nenhum argumento seja fornecido a função. Você pode adicionar mais de um parâmetro `default` caso a sua função receba vários argumentos, se achar necessário. Para praticar, escreva uma função `multiply` que multiplique dois números passados como argumentos. Atribua como `default` o valor 1 caso não seja passado nenhum valor como segundo parâmetro.

```language-javascript
const multiply = (number, value) => {
  // Escreva aqui a sua função
};

console.log(multiply(8));
```
{: .line-numbers}

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Te apresentamos as 🔧🔨, partiu prática!

Aula ao vivo! Vamos para o Slack onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Todos os exercícios contêm um código base. Você deverá copiar esse código e salvá-lo em um arquivo nomeado conforme o número do exercício. Por exemplo, o exercício 1 deve ser salvo no arquivo `exercise1.js`, e assim por diante.

Em cada exercício existe uma ou mais chamadas de função do módulo [assert](https://www.w3schools.com/nodejs/ref_assert.asp) {: .external-link target="_blank" rel="noreferrer noopener" }. Estas funções checarão automaticamente se seu código retorna o resultado esperado. Sua solução só será considerada correta se **todos** os _asserts_ do arquivo forem executados sem erros.

No _Visual Studio Code_, você pode executar o código do exemplo clicando com o botão direito e escolhendo a opção `Run Code`.

Quando todos os _asserts_ passam, isto é, nenhum deles encontra um resultado diferente do esperado, nada de diferente do normal é reportado:

```language-javascript
const assert = require('assert');

function foo() {
  return 'bar';
}

assert.strictEqual(foo(), 'bar');
```

```language-sh
[Running] node "/Users/tryber/example.js"

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
[Running] node "/Users/tryber/example.js"
assert.js:92
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: 'bar' == 'baz'
    at Object.<anonymous> (/Users/tryber/example.js:7:8)
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

1. Dado o código abaixo, complete-o de forma que seja impressa a área dos 3 retângulos. O código deve retornar em sequência `2`, `15` e `54`.

  * Dica: use `spread operator`.

```language-javascript
const assert = require('assert')

const rectangleArea = (width, height) => width * height

const rectangle1 = [1, 2]
const rectangle2 = [3, 5]
const rectangle3 = [6, 9]
const rectangles = [rectangle1, rectangle2, rectangle3]

for(rectangle of rectangles) {
    assert.strictEqual(rectangleArea(), rectangle[0]*rectangle[1]) // altere a chamada da funcao rectangleArea
}
```

2. Crie uma função `sum` que dado um número variável de elementos retorna a soma desses elementos. Ou seja:

  * Dica: use `parâmetro rest`.

```language-javascript
const assert = require('assert')

// escreva sum abaixo

assert.strictEqual(sum(), 0)
assert.strictEqual(sum(1), 1)
assert.strictEqual(sum(1, 2), 3)
assert.strictEqual(sum(1, 2, 3), 6)
assert.strictEqual(sum(1, 2, 3, 4), 10)
```

3. Escreva a função `personLikes`, que dado um objeto de parâmetro que representa uma pessoa, retorna todos os gostos daquela pessoa, conforme mostrado abaixo:

  * Dica: use `object destructuring.`

```language-javascript
const assert = require('assert')

const alex = {
    name: "Alex",
    age: 26,
    likes: ["fly fishing"],
    nationality: "Australian"
}

const gunnar = {
    name: "Gunnar",
    age: 30,
    likes: ["hiking", "scuba diving", "taking pictures"],
    nationality: "Icelandic"
}

// complete a assinatura da função abaixo
const personLikes = () => `${name} is ${age} years old and likes ${likes.join(", ")}.`
assert.strictEqual(personLikes(alex), "Alex is 26 years old and likes fly fishing.")
assert.strictEqual(personLikes(gunnar), "Gunnar is 30 years old and likes hiking, scuba diving, taking pictures.")
```

4. Escreva uma função `filterPeople` que, dada uma lista de pessoas, retorna todas as pessoas australianas que nasceram no século 20:

  * Dica: use `object destructuring`.

```language-javascript
const assert = require('assert')

const people = [
    {
        name: "Nicole",
        bornIn: 1992,
        nationality: "Australian"
    },
    {
        name: "Harry",
        bornIn: 2008,
        nationality: "Australian"
    },
    {
        name: "Toby",
        bornIn: 1901,
        nationality: "Australian"
    },
    {
        name: "Frida",
        bornIn: 1960,
        nationality: "Dannish"
    },
    {
        name: "Fernando",
        bornIn: 2001,
        nationality: "Brazilian"
    }
]

// escreva filterPeople abaixo

const filteredPeople = filterPeople(people)

assert.deepStrictEqual(filteredPeople[0], { name: "Nicole", bornIn: 1992, nationality: "Australian" })
assert.deepStrictEqual(filteredPeople[1], { name: "Toby", bornIn: 1901, nationality: "Australian" })
```

5. Escreva a função `swap`, que dado um array de 3 elementos, retorna um novo array com o primeiro e terceiro elementos trocados. Detalhe: você precisa fazer essa função gastando 1 linha só:

  * Dica: use `array destructuring`.

```language-javascript
const assert = require('assert')

const myList = [1, 2, 3]

// escreva swap abaixo

const swappedList = swap(myList)

assert.strictEqual(swappedList[0], 3)
assert.strictEqual(swappedList[1], 2)
assert.strictEqual(swappedList[2], 1)
```

6. Suponha que você esteja lidando com carros e, da forma como o problema lhe foi entregue, cada carro é modelado como um array. Porém, essa modelagem está baixo nível. Cria uma função `toObject` que, dada uma lista, retorna um objeto representando o carro:

  * Dica: use `array destructuring` e `abbreviation object literal`.

```language-javascript
const assert = require('assert')

const palio = ["Palio", "Fiat", 2019]
const shelbyCobra = ["Shelby Cobra", "Ford", 1963]
const chiron = ["Chiron", "Bugatti", 2016]

// escreva toObject abaixo

assert.deepStrictEqual(toObject(palio), { name: "Palio", brand: "Fiat", year: 2019 })
assert.deepStrictEqual(toObject(shelbyCobra), { name: "Shelby Cobra", brand: "Ford", year: 1963 })
assert.deepStrictEqual(toObject(chiron), { name: "Chiron", brand: "Bugatti", year: 2016 })
```

7. Escreva uma função `shipLength` que, dado um objeto representando um navio, retorna o comprimento dele, mostrando também a devida unidade de comprimento:

  * Dica: use `object destructuring`.

```language-javascript
const assert = require('assert')

const ships = [
    {
        name: "Titanic",
        length: 269.1
    },
    {
        name: "Queen Mary 2",
        length: 1132,
        measurementUnit: "feet"
    },
    {
        name: "Yamato",
        length: 256,
        measurementUnit: "meters"
    }
]

// escreva shipLength abaixo

assert.strictEqual(shipLength(ships[0]), "Titanic is 269.1 meters long")
assert.strictEqual(shipLength(ships[1]), "Queen Mary 2 is 1132 feet long")
assert.strictEqual(shipLength(ships[2]), "Yamato is 256 meters long")
```

8. Escreva uma função `greet` que, dado o nome de uma pessoa, retorna uma mensagem de cumprimento:

  * Dica: use `default params`.

```language-javascript
const assert = require('assert')

// escreva greet abaixo

assert.strictEqual(greet("John"), "Hi John")
assert.strictEqual(greet("John", "Good morning"), "Good morning John")
assert.strictEqual(greet("Isabela", "Oi"), "Oi Isabela")
```

---

## Recursos adicionais (opcional)

* [ECMAScript 6 — New Features: Overview & Comparison](http://es6-features.org/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Suporte ao ECMAScript 6 na Mozilla - JavaScript | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Suporte_ao_ECMAScript_6_na_Mozilla) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
