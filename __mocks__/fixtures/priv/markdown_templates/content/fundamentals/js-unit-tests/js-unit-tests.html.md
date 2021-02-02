## O que vamos aprender?

Você aprenderá sobre **testes unitários** e também sobre como **testar em pequenos passos**.

**Testes unitários** são **porções de código** responsáveis por validar o comportamento de **unidades funcionais** de código.

Nesse contexto, entende-se como unidade funcional qualquer porção de código que, através de algum estímulo, seja capaz de gerar um comportamento esperado.

Isso inclui funções, propriedades, construtores... tudo que, de alguma maneira, processe um comportamento de valor e que você deseja garantir que, apesar das alterações em nível de código, o comportamento siga sendo o mesmo.

Já o conceito de **testar em pequenos passos** fala sobre como orientar nosso desenvolvimento com base nos testes!

### Testes unitários: uma analogia ao relógio

Digamos que você, como pessoa desenvolvedora de software em um universo paralelo, seja uma relojoeira.
A sua responsabilidade é confeccionar relógios de qualidade desde o zero, construindo desde as menores peças.
Ao confeccionar as centenas de engrenagens, molas e parafusos que irão constituir seu relógio, você deve seguir especificações.

Cada unidade de engrenagens, molas e parafusos, ao serem confeccionadas, são testadas individualmente, medidas e verificadas, para garantir que irão funcionar conforme o esperado.
Engrenagens devem suavemente girar, molas devem ter uma certa resistência, e parafusos devem ter diferentes espessuras e tamanhos, e por aí vai.

Tudo a depender de onde irão se encaixar dentro do relógio.

O ato de criar essas pequenas unidades e verificar seus comportamentos individuais corresponde a escrever código separado em funções com responsabilidade definida, juntamente com testes unitários para essas funções.

---

### Você será capaz de:

* Entender o que são e para quê servem testes unitários;

* Utilizar a biblioteca NodeJS Assert para criar testes unitários;

* Testar 100% dos fluxos de um programa completo com eficácia e rapidez;

---

## Por que isso é importante?

O desenvolvimento de software é uma atividade nada simples.
Além de envolver o trabalho de diversos profissionais, a preocupação com o desempenho e com o bom funcionamento do produto final exige ações efetivas ao longo da criação.

O teste de software não é algo novo, mas, mesmo assim, ainda hoje, empresas preferem desenvolver sistemas sem uma metodologia com base em **qualidade**.
Veja a incoerência: quando se compra um carro, este passou por diversos testes; quando é fabricado um brinquedo, este também passa por testes, para saber que a tinta não é prejudicial às crianças e assim por diante.
Todos querem produtos de qualidade. Então, por que não criar software com qualidade também?

Ou seja, testes unitários são utilizados para reduzir a quantidade de defeitos, aumentando a qualidade do sistema.

E o mais importante: o _mindset_ que se desenvolve ao escrever testes para uma aplicação força quem desenvolve a imaginar e prever os fluxos que uma pessoa pode percorrer ao usar a sua aplicação. Isso diminui as chances de gerar bugs ou escrever códigos que precisarão ser refeitos depois.

Testes são fundamentais e tem um grande valor no dia a dia de quem desenvolve. Até o curso acabar, esperamos que a ideia de fazer um código sem testá-lo seja _incômoda_. Você irá se formar com um mindset orientado a testes!

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Na indústria, qualidade é algo perseguido há tempos! Diversas metodologias surgiram, sempre com o objetivo de melhorar a qualidade, ao mesmo tempo em que reduz custo, pois o custo de um defeito pode ser desastroso, não só para as finanças, mas também para o nome da empresa.

Basicamente, existem três dimensões de qualidade que precisam ser consideradas:
**Confiança**: O sistema é resistente a falhas durante a execução, isto é, não entra em _loop_, não interrompe a execução por falta de recursos.
**Funcionalidade**: O sistema se comporta conforme o que foi definido em seus requisitos.
**Performance**: O sistema tem um tempo de resposta adequado e aceitável, mesmo quando submetido a um volume de processamento próximo de situações reais ou de pico.

E, para atender a essas três dimensões, a pessoa que desenvolve tem uma nova tarefa: desenvolver com foco em qualidade.

### Para que servem testes unitários?

Existem diversas formas que aparentemente são mais rápidas de testar se a minha função está fazendo o que deveria.
Eu poderia simplesmente executar o código para verificar se está funcionando.
Então, por que motivo eu vou escrever outro código para testar meu código?
O que garante que o segundo código funciona?
Quem testa o teste?

**Testes unitários**, assim como qualquer teste automatizado, não servem somente para verificar se uma função específica está funcionando, mas também para garantir que sua aplicação continue funcionando após alguma alteração em sua base de código.

### Por que escrever testes unitários?

Pode parecer tentador, em um primeiro momento, não escrever testes para uma função que você acaba de desenvolver; afinal, costuma-se escrever mais código para testar uma função que o próprio código da função.
Mas você deve lembrar que irá passar a maior parte do tempo de desenvolvimento de um sistema trabalhando em sua manutenção.

Sua aplicação em pouco tempo terá algumas centenas de funções sendo executadas, e muitas vezes executando umas às outras. Sua base de código fica enorme, e logo fica humanamente impossível de ser testada de forma manual após qualquer alteração.
Testes unitários, na maioria das vezes, levam apenas alguns segundos para testar toda a sua aplicação.

### Por onde começar?

Existem diversas ferramentas de testes unitários para cada linguagem de programação.
Você pode começar lendo a documentação dessas ferramentas a partir de seus exemplos.
Neste [link](https://github.com/atinfo/awesome-test-automation) {: .external-link target="_blank" rel="noreferrer noopener" } você pode encontrar algumas dessas ferramentas classificadas por linguagem.

Vamos focar nas ferramentas para ***JavaScript***, pois é a linguagem que já utilizamos aqui na Trybe.
E a mais simples dessas ferramentas é o módulo `assert` do Node.JS.

#### NodeJS Assert

O módulo  **Assert** é uma ferramenta de aferição que permite testar expressões. Esse módulo já vem instalado com o **NodeJS**. Podemos entender o `assert` como sendo uma expressão booleana que será sempre `true`, ao menos que haja uma falha. Por esse motivo, o `assert` **não dará feedback se o teste não falhar**.
Se a expressão `assert` é avaliada com o valor 0 ou `false`, o teste falhará e o programa será terminado. O `assert` possui vários métodos para testar se o seu código funciona como o esperado. Veremos nos exemplos a seguir alguns desses métodos. Esta é a forma mais simples de se escrever testes.

Acompanhe um exemplo do uso do módulo `assert` abaixo. Rode as expressões separadamente, comentando a linha que não será executada para ver o resultado.

```language-javascript
const assert = require('assert'); // Sintaxe para incluir o módulo assert

assert.strictEqual(50, 50); // Sem erros: 50 == 50
assert.strictEqual(50, 70); // AssertionError: 50 == 70
```

Neste outro exemplo utilizamos o `assert` para testar o retorno esperado da função `division`:

```language-javascript
const assert = require('assert');

function division(x, y) {
  return x / y;
}

const expected = division(9, 3);

assert.strictEqual(expected, 3, 'Nove dividido por três é igual a três');
```

Os dois códigos acima utilizam o método `assert.strictEqual`.
Esse método compara o primeiro e o segundo parâmetro utilizando o operador `===`. Se os valores ou os tipos forem diferentes, o teste falhará e será mostrado um erro com a mensagem que está no terceiro parâmetro, se houver (o terceiro parâmetro é opcional). Não deixe de provocar uma falha no teste para ver o resultado! Este método tem o mesmo resultado que a expressão `assert(expected === 3, 'Nove dividido por três é igual a três')`. 

A vantagem de se usar o método `assert.strictEqual()` neste contexto é deixar mais clara a intenção do teste. Entretanto, é importante reforçar que o `assert.equal` faz uma comparação de **valor** com o operador `==`. Portanto, se você colocar o número 3 dentro de aspas o teste `assert.equal(expected, '3', 'Nove dividido por três é igual a três')` irá passar pois o método `.equal` não checa o *tipo* de valor que estamos comparando - nesse caso, `'3'` é uma `string`. Assim sendo, prefira métodos que comparam se dois valores são estritamente iguais, isto é, **valor** e **tipo**. Como você verá nos próximos exemplos, o `.strictEqual` e o `.deepStrictEqual` comparam os parâmetros fornecidos utilizando o operador `===`. Experimente refazer o teste acima com o `strictEqual` e veja o que acontece quando passamos o `'3'` como parâmetro para o `assert.strictEqual()`! O seu teste irá quebrar, pois o resultado esperado é um `número` igual a 3.  

Alguns outros métodos do módulo `assert`que nos permite escrever testes são:

- `assert.strictEqual()`
- `assert.deepStrictEqual()`
- `assert.notStrictEqual()`
- `assert.ok()`
- `assert.fail()`

A lista de métodos disponíveis, juntamente com a documentação de cada um, está [aqui](https://nodejs.org/api/assert.html) {: .external-link target="_blank" rel="noreferrer noopener" }. Você verá que alguns métodos são usados com mais frequência que outros. Caso tenha interesse, você pode ver mais exemplos de testes e quando cada método é utilizado [aqui](https://nelsonic.gitbooks.io/node-js-by-example/content/core/assert/README.html) {: .external-link target="_blank" rel="noreferrer noopener" }. É importante ter em mente que alguns métodos são bem similares, e se comportam da mesma forma quando o teste falha. A escolha de qual teste usar deve levar em consideração não apenas o resultado esperado, como também a clareza transmitida com a expressão utilizada no teste.

Veja um outro exemplo:

<%= vimeo "483337306" %>

Podemos combinar vários métodos do `assert` quando escrevemos nossos testes. Isso pode ser muito útil para ampliar a cobertura do teste em casos de falhas! Observe:

```language-javascript
const assert = require('assert');

function add(a, b) {
  return a + b;
}

const expected = add(1, 2);

assert.ok(expected === 3, 'Um mais dois é igual a três'); // Checa se o primeiro argumento é verdadeiro
assert.strictEqual(expected, 3, 'Um mais dois é igual a três'); // Checa se o primeiro e segundo argumentos são iguais em valor e tipo (===)
assert.notStrictEqual(expected, 4, 'Um mais dois é igual a três (e não quatro!)'); // Checa se o primeiro e segundo argumentos são diferentes (!==) 
```

Lembre-se que a mensagem do erro aparece apenas quando o teste **falha**. Experimente alterar os parâmetros de entrada da função `add` e veja o resultado!

É possível também testar estruturas como arrays e objetos:

```language-javascript
const assert = require('assert');

const list1 = [1, 2, 3, 4, 5];
const list2 = [1, 2, 3, 4, 5];

assert.deepStrictEqual(list1, list2, 'Erro: list1 e list2 não são estritamente iguais');

const person1 = { name: 'john', age: 21 };
const person2 = { name: 'john', age: 21 };

assert.deepStrictEqual(person1, person2, 'Erro: person1 e person2 não são estritamente iguais');

const person3 = { name: 'john', age: 19 };

assert.notDeepStrictEqual(person1, person3, 'Erro: os valores dos objetos são estritamente iguais');
```

Para que o teste falhe, experimente passar como segundo parâmetro para o último teste o objeto `person2`. Você verá que o teste irá falhar, pois ele espera que os valores dos objetos passados como argumento sejam diferentes.

Pratique um pouco, escreva funções simples (soma, concatenação de strings etc.) e crie testes utilizando os vários métodos disponíveis no módulo `assert`. Se precisar, consulte a tabela [neste link](https://www.w3schools.com/nodejs/ref_assert.asp) {: .external-link target="_blank" rel="noreferrer noopener" } com os métodos do `assert` mais utilizados!

#### Testes unitários e a melhoria no código

Um papel dos testes unitários é nos ajudar a implementar funções mais robustas.
Veja, por exemplo, a função que realiza a divisão utilizada no modelo anterior:

```language-javascript
function division(x, y) {
  return x / y;
}
```

O que acontece se criarmos o teste abaixo?

```language-javascript
const assert = require('assert');

// declaração da função division, definida anteriormente...

assert.strictEqual(division(10, 2), 5); // OK
assert.strictEqual(division(10, 0), 0); // 💣
```

O primeiro `assert.strictEqual` funciona e não apresenta erro, mas o segundo deixa evidente uma fragilidade na implementação da função `division`, pois não poderia ser possível realizar a divisão por 0.
Nesse caso, devemos melhorar a implementação da função `division`, a fim de não termos mais esse estado inconsistente.

Podemos fazer isso usando a palavra chave `throw`, que no javascript serve para lançar um erro. Usaremos ele, então, para lançar um erro caso o divisor `y` seja igual a zero.

```language-javascript
const assert = require('assert');

function division(x, y) {
  if (y === 0) throw new Error('parameter y must not be 0');
  return x / y;
}

assert.strictEqual(division(10, 2), 5); // OK
assert.throws(() => { division(10, 0); }, /^Error: parameter y must not be 0$/); // OK
```

Atualizamos o teste para refletir a mudança de implementação para essa situação, verificando não só se o erro é lançado, mas também se é o erro esperado. Ou seja, os testes unitários também nos ajudam a identificar casos especiais que podem levar nossas funções a estados inválidos.

### Testando em pequenos passos

O **TDD: Test Driven Development**, em tradução livre, o _desenvolvimento orientado a testes_, é uma técnica de desenvolvimento que, em certos cenários, favorece a produtividade e a escrita de códigos confiáveis. Essa técnica é interessante porque ela ajuda a _criar uma mente programadora orientada a testes_, ainda que nem sempre escrever testes antes de escrever funcionalidades seja a prática mais adequada.

O TDD é muito importante como exercício e para determinados tipos de projetos, mas está longe de ser um consenso na comunidade programadora como prática fundamental para 100% dos casos. É importante que essa visão crítica fique bem clara.

Tendo isso em mente hoje você vai aprender e praticar o TDD, mas o conhecimento a ser absorvido é "como testar bem uma aplicação, de forma eficaz e produtiva" e "como ter um mindset orientado a testes", e não especificamente como a metodologia funciona.

Com ~~muita~~ prática e experiência, você irá desenvolver a intuição necessária para avaliar se o TDD é a melhor abordagem para testar a sua aplicação. Um exemplo interessante que o TDD pode ser bastante útil é no teste de funções puras. 

O desenvolvimento orientado a testes é um processo cíclico que pode ser descrito em três etapas, como ilustrado abaixo. O princípio básico do TDD é fazer testes pequenos.

<%= figure(%{src: "/fundamentals/js-unit-tests/images/tdd.png", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "Ciclo TDD - inspirado no artigo de Kent Dodds disponível nos recursos adicionais"}) %>

Destrinchando cada etapa, o TDD consiste em:

- Escrever um teste que cubra a função que você pretende implementar antes mesmo de executá-la. Este teste irá falhar - afinal, a sua função ainda não foi declarada. Você pode começar do teste mais elementar possível para esse cenário, como verificar se a função que você irá criar existe:

```language-javascript
const assert = require('assert');
assert.strictEqual(typeof myFunction, 'function');
```

- Implementar apenas o necessário para que o teste passe. No caso do exemplo anterior, você só precisaria declarar a função para passar o teste.

- Refatorar o código para que ele esteja bem escrito e fácil de se entender. O pulo do gato nessa etapa é que você tem um teste já implementado que irá falhar caso você quebre algo ao refatorar o seu código.

- Repetir! Afinal de contas, o desenvolvimento orientado a testes é um ciclo. Volte a etapa 1 e repita esse processo até que todas as funcionalidades da sua função sejam implementadas.

Além de ser útil para testar funções puras, outro exemplo prático em que o desenvolvimento orientado a testes pode ser útil é consertar bugs. Os testes ajudam a quebrar problemas complexos em partes menores que podem ser analisadas mais facilmente. Assim, você poderá focar em uma regra de negócio específica sem medo de quebrar alguma outra funcionalidade.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Praticando a implementação de testes

Você vai implementar vários testes em contextos diferentes a fim de consolidar a mecânica e também a forma de pensar em testes.

Copie as funções já implementadas e desenvolva os testes.
Separe as funções em arquivos para evitar qualquer tipo de problema.

1. A função `sum(a, b)` retorna a soma do parâmetro `a` com o `b`

  1. Teste se o retorno de `sum(4, 5)` é `9`
  2. Teste se o retorno de `sum(0, 0)` é `0`
  3. Teste se a função `sum` lança um erro quando os parametros são `4` e `"5"`(string 5)
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

// implemente seus testes aqui
```

#### Praticando TDD

Nessa parte os exercícios estão divididos em dois grupos: primeiro, você vai escrever código baseado nos testes. Depois você lerá um código e o que ele tem que trazer de resposta. A partir disso, você escreverá testes e os usará de base para alterar o código. Como assim? Bem, vamos passo a passo!

##### Escrevendo código para testes

Dados os casos de testes abaixo, escreva as funções de forma a passar nos testes. **É importante nunca alterar os testes ou as variáveis já escritas no código**:

Copie os testes já implementadas e desenvolva as funções.
Separe as funções em arquivos para evitar qualquer tipo de problema.

1. Escreva a função addOne para passar nos testes já implementados.

```language-javascript
const assert = require('assert');
// escreva a função addOne aqui

const myArray = [31, 57, 12, 5];
const unchanged = [31, 57, 12, 5];
const expected = [32, 58, 13, 6];
const output = addOne(myArray);

assert.strictEqual(typeof addOne, 'function');
assert.deepStrictEqual(output, expected);
assert.deepStrictEqual(myArray, unchanged);
```
2. Escreva a função wordLengths para passar nos testes já implementados.

```language-javascript
const assert = require('assert');
// escreva a função wordLengths aqui

const words = ['sun', 'potato', 'roundabout', 'pizza'];
const expected = [3, 6, 10, 5];

assert.strictEqual(typeof wordLengths, 'function');
const output = wordLengths(words);
assert.deepStrictEqual(output, expected);
```
3. Escreva a função sumAllNumbers para passar nos testes já implementados.

```language-javascript
const assert = require('assert');
// escreva a função sumAllNumbers aqui

const numbers = [9, 23, 10, 3, 8];
const expected = 53;
const output = sumAllNumbers(numbers);

assert.strictEqual(typeof sumAllNumbers, 'function');
assert.strictEqual(output, expected);
```
4. Escreva a função findTheNeedle para passar nos testes já implementados.

```language-javascript
const assert = require('assert');
// escreva a função findTheNeedle aqui

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

##### Reescrevendo funções utilizando TDD

Agora mudamos um pouco: temos uma função pronta (e feita de forma errada, ou seja, sem funcionar direito), os parâmetros que devem ser passados a ela e a resposta esperada. Escreva testes de modo a entender e testar o comportamento da função e, depois, altere-a para que passe nos testes. Use os casos de teste acima como inspiração, se tiver dúvidas!

> Lembre-se: testes pequenos e numerosos! Escreva um por vez e vá corrigindo a função aos poucos.

1. Use a variável parameter como parâmetro da função abaixo, escreva testes para verificar se a mesma está retornando como se vê na variável result e, caso não esteja, altere o código para que ele passe nos testes.

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
```
2. Use a variável parameter como parâmetro da função abaixo, escreva testes para verificar se a mesma está retornando como se vê na variável result e, caso não esteja, altere o código para que ele passe nos testes.

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
```
3. Use a variável parameter como parâmetro da função abaixo, escreva testes para verificar se a mesma está retornando como se vê na variável result e, caso não esteja, altere o código para que ele passe nos testes.

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
```
4. Use a variável parameter como parâmetro da função abaixo, escreva testes para verificar se a mesma está retornando como se vê na variável result e, caso não esteja, altere o código para que ele passe nos testes.

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
```

---

### Bônus

#### Bônus 1

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
Abaixo, existe uma lista de correspondência com os valores em reais (R$)

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
  let remaining = paid - payable;

  // escreva seu código aqui...

  return change;
}
```

#### Testes unitários

Como dito anteriormente, os testes unitários já estão prontos, e sua implementação deve passar por todos eles.

```language-javascript
const assert = require('assert');

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

#### Bônus 2

Escreva a função factorial para passar nos testes já implementados.

```language-javascript
const assert = require('assert');
// escreva a função factorial aqui

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

#### Bônus 3

Escreva a função removeMiddle para passar nos testes já implementados.

```language-javascript
const assert = require('assert');
// escreva a função removeMiddle aqui

const words = ['mouse', 'giraffe', 'queen', 'window', 'bottle'];
const expectedWords = ['mouse', 'giraffe', 'window', 'bottle'];
const expectedOutput = ['queen'];
const output = removeMiddle(words);

assert.deepStrictEqual(output, expectedOutput);
assert.deepStrictEqual(words, expectedWords);
```

#### Bônus 4

Use a variável parameter como parâmetro da função abaixo, escreva testes para verificar se a mesma está retornando como se vê na variável result e, caso não esteja, altere o código para que ele passe nos testes. 

> Lembre-se: testes pequenos e numerosos! Escreva um por vez e vá corrigindo a função aos poucos.

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
```

#### Bônus 5

**Kata** ou **Code Kata** são exercícios de programação que ajudam a aprimorar as habilidades através da prática e da repetição.

[Kata 'Verificador de senhas':](https://github.com/CodeYourFuture/js-exercises-tdd/tree/master/III.tdd-katas/password-verifier) {: .external-link target="_blank" rel="noreferrer noopener" } Crie uma função Verify() que retorne `false` para os casos listados no repositório e `true` caso contrário. Não é necessário fazer os itens extras (2, 3 e 4) do repositório.

---

## Recursos adicionais (opcional)

* [Testes unitários: Entendendo o conceito por trás da definição](https://blog.paulagrangeiro.com.br/1-testes-unit%C3%A1rios-entendendo-o-conceito-por-tr%C3%A1s-da-defini%C3%A7%C3%A3o-f3a4bace71c9) {: .external-link target="_blank" rel="noreferrer noopener" }

* [NPM Assert Module Documentation](https://nodejs.org/api/assert.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [When I follow TDD](https://kentcdodds.com/blog/when-i-follow-tdd) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Top 8 benefits of unit testing](https://dzone.com/articles/top-8-benefits-of-unit-testing) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Unit testing critical for improving software quality](https://searchsoftwarequality.techtarget.com/news/1265369/Unit-testing-critical-for-improving-software-quality) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Happy Path vs. Testing Edge Cases](https://teamtreehouse.com/library/happy-path-vs-testing-edge-cases) {: .external-link target="_blank" rel="noreferrer noopener" }

* [GitHub Awesome Katas](https://github.com/gamontal/awesome-katas) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Mocha JS Documentation](https://mochajs.org/#installation) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Chai JS Documentation](https://www.chaijs.com/guide/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Katas to learn TDD](https://kata-log.rocks/tdd) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Programming with Wolfgang - TDD Katas](https://www.programmingwithwolfgang.com/tdd-kata/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Test Driven Development (TDD): Example Walkthrough](https://technologyconversations.com/2013/12/20/test-driven-development-tdd-example-walkthrough/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Test Driven Development - Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Apresentação da ThoughtWorks sobre TDD](https://agileindia.org/uploads/downloads/TDD.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
