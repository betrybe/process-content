## O que vamos aprender?

Agora que você já sabe o que são testes automatizados e como testar funções, vamos expandir o escopo do aprendizado e aprender não só a testar programas maiores e mais complexos, como também a orientar nosso desenvolvimento com base nos testes!

---

### Você será capaz de:

  * Testar 100% dos fluxos de um programa completo com eficácia e rapidez.

---

## Por que isso é importante?

Um dos grandes pilares da **qualidade de código** é ter testes automatizados cobrindo os fluxos lógicos da sua aplicação. Às vezes isso gera mais trabalho na hora de desenvolver uma funcionalidade nova, às vezes isso até te torna uma pessoa mais produtiva.

**Um bug coberto por um teste é um bug que nunca voltará**

**Uma funcionalidade coberta por um teste é uma funcionalidade que nunca quebrará**

Códigos cobertos por testes protegem a pessoa que desenvolve de algum erro que possa levar essa pessoa a, ao adicionar ou alterar código de um sistema, tornar parte dele desfuncional. E alterar o código de um sistema, ou seja, **refatorar esse código**, é algo que faz parte da vida de qualquer pessoa que trabalha com programação, então testes se tornam uma ferramenta fundamental para um trabalho ágil e de qualidade.

E o mais importante: o _mindset_ que se desenvolve ao escrever testes para uma aplicação força quem desenvolve a imaginar e prever os fluxos que uma pessoa pode percorrer ao usar a sua aplicação. Isso é mais habilidade para quem desenvolve e menos chances de gerar bugs ou escrever código que precise ser refeito depois.

Testes são um assunto fundamental e, até o curso acabar, esperamos que a ideia de fazer um código sem testá-lo seja _incômoda_, tal será o valor dos testes no seu dia a dia.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Primeiramente você vai ver dois vídeos falando sobre **TDD: Test Driven Development**. Em tradução livre, o _desenvolvimento orientado a testes_. Esta é uma técnica de desenvolvimento que, em certos cenários, favorece a produtividade e a escrita de códigos bons. Para a aula de hoje, vamos praticá-lo bastante, porque ele ajuda muito a _criar uma mente programadora orientada a testes_, ainda que nem sempre escrever testes antes de escrever funcionalidades seja a prática mais adequada.

<%= youtube_video "M7SrhC6tO5s" %>
<%= youtube_video "3FNPMb0kolE" %>

Um ponto dito no vídeo que é importante ressaltar é: **você lerá muito por aí que TDD deve ser praticado sempre e é uma prática absolutamente fundamental. A experiência de trabalho muitas vezes mostra, no entanto, o contrário**.

O TDD é muito importante como exercício e para determinados tipos de projetos, mas está longe de ser um consenso na comunidade programadora como prática fundamental para 100% dos casos. É importante que essa visão crítica fique bem clara.

É por isso que a aula de hoje não se chama _Test Driven Development_, e sim _Testando em pequenos passos_. Você vai aprender e praticar o TDD hoje, mas o conhecimento a ser absorvido é "como testar bem uma aplicação, de forma eficaz e produtiva" e "como ter um mindset orientado a testes", e não especificamente como a metodologia funciona.

Um segundo exemplo de um processo de desenvolvimento de uma aplicação orientada a testes é esse abaixo:

[Writing better test assertions](https://dev.to/webpapaya/writing-better-test-assertions-lml) {: .external-link target="_blank" rel="noreferrer noopener" }

Tudo certo?! Pois bem. Como exercícios de fixação, faça o seguinte:
  - Começe a praticar TDD fazendo uma função que valida que **um array de números não possui múltiplos de 3, 5, 7 e 11**
  - Agora, revivendo exercícios passados do curso, faça com TDD uma função que recebe um número natural `n` e retorna todos os números primos de 0 a esse número.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos praticar TDD juntos na aula ao vivo de hoje!

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Desafio

Se se sentir confortável, temos aqui proposto um desafio extra para a realização dos exercícios (além de conseguir fazer todos os bônus!). Ele consiste em **escrever um teste e fazê-lo passar em no máximo cinco minutos.** Se não conseguir, apague tudo o que fez e repita. Qual é a finalidade disso?! **Não é ser ágil! É fazer testes pequenos!** A ideia é treinar com firmeza a noção de que testes devem ser pequenos e numerosos, ao invés de grandes e complexos.

Pense assim: a cada cinco minutos você precisa dar um `git checkout . && git clean -df` no seu código. Para commitar antes de isso acontecer, é preciso escrever um novo teste e fazê-lo passar. Acha que consegue?! 😏

Agora digite `timer` no Google e mãos à obra!

#### Praticando TDD

* Vamos dividir os exercícios em dois grupos: primeiro, você vai escrever código baseado nos testes. Depois você lerá um código e o que ele tem que trazer de resposta. A partir disso, você escreverá testes e os usará de base para alterar o código. Como assim? Bem, vamos passo a passo!

##### Escrevendo código para testes:

* Dados os casos de testes abaixo, escreva as funções de forma a passar nos testes. **É importante nunca alterar os testes ou as variáveis já escritas no código**:

---

```language-javascript
const assert = require('assert');
// escreva a função addOne para passar nos testes abaixo:

//
const myArray = [31, 57, 12, 5];
const unchanged = [31, 57, 12, 5];
const expected = [32, 58, 13, 6];
const output = addOne(myArray);

assert.strictEqual(typeof addOne, 'function');
assert.deepStrictEqual(output, expected);
assert.deepStrictEqual(myArray, unchanged);
```

---

```language-javascript
const assert = require('assert');
// escreva a função wordLengths para passar nos testes abaixo:

//
const words = ['sun', 'potato', 'roundabout', 'pizza'];
const expected = [3, 6, 10, 5];

assert.strictEqual(typeof wordLengths, 'function');
const output = wordLengths(words);
assert.deepStrictEqual(output, expected);
```

---

```language-javascript
const assert = require('assert');
// escreva a função addAllnumbers para passar nos testes abaixo:

//
const numbers = [9, 23, 10, 3, 8];
const expected = 53;
const output = addAllnumbers(numbers);

assert.strictEqual(typeof addAllnumbers, 'function');
assert.strictEqual(output, expected);
```

---

```language-javascript
const assert = require('assert');
// escreva a função findTheNeedle para passar nos testes abaixo:

//
let words = ['house', 'train', 'slide', 'needle', 'book'];
let expected = 3;
let output = findTheNeedle(words, 'needle');
assert.strictEqual(output, expected);

words = ['plant', 'shelf', 'arrow', 'bird'];
expected = 0;
output = findTheNeedle(words, 'plant');
assert.strictEqual(output, expected);

words = ['plant', 'shelf', 'arrow', 'bird'];
expected = -1;
output = findTheNeedle(words, 'plat');
assert.strictEqual(output, expected);
```

---

##### Reescrevendo funções utilizando TDD

* Agora mudamos um pouco: temos uma função pronta (e feita de forma errada, ou seja, sem funcionar direito), os parâmetros que devem ser passados a ela e a resposta esperada. Escreva testes de modo a entender e testar o comportamento da função e, depois, altere-a para que passe nos testes. Use os casos de teste acima como inspiração, se tiver dúvidas!

---

```language-javascript
const greetPeople = (people) => {
  let greeting = 'Hello ';

  for (const person in people) {
    greeting += people[person];
  }
  return greeting;
};

const parameter = ['Irina', 'Ashleigh', 'Elsa'];
const result = ['Hello Irina', 'Hello Ashleigh', 'Hello Elsa'];
/*
  Use a variável parameter como parâmetro da função acima, escreva testes
  para verificar se a mesma está retornando a como se vê na variável result
  e, caso não esteja, altere o código para que ele passe nos testes.
  Lembre-se: testes pequenos e numerosos! Escreva um por vez e vá corrigindo
  a função aos poucos:
*/
```

---

```language-javascript
const removeVowels = (word) => {
  const characters = word.split('');
  const results = [];

  for (let i = 0; i < characters.length; i += 1) {
    if (
      characters[i] === 'a' ||
      characters[i] === 'o' ||
      characters[i] === 'i' ||
      characters[i] === 'e' ||
      characters[i] === 'u'
    ) {
      results.push(characters[i]);
    } else {
      results.push('_');
    }
  }
  return results;
};


const parameter = 'Dayane';
const result = 'D1y2n3';
/*
  Use a variável parameter como parâmetro da função acima, escreva testes
  para verificar se a mesma está retornando a como se vê na variável result
  e, caso não esteja, altere o código para que ele passe nos testes.
  Lembre-se: testes pequenos e numerosos! Escreva um por vez e vá corrigindo
  a função aos poucos:
*/
```

---

```language-javascript
const greaterThanTen = (array) => {
  let results = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] > 10) {
      results += array[i];
    }
  }
  return results;
};

const parameter = [4, 10, 32, 9, 21];
const result = [32, 21];
/*
  Use a variável parameter como parâmetro da função acima, escreva testes
  para verificar se a mesma está retornando a como se vê na variável result
  e, caso não esteja, altere o código para que ele passe nos testes.
  Lembre-se: testes pequenos e numerosos! Escreva um por vez e vá corrigindo
  a função aos poucos:
*/
```

---

```language-javascript
function secondThirdSmallest(array) {
    let results = []
    array.sort(function (x, y) {
        return x + y;
    });
    results = [array[1], array[2]];
    return results;
};

const parameter = [4, 10, 32, 9, 21, 90, 5, 11, 8, 6];
const result = [5, 6];
/*
  Use a variável parameter como parâmetro da função acima, escreva testes
  para verificar se a mesma está retornando a como se vê na variável result
  e, caso não esteja, altere o código para que ele passe nos testes.
  Lembre-se: testes pequenos e numerosos! Escreva um por vez e vá corrigindo
  a função aos poucos:
*/
```

---

### Bônus

Separamos para o final mais alguns exercícios. **Eles são mais complexos**, mas não desanime!

```language-javascript
const assert = require('assert');
// escreva a função factorial para passar nos testes abaixo:

const in1 = 5;
const exp1 = 120;

const in2 = 9;
const exp2 = 362880;

const in3 = 1;
const exp3 = 1;

const in4 = 0;
const exp4 = 1;

const in5 = 3;
const exp5 = 6;

const out1 = factorial(in1);
const out2 = factorial(in2);
const out3 = factorial(in3);
const out4 = factorial(in4);
const out5 = factorial(in5);

assert.strictEqual(out1, exp1);
assert.strictEqual(out2, exp2);
assert.strictEqual(out3, exp3);
assert.strictEqual(out4, exp4);
assert.strictEqual(out5, exp5);
```

---

```language-javascript
const assert = require('assert');
// escreva a função removeMiddle para passar nos testes abaixo:

const words = ['mouse', 'giraffe', 'queen', 'window', 'bottle'];
const expectedWords = ['mouse', 'giraffe', 'window', 'bottle'];
const expectedOutput = ['queen'];
const output = removeMiddle(words);

assert.deepStrictEqual(output, expectedOutput);
assert.deepStrictEqual(words, expectedWords);
```

---

```language-javascript
const getLargestNumber = (array) => {
    let largestNumber;
    for (let i = 0; i < array.length - 1; i += 1) {
        if (array[i] > array[i + 1]) {
            largestNumber = [array[i]];
        }
    }
    return largestNumber;
}

const parameter = [45, 8, 2, 50, 1, 7, 99];
const result = 99;
/*
  Use a variável parameter como parâmetro da função acima, escreva testes
  para verificar se a mesma está retornando a como se vê na variável result
  e, caso não esteja, altere o código para que ele passe nos testes.
  Lembre-se: testes pequenos e numerosos! Escreva um por vez e vá corrigindo
  a função aos poucos:
*/
```

---

- [Kata 'Verificador de senhas'](https://github.com/CodeYourFuture/js-exercises-tdd/tree/master/III.tdd-katas/password-verifier) {: .external-link target="_blank" rel="noreferrer noopener" }: Crie uma função Verify() que retorne `false` para os casos listados no repositório e `true` caso contrário. Não é necessário fazer os itens extras (2, 3 e 4) do repositório.

---

## Recursos adicionais (opcional)

* [Katas to learn TDD](https://kata-log.rocks/tdd) {: .external-link target="_blank" rel="noreferrer noopener" }
* [Programming with Wolfgang - TDD Katas](https://www.programmingwithwolfgang.com/tdd-kata/) {: .external-link target="_blank" rel="noreferrer noopener" }
* [Test Driven Development (TDD): Example Walkthrough](https://technologyconversations.com/2013/12/20/test-driven-development-tdd-example-walkthrough/) {: .external-link target="_blank" rel="noreferrer noopener" }
* [Test Driven Development - Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development) {: .external-link target="_blank" rel="noreferrer noopener" }
* [Apresentação da ThoughtWorks sobre TDD](https://agileindia.org/uploads/downloads/TDD.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
