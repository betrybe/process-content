## O que vamos aprender?

Você já aprendeu o que são e para que servem testes unitários. Já sabe usar o módulo `assert` do `NodeJS` para fazer asserções simples sobre suas funções. Também já aprendeu a testar programas maiores que envolvem diferentes fluxos de execução. Hoje você aprenderá a utilizar o **Jest**, um _framework_ de testes unitários para **JavaScript** desenvolvido pelo **Facebook**.

---

## Você será capaz de:

  * Utilizar **Jest** para escrever testes unitários.

---

## Por que isso é importante?

Você já sabe utilizar o módulo `assert` do `NodeJS`, então por que precisaria de outra ferramenta que faz essencialmente a mesma coisa?

Até agora você sabe fazer asserções simples em seus testes, como verificar se dois valores são iguais. Embora seja possível fazer praticamente qualquer tipo de teste dessa maneira, acaba se tornando um processo lento, trabalhoso e repetitivo à medida que você começa a testar dados ou situações mais complexas.

Além disso, conforme seus programas vão crescendo, seus testes ficarão distribuídos em vários arquivos. Torna-se necessária uma ferramenta que seja capaz de encontrar e executar automaticamente todos os testes da aplicação, reportar informações sobre cobertura de testes, fornecer _feedback_ sobre quais testes falharam e por quê, além de outras características. 

**Jest** é um dos _frameworks_ de teste existentes no ecossistema de **JavaScript** que fornecem esses tipos de funcionalidades, e é ele que você aprenderá hoje.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Por que utilizar um framework de testes?

Nos últimos dias, você aprendeu os benefícios de se ter um código (bem) testado, e os benefícios do TDD (Test Driven Development) para a escrita de testes.


Por que precisamos de um _framework_? Não dá pra escrever todos os testes somente com `asserts` simples? Em teoria, sim, mas à medida que suas aplicações se tornam maiores e mais complexas, esse processo torna-se inviável pelos motivos abaixo:


- Sua aplicação terá várias funções, provavelmente distribuídas por vários arquivos. Colocar todos os testes em um único arquivo torna-se impraticável rapidamente. Não é possível saber onde começam e onde terminam os testes de uma função. Mesmo em uma função mais complexa, você pode querer separar e agrupar testes relacionados;

- `Node.js` só executa um arquivo por vez, com o comando `node <nome_do_arquivo>`. Se há vários arquivos de teste, é preciso executar um por vez ou escrever um script **shell** para executar todos os arquivos;

- Você sempre precisa executar **todos** os testes de um arquivo. Não há como executar apenas um subgrupo dos testes presentes no arquivo;

- Sempre que um teste falha, a execução é interrompida imediatamente. Isso dificulta saber se os testes posteriores estão corretos, necessitando  garantir que todos os testes anteriores estejam corretos;

- Vários testes podem requerer que os mesmos passos sejam executados antes ou após a execução, resultando em muita duplicação;

- Para pular ou desabilitar um teste falhando, é preciso removê-lo ou comentá-lo;

- Não há informações sobre a cobertura de testes. Ou seja, quais partes do código estão sendo estressadas pelos testes e quais não estão;

Para o mercado de trabalho, o `assert` é insuficiente. Normalmente os programas estão sempre evoluindo e ganhando novas _features_ e, por conta disso, surgiu a necessidade de criar uma suíte de testes mais robusta, legível e de fácil manutenção.

Um _framework_ de testes apresenta ferramentas para eliminar ou mitigar esses problemas. Existem várias ferramentas semelhantes, como [Jest](https://jestjs.io/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Mocha](https://mochajs.org/) {: .external-link target="_blank" rel="noreferrer noopener" } e [Jasmine](https://jasmine.github.io/) {: .external-link target="_blank" rel="noreferrer noopener" }. Entre eles, **Jest** se destaca por alguns motivos:

- É fácil de instalar e requer zero configuração, como você verá em breve;

- É rápido. [O time de engenharia do _Airbnb_ conseguiu diminuir o tempo de execução de sua suíte de testes de 12 para 4 minutos ao trocar **Mocha** por **Jest**](https://medium.com/airbnb-engineering/unlocking-test-performance-migrating-from-mocha-to-jest-2796c508ec50) {: .external-link target="_blank" rel="noreferrer noopener" };

- Se integra muito bem com **React**. De fato, **Jest** já vem instalado e configurado com o [_Create React App_](https://github.com/facebook/create-react-app) {: .external-link target="_blank" rel="noreferrer noopener" }.

Chega de teoria. Vamos botar a mão na massa e começar a escrever testes com **Jest**.

### Instalando o Jest

1) Para começar a instalar o Jest, você precisa ter o `npm` instalado e funcionando corretamente, abaixo temos um passo a passo, feito para `Linux`, sabendo disso, então vá ao seu terminal e digite:

```language-bash
npm -v
```

---

2) Se ele te mostrar um número de versão (por exemplo, 6.14.4) está tudo certo, você pode pular os comandos deste passo. Caso ele retorne um erro dizendo que não encontrou o comando você deverá executar a instalação do `npm`, descrita abaixo:

a. Primeiro vamos atualizar a nossa lista de repositórios:

```language-bash
sudo apt update
```

b. Agora com a lista de repositórios atualizada, vamos instalar o `npm`. Lembre-se que ao instalar com `apt`, você pode utilizar o comando de qualquer local, e em todas as próximas vezes você não deverá reinstalar, só execute esse passo caso **não** tenha o `npm` instalado ainda.

```language-bash
sudo apt install npm
```

---

3) Com o `npm` verificado, **crie** uma pasta e **entre** nesta nova pasta que você criou.

```language-bash
mkdir nome_da_nova_pasta
cd nome_da_nova_pasta
```

**Obs:** É importante criar esta nova pasta para cada um dos seus projetos, pois além de ficar mais organizado, você vai evitar que as configurações de um projeto _interfiram_ com outro, visto que o processo de instalação irá criar arquivos e pastas.

a. Após entrar na pasta, digite no terminal o comando abaixo:

```language-bash
npm init -y
```

Você terá o seguinte retorno:

```language-bash
Wrote to /home/cleyton/Documents/meuApp/package.json:

{
  "name": "meuApp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

b. Este comando acabou de criar o arquivo `package.json`. Agora você precisa editar este arquivo, substituindo da seguinte forma:

```language-javascript
// {
//  "name": "meuApp",
//  "version": "1.0.0",
//  "description": "",
//  "main": "index.js",
//  "scripts": {
      "test": "jest"
//  },
//  "keywords": [],
//  "author": "",
//  "license": "ISC"
// }
```

Explicando o que é o `package.json`:

- `package.json` é onde listamos as dependências e versões (entre outras informações da aplicação).

---

4) Por fim, vamos instalar o `Jest`, dentro da pasta que você criou no passo 3, executando o seguinte comando no terminal:

```language-bash
npm install --save-dev jest
```

Esse comando irá instalar tudo o que é necessário para o `Jest`, criando a pasta `node_modules` e o arquivo `package-lock.json`.

Explicando o que são esses dois: 

- `node_modules` é a pasta que guarda todos os arquivos baixados das dependências instaladas.

- `package-lock.json` é um arquivo que “trava” as versões das dependências. Quando outra pessoa executar `npm install` ou `npm i` para baixar as dependências, este arquivo garante que serão instaladas as mesmas versões para todo mundo.

---

5) Para testar sua instalação, vamos criar um arquivo chamado `sum.test.js` e colar o código abaixo dentro dele:

```language-js
const sum = (a, b) => a + b;

test('sums two values', () => {
  expect(sum(2, 3)).toEqual(5);
});
```

Depois disso, vamos até o terminal digitar `npm test`, se você receber uma resposta parecida com a resposta abaixo, tudo certo com a instalação!

<%= figure(%{src: "/fundamentals/js-unit-tests/images/jest-ok.png", class: "standard-screenshot text-center", caption: "teste de instalação", width: "80%"}) %>

Caso você não veja a tela acima, tente rever os passos, observe se você entrou na nova pasta que criou, verifique se não há a pasta `node_modules` já instalada na sua home ou pasta raiz, averigue o arquivo exemplo e o nome do arquivo, caso ele não tenha o `.test` ou `.spec` no nome, o `Jest` não tenta ler o arquivo, porque não reconhece como um arquivo de teste, isso será explicado melhor durante o conteúdo de hoje.

---

### Escrevendo testes

Escrever testes em **Jest** é muito simples, como você deve ter percebido enquanto lia o artigo acima. Tudo que é necessário é utilizar a função `test`. A função `it` é um _alias_ para `test`, ou seja, ambas se referem à mesma função e você pode usar qualquer uma delas. Essas funções, por serem globais, ficam automaticamente disponíveis nos seus arquivos uma vez que o **Jest** é instalado.

A função `test` espera três argumentos. O primeiro argumento é o nome do teste. Esse nome identifica o teste e é também o texto que aparecerá quando os testes forem executados. O segundo argumento é uma função contendo suas _expectations_. Em outras palavras, é dentro dessa função que você fará os testes propriamente ditos. O terceiro argumento (opcional) é um _timeout_, indicando quanto tempo o **Jest** deve esperar que o teste execute antes de abortá-lo.

Para entender melhor, veja o código abaixo:

```language-javascript
// sum.js
const sum = (a, b) => a + b;

test('sums two values', () => {
  expect(sum(2, 3)).toEqual(5);
});
```

---

Neste exemplo, tanto a implementação quanto os testes da função estão no mesmo arquivo. Na prática, porém, eles ficarão separados. **Jest** procura por arquivos com as extensões `.js`, `.jsx`, `.ts` e `.tsx` dentro de uma pasta com o nome `__tests__`, ou arquivos com o sufixo `.test` ou `.spec`. É comum que o arquivo de teste tenha o mesmo nome e fique na mesma pasta do arquivo que está sendo testado, acrescido da sufixo `.test.js`:

```language-javascript
// sum.js
const sum = (a, b) => a + b;

module.exports = sum;
```

```language-javascript
// sum.test.js
const sum = require('./sum');

test('sums two values', () => {
  expect(sum(2, 3)).toBe(5);
});
```

---

A linha `module.exports = sum` exporta a função `sum` no primeiro arquivo para que possa ser utilizada em outros módulos. No segundo arquivo, utilizamos `require('./sum')` para importar a função `sum`. Veja a seção de recursos adicionais para entender mais sobre como importar e exportar módulos em `Node.js`.

### Expect e matchers

Ao escrever testes, você precisa verificar que valores satisfazem a algumas condições. A função `expect` é utilizada para dar acesso a um conjunto de métodos chamados _matchers_. Esses métodos permitem testar valores de diversas formas. `expect` recebe o valor a ser testado e retorna um objeto representando uma _expectation_. Sobre esse objeto pode-se chamar os _matchers_ que **Jest** fornece.

Vamos passar pelos _matchers_ mais comuns. É interessante saber que existem muitos outros _matchers_ que podem ser encontrados na [**documentação oficial**](https://jestjs.io/docs/en/expect) {: .external-link target="_blank" rel="noreferrer noopener" } do **Jest**. No dia a dia, é normal quem desenvolve **ler documentação**, porque na maior parte das vezes esse é o local com mais informações atualizadas. Conforme as ferramentas que conhecemos passarem a ter mais opções de uso e funcionalidades, será normal recorrermos à documentação para aprendermos a utilizá-las melhor.

#### toBe

`toBe`, que utilizamos no exemplo anterior, é o matcher mais simples. Esse _matcher_ testa [igualdade estrita](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) {: .external-link target="_blank" rel="noreferrer noopener" } entre o valor passado para `expect` e seu argumento. Isso significa, por exemplo, que um teste com o _expectation_ abaixo falharia porque a string "5" não é igual ao número 5.

```language-javascript
expect(5).toBe("5")
```

#### toEqual

Para compreendermos a diferença entre `toEqual` e `toBe`, precisamos entender que no **JavaScript** existem duas formas de atribuir valores. A primeira é para a variável e a segunda é para propriedade do objeto, bem como ao passar argumentos para uma função. Essas formas de atribuição são conhecidas por **valor** e **referência**.

Para nos aprofundarmos nessas duas formas, é importante entender os tipos de dados, que separamos em _tipos primitivos_ (Ex. number, string, boolean, etc) e _objetos_ (Ex. Objetos, Funções, Arrays, etc).

Os _tipos primitivos_ a atribuição ocorre por **valor**, ou seja, uma cópia do valor original, pois eles são imutáveis. Eles são como gêmeos, uma vez o primeiro gêmeo corta seu cabelo, o segundo não terá seu cabelo alterado. Por exemplo:

```language-javascript
let name = "Pedro";
let firstName = name;

name = "Carol";

console.log(name); // Carol
console.log(firstName); // Pedro
```

Por outro lado, os _objetos_ tem atribuição por **referência**, ou seja, a cada vez que você cria um novo objeto, cria-se um novo espaço na memória para ele. Eles são mutáveis, por tanto podemos considerar que é uma forma de criar um apelido (_alias_) para o original, ou seja, você pode ser chamado pelo seu nome ou por seu apelido, mas você é uma pessoa única, não é possível criar um clone seu. Veja este exemplo:

```language-javascript
let myName = { firstName: "Pedro" };
let identity = myName;

myName.firstName = "Carol";

console.log(myName.firstName); // Carol
console.log(identity.firstName); // Carol
```

Isso significa que objetos e arrays com conteúdo iguais são considerados diferentes no **JavaScript**. Para testar igualdade de objetos e arrays, é preciso usar o _matcher_ `toEqual`, que acessa cada elemento do objeto ou array, fazendo um trabalho de comparação específico e que retorna uma resposta mais voltada para a necessidade dos testes:

```language-javascript
test('array and object equality', () => {
  const arr = [1, 2 ,3];
  const obj = { a: 1, b: 2, c: 3};

  expect(arr).toBe([1, 2, 3]); // fails
  expect(obj).toBe({ a: 1, b: 2, c: 3}); // fails
  expect(arr).toEqual([1, 2, 3]); // OK
  expect(obj).toEqual({ a: 1, b: 2, c: 3}); // OK
});
```

#### Valores booleanos

`null`, `undefined` e `false` são valores `falsy`. Isso significa que são tratados como `false` sempre que se espera um valor booleano, como em condicionais. Às vezes, porém, é preciso distinguir entre eles. **Jest** fornece _matchers_ específicos para cada um. Leia mais sobre eles na [documentação do Jest](https://jestjs.io/docs/en/using-matchers#truthiness) {: .external-link target="_blank" rel="noreferrer noopener" }.

#### Números

Há matchers para as principais formas de comparar números. Leia [aqui](https://jestjs.io/docs/pt-BR/using-matchers#n%C3%BAmeros) {: .external-link target="_blank" rel="noreferrer noopener" } sobre esses _matchers_

#### Strings

Para comparar string com expressões regulares, utilize o _matcher_ [_toMatch_](https://jestjs.io/docs/pt-BR/expect#tomatchregexporstring) {: .external-link target="_blank" rel="noreferrer noopener" }.

#### Arrays

Você pode verificar se um array contém um item em particular utilizando [_toContain_](https://jestjs.io/docs/pt-BR/expect#tocontainitem) {: .external-link target="_blank" rel="noreferrer noopener" }. Para verificar que um item possui uma estrutura mais complexa, utilize [_toContainEqual_](https://jestjs.io/docs/pt-BR/expect#tocontainequalitem) {: .external-link target="_blank" rel="noreferrer noopener" }. [_toHaveLength_](https://jestjs.io/docs/pt-BR/expect#tohavelengthnumber) {: .external-link target="_blank" rel="noreferrer noopener" } permite facilmente verificar o tamanho de um array ou de uma string.

#### Objetos

É bastante comum testar se um objeto possui uma propriedade específica. O _matcher_ [_toHaveProperty_](https://jestjs.io/docs/pt-BR/expect#tohavepropertykeypath-value) {: .external-link target="_blank" rel="noreferrer noopener" } é ideal para esses casos.

#### Exceções

[_toThrow_](https://jestjs.io/docs/pt-BR/expect#tothrowerror) {: .external-link target="_blank" rel="noreferrer noopener" } testa se uma função lança um erro quando é executada. Para testar se uma função está retornando um erro, é importante estar atento à sintaxe do `.toThrow`:

```language-javascript
const multiplyByTwo = (number) => {
  if (!number) {
    throw new Error('number é indefinido')
  }
  return number * 2;
};
multiplyByTwo(4);

test('testa se multiplyByTwo retorna o resultado da multiplicação', () => {
  expect(multiplyByTwo(4)).toBe(8);
});
test('testa se é lançado um erro quando number é indefinido', () => {
  expect(() => { multiplyByTwo() }).toThrow();
});
test('testa se a mensagem de erro é "number é indefinido"', () => {
  expect(() => { multiplyByTwo() }).toThrowError(new Error('number é indefinido'));
});
```

Note que para testar se um erro é lançado, passamos para o `expect` uma função. Chamamos `multiplyByTwo` dentro da `arrow function`. Chamar a função diretamente dentro de `expect` fará com que o erro não seja capturado. Assim, a asserção falhará, porque o erro acontecerá antes mesmo de `expect` ser executado e ter a chance de capturar o erro. Para testar a mensagem de erro, como fizemos no terceiro teste do exemplo acima, usamos o matcher `toThrowError` e passamos dentro do parênteses a mensagem que será mostrada em caso de erro: `new Error("number é indefinido")`. Observe que nos dois casos a função que queremos testar é chamada indiretamente por uma `arrow function`. Seguir essa sintaxe é importante para que o seu teste funcione corretamente.

#### not

`not` permite testar o oposto de algo. Por exemplo, este código testa que domingo é um dia da semana, mas não um dia útil:

```language-javascript
const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const weekDays = ['Sunday', ...workDays, 'Saturday'];

test('Sunday is a week day', () => {
  expect(weekDays).toContain('Sunday');
});

test('Sunday is not a workday', () => {
  expect(workDays).not.toContain('Sunday');
});
```

---

Estes foram alguns dos _matchers_ mais comuns. Existem muitos outros, e você pode até mesmo criar os seus. A [documentação](https://jestjs.io/docs/pt-BR/expect) {: .external-link target="_blank" rel="noreferrer noopener" } do **Jest** explica com detalhes todos os _matchers_ disponíveis. Consulte-a sempre!

### O bloco describe

A função `describe` cria um bloco para agrupar vários testes. Isso é útil para melhorar a organização dos seus testes. Você pode utilizar `describe`, por exemplo, para separar testes de funções diferentes em um mesmo arquivo, ou para agrupar testes relacionados dentro de uma função complexa que requer muitos testes. É possível aninhar blocos `describe` arbitrariamente. Dentro de cada bloco, qualquer declaração de variáveis ou funções é local a este bloco. Leia os exemplos [na documentação do Jest](https://jestjs.io/docs/pt-BR/api#describename-fn) {: .external-link target="_blank" rel="noreferrer noopener" } para fixar.


### Um pouco de mão na massa

Até agora você viu muita teoria e documentação. Assista aos dois vídeos abaixo para ver **Jest** sendo usado na prática.

<%= vimeo "490496968" %>
<%= vimeo "490503278" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Parte I

1. Refaça os exercícios 1 a 5 do conteúdo de [Testes unitários em JavaScript](/fundamentals/js-unit-tests/js-unit-tests/exercicios/agora-a-pratica) {: .external-link target="_blank" rel="noreferrer noopener" }, dessa vez utilizando **Jest**.

#### Parte II

No Bloco 4 você desenvolveu um projeto para testar os seus conhecimentos em Javascript e lógica de programação: o [Playground functions](https://app.betrybe.com/course/fundamentals/javascript/js-features/project-playground-functions) {: .external-link target="_blank" rel="noreferrer noopener" }. Nos exercícios a seguir, você irá trabalhar com os testes para algumas funções que você criou! Aproveite para refatorá-las e usar ~~todos~~ os recursos que já aprendemos até aqui, como as _Higher Order Functions_ e as `features` do Javascript ES6.

1. Para as funções `encode` e `decode` crie os seguintes testes:
  1. Teste se `encode` e `decode` são funções;
  2. Para a função `encode` teste se as vogais **a, e, i, o, u** são convertidas em 1, 2, 3, 4 e 5, respectivamente;
  3. Para a função `decode` teste se os números 1, 2, 3, 4 e 5 são convertido nas vogais **a, e, i, o, u**, respectivamente;
  4. Teste se as demais letras/números não são convertidos para cada caso;
  5. Teste se a `string` que é retornada pelas funções têm o mesmo número de caracteres que a `string` passada como parâmetro.

2. A função `techList` recebe como parâmetros um array contendo uma lista de tecnologias e uma string com um nome. Para cada tecnologia no array a função cria, em ordem alfabética, um objeto com a seguinte estrutura:

```language-javascript
{
  tech: 'nomeTecnologia',
  name: name,
}
```

Implemente a função `techList` a partir dos testes abaixo. Experimente refatorar a função que você criou para esse projeto! **É importante nunca alterar os testes ou as variáveis já escritas no código**.

```language-javascript
const techList = require('./techList.js');

describe('Testa a função techList', () => {
  it('Testa se a função techList é definida', () => {
    expect(techList).toBeDefined();
  });
  it('Testa se techList é uma função', () => {
    expect(typeof techList).toBe('function');
  });
  it('Lista com 5 tecnologias deve retornar uma lista de objetos ordenados', () => {
    expect(techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'], 'Lucas')).toEqual([
      {
        tech: 'CSS',
        name: 'Lucas'
      },
      {
        tech: 'HTML',
        name: 'Lucas'
      },
      {
        tech: 'JavaScript',
        name: 'Lucas'
      },
      {
        tech: 'Jest',
        name: 'Lucas'
      },
      {
        tech: 'React',
        name: 'Lucas'
      }
    ]);
  });
  it('Lista com 0 tecnologias deve retornar uma mensagem de erro "Vazio!"', () => {
    expect(techList([], 'Lucas')).toBe('Vazio!');
  });
});

module.exports = techList;
```
3. A função `hydrate` recebe uma string no formato "numero bebida", e retorna a sugestão de quantos copos de água você deve beber para se hidratar. Para cada bebida, deve-se tomar um copo de água para não ter ressaca. Exemplo:

```language-javascript
// string recebida
'1 cerveja'
// retorno da função
'1 copo de água'

// string recebida
'1 cerveja, 2 shots e 1 catuaba'
// retorno da função
'4 copos de água'

// string recebida
'2 caipirinhas'
// retorno da função
'2 copos de água'
```

Implemente a função `hydrate` a partir dos testes abaixo. Experimente refatorar a função que você criou para o projeto Playground Function! **É importante nunca alterar os testes ou as variáveis já escritas no código**.

```language-javascript
const hydrate = require('./hydrate.js');

describe('Testa a função hydrate', () => {
  it('Testa se a função hydrate é definida', () => {
    expect(hydrate).toBeDefined();
  });
  it('Testa se hydrate é uma função', () => {
    expect(typeof hydrate).toBe('function');
  });
  it('Ao receber uma string retorne a sugestão de quantos copos de água deve-se beber', () => {
    expect(hydrate('1 cerveja')).toBe('1 copo de água');
    expect(hydrate('1 cachaça, 5 cervejas e 1 copo de vinho')).toBe('7 copos de água');
    expect(hydrate('2 shots de tequila, 2 cervejas e 1 corote')).toBe('5 copos de água');
    expect(hydrate('1 copo de catuaba, 1 cervejas e 1 copo de vinho')).toBe('3 copos de água');
    expect(hydrate('4 caipirinhas e 2 cervejas')).toBe('6 copos de água');
  });
});
```

#### Bônus

1. Você está pronto para um desafio?! Neste exercício, você irá praticar o desenvolvimento orientado a testes implementando:
  - A função;
  - Os testes para essa função;

Considere os dados abaixo. Você deve criar uma função que receba dois parâmetros: o `id` do funcionário e a informação disponível sobre ele (`firstName`, `lastName`, `specialities`). Você também deverá criar os testes para essa função. Sua função deverá então retornar os resultados da busca pelo `id` para aquele funcionário e a informação consultada. Caso o `id` não conste no quadro de funcionários, sua função deve retornar o erro `"ID não identificada"`. Se a informação que se quer acessar não existir, a função deve retornar o erro `"Informação indisponível"`.

```language-javascript
// Dados
const professionalBoard = [
  {
    id: '8579-6',
    firstName: 'Ana',
    lastName: 'Gates',
    specialities: ['UX', 'Design'],
  },
  {
    id: '5569-4',
    firstName: 'George',
    lastName: 'Jobs',
    specialities: ['Frontend', 'Redux', 'React', 'CSS'],
  },
  {
    id: '4456-4',
    firstName: 'Leila',
    lastName: 'Zuckerberg',
    specialities: ['Context API', 'RTL', 'Bootstrap'],
  },
  {
    id: '1256-4',
    firstName: 'Linda',
    lastName: 'Bezos',
    specialities: ['Hooks', 'Context API', 'Tailwind CSS'],
  },
  {
    id: '9852-2-2',
    firstName: 'Jeff',
    lastName: 'Cook',
    specialities: ['Ruby', 'SQL'],
  },
  {
    id: '4678-2',
    firstName: 'Paul',
    lastName: 'Dodds',
    specialities: ['Backend'],
  },
];

// Pesquisa
const searchEmployee = (id, detail) => {
  // Implemente seu código aqui
};
```

Como ponto de partida, comece implementando um teste para checar se a função existe. Execute o teste que você escreveu e implemente, na função, a funcionalidade que passará nesse teste. Repita esse processo até que todos os retornos esperados sejam testados.

---

## Recursos adicionais

* [Conhecendo o Jest](https://medium.com/jaguaribetech/testando-seu-javascript-com-jest-de2a4674f4ad) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Export Module in Node.js](https://www.tutorialsteacher.com/nodejs/nodejs-module-exports) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Jest Crash Course - Unit Testing in JavaScript](https://www.youtube.com/watch?v=7r4xVDI2vho) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Objetos - Referências de valores em JavaScript](https://blog.da2k.com.br/2017/01/25/objetos-referencias-de-valores-em-javascript/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Migrating from Mocha to Jest](https://medium.com/airbnb-engineering/unlocking-test-performance-migrating-from-mocha-to-jest-2796c508ec50) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Comparações de igualdade e uniformidade](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Equality_comparisons_and_sameness) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
