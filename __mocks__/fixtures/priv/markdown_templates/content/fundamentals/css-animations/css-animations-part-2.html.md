## O que vamos aprender?

Na segunda parte do conteúdo sobre ***CSS Animations*** você irá adquirir mais ferramentas para ter à sua disposição para fazer animações cada vez mais complexas e interessantes!

Se na última aula nós vimos as partes essenciais de uma animação - o **como** e o **quando** elas acontecem - aqui nós veremos como fazemos animações mais complexas - com as ***transformations*** -, como fazemos transições mais suaves entre as animações - as ***transitions*** - ou mais segmentadas - com os ***steps***.

---

### Você será capaz de:

  * Utilizar ***transformations*** para animar seus elementos, incluindo:
    * *translate*
    * *scale*
    * *rotate*
    * *skew*

  * Utilizar ***transitions*** para suavizar alterações de estilo entre seus elementos.

  * Utilizar ***steps*** para fazer as transições entre etapas de animação serem *discretas*.

---

## Por que isso é importante?

Com essas ferramentas em mãos a sua ***toolbox*** de animações ***CSS*** será enorme e robusta! Você será capaz de criar todo tipo de efeito que o designer determinar como importante para um site ou produto de maneira eficiente para o browser que processa tais efeitos.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

A criatividade dos designers é ilimitada e, como tal, a variedade de animações que você terá que criar na sua vida em desenvolvimento web também é. Duvida? [Eu](https://www.webdesignerdepot.com/2017/09/11-experimental-css-projects-thatll-blow-your-mind/) {: .external-link target="_blank" rel="noreferrer noopener" } [não](https://www.mockplus.com/blog/post/css-animation-examples) {: .external-link target="_blank" rel="noreferrer noopener" } [duvidaria](https://webdesign.tutsplus.com/pt/articles/15-inspiring-examples-of-css-animation-on-codepen--cms-23937) {: .external-link target="_blank" rel="noreferrer noopener" } [se](https://medium.mybridge.co/26-impressive-web-projects-built-with-css-only-4a4c2f773a21) {: .external-link target="_blank" rel="noreferrer noopener" } [fosse você](https://1stwebdesigner.com/15-fun-and-inspiring-examples-of-css-animation/) {: .external-link target="_blank" rel="noreferrer noopener" }.

O conteúdo da aula de hoje traz maneiras mais sofisticadas e alternativas de se construir animações em ***CSS***. Com todas essas ferramentas em mãos, o céu é o limite para o que o seu ***CSS*** pode fazer! No conteúdo, exercícios e projeto dessa semana esperamos te mostrar um pouco de todo esse potencial.

---

### Transformations

Transformações são animações que, por assim dizer, alteram o elemento sem alterar os seus estilos ***CSS***. São operações que aumentam ou diminuem o tamanho de um elemento, o giram em vários eixos e operações similares. Primeiramente, leia esses manuais de [transformações 2D](https://www.w3schools.com/css/css3_2dtransforms.asp) {: .external-link target="_blank" rel="noreferrer noopener" } e [transformações 3D](https://www.w3schools.com/css/css3_3dtransforms.asp) {: .external-link target="_blank" rel="noreferrer noopener" }.

A seguir, veremos alguns exemplos:

##### translate

A `translate` vai *transladar* o elemento no espaço da página, isto é, deslocá-lo. Você diz à transformação quanto o elemento deve se deslocar (em pixels, em, etc) no eixo X e no eixo Y, respectivamente.

```language-html
<html>
  <head>
    <style>
      .translation {
        background-color: #E0E0E0;
      }
      .translation:hover {
        transform: translate(20px, 50px);
      }
    </style>
  </head>
  <body>
    <div class="translation">Div com translação.</div>
  </body>
</html>
```

<html>
  <head>
    <style>
      .translation {
        background-color: #E0E0E0;
      }
      .translation:hover {
        transform: translate(20px, 5px);
      }
    </style>
  </head>
  <body>
    <div class="translation">Div com translação.</div>
  </body>
</html>

E essa transformação pode ser associada a keyframes também:

```language-html
<html>
  <head>
    <style>
      @keyframes translating {
        0% {
          transform: translate(20px, 5px);
        }
        100% {
          transform: translate(-20px, -5px);
        }
      }
      .eternal-translation {
        background-color: #e0e0e0;
        animation: translating 2s linear infinite alternate;
      }
    </style>
  </head>
  <body>
    <div class="eternal-translation">Div com translação eterna.</div>
  </body>
</html>
```


<html>
  <head>
    <style>
      @keyframes translating {
        0% {
          transform: translate(20px, 5px);
        }
        100% {
          transform: translate(-20px, -5px);
        }
      }
      .eternal-translation {
        background-color: #e0e0e0;
        animation: translating 2s linear infinite alternate;
      }
    </style>
  </head>
  <body>
    <div class="eternal-translation">Div com translação eterna.</div>
  </body>
</html>

Experimente agora inspecionar esse elemento para alterar a transformação! Que tal acelerar a transformação para 200 milisegundos, por exemplo?

##### scale

A `scale` aumenta o elemento ou o diminui. É tão simples quanto parece!

```language-html
<html>
  <head>
    <style>
      @keyframes scaling {
        0% {
          transform: scale(0.5, 2.0);
        }
        50% {
          transform: scale(1.5, 0.5);
        }
        100% {
          transform: scale(1.0, 1.0);
        }
      }
      .eternal-scaling {
        background-color: #e0e0e0;
        animation: scaling 2s linear infinite alternate;
      }
    </style>
  </head>
  <body>
    <div class="eternal-scaling">Scale em ação!</div>
  </body>
</html>
```


<html>
  <head>
    <style>
      @keyframes scaling {
        0% {
          transform: scale(0.5, 2.0);
        }
        50% {
          transform: scale(1.5, 0.5);
        }
        100% {
          transform: scale(1.0, 1.0);
        }
      }
      .eternal-scaling {
        background-color: #e0e0e0;
        animation: scaling 2s linear infinite alternate;
      }
    </style>
  </head>
  <body>
    <div class="eternal-scaling">Scale em ação!</div>
  </body>
</html>

De que outra forma você escalaria esse elemento? Experimente!

##### rotate

A `rotate` gira um elemento em torno de seu centro dada a quantidade de graus que se quer que ele gire. Já está dando pra pegar o jeito, não está?

```language-html
<html>
  <head>
    <style>
      @keyframes rotating {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .eternal-rotating {
        width: fit-content;
        animation: rotating 200ms linear infinite;
      }
    </style>
  </head>
  <body>
    <div class="eternal-rotating">Hélice de avião!</div>
  </body>
</html>
```

<html>
  <head>
    <style>
      @keyframes rotating {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .eternal-rotating {
        width: fit-content;
        animation: rotating 200ms linear infinite;
      }
    </style>
  </head>
  <body>
    <div class="eternal-rotating">Hélice de avião!</div>
  </body>
</html>

Agora faça a hélice desse avião girar em camera lenta.

A rotação pode ser nas três dimensões também! Com a `rotate3d`, os três primeiros parâmetros são números entre -1 e 1, indicando para que lado vão girar. O quarto é o ângulo do giro.

```language-html
<html>
  <head>
    <style>
      @keyframes square-rotating {
        0% {
          transform: rotate3d(1, 1, 1, 150deg);
        }
        100% {
          transform: rotate3d(-1, -1, -1, 150deg);
        }
      }
      .square-rotating {
        width: 100px;
        height: 100px;
        background-color: red;
        animation: square-rotating 200ms linear infinite;
      }
    </style>
  </head>
  <body>
    <div class="square-rotating"></div>
  </body>
</html>
```

<html>
  <head>
    <style>
      @keyframes square-rotating {
        0% {
          transform: rotate3d(1, 1, 1, 150deg);
        }
        100% {
          transform: rotate3d(-1, -1, -1, 150deg);
        }
      }
      .square-rotating {
        width: 100px;
        height: 100px;
        background-color: red;
        animation: square-rotating 200ms linear infinite;
      }
    </style>
  </head>
  <body>
    <div class="square-rotating"></div>
  </body>
</html>

Experimente zerar o valor da rotação de cada eixo para ver como a função funciona! E o ângulo também.

Agora inverta a rotação desse quadrado em todos os três eixos.


##### skew

O *skew* entorta o elemento. Divida-o no meio, puxe a parte de baixo para a direita e a parte de cima para a esquerda.

```language-html
<html>
  <head>
    <style>
      @keyframes skewing {
        0% {
          transform: skew(0deg);
        }
        100% {
          transform: skew(180deg);
        }
      }
      .eternal-skewing {
        width: fit-content;
        animation: skewing 5s linear infinite;
      }
    </style>
  </head>
  <body>
    <div class="eternal-skewing">Entortanto a frase!</div>
  </body>
</html>
```

<html>
  <head>
    <style>
      @keyframes skewing {
        0% {
          transform: skew(0deg);
        }
        100% {
          transform: skew(180deg);
        }
      }
      .eternal-skewing {
        width: fit-content;
        animation: skewing 5s linear infinite;
      }
    </style>
  </head>
  <body>
    <div class="eternal-skewing">Entortanto a frase!</div>
  </body>
</html>

Agora faça a frase entortar mais ou menos.

### Transitions

Leia [Este artigo da Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) {: .external-link target="_blank" rel="noreferrer noopener" } sobre ***CSS Transitions***

**Atenção!** Execute todos os exemplos do artigo em sua máquina para fixar o conteúdo. Depois, faça os oito exercícios propostos [nesta página](https://codepen.io/jorgecardoso/post/1-css-transitions-and-animations) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Steps

As animações ***CSS***, por padrão, são fluidas em suas transições de estado de uma parte da animação para a outra. Você pode, se quiser, fazer dessas transições mais *bruscas*, ou seja, mais *discretas*. Leia [este artigo do css-tricks.com](https://css-tricks.com/using-multi-step-animations-transitions/) {: .external-link target="_blank" rel="noreferrer noopener" } a respeito.

Quer um exemplo legal do que dá pra fazer com ***steps***? [Veja só esta animação 'das antigas'!](http://jsfiddle.net/simurai/CGmCe/) {: .external-link target="_blank" rel="noreferrer noopener" }. Agora tente fazer ela você mesmo!

### Em suma

Para uma revisão rápida a respeito de tudo que vimos sobre animação, leia [este artigo do css-tricks.com](https://css-tricks.com/almanac/properties/a/animation/) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Uau! Com essas novas maneiras de melhorar suas animações, você já deve estar cheio de ideias legais para desenvolver não é? Então, vamos fazer juntos?


Aula ao vivo! Vamos para o Slack onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Para praticar os conceitos da aula de hoje vocês vão **animar cartas de baralho!** Dadas as imagens de cartas baixáveis [neste link](/fundamentals/css-animations-part-2-exercises/cartas.zip), coloquem as cartas lado a lado em linhas de até 7 cartas. Os requisitos são os seguintes:

* A carta virada para baixo deve estar acima do "grid de cartas" e um clique nela deve fazer uma carta surgir no grid. Essa carta representa o seu baralho.

* O *grid* é composto por 7 cartas em cada linha, com quantas linhas o usuário quiser. As imagens das cartas podem se repetir.

* A carta a surgir é uma imagem aleatória do conjunto de cartas dado.

* Cada carta deve ser animada ao ter o mouse passado sobre ela.

* Cada carta deve possuir uma animação e a animação de cada carta deve ser definida aleatoriamente.

* Toda animação deve terminar com a carta em seu estado inicial.

* As animações possíveis para as cartas são:

  * A carta gira horizontalmente, como a hélice de um avião.

  * A carta deve aumentar e diminuir, como se estivesse "vindo pra cima".

* Além disso, crie ao menos mais uma animação para a carta. Use sua criatividade! 🃏

Por exemplo:

<%= figure(%{src: "/front-end/css-animations/exercises-7-4.gif", caption: "Exemplo dos exercícios feitos", class: "rounded mx-auto d-block", width: "600px", height: "auto"}) %>

---

## Recursos adicionais (opcional)

* [Lista de propriedades ***CSS*** animáveis](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Transitions vs Animations - Qual usar?](http://www.peachpit.com/articles/article.aspx?p=2300569&seqNum=2) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo sobre ***CSS*** Transitions da W3 Schools](https://www.w3schools.com/css/css3_transitions.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Aula de ***CSS*** da teaching-materials.org](https://www.teaching-materials.org/css3-fx/#slide22) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Chegou a hora de você criar a página mais animada do curso! 🕺💃🏽

<%= next_button(@conn) %>
