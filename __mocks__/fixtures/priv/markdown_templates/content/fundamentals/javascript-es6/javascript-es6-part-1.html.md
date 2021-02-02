## O que vamos aprender

Neste bloco e no próximo, você vai aprender sobre a mais nova versão do ***JavaScript***, conhecida como **ES6**, **ECMAScript 6** ou **ES2015**.

Esses vários nomes podem gerar alguma dúvida, mas na verdade todos fazem referência à mesma linguagem. ***JavaScript*** é como nós chamamos a linguagem, só que esse nome é um _trademark_ da _Oracle_. O nome oficial da linguagem é **ECMAScript**, e **ES** é apenas a abreviação (**E**CMA**S**cript).

Essa nova versão possui alguns objetivos:

- Ser uma linguagem melhor para construir aplicações complexas;
- Resolver problemas antigos do JavaScript;
- Facilitar o desenvolvimento de _libraries_.

Hoje você vai aprender quatro `features` do ***ES6*** que são muito importantes para que seu código fique limpo e bem escrito, além de resolverem alguns problemas da linguagem.

* `let`;

* `const`;

* `arrow functions`;

* `template literals`.

---

### Você será capaz de:

  * Utilizar corretamente `let` e `const`;

  * Simplificar seu código com `arrow functions`;

  * Simplificar a construção de strings com `template literals`.

---

## Por que isso é importante?

O `let` e o `const` vieram como solução para um antigo problema do ***JavaScript*** de falta de definição de escopo de variáveis. Sabe quando você declara uma variável dentro de um bloco e depois a utiliza fora dele? Isso é um vazamento de variável. Esse problema sempre trouxe grandes prejuízos, principalmente para aplicações maiores. Saber utilizar o `let` e o `const` de maneira consistente irá te ajudar a ter um código mais confiável e previsível.

As `arrow functions`, além de deixar o código mais legível, quando bem utilizadas, ainda resolvem outro problema antigo do famigerado `var that = this`. Vamos ver esse problema com mais detalhes na sessão de conteúdos.

Por último, mas não menos importante, vêm os `template literals`. Eles vão nos ajudar a construir strings mais bem escritas e concisas, ajudando na prevenção de erros.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Até aqui, você já foi apresentado a algumas `features` do ES6, como `let`, `const`, e talvez até mesmo já tenha usado `arrow functions` e `template literals`. Agora você vai aprender as motivações para se usar cada um desses recursos para escrever códigos mais limpos, concisos e identificar a presença desses elementos ao revisar códigos de outras pessoas.

### Parte I - `var, let e const`

Você certamente já se deparou com três diferentes formas de se declarar variáveis em Javascript:

`var userEmail = "maria@email.com";`

`let userId = 78945-6;`

`const userLocation = "Brasil";`

Qual a diferença entre essas declarações? Apesar de serem utilizadas para o mesmo propósito, é importante entender essas diferenças para saber quando usar o `var`, `let` e `const` na hora de declarar variáveis. Afinal, quando declaradas na raiz do arquivo as três formas estão corretas e funcionam da mesma forma.

Em primeiro lugar, vamos entender o que é o escopo em que a variável é declarada. Podemos pensar em escopo como sendo o 'local' em que uma variável é visível e pode ser referenciada. Como exemplo, observe a função abaixo:

```language-javascript
function userInfo() {
  let userEmail = 'maria@email.com';

  // Toda expressão dentro do escopo da função userInfo tem acesso à variável userEmail
  console.log(userEmail);
}
userInfo();
```
{: .line-numbers}

Tente rodar a função `userInfo` no seu editor de código. Nesse caso, a variável `userEmail` foi declarada dentro do escopo da função `userInfo`. Agora experimente mover o `console.log(userEmail)` para fora da função e a execute novamente. Você verá um erro dizendo que `userEmail` não é definida - a variável só é reconhecida dentro do escopo da função. O que aconteceria se trocássemos o `let` por `var ` e `const `? Não deixe de fazer esse teste! Você verá que nos três casos, não temos acesso à variável fora do escopo da função `userInfo `. Como saber, então, qual expressão utilizar para declarar variáveis?

* Veja este vídeo que fala sobre onde utilizar `var`, `let` e `const`.

<%= vimeo "482288736" %>

Vamos agora pensar em variáveis declaradas dentro do escopo de um bloco de código - como o corpo de um `if ` ou um `for `. Acompanhe o exemplo abaixo e não deixe de testá-lo no seu editor de código:

```language-javascript
if (true) {
  // inicio do escopo do if
  var userAge = "20";
  console.log(userAge); // 20
  // fim do escopo do if
}
console.log(userAge); // 20
```
{: .line-numbers}

Nesse exemplo, temos acesso à variável `userAge` dentro e fora do bloco de código. Experimente trocar o `var` por `let` e `const`. Qual será o resultado? Temos acesso à variável declarada com o `var` dentro e fora do escopo do bloco. No entanto, não temos acesso à `userAge` fora do bloco de código quando usamos `let` e `const` para declarar essa variável. Isso é interessante quando queremos trabalhar com variáveis acessíveis apenas no contexto daquele bloco de código. Por ter um escopo mais abrangente, em aplicações mais complexas declarar variáveis com o `var` pode confundir até mesmo programadores mais experientes.

Agora observe de uma forma um pouco mais visual como funcionam os escopos e o comportamento do `var` em casos que sua utilização "vaza" o escopo.

<%= figure(%{src: "/fundamentals/javascript-es6/images/escopos.gif", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto", caption: "GIF Escopos."}) %>

Outro grande problema ao utilizar o `var` para atribuir valor à variáveis é que você consegue sobrescrevê-las sem gerar erros.

```language-javascript
var userName = "Isabella";
var userName = "Lucas";
console.log(userName); // Resultado: Lucas
```
{: .line-numbers}

Em aplicações maiores, você pode redeclarar variáveis acidentalmente e nem perceber o que aconteceu quando usamos o `var`. Por isso, encontrar e corrigir bugs pode se tornar uma verdadeira missão impossível. Por estes motivos, declarar variáveis com o `var` não é uma boa prática.

O ES6 corrige esse problema ao introduzir o `let` e o `const`, fazendo com que uma variável, com um nome específico, só possa ser declarada uma única vez dentro de um escopo. Experimente executar o exemplo anterior usando o `let` e `const` e veja o que acontece! 

E quanto ao `const`, como ele se diferencia do `let`? O `const` permite com que você declare **constantes**. Em outras palavras, o valor atribuído a uma variável declarada com o `const` não pode ser alterado. Já quando usamos o `let`, podemos substituir o valor original atribuído à variável. Tente executar o código abaixo usando o `const` e `let` e veja o que acontece!

```language-javascript
const favoriteLanguage = "Javascript";
favoriteLanguage = "Python";
console.log(favoriteLanguage); // Erro

let favoriteTechnology = "Machine learning";
favoriteTechnology = "Facial recognition";
console.log(favoriteTechnology); // Facial recognition
```
{: .line-numbers}

No exemplo acima, vimos que o `const` é **imutável** - ao declarar `const favoriteLanguage = "Javascript` o valor de `favoriteLanguage` não pode ser alterado. Mas quando usamos o `const` para criar um objeto, o Javascript nos permite alterar as suas propriedades sem, contudo, reatribuir um novo objeto. Acompanhe o exemplo abaixo para entender melhor como funciona:

```language-javascript
const userInfo = {
  name: "Cláudio",
  id: "5489-2",
  email: "claudio@email.com"
};
userInfo.name = "João"

console.log(userInfo) // { name: "João", id: "5483-2", email: "claudio@email.com }
```
{: .line-numbers}

Esse raciocínio também se aplica a um array. Podemos alterá-lo indiretamente adicionando/removendo um novo item sem sobrescrever o que já foi declarado:

```language-javascript
const technologies = ['Javascript', 'CSS', 'HTML'];
technologies.push('React');
console.log(technologies); // [ 'Javascript', 'CSS', 'HTML', 'React' ]

technologies = ['Javascript', 'CSS', 'HTML', 'React']
console.log(technologies); // Erro
```
{: .line-numbers}

Em resumo, variáveis podem ser declaradas com o `const`, `let` e `var`. Apesar das três terem o mesmo propósito, é importante nos atentar às boas práticas para escrevermos códigos confiáveis. Assim, sempre que possível, usar o `const` para declarar variáveis é interessante porque conseguimos um comportamento mais previsível, já que o seu valor não pode ser alterado diretamente. 

### Parte II - `template literals`

`template literals` é mais uma `feature` do ES6 que nos permite criar `strings` complexas de forma mais fácil. Você certamente já concatenou `strings` e variáveis em Javascript da seguinte forma:

```language-javascript
const myName = "Isabella"
console.log('Hello' + ' ' + myName + '!');
```
{: .line-numbers}

Essa solução ~~nada elegante~~ é como fazíamos antes do ES6 introduzir uma nova forma de criar e manipular strings dinamicamente através de `template literals`. Com o `template literals` o exemplo acima pode ser substituído por:

```language-javascript
const myName = "Isabella"
console.log(`Welcome ${myName}!`);
```
{: .line-numbers}

A sintaxe do `template literals` pede para usarmos o sinal de *crases* no início e no final da frase, e variáveis dentro de um `${...}`. Você também pode adicionar uma expressão dentro das chaves, como `${a + b}`. Outra novidade é poder adicionar quebras de linha com o `template literals` sem a necessidade de concatená-las com o operador `+` e `\n` para trocar de linha. Execute o código abaixo para ver o resultado!

```language-javascript
// Com o template literals
console.log(`Primeira linha;
Segunda linha;
Terceira linha;`
)

// Sem o template literals:
console.log('Primeira linha;\n' + 'Segunda linha;\n' + 'Terceira linha;\n')
```
{: .line-numbers}

Agora você já está pronto para escrever códigos mais limpos e legíveis usando `template literals`!

### Parte III - `arrow functions`

Você já está craque em declarar funções em JavaScript utilizando a seguinte sintaxe:

```language-javascript
const printName = function () {
  const myName = "Lucas";
  return myName;
}
console.log(printName());
```
{: .line-numbers}

A expressão acima está correta. Mas como você verá nos exemplos a seguir, é possível deixá-la ainda mais direta e léxica. Você aprenderá com alguns exemplos as vantagens de usarmos mais essa novidade do Javascript ES6 - `arrow functions `. Uma das aplicações para `arrow functions` é em funções anônimas. Em Javascript, é muito comum não precisarmos nomear funções, como mostrado no exemplo acima. Isso pode acontecer quando criamos funções que não serão reutilizadas, ou que serão passadas como argumento para uma outra função. Chamamos funções sem um nome específico de funções anônimas.

Primeiramente, assista ao vídeo a seguir.

<%= vimeo "482381492" %>

`arrow functions` nada mais é do que uma forma diferente de se declarar funções escrevendo menos código. Veja abaixo como ficaria a função `printName` utilizando a sintaxe da `arrow function`:

```language-javascript
const printName = () => {
  const myName = "Lucas";
  return myName;
}
console.log(printName());
```
{: .line-numbers}

Quando não há nada no corpo da função e apenas um valor é retornado, a sintaxe da `arrow function` nos permite simplificar ainda mais a função `printName` omitindo o `return` e as chaves:

```language-javascript
const printName = () => "Lucas";
console.log(printName());
```
{: .line-numbers}

Mas lembre-se que podemos omitir os parênteses apenas em dois cenários: 

- Quando não passamos nenhum parâmetro para a função, como no exemplo acima;
- Quando a função recebe apenas um argumento, como podemos ver no exemplo abaixo:

```language-javascript
const multiplyByTwo = number => number * 2;
console.log(multiplyByTwo(10));
```
{: .line-numbers}

Em funções que recebem mais de um parâmetro, os parênteses não são omitidos:

```language-javascript
const multiplication = (number, multi) => number * multi;
console.log(multiplication(8, 2));
```
{: .line-numbers}

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já ficou fera nos recursos do ***ES6***, que tal vermos algumas aplicações juntinhos? 💚

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Parte I

Agora você vai fazer alguns exercícios de fixação.


1. Faça as modificações necessárias na função para que o seu comportamento respeite o escopo no qual cada variável foi declarada.
  * Modifique a estrutura da função para que ela seja uma `arrow function`.
  * Modifique as concatenações para `template literals`.
  * Copie o código abaixo.

```language-js
      function testingScope(escopo) { 
        if (escopo === true) { 
          var ifScope = 'Não devo ser utilizada fora do meu escopo (if)';
          ifScope = ifScope + ' ótimo, fui utilizada no escopo !';
          console.log(ifScope);
        } else {
          var elseScope = 'Não devo ser utilizada fora meu escopo (else)';
          console.log(elseScope);
        }
        console.log(ifScope + ' o que estou fazendo aqui ? :O'); // Se necessário esta linha pode ser removida.
      }

      testingScope(true);
```

2. Copie o código abaixo e faça uma função que retorne o array `oddsAndEvens` em ordem crescente.
    * Utilize `template literals` para que a chamada `console.log(oddsAndEvens);` retorne "Os números 2,3,4,7,10,13 se encontram ordenados de forma crescente!".
    * ***Bônus (opcional):*** tente fazer o mesmo exercício utilizando o método[array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) {: .external-link target="_blank" rel="noreferrer noopener" }. **Spoiler:** É possível realizar uma função que ordene qualquer array de números.
    * Copie o código abaixo.

```language-js
      const oddsAndEvens = [13, 3, 4, 10, 7, 2];

      // Seu código aqui.

      console.log(oddsAndEvens);
```


### Parte II

Abaixo, você verá algumas especificações de algoritmos para desenvolver. É fundamental que você utilize o que aprendeu sobre `let`, `const`, `arrow functions` e `template literals`.

1. Crie uma função que receba um número e retorne seu fatorial.

  * Na matemática, o fatorial de um número não negativo `N`, com a notação `N!`, é o produto de todos os inteiros menores ou iguais a `N`. **Exemplo:** 4! = 4 \* 3 \* 2 \* 1 = 24.

  * ***Bônus (opcional):*** tente fazer o mesmo exercício [de forma recursiva](http://www.devfuria.com.br/logica-de-programacao/recursividade-fatorial/) {: .external-link target="_blank" rel="noreferrer noopener" }. **Spoiler:** É possível resolver com uma linha.

2. Crie uma função que receba uma frase e retorne qual a maior palavra.

  * Exemplo:

```language-js
      longestWord("Antônio foi no banheiro e não sabemos o que aconteceu") // retorna 'aconteceu'
```

3. Crie uma página que contenha:

  * Um botão ao qual será associado um _event listener_;

  * Uma variável `clickCount` no arquivo ***JavaScript*** que acumule o número de _clicks_ no botão;

  * Um campo no ***HTML*** que vá atualizando a quantidade de _clicks_ no botão conforme a variável `clickCount` é atualizada.

4. Crie um código ***JavaScript*** com a seguinte especificação:

**Não se esqueça de usar `template literals`**

  * *Função 1*: Escreva uma função que vai receber uma `string` como parâmetro. Sua função deverá procurar pela letra `x` em uma string qualquer que você determinar e substituir pela string que você passou como parâmetro. Sua função deve retornar essa nova `string`.

    **Exemplo:**
    * String determinada: "Tryber x aqui!"
    * Parâmetro: "Bebeto"
    * Retorno: "Tryber Bebeto aqui!"

  * Um array com escopo global, que é o escopo do arquivo ***JS***, nesse caso, contendo cinco strings com suas principais `skills`.

  * *Função 2*: Escreva uma função que vai receber a `string` retornada da *Função 1* como parâmetro. Essa função deve concatenar as `skills` do array global à `string` que foi passada para a *Função 2* via parâmetro. Você deve ordenar os `skills` em ordem alfabética. Sua função deve retornar essa nova `string`.

    **Exemplo:**

    "Tryber x aqui!

    Minhas cinco principais habilidades são:

    - JavaScript;
    - HTML;
    ...

    #goTrybe".

---

## Recursos adicionais (opcional)

* [Comparando o escopo de variáveis `var` e `let`;](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/compare-scopes-of-the-var-and-let-keywords) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exemplos de uso de `let`, `const` e `var`](https://love2dev.com/blog/javaScript-var-let-const/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Modificando um array declarado como `const`.](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/mutate-an-array-declared-with-const) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Mais exemplos sobre `template literals`](https://css-tricks.com/template-literals/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Conteúdo sobre `arrow functions`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
