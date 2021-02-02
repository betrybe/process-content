## Gabarito dos exercícios

- Exercícios básicos de TDD. Aqui você deve escrever códigos que passem nos testes.

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
  const addAllnumbers = (array) => {
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

  - Aqui você deve escrever testes que satisfaçam as suas especificações e fazer TDD para alterar o código que veio pronto para atendê-las.

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

#### Bônus

  `factorial.js`

```language-javascript
  const factorials = (int) => {
    let factorial = 1;
    for (let i = int; i > 0; i -= 1) factorial *= i;
    return factorial;
  };
```

  `remove-middle.js`

```language-javascript
  const removeMiddle = (words) => {
    const middleIndex = Math.floor(words.length / 2);
    const output = [words[middleIndex]];
    words.splice(middleIndex, 1);
    return output;
  };
```

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
