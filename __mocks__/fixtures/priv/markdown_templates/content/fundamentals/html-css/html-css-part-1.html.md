## O que vamos aprender?

Para trabalhar com desenvolvimento de software web, você vai precisar de um sólido conhecimento nas partes fundamentais do código que roda no **cliente**: _HTML, CSS e JavaScript_. Afinal, esse será o ponto de contato dos usuários com as suas aplicações.

Na primeira parte da sua jornada através do **HTML & CSS**, você vai aprender na prática como utilizar _HTML_ para estruturar páginas web.

---

### Você será capaz de:

  * Estruturar páginas web com HTML utilizando as tags `html`, `head` e `body`;
  * Utilizar o HTML para estruturar textos e títulos;
  * Utilizar o HTML para criar listas, _links_ e adicionar imagens;

---

## Por que isso é importante?

Para trabalhar com desenvolvimento web, não é **estritamente necessário** aprender HTML e CSS. Porém, no decorrer da sua carreira, certamente você vai se deparar com código e/ou aplicações inteiras que rodam no **cliente**. Então, o quanto antes você iniciar seu contato com as linguagens de marcação, estilo e comportamento utilizadas no cliente (por exemplo, os _browsers_), mais rápido irá desenvolver as habilidades necessárias para criar páginas web cada vez mais robustas!

O _HTML_ e o _CSS_ são duas das pedras fundamentais no desenvolvimento web. São duas linguagens muito poderosas, que te permitem criar páginas web do zero e são utilizadas como base para inúmeras outras tecnologias de desenvolvimento web, como vamos aprender ao longo do curso.

Você pode pensar no HTML como se fosse o **esqueleto** da sua página. É através do **HTML** que você irá criar a estrutura de como a página vai ser exibida, definindo quais _tags_ servirão para títulos, subtítulos, parágrafos, e outros conteúdos ricos como _links_, imagens, vídeos etc.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Para que você aprenda na prática, a partir de agora vamos ter vários conteúdos interativos, por meio dos quais você irá seguir a teoria e fazer exercícios ao mesmo tempo. Vamos lá!

Você irá desenvolver alguns desafios entre os vídeos. Para subi-los para o seu repositório de exercícios, siga as instruções abaixo:

1. Acesse seu repositório de exercícios, `trybe-exercises`. Caso ainda não tenha um, crie-o e então siga para os próximos passos;

```language-sh
$ cd trybe-exercises
```
2. Crie uma `branch` para os desafios de hoje, a partir da `master`;

```language-sh
$ git checkout -b exercises/3.1
```
3. Já dentro da `branch exercises/3.1`, crie uma pasta para o bloco em que você se encontra **(caso ainda não o tenha feito)**, e então, dentro dessa pasta, crie uma outra pasta para os arquivos dos desafios de hoje;

```language-sh
$ mkdir bloco_3
$ cd bloco_3
$ mkdir dia_1
$ cd dia_1
```
4. Desenvolva os exercícios de conteúdo criando ou alterando o html de cada um;
5. Após finalizar os exercícios propostos da parte de conteúdo, faça o commit de tudo o que fez e abra um PR no seu repositório de exercícios no `GitHub` .

```language-sh
$ git add .
$ git commit -m "Desafio Aula"
$ git push -u origin exercises/3.1
```

`PS: Peça ajuda no Slack caso tenha dúvida nesse passo!`

### Parte I

Primeiro, você verá o que é o HTML e onde ele surgiu!

<%= vimeo "465938716" %>

---

### Parte II

Nesse vídeo você terá contato com as primeiras `tags` e entenderá como os elementos se relacionam.

<%= vimeo "465923655" %>

Para executar o seu código enquanto o desenvolve, utilize a extensão `Live Server`. Para saber mais sobre ela [acesse nosso conteúdo](/real-life-engineer/vscode#live-server) sobre isso.

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>HTML</title>
  </head>
  <body>
    <h1>Exercícios</h1>
    <!-- Exercícios
     1 - Crie uma lista das pessoas que você já fez amizade na Trybe
     2 - Adicione uma imagem que venha de uma URL externa.
     3 - Adicione uma imagem que está no seu computador, local
    -->
  </body>
</html>
```

---

### Parte III

Agora, vamos aprender sobre links internos e externos:

<%= vimeo "465973147" %>

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>HTML</title>
  </head>
  <body>
    <h1>Exercícios</h1>
    <!-- Exercícios - Continue o exemplo anterior
     1 - Crie um parágrafo para cada pessoa da sua lista
     2 - Crie um link entre a sua lista e os parágrafos de pessoas
     3 - Crie um link para a página do Google
    -->
  </body>
</html>
```

`Não se esqueça de dar um PUSH no seu repositório para sincronizá-lo com o GitHub`

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já começou a praticar com o **HTML**, que tal fazermos um encontro ao vivo pelo Zoom para colocarmos juntos a mão na massa?

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Muitas das empresas mais modernas do mundo estão sempre em busca de pessoas desenvolvedoras, e uma das formas de você chamar a atenção delas é ter seu próprio Portfólio Web, onde você irá manter os projetos que desenvolverá!

Com este exercício, você será capaz de:

* Criar seu Portfólio Web usando todo o aprendizado que você construiu hoje;

* Hospedar seu Portfólio Web no [GitHub Pages](https://pages.github.com/) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Construindo seu primeiro Portfólio Web!

Antes de começar, tenha em mente que, por estar utilizando o GitHub Pages, a maneira como você versionará seu código do exercício de hoje (e dos próximos dois dias) é um pouco diferente da forma como o realizará no decorrer do curso. Para os exercícios relacionados ao seu Portfólio Web, você não utilizará seu diretório `trybe-exercises`.

Você deve seguir as instruções a seguir e fazer o setup para o exercício de hoje:

1. Crie um novo diretório onde você vai desenvolver o seu portfólio. É importante que ele seja criado _fora do seu diretório de exercícios_, pois a sua manutenção daqui em diante será feita em outro ambiente;
2. Inicie um novo repositório local com `Git` no diretório que você criou na etapa 1;
3. Crie um arquivo `index.html`;
4. Para executar o seu código enquanto o desenvolve, utilize a extensão `Live Server`. Para saber mais sobre ela [acesse nosso conteúdo](/real-life-engineer/vscode#live-server) sobre isso.

---

### Requisitos

Seu Portfólio Web deve ter as seguintes informações:

* Seu nome completo;

* Uma foto atual sua, acompanhada de um texto alternativo, que deve ser a descrição da foto que você está usando;

* Uma breve descrição sobre você, destacando algumas informações como nacionalidade e a cidade/estado onde mora;

* Uma lista de habilidades que você possui, com destaque para aquela de que você mais se orgulha;

* Um link interno para a sua foto;

* Um link externo para algum blog de que você goste, que abra em uma nova aba;

* Partes do seu portfólio destacadas com negrito e/ou itálico;

* Um índice com links internos para as diferentes seções do seu portfólio.

---

### Dicas

Parabéns, você aprendeu `Git`! Agora, sempre que você finalizar um dos requisitos, **faça um novo commit**, assim você mantém o histórico das alterações e deixa o código organizado.

---

### Colocando seu Portfólio Web para o mundo ver!

Agora que você finalizou seu _Portfólio Web_, chegou o momento em que você vai pegar tudo que você fez e colocar no GitHub Pages! 🎉

Para isso, basta seguir as instruções abaixo:

* [Documentação - GitHub Pages](https://pages.github.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Recursos adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, vamos colocar outras referências para você se aprofundar sobre o tema. Artigos, tutoriais, livros etc…

* [Tutorial - Como utilizar as ferramentas de desenvolvedor do browser](https://www.khanacademy.org/computing/computer-programming/html-css/web-development-tools/a/using-the-browser-developer-tools) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo - GitHub Pages](http://jmcglone.com/guides/github-pages/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playlist - Curso de HTML 5 - Gustavo Guanabara](https://www.youtube.com/playlist?list=PLHz_AreHm4dlAnJ_jJtV29RFxnPHDuk9o) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - Introdução ao HTML - Scrimba](https://scrimba.com/g/ghtml) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - HTML, CSS e JavaScript para desenvolvedores web](https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/welcome) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Série de artigos ensinando HTML & CSS](https://internetingishard.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Aprenda a estilizar o HTML com CSS - Mozilla](https://developer.mozilla.org/en-US/docs/Learn/CSS) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Site - CSS Tricks](https://css-tricks.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Ainda temos muito **HTML & CSS** para escrever! Vamos lá!?

<%= next_button(@conn) %>

---
