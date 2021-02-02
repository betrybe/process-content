## O que vamos aprender?

Você já passou por uma grande parte das estruturas mais fundamentais de _JavaScript_. Hoje, vamos terminar esse assunto e finalizar o aprendizado sobre todos os fundamentos de _JavaScript_

Você também vai aprender sobre _funções_, que fazem parte da estrutura fundamental da linguagem.

---

### Você será capaz de:

- Manipular objetos;
- Utilizar o comando `for/in`;
- Utilizar funções para organizar e estruturar o seu código;

---

## Conteúdos

###### Tempo sugerido para a realização: 80 minutos

A seguir, você vai aprender sobre **objetos**, **for/in** e **funções**.

---

### Objetos

Você já aprendeu que as **variáveis** em _JavaScript_ são recipientes ou _containers_ para os dados. Por exemplo:

```language-javascript
let car = "Fiat";
```
{: .line-numbers}

Agora é hora de aprender sobre objetos:

<%= vimeo "453615197" %>

Então, pessoal, como vocês viram, objetos também são variáveis, porém eles podem organizar estruturas mais complexas.

```language-javascript
let car = {
  type: "Fiat",
  model: "500",
  color: "white",
};
```
{: .line-numbers}

1. Agora vamos fazer alguns exercícios de fixação para consolidarmos os conhecimentos adquiridos no video anterior! 😉

* Crie um objeto `player` contendo as variáveis listadas abaixo.

```language-javascript
let name = 'Marta';
let lastName = 'Silva';
let age = 34;
let medals = { golden: 2, silver: 3 };
```
{: .line-numbers}

* Acesse a chave `name`, `lastName` e `age`. Concatene as informações para fazer um `console.log` no seguinte formato: "A jogadora Marta Silva tem 34 anos de idade".

* Adicione ao objeto a chave `bestInTheWorld` e atribua a esta chave um `array` contendo as datas em que a jogadora Marta foi considerada a melhor do mundo.

```language-javascript
let bestInTheWorld = [2006, 2007, 2008, 2009, 2010, 2018];
```
{: .line-numbers}

* Acesse a chave `bestInTheWorld` e faça um `console.log` no seguinte formato: "A jogadora Marta Silva foi eleita a melhor do mundo por 6 vezes".

* Acesse a chave `medals` e faça um `console.log` no seguinte formato: "A jogadora possui 2 medalhas de ouro e 3 medalhas de prata".

Agora veremos uma variação do laço `for`, que nos garante facilidade ao lidar com objetos.

---

### For/in

<%= vimeo "472850651" %>

Depois de conhecer o laço `for/in`, o código que mostra as marcas de carros presentes em um Array é:

```language-javascript
let cars = ["Saab", "Volvo", "BMW"];

for (let i in cars) {
  console.log(cars[i]);
}
```
{: .line-numbers}

Um outro exemplo é a iteração nas chaves de um objeto:

```language-javascript
let car = {
  type: "Fiat",
  model: "500",
  color: "white",
};

for (let i in car) {
  console.log(i, car[i]);
}
```
{: .line-numbers}

O resultado do código acima é:

```language-shell
type Fiat
model 500
color white
```
{: .line-numbers}

Faça o **exercício #2** da seção **JS For Loops** deste [link](https://www.w3schools.com/js/exercise_js.asp?filename=exercise_js_loops2) {: .external-link target="_blank" rel="noreferrer noopener" } para colocar em prática o que acabou de aprender.

---

### Funções

Funções são a forma mais essencial de organização de código e de lógica na programação. Através de funções, você consegue empacotar partes do seu código e separá-lo em blocos lógicos autocontidos.

Assim, em vez de ter um programa de cem linhas com uma lógica linear que segue do começo ao fim, você tem menos repetição e um programa em que a lógica está muito bem dividida - e, portanto, muito mais fácil de ser entendida.

No vídeo abaixo, você vai aprender o básico sobre funções com nosso **especialista Norba**:

<%= youtube_video "pGYAQHEZuEc" %>

Que tal praticar um pouco?

Pegue cada um dos exercícios da [primeira parte](/fundamentals/javascript/js-features/js-part-1/#agora-a-pr%C3%A1tica) das nossas aulas de _JavaScript_ e faça com que todos eles sejam funções de um mesmo arquivo. As variáveis que você define no começo de cada arquivo devem ser removidas e transformadas em parâmetros das funções. Por exemplo:

O programa...

```language-javascript
// Adição
let a = 5;
let b = 2;

a + b;
```

... se transforma em:

```language-javascript
function sum(a, b) {
  return a + b;
}
```

Após [refatorar o seu código](/real-life-engineer/glossary#refatoracao), verifique se ele ainda está funcionando conforme especificado. Teste cada função com algumas entradas diferentes.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Partiu praticar esses conceitos todos juntos?!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Agora vamos exercitar a utilização de objetos e funções. Você verá que alguns assuntos, como lógica condicional e loops, entre outros, vão reaparecer frequentemente nos nossos exercícios.

<%= versioning_your_code(@conn) %>


### Agora a prática

Bora fixar o conteúdo de hoje?! 🎯 💪

[Preparamos estes exercícios](https://be-trybe.typeform.com/to/P8WRJeTT) {: .external-link target="_blank" rel="noreferrer noopener" } para você fixar seus conhecimentos sobre **JavaScript - Objetos e Funções.** Eles já contam com feedback na hora e são rapidinhos! Vamos lá?



### Parte I - Objetos e For/In

Usando o objeto abaixo, faça os exercícios a seguir:

```language-javascript
let info = {
  personagem: "Margarida",
  origem: "Pato Donald",
  nota: "Namorada do personagem principal nos quadrinhos do Pato Donald",
};
```

1. Imprima no console uma mensagem de boas-vindas para a personagem acima, incluindo seu nome.
  - Valor esperado no console: `Bem-vinda, Margarida`

2. Insira no objeto uma nova propriedade com o nome de chave "recorrente" e o valor "Sim" e, em seguida, imprima o objeto no console.
  - Valor esperado no console:

```language-javascript
  {
    personagem: 'Margarida',
    origem: 'Pato Donald',
    nota: 'Namorada do personagem principal nos quadrinhos do Pato Donald',
    recorrente: 'Sim'
  };
```

3. Faça um `for/in` que mostre todas as chaves do objeto.
  - Valor esperado no console:

```language-html
  personagem
  origem
  nota
  recorrente
```

4. Faça um novo `for/in`, mas agora mostre todos os valores das chaves do objeto.
  - Valor esperado no console:

```language-bash
  Margarida
  Pato Donald
  Namorada do personagem principal nos quadrinhos do Pato Donald
  Sim
```

5. Agora, defina um segundo objeto com a mesma estrutura (as mesmas chaves) do primeiro e os seguintes valores: "Tio Patinhas", "Christmas on Bear Mountain, Dell's Four Color Comics #178", "O último MacPatinhas", "Sim".
  - Valor esperado no console:

```language-bash
Margarida e Tio Patinhas
Pato Donald e Christmas on Bear Mountain, Dell's Four Color Comics #178
Namorada do personagem principal nos quadrinhos do Pato Donald e O último MacPatinhas
Ambos recorrentes // Atenção para essa última linha!
```

---

### Parte II - Funções

Agora vamos fazer um exercício que vai deixar claro como funções com responsabilidades bem definidas deixam o código mais bem escrito.

1. Crie uma função que receba uma `string` e retorne `true` se for um [palíndromo](https://pt.wikipedia.org/wiki/Pal%C3%ADndromo) {: .external-link target="_blank" rel="noreferrer noopener" }, ou `false`, se não for.

  - Exemplo de palíndromo: _arara_.

  - `verificaPalindrome("arara")`;

  - Retorno esperado: `true`

  - `verificaPalindrome("desenvolvimento")`;

  - Retorno esperado: `false`

2. Crie uma função que receba um `array` de inteiros e retorne o índice do maior valor.

  - Array de teste: _`[2, 3, 6, 7, 10, 1];`_.

  - Valor esperado no retorno da função: `4`.

3. Crie uma função que receba um `array` de inteiros e retorne o índice do menor valor.

  - Array de teste: _`[2, 4, 6, 7, 10, 0, -3];`_.

  - Valor esperado no retorno da função: `6`.

4. Crie uma função que receba um `array` de nomes e retorne o nome com a maior quantidade de caracteres.

  - Array de teste: _`['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana'];`_.

  - Valor esperado no retorno da função: `Fernanda`.

5. Crie uma função que receba um `array` de inteiros e retorne o inteiro que mais se repete.

  - Array de teste: _`[2, 3, 2, 5, 8, 2, 3];`_.

  - Valor esperado no retorno da função: `2`.

6. Crie uma função que receba um número inteiro N e retorne o somatório de todos os números de 1 até N.

  - Valor de teste: _`N = 5`_.

  - Valor esperado no retorno da função: _1+2+3+4+5 =_ `15`.

7. Crie uma função que receba uma `string word` e outra `string ending`. Verifique se a `string ending` é o final da `string word`. Considere que a `string ending` sempre será menor que a `string word`.

  - Valor de teste: `"trybe" e "be"`

  - Valor esperado no retorno da função: `true`

  - `verificaFimPalavra("trybe", "be")`;

  - Retorno esperado: `true`

  - `verificaFimPalavra("joaofernando", "fernan")`;

  - Retorno esperado: `false`

---

### Bônus

1. (Difícil) Faça um programa que receba uma string em algarismos romanos e retorne o número que a string representa.

  - **Atenção! Esse exercício já apareceu no processo seletivo de uma grande multinacional!**

  - Dicas:

      - Uma string é um array de caracteres, então cada elemento do array é uma letra.
      - O valor de cada numeral romano é:

    ```
        | I   | 1    |
        | --- | ---- |
        | IV  | 4    |
        | V   | 5    |
        | IX  | 9    |
        | X   | 10   |
        | XL  | 40   |
        | L   | 50   |
        | XC  | 90   |
        | C   | 100  |
        | CD  | 400  |
        | D   | 500  |
        | CM  | 900  |
        | M   | 1000 |
    ```

      * Que tal criar um objeto que associe cada letra a um numeral para fácil consulta?

      * **Atenção! Quando você tem um número pequeno à direita de um número grande, eles devem ser somados. Exemplo: XI = 10 + 1 = 11. No entanto, se o número pequeno está à esquerda de um número maior que ele, ele deve ser subtraído. Exemplo: IX = 10 - 1 = 9.**

2. Para o próximo exercício você irá precisar ter uma conta no `CodeWars`, para entender como fazê-lo acesse esse o [conteúdo](/real-life-engineer/code-wars) que fizemos sobre isso. Após seguir os passos para registro acesse o desafio proposto e então clique em `TRAIN`, você então será redirecionado para a página onde o desafio deve ser feito. Quando tiver finalizado o exercício clique em `TEST` para verificar, com testes simples, se sua solução satisfaz o que foi pedido. Passando nesses testes clique em `ATTEMPT`, ao fazer isso seu código passará por todos os testes existentes para validação da solução. Caso sua solução esteja correta o botão `SUBMIT` ficará disponível, clique nele para submeter sua resposta, caso contrário volte ao seu código e veja o que ainda não está satisfazendo o que se é pedido, repita esse processo até que sua solução esteja correta.

  * [Desafio - 16 + 8 = 214](https://www.codewars.com/kata/5effa412233ac3002a9e471d/javascript) {: .external-link target="_blank" rel="noreferrer noopener" };
    * Esse desafio irá exigir um pouco de conhecimento sobre alguns `métodos` do JavaScript, para isso pesquise quando for necessário e caso surja alguma dúvida peça ajuda no `Slack`. Dúvidas em como fazer uma boa pesquisa? Sem problemas! Acesse esse conteúdo sobre [como pesquisar como uma pessoa desenvolvedora](/real-life-engineer/how-to-search-like-a-dev.md).

## Recursos adicionais (opcional)

* Mal pode esperar pra estudar mais _JavaScript_? Aqui temos o sumário do [guia definitivo de JS](https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/#toc-start) {: .external-link target="_blank" rel="noreferrer noopener" } pra você saber mais sobre essa linguagem.

* [W3Schools _JavaScript_ Objects](https://www.w3schools.com/js/js_objects.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [W3Schools _JavaScript_ Loop For](https://www.w3schools.com/js/js_loop_for.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Vídeo alternativo sobre funções](https://www.youtube.com/watch?v=PH9lJHYfuaI) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>

---
