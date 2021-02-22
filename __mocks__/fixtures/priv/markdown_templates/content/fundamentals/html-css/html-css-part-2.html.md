## O que vamos aprender?

Na segunda parte da sua jornada através do **HTML & CSS**, você vai aprender na prática como utilizar _CSS_ para estilizar páginas web.

---
### Você será capaz de:

  * Criar regras de estilo para tags HTML utilizando o CSS;
  * Utilizar os seletores de `tag`, `id` e `class` para aplicar regras de CSS;
  * Alterar características da _fonte_ e das _cores_ de páginas web;

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Para que você aprenda na prática, teremos conteúdos interativos, por meio dos quais você irá seguir a teoria e fazer exercícios ao mesmo tempo. Vamos lá!

Você irá desenvolver alguns desafios entre os vídeos. Para subi-los para o seu repositório de exercícios, siga as instruções abaixo:

1. Acesse seu repositório de exercícios, `trybe-exercises`. Caso ainda não tenha um, crie-o e então siga para os próximos passos;

```language-sh
$ cd trybe-exercises
```
2. Crie uma `branch` para os desafios de hoje, a partir da `master`;

```language-sh
$ git checkout -b exercises/3.2
```
3. Já dentro da `branch exercises/3.2` crie uma pasta para o bloco em que você se encontra **(caso ainda não o tenha feito)** e então dentro dessa pasta crie uma outra pasta para os arquivos dos desafios de hoje;

```language-sh
$ mkdir bloco_3
$ cd bloco_3
$ mkdir dia_2
$ cd dia_2
```
4. Desenvolva os exercícios de conteúdo;
5. Crie ou altere um arquivo `.html` para cada exercício. Repita esse processo para cada desafio que for desenvolvendo;
6. Após finalizar os exercícios propostos para hoje, faça um commit com todas as alterações. Em seguida abra um PR no seu repositório de exercícios no `GitHub`.

```language-sh
$ git add .
$ git commit -m "Desafio Aula"
$ git push -u origin exercises/3.2
```

`PS: Peça ajuda no Slack caso tenha dúvida nesse passo!`

### Parte I

Vamos começar com este vídeo para você criar suas primeiras regras com CSS:

<%= vimeo "466421413" %>

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>HTML</title>
    <style></style>
  </head>
  <body>
    <h1>Exercícios 3.2</h1>
    <p>Qual é a sua cor favorita?</p>
    <ul>
      <li>Amarelo</li>
      <li>Vermelho</li>
      <li>Marrom</li>
    </ul>

    <!-- Exercícios
     1 - Modifique o tamanho do h1 para 65 pixels
     2 - Modifique a cor do texto do h1 para laranja
     3 - Modifique a cor de fundo da lista não ordenada
     4 - Crie uma classe para modificar a cor de fundo da tag p e da ul ao mesmo tempo
    -->
  </body>
</html>
```

`Não se esqueça de dar um PUSH no seu repositório para sincronizá-lo com o GitHub`

---

### Parte II

Agora você vai aprender sobre os seletores CSS que modificam propriedades do texto nas páginas:

<%= vimeo "466426641" %>

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>HTML</title>
    <style></style>
  </head>
  <body>
    <h1>Exercícios 3.2</h1>
    <p>Qual é a sua cor favorita?</p>
    <ul>
      <li>Amarelo</li>
      <li>Vermelho</li>
      <li>Marrom</li>
    </ul>

    <!-- Exercícios
     1 - Modifique o família do h1 para sans-serif
     2 - Deixe o parágrafo com o font-weight 600
     3 - Modifique o font-size do body para 16px
     4 - Coloque o tamanho do parágrafo com o tamanho de 3 vezes o padrão do body
     5 - Explore as propriedades font-style, line-height, text-align e text-decoration
     6 - Troque a cor de fundo de cada item da lista para a cor correspondente ao texto
    -->
  </body>
</html>
```

[Link de referência para propriedades de texto em CSS](https://www.w3schools.com/css/css_text.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

`Não se esqueça de dar um PUSH no seu repositório para sincronizá-lo com o GitHub!`

---

### Parte III

Hora de aprender outras formas de adicionar o CSS nas páginas web:

<%= vimeo "466429047" %>

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>HTML</title>
    <style></style>
  </head>
  <body>
    <h1>Exercícios 3.2</h1>
    <p>Qual é a sua cor favorita?</p>
    <ul>
      <li>Amarelo</li>
      <li>Vermelho</li>
      <li>Marrom</li>
    </ul>

    <!-- Exercícios
      Coloque todo o CSS criado até agora nos exercícios anteriores em um arquivo externo.
    -->
  </body>
</html>
```

`Não se esqueça de dar um PUSH no seu repositório para sincronizá-lo com o GitHub`

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já começou a praticar com o **CSS**, que tal fazermos um encontro ao vivo pelo Zoom para colocarmos juntos a mão na massa?

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Vamos continuar com a criação do seu _Portfólio Web_! Hoje é o segundo dia utilizando o GitHub Pages, então lembre-se: o processo de versionamento é relativamente diferente do restante dos exercícios do curso.

Agora é hora de estilizar tudo que você aprendeu! Com este exercício, você será capaz de:

* Estilizar seu _Portfólio Web_ usando todo o conhecimento que você construiu hoje;

* Atualizar seu _Portfólio Web_ no [GitHub Pages](https://pages.github.com/) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Estilizando seu Portfólio Web!

Antes de começar, você deve seguir as instruções abaixo e fazer o setup para o exercício de hoje:

1. Entre no diretório que você criou no dia anterior;
2. Adicione a tag `<style></style>`, que é onde você vai colocar suas alterações;
3. Procure uma paleta de cores com a qual você mais se identifique e que você pode gerar  [nesse site](https://coolors.co/) {: .external-link target="_blank" rel="noreferrer noopener" }.
4. Lembre-se que, para executar o seu código enquanto o desenvolve, você deve utilizar a extensão `Live Server`. Para saber mais sobre ela, acesse nosso [conteúdo](/real-life-engineer/vscode) {: .external-link target="_blank" rel="noreferrer noopener" } sobre isso.

---

### Requisitos

Seu _Portfólio Web_ deve ser estilizado usando as informações a seguir:

* Defina fontes diferentes para o seu nome e para a descrição que você criou;

* Defina uma cor base de background do seu _Portfólio Web_;

* Altere o estilo das tags que você usou para destacar algumas informações, como sua nacionalidade e a cidade/estado onde mora;

* Coloque tamanhos diferentes para os elementos da lista de habilidades que você criou. Lembre-se de usar classes para cada um dos elementos;

---

### Dicas

* Lembre-se de utilizar o **Git** para versionar o seu código!

* Faça _commits_ a cada requisito que você desenvolver.

* Coloque mensagens descritivas nos _commits_.

---

### Atualizando seu Portfólio Web para o mundo ver!

Agora que você estilizou seu _Portfólio Web_, chegou o momento de atualizar tudo o que você fez e colocar no seu GitHub Pages!

Para isso, basta você atualizar seu projeto usando o que você aprendeu de `Git`. 😉

---

## Recursos adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, vamos colocar outras referências para você se aprofundar no tema:

* [Tutorial - Como utilizar as ferramentas de desenvolvedor do browser](https://www.khanacademy.org/computing/computer-programming/html-css/web-development-tools/a/using-the-browser-developer-tools) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo - GitHub Pages](http://jmcglone.com/guides/github-pages/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playlist - Curso de HTML 5 - Gustavo Guanabara](https://www.youtube.com/playlist?list=PLHz_AreHm4dlAnJ_jJtV29RFxnPHDuk9o) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - Introdução ao HTML - Scrimba](https://scrimba.com/g/ghtml) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - HTML, CSS, e JavaScript para desenvolvedores web](https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/welcome) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Série de artigos ensinando HTML & CSS](https://internetingishard.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Aprenda a estilizar o HTML com CSS - Mozilla](https://developer.mozilla.org/en-US/docs/Learn/CSS) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Site - CSS Tricks](https://css-tricks.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CSS Básico - Português](https://pt.khanacademy.org/computing/computer-programming/html-css/intro-to-css/pt/css-basics) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Propriedades de texto no CSS - Português](https://pt.khanacademy.org/computing/computer-programming/html-css/css-text-properties/pt/css-font-family-property) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Usando CSS inline - Inglês](https://www.khanacademy.org/computing/computer-programming/html-css/more-ways-to-embed-css/pt/using-inline-css-styles) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Ainda temos um pouco mais de **HTML & CSS** para escrever, vamos lá!?

<%= next_button(@conn) %>

---
