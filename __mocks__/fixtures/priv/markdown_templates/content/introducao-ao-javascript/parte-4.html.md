## O que vamos aprender?

Na quarta parte do Curso Introdutório da Trybe, você aprenderá uma das principais estruturas de dados disponíveis no _JavaScript_, o `Array`.

Você também vai aprender como implementar uma `estrutura de repetição` utilizando o comando `for`.

---

### Você será capaz de:

  * Manipular arrays;
  * Automatizar um código repetitivo utilizando o comando `for`.

---

## Conteúdos

###### Tempo sugerido para realização: 130 minutos

Vamos apresentar o conteúdo em tópicos e cada tópico terá o material de estudo e exercícios para fixar o aprendizado.

### 1. Arrays
{: id="arrays" }

Você já aprendeu que as `variáveis` em _JavaScript_ são recipientes ou _containers_ para os dados, por exemplo:

```language-javascript
var cor = "Verde";
```
{: .line-numbers}

Os `Arrays` são estruturas utilizadas para armazenar múltiplos valores em uma única variável.

```language-javascript
var cores = ["Verde", "Vermelho", "Amarelo"];
```
{: .line-numbers}

Veja o vídeo abaixo para aprender sobre Arrays em _JavaScript_.

<%= youtube_video("defBuY0nLrc") %>

Agora, vamos praticar com exercícios!

* [Exercício de Arrays](https://www.hackerrank.com/test/6rq668jq2ii/questions/b0ojn9lje49) {: .external-link target="_blank" rel="noreferrer noopener"}

<%= question_feedback(716968) %>

Na [Parte II](/introducao-ao-javascript/parte-2) do curso, você aprendeu que as strings são um dos tipos primitivos em *JavaScript*, certo?! Agora, vamos falar um pouco mais sobre elas e mostrar como elas podem ser parecidas com os Arrays.

<%= youtube_video("X97eAhnDJ4Y") %>

Alguns exercícios para você colocar a mão na massa!

* [Exercício de Strings](https://www.hackerrank.com/test/6rq668jq2ii/questions/bm4o89421kb) {: .external-link target="_blank" rel="noreferrer noopener"}

<%= question_feedback(730212) %>

### 2. Estruturas de repetição
{: id="estruturas-de-repeticao" }

Agora chegou a hora de ver um dos conteúdos mais importantes para a realização do desafio prático! Assista ao vídeo a seguir para entender como funciona o _for_, a estrutura de repetição que a gente vai usar aqui no Curso Introdutório.

<%= youtube_video("lXsKBDhixXQ") %>

Vamos fixar melhor esse conceito fazendo exercícios? Mais um pouco de prática 😁:

Aqui, vai ser importante se lembrar do comando `push`, ensinado lá no vídeo sobre Arrays. O `push` adiciona o valor que você desejar no final de um array. Por exemplo, se eu tenho o seguinte código:

```language-javascript
var frutas = ["banana", "maça", "laranja"];
```

E eu quero adicionar o valor `"mamão"` no final desse array, eu posso utilizar o comando `push`:

```language-javascript
frutas.push("mamão");
```

E o valor do array `frutas` passará a ser:

```language-javascript
["banana", "maça", "laranja", "mamão"]
```

* [Exercício do laço For](https://www.hackerrank.com/test/6rq668jq2ii/questions/f06crb0ol5c) {: .external-link target="_blank" rel="noreferrer noopener"}

<%= question_feedback(717324) %>

* [Exercício do laço For em String](https://www.hackerrank.com/test/6rq668jq2ii/questions/3i8pmoaojrc) {: .external-link target="_blank" rel="noreferrer noopener" }

<%= question_feedback(759989) %>

---

## Recursos adicionais (opcional)

* [Arrays](https://github.com/braziljs/eloquente-javascript/blob/master/chapters/04-estruturas-de-dados.md#estrutura-de-dados-objetos-e-array) {: .external-link target="_blank" rel="noreferrer noopener"}

* [Strings](https://github.com/braziljs/eloquente-javascript/blob/master/chapters/04-estruturas-de-dados.md#strings-e-suas-propriedades) {: .external-link target="_blank" rel="noreferrer noopener"}

* [Estrutura de Repetição - For](https://github.com/braziljs/eloquente-javascript/blob/master/chapters/02-estrutura-do-programa.md#loops-for) {: .external-link target="_blank" rel="noreferrer noopener"}
---

## Próximo

<%= next_button(%{text: "Próximo passo: Funções 🚀", href: "/introducao-ao-javascript/parte-5/"}) %>

---
