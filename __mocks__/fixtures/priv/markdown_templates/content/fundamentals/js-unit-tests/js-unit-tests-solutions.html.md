## Gabarito dos exercícios

### Praticando a implementação de testes

Você vai implementar vários testes em contextos diferentes a fim de consolidar a mecânica e também a forma de pensar em testes.

Copie as funções já implementadas e desenvolva os testes.
Separe as funções em arquivos para evitar qualquer tipo de problema.

1. A função `sum(a, b)` retorna a soma do parâmetro `a` com o `b`
  1. Teste se o retorno de `sum(4, 5)` é `9`
  2. Teste se o retorno de `sum(0, 0)` é `0`
  3. Teste se a função `sum` lança um erro quando os parâmetros são `4` e `"5"`(string 5)
  4. Teste se a mensagem de erro é "parameters must be numbers" quando realizar a chamada `sum(4, "5")`

```language-javascript
const assert = require('assert');

function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('parameters must be numbers');
  }

  return a + b;
}

// implemente seus testes aqui

assert.strictEqual(typeof sum, 'function');
assert.strictEqual(sum(4, 5), 9);
assert.strictEqual(sum(0, 0), 0);
assert.throws(() => {
  sum(4, '5');
});
assert.throws(() => {
  sum(4, '5');
}, /^Error: parameters must be numbers$/);
```
2. A função `myRemove(arr, item)` recebe um array `arr` e retorna uma cópia desse array sem o elemento `item` caso ele exista no array

  1. Verifique se a chamada `myRemove([1, 2, 3, 4], 3)` retorna o array esperado
  2. Verifique se a chamada `myRemove([1, 2, 3, 4], 3)` **não** retorna o array `[1, 2, 3, 4]`
  3. Verifique se o array passado por parâmetro **não** sofreu alterações
  4. Verifique se a chamada `myRemove([1, 2, 3, 4], 5)` retorna o array esperado

```language-javascript
const assert = require('assert');

function myRemove(arr, item) {
  let newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (item !== arr[i]) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// implemente seus testes aqui

assert.strictEqual(typeof myRemove, 'function');
assert.deepStrictEqual(myRemove([1, 2, 3, 4], 3), [1, 2, 4]);
assert.notDeepStrictEqual(myRemove([1, 2, 3, 4], 3), [1, 2, 3, 4]);

const myList = [5, 6, 7, 8];
myRemove(myList, 5);
assert.deepStrictEqual(myList, [5, 6, 7, 8]);

assert.deepStrictEqual(myRemove([1, 2, 3, 4], 5), [1, 2, 3, 4]);
```
3. A função `myRemoveWithoutCopy(arr, item)` recebe um array `arr` e retorna o próprio array sem o elemento `item` caso ele exista no array

  1. Verifique se a chamada `myRemoveWithoutCopy([1, 2, 3, 4], 3)` retorna o array esperado
  2. Verifique se a chamada `myRemoveWithoutCopy([1, 2, 3, 4], 3)` **não** retorna o array `[1, 2, 3, 4]`
  3. Faça uma chamada para a função `myRemoveWithoutCopy` e verifique se o array passado por parâmetro sofreu alterações
  4. Verifique se a chamada `myRemoveWithoutCopy([1, 2, 3, 4], 5)` retorna o array esperado

```language-javascript
const assert = require('assert');

function myRemoveWithoutCopy(arr, item) {
  for (let i = 0, len = arr.length; i < len; i += 1) {
    if (arr[i] === item) {
      arr.splice(i, 1);
      i -= 1;
      len -= 1;
    }
  }

  return arr;
}

// implemente seus testes aqui

const myList = [1, 2, 3, 4];

assert.deepStrictEqual(myRemoveWithoutCopy([1, 2, 3, 4], 3), [1, 2, 4]);
assert.notDeepStrictEqual(myRemoveWithoutCopy([1, 2, 3, 4], 3), [1, 2, 3, 4]);

myRemoveWithoutCopy(myList, 1);
assert.strictEqual(myList.length, 3);

assert.deepStrictEqual(myRemoveWithoutCopy([1, 2, 3, 4], 5), [1, 2, 3, 4]);
```
4. A função `myFizzBuzz(num)` recebe um número `num` e retorna `"fizzbuzz"` se o número for divisível por `3` e `5`, retorna `"fizz"` se for divisível apenas por `3`, retorna `"buzz"` se divisível apenas por `5`, retorna o próprio número caso não seja divisível por `3` ou `5` e retorna `false` caso `num` não seja um número

  1. Faça uma chamada com um número divisível por `3` e `5` e verifique se o retorno é o esperado
  2. Faça uma chamada com um número divisível por `3` e verifique se o retorno é o esperado
  3. Faça uma chamada com um número divisível por `5` e verifique se o retorno é o esperado
  4. Faça uma chamada com um número que não é divisível por `3` ou `5` e verifique se o retorno é o esperado
  5. Faça uma chamada com um parâmetro que não é um número e verifique se o retorno é o esperado

```language-javascript
const assert = require('assert');

function myFizzBuzz(num) {
  if (typeof num !== 'number') return false;
  if (num % 3 === 0 && num % 5 === 0) return 'fizzbuzz';
  if (num % 3 === 0) return 'fizz';
  if (num % 5 === 0) return 'buzz';
  return num;
}

// implemente seus testes aqui

assert.strictEqual(myFizzBuzz(15), 'fizzbuzz');
assert.strictEqual(myFizzBuzz(9), 'fizz');
assert.strictEqual(myFizzBuzz(25), 'buzz');
assert.strictEqual(myFizzBuzz(17), 17);
assert.strictEqual(myFizzBuzz('this_is_not_a_number'), false);
```
5. Compare dois objetos (JSON) para verificar se são idênticos ou não

```language-javascript
const assert = require('assert');

const obj1 = {
  title: 'My Title',
  description: 'My Description',
};

const obj2 = {
  description: 'My Description',
  title: 'My Title',
};

const obj3 = {
  title: 'My Different Title',
  description: 'My Description',
};

assert.deepStrictEqual(obj1, obj2);
assert.notDeepStrictEqual(obj1, obj3);
assert.notDeepStrictEqual(obj2, obj3);
```

### Praticando TDD

#### Escrevendo código para testes:

Exercícios básicos de TDD. Aqui você deve escrever códigos que passem nos testes.

`add-one.js`

```language-javascript
const addOne = (array) => {
  const output = [];
  for (let i = 0; i < array.length; i += 1) {
    output.push(array[i] + 1);
  }
  return output;
};
```

`word-lengths.js`

```language-javascript
const wordLengths = (array) => {
  const output = [];
  for (let i = 0; i < array.length; i += 1) {
    output.push(array[i].length);
  }
  return output;
};
```

`add-all-numbers.js`

```language-javascript
const sumAllNumbers = (array) => {
  let output = 0;
  for (const item in array) {
    output += array[item];
  }
  return output;
};
```

`find-needle.js`

```language-javascript
const findTheNeedle = (array, word) => {
  let output = -1;
  for (const index in array) {
    if (word === array[index]) {
      output = Number(index);
    }
  }
  return output;
};
```

#### Reescrevendo funções utilizando TDD

Aqui você deve escrever testes que satisfaçam as suas especificações e fazer TDD para alterar o código que veio pronto para atendê-las.

`greet-people.js`

```language-javascript

const greetPeopleNew = (people) => {
  const greeting = [];
  for (const person in people) {
    greeting.push(`Hello ${people[person]}`);
  }
  return greeting;
};

const assert = require('assert');
assert.strictEqual(typeof greetPeopleNew, 'function');

const parameter = ['Irina', 'Ashleigh', 'Elsa'];
const result = ['Hello Irina', 'Hello Ashleigh', 'Hello Elsa'];

const output = greetPeopleNew(parameter);
assert.deepStrictEqual(output, result);
```

`remove-vowels.js`

```language-javascript

const assert = require('assert');

const removeVowelsNew = (word) => {
  const characters = word.split('');
  const results = [];
  let counter = 0;

  for (let i = 0; i < characters.length; i += 1) {
    if (
      characters[i] === 'a' ||
      characters[i] === 'o' ||
      characters[i] === 'i' ||
      characters[i] === 'e' ||
      characters[i] === 'u'
    ) {
      counter += 1;
      results.push(counter);
    } else {
      results.push(characters[i]);
    }
  }
  return results.join('');
};

const parameter = 'Dayane';
const result = 'D1y2n3';

assert.strictEqual(typeof removeVowelsNew, 'function');
const output = removeVowelsNew(parameter);
assert.strictEqual(output, result);
```

`numbersGreaterThanTen.js`

```language-javascript

const assert = require('assert');

const greaterThanTenNew = (array) => {
  const results = [];
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] > 10) {
      results.push(array[i]);
    }
  }
  return results;
};

const parameter = [4, 10, 32, 9, 21];
const result = [32, 21];

assert.strictEqual(typeof greaterThanTenNew, 'function');
const output = greaterThanTenNew(parameter);
assert.deepStrictEqual(output, result);
```

`get-second-third.js`

```language-javascript

const assert = require('assert');

function secondThirdSmallestNew(array) {
    const results = []
    array.sort((item1, item2) => {
        return item1 - item2;
    });
    results.push(array[1], array[2]);
    return results;
};

const parameter = [4, 10, 32, 9, 21, 90, 5, 11, 8, 6];
const result = [5, 6];

assert.strictEqual(typeof secondThirdSmallestNew, 'function');
const output = secondThirdSmallestNew(parameter);
assert.deepStrictEqual(output, result);
```

---

## Bônus

### Bônus 1

Imagine que você vai construir uma máquina de venda automática (como essas que vendem refrigerante).
A máquina aceita moedas e calcula a diferença do valor total que deve ser pago e o valor recebido da pessoa que compra.
Essa máquina possui um conjunto de moedas. Você deve implementar a seguinte lógica: dado o valor do troco, a máquina retorna uma lista com as moedas que ela devolverá para a pessoa.

#### Requisitos

Como uma pessoa que compra em máquinas automáticas, eu gostaria de selecionar um item, depositar o pagamento e receber o item e o troco.

#### Critérios de aceite

- Uma chamada bem-sucedida de uma função `getChange` deve retornar uma lista com o valor das moedas que serão devolvidas à pessoa
- Essa lista deve estar no formato decrescente de valor
- É permitida a repetição do valor de moedas, por exemplo, `[200, 100, 50, 20, 10, 2, 2]`
- Um erro com a mensagem **paid value is not enough** deve ser lançado se o valor pago for menor que o valor da compra

#### Moedas disponíveis

As moedas serão representadas pelos valores `200`, `100`, `50`, `20`, `10`, `5`, `2` e `1`.
Abaixo existe uma lista de correspondência com os valores em reais (R$)

- 200 (R$2)
- 100 (R$1)
- 50 (R$0,50)
- 20 (R$0,20)
- 10 (R$0,10)
- 5 (R$0,05)
- 2 (R$0,02)
- 1 (R$0,01)

A **quantidade** de cada moeda é infinita, imagine que isso é uma simplificação do problema.

#### Exemplo

Se uma pessoa comprar itens com valor total igual a R$2,15 (ou seja, 215) e pagar R$3 (ou seja, 300), o valor do troco é R$0,85 (ou seja, 85).
Para entregar esse troco à pessoa, deve-se retornar as moedas 1x R$0,50, 1x R$0,20, 1x R$0,10 e 1x R$0,05, formando assim a lista `[50, 20, 10, 5]`.

#### Implementação

Finalize a implementação da função `getChange(payable, paid)`.

- `payable` é o valor a ser pago, ou o valor total
- `paid` é o valor que a pessoa pagou

```language-javascript
function getChange(payable, paid) {
  const coins = [200, 100, 50, 20, 10, 5, 2, 1];
  const change = [];
  const { length } = coins;
  let remaining = paid - payable; // we reduce this below

  if (paid < payable) throw new Error('paid value is not enough');

  for (let i = 0; i < length; i += 1) { // loop through array of notes & coins:
    const coin = coins[i];
    const timesCoinFits = Math.floor(remaining / coin); // no partial coins

    if (timesCoinFits >= 1) { // check coin fits into the remaining amount
      for (let j = 0; j < timesCoinFits; j += 1) { // add coin to change x times
        change.push(coin);
        remaining -= coin; // subtract coin from remaining
      }
    }
  }
  return change;
}
```

---

#### Testes unitários

Como dito anteriormente, os testes unitários já estão prontos, e sua implementação deve passar por todos eles.

```language-javascript
let result = getChange(1, 1); // no change/coins just an empty array
let expected = [];
assert.deepStrictEqual(result, expected);

result = getChange(215, 300); // expect an array containing [50, 20, 10, 5]
expected = [50, 20, 10, 5];
assert.deepStrictEqual(result, expected);

result = getChange(486, 600); // expect an array containing [100, 10, 2, 2]
expected = [100, 10, 2, 2];
assert.deepStrictEqual(result, expected);

result = getChange(12, 400); // expect an array containing [200, 100, 50, 20, 10, 5, 2, 1]
expected = [200, 100, 50, 20, 10, 5, 2, 1];
assert.deepStrictEqual(result, expected);

assert.throws(() => { getChange(100, 10); }, /^Error: paid value is not enough$/);
```

### Bônus 2

`factorial.js`

```language-javascript
const factorials = (int) => {
  let factorial = 1;
  for (let i = int; i > 0; i -= 1) factorial *= i;
  return factorial;
};
```

### Bônus 3

`remove-middle.js`

```language-javascript
const removeMiddle = (words) => {
  const middleIndex = Math.floor(words.length / 2);
  const output = [words[middleIndex]];
  words.splice(middleIndex, 1);
  return output;
};
```

### Bônus 4

`get-largest-number.js`

```language-javascript
const assert = require('assert');

const getLargestNumber = (array) => {
  let largestNumber = array.slice().sort((a, b) => b - a);
  console.log(parameter);
  return largestNumber[0];
}

const parameter = [45, 8, 2, 50, 99, 1, 7];
const result = 99;

const output = getLargestNumber(parameter);
const unchangedArray = [45, 8, 2, 50, 99, 1, 7];

assert.strictEqual(output, result);
assert.deepStrictEqual(parameter, unchangedArray);
```

### Bônus 5

- [Kata 'Verificador de senhas'](https://github.com/CodeYourFuture/js-exercises-tdd/tree/master/III.tdd-katas/password-verifier) {: .external-link target="_blank" rel="noreferrer noopener" }

Cada passo abaixo é composto por um novo grupo de testes de um passo do TDD seguido do código que os resolve.

**Passo 1**

`teste`

```language-javascript
const verify = require('./password-verification');
const assert = require('assert');

assert.strictEqual(typeof verify, 'function');
```

`código`

```language-javascript
function verify(password) {}

module.exports = verify;
```

**Passo 2**

`teste`

```language-javascript
const verify = require('./password-verification');
const assert = require('assert');

assert.strictEqual(typeof verify, 'function');
// Password should be larger than 8 chars
assert(!verify('12345678'));
```

`código`

```language-javascript
function verify(password) {
  if (password.length <= 8) return false;
  return true;
}

module.exports = verify;
```

**Passo 3**

`teste`

```language-javascript
const verify = require('./password-verification');
const assert = require('assert');

assert.strictEqual(typeof verify, 'function');
// Password should be larger than 8 chars
assert(!verify('12345678'));
// Password should not be null
assert(!verify(null));
```

`código`

```language-javascript
function verify(password) {
  if (password == null) return false;
  else if (password.length <= 8) return false;
  return true;
}

module.exports = verify;
```

**Passo 4**

`teste`

```language-javascript
const verify = require('./password-verification');
const assert = require('assert');

assert.strictEqual(typeof verify, 'function');
// Password should be larger than 8 chars
assert(!verify('12345678'));
// Password should not be null
assert(!verify(null));
// Password should have one uppercase letter at least
assert(!verify('gandalfthegray'));
```

`código`

```language-javascript
function verify(password) {
  if (password == null) return false;
  else if (password.length <= 8) return false;
  else if (!/[A-Z0-9]/.test(password)) return false;
  return true;
}

module.exports = verify;
```

**Passo 5**

`teste`

```language-javascript
const verify = require('./password-verification');
const assert = require('assert');

assert.strictEqual(typeof verify, 'function');
// Password should be larger than 8 chars
assert(!verify('12345678'));
// Password should not be null
assert(!verify(null));
// Password should have one uppercase letter at least
assert(!verify('gandalfthegray'));
// Password should have one lowercase letter at least
assert(!verify('YOUSHALLNOTPASS'));
```

`código`

```language-javascript
function verify(password) {
  if (password == null) return false;
  else if (password.length <= 8) return false;
  else if (!/[A-Z0-9]/.test(password)) return false;
  else if (!/[a-z0-9]/.test(password)) return false;
  return true;
}

module.exports = verify;
```

**Passo 6**

`teste`

```language-javascript
const verify = require('./password-verification');
const assert = require('assert');

assert.strictEqual(typeof verify, 'function');
// Password should be larger than 8 chars
assert(!verify('12345678'));
// Password should not be null
assert(!verify(null));
// Password should have one uppercase letter at least
assert(!verify('gandalfthegray'));
// Password should have one lowercase letter at least
assert(!verify('YOUSHALLNOTPASS'));
// Password should have one number at least
assert(!verify('GandalfTheWhite'));
// Correct password
assert(verify('G4nd4lfTh3Wh1t3'));
```

`código`

```language-javascript
function verify(password) {
  if (password == null) return false;
  else if (password.length <= 8) return false;
  else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password))
    return false;
  return true;
}

module.exports = verify;
```
