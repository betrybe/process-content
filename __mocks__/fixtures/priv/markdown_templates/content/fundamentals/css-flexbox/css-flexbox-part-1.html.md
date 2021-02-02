## O que vamos aprender?

Você vai aprender sobre CSS Flexbox Layout (_Flexible Box_).
Flexbox é um módulo que visa a fornecer uma maneira mais eficiente de organizar, alinhar e distribuir espaço entre os itens em um _container_, mesmo quando seu tamanho é desconhecido.

Um _container_ pode ser qualquer elemento HTML que contenha outros elementos, como, por exemplo, um `<div>` ou `<section>`.
Esse elemento pai é chamado de _container_, e os elementos filhos serão os itens.

A ideia principal por trás do "layout flexível" é dar ao _container_ a habilidade de alterar o tamanho (_width_ e _height_) e a ordem dos itens para melhor ocupar o espaço disponível.
Essa habilidade nos permite acomodar uma página em todos os tipos de dispositivos e tamanhos de tela.

---

### Você será capaz de:

  * Utilizar _CSS Flexbox_ para criar layouts flexíveis;
  * Utilizar _CSS Flexbox_ para alterar o comportamento de _containers_.

---

## Por que isso é importante?

O acesso à Internet não é feito apenas por computadores e notebooks.
_Tablets_ e principalmente _smartphones_ também são utilizados para essa função.
Com tantos dispositivos e tamanhos diferentes de telas, um _design responsivo_ é necessário para promover a melhor experiência possível aos visitantes, independentemente do dispositivo e tela que estejam usando.

Flexbox é uma ferramenta que nos permitirá criar páginas com _design responsivo_ de forma simples e organizada.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

O primeiro passo para começar a usar Flexbox é criar um **Flex container**. Elementos filhos de um Flex container são chamados **Flex items** e são dispostos dentro dele usando as propriedades Flexbox.
Algumas das propriedades Flexbox são aplicadas ao container, e outras aos seus itens.

Um Flex container é criado ao usar a propriedade `display` de um elemento com o valor `flex`:

```language-css
.flex-container {
  display: flex;
}
```

---

### Conceitos

Antes da apresentação das propriedades Flexbox, dois conceitos devem ser explicados:

#### Flex Axes

O layout do Flexbox é baseado em `flex-directions` (direções flex).
Essas direções são determinadas por eixos (axes).
A imagem abaixo mostra os eixos definidos em um Flex container:

<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-1/images/css_flexbox_axes.png", class: "standard-screenshot text-center", caption: "CSS Flexbox Axes", width: "600px", height: "auto", alt: "CSS Flexbox axes description"}) %>

Os flex items são dispostos dentro de um Flex container seguindo o **Main Axis**.
O **Main Axis** tem a direção definida pela propriedade **flex-direction**, que pode ser _horizontal_, quando flex-direction é **row** ou **row-reverse**, e _vertical_, quando é **column** ou **column-reverse**.

#### Flex Lines

São linhas imaginárias usadas para agrupamento e alinhamento de flex items dentro de seus respectivos containers.
Um Flex container pode ser **single-line** ou **multi-line**, dependendo da propriedade `flex-wrap`:

- Um Flex container **single-line** dispõe todos os seus filhos (flex items) em uma única linha;

<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-1/images/css_flexbox_single_line.png", class: "standard-screenshot text-center", caption: "CSS Flexbox Single Line", width: "600px", height: "auto"}) %>

- Um Flex container **multi-line** quebra seus flex items em múltiplas linhas. Isso é similar ao que acontece quando um texto é quebrado em uma nova linha quando está muito grande (_overflow_).

<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-1/images/css_flexbox_multi_line.png", class: "standard-screenshot text-center", caption: "CSS Flexbox Multi Line", width: "600px", height: "auto"}) %>

Agora vamos ver a estrutura e propriedades do Flexbox.

### Introdução, estrutura básica, flex-direction, flex-wrap, flex-flow e reverse

<%= vimeo "458341305" %>

A propriedade `flex-direction` é aquela que define a direção dos flex items e modifica quem é o **Main Axis**. Por padrão essa propriedade é `row` (linha), com isso os elementos ficam um ao lado do outro. Os outros valores que essa propriedade possui são o `row-reverse`, os itens ficam em linha reversa, o `column`, onde os itens ficam em uma única coluna, um embaixo do outro, e o `column-reverse`, em que os itens também ficam um embaixo do outro, porém em ordem reversa.

Já a propriedade `flex-wrap` define se os itens devem quebrar ou não a linha, sendo que por padrão esse propriedade é `nowrap`, ou seja, os itens não quebram a linha. Os valores que fazem com que a linha quebra são o `wrap`, que quebra a linha, e o `wrap-reverse`, que quebra a linha na direção contrária.

Por sua vez o `flex-flow` é um atalho para as propriedades `flex-direction` e `flex-wrap`, o primeiro valor que recebe é o do `flex-direction` e o segundo o do `flex-wrap`.

Vamos colocar em prática os novos conhecimentos adquiridos? Copie o código abaixo e realize os exercícios de fixação propostos.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox - Flex Flow</title>
    <style>
      .box {
        color: #9069EF;
        background-color: rgb(243, 243, 243);
        border: 2px solid #232525;
        font-size: 50px;
        height: 60px;
        margin: 10px 5px;
        text-align: center;
        width: 30%;
      }

      .box-container {
        background-color: #0fa36b;
        display: flex;
        /* ADICIONE AQUI SEUS TESTES */
      }
    </style>

  </head>
  <body>
    <div class="box-container">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
      <div class="box">5</div>
    </div>
  </body>
</html>
```

1. Teste as possibilidades (`row`, `column`, `row-reverse` e `column-reverse`) para a propriedade `flex-direction`.

2. Teste as possibilidades (`wrap` e `nowrap`) para a propriedade `flex-wrap`.

3. Teste as possibilidades para a propriedade `flex-flow`.

### Propriedades: justify-content, align-items e align-content

<%= vimeo "458352391" %>

O `justify-content` alinha os flex items no container de acordo com a direção. Essa propriedade possui os valores `flex-start` que alinha os itens ao início do container, `flex-end` que alinha os itens ao final do container, `center` que alinha os itens ao centro do container, `space-between` cria um espaçamento igual entre os elementos, mantendo o primeiro grudado no início e o último no final, e `space-around` também cria um espaçamento entre os elementos, mas os espaçamentos do meio são duas vezes maiores que o inicial e final.

Já a propriedade `align-items` alinha os flex items de acordo com o eixo transversal (cross-axis). Os valores que essa propriedade aceita são `stretch`, que é seu valor padrão e faz com os flex items cresçam igualmente, `flex-start` alinha os itens ao início, `flex-end` alinha os itens ao final, `center` alinha os itens ao centro e `baseline` que alinha os itens de acordo com a linha base da tipografia.

Por fim, a propriedade `align-content` alinha as linhas do container em relação ao eixo transversal (cross-axis), sendo que essa propriedade só funciona caso haja mais de uma linha de flex items. As opções de alinhamento que o `align-content` apresenta são `stretch`, seu valor padrão que faz com que os flex items cresçam igualmente na vertical, `flex-start`, alinha todas as linhas de itens ao início, `flex-end`, que alinha todas as linhas de itens ao final, `center` que alinha todas as linhas ao centro, `space-between`, que cria um espaçamento igual entre as linhas, mantendo a primeira grudada no topo e a última no bottom, e `space-around`, que também cria um espaçamento entre as linhas, mas os espaçamentos do meio são duas vezes maiores que o top e o bottom.

Interessante quantas possibilidades para manipular o posicionamento de elementos o flex-box nos traz, não é? Copie o código abaixo e teste algumas destas possibilidades para fixar seu conhecimento.

1. Utilizando o código abaixo, teste as possibilidades (`center`, `flex-start`, `flex-end`, `space-around` e `space-between`) para a propriedade `justify-content`.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox - Justify Content</title>
    <style>
      .box {
        color: #9069EF;
        background-color: rgb(243, 243, 243);
        border: 2px solid #232525;
        font-size: 50px;
        height: 60px;
        margin: 10px 5px;
        text-align: center;
        width: 20%;
      }

      .box-container {
        background-color: #0fa36b;
        display: flex;
        /* ADICIONE AQUI SEUS TESTES */
      }
    </style>

  </head>
  <body>
    <div class="box-container">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
    </div>
  </body>
</html>
```
2. Teste as possibilidades (`center`, `flex-start`, `flex-end`, `stretch` e `baseline`) para a propriedade `align-items`. Não se esqueça de copiar o código abaixo! 😉

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox - Align Items</title>
    <style>
      .box-one {
        color: #9069EF;
        background-color: rgb(243, 243, 243);
        border: 2px solid #232525;
        font-size: 70px;
        height: 80px;
        margin: 10px 5px;
        text-align: center;
        width: 50px;
      }

      .box-two {
        color: #9069EF;
        background-color: rgb(243, 243, 243);
        border: 2px solid #232525;
        font-size: 50px;
        height: 60px;
        margin: 10px 5px;
        text-align: center;
        width: 50px;
      }

      .box-three {
        color: #9069EF;
        background-color: rgb(243, 243, 243);
        border: 2px solid #232525;
        font-size: 30px;
        margin: 10px 5px;
        height: 50px;
        text-align: center;
        width: 50px;
      }

      .box-container {
        background-color: #0fa36b;
        display: flex;
        /* ADICIONE AQUI SEUS TESTES */
      }
    </style>

  </head>
  <body>
    <div class="box-container">
      <div class="box-one">1</div>
      <div class="box-two">2</div>
      <div class="box-three">3</div>
    </div>
  </body>
</html>
```
3. Teste as possibilidades (`center`, `flex-start`, `flex-end`, `stretch`, `space-around` e `space-between`) para a propriedade `align-content`.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox - Align Content</title>
    <style>
      .box {
        color: #9069EF;
        background-color: rgb(243, 243, 243);
        border: 2px solid #232525;
        font-size: 50px;
        height: 60px;
        margin: 10px 5px;
        text-align: center;
        width: 30%;
      }

      .box-container {
        /* ADICIONE AQUI SEUS TESTES */
        background-color: #0fa36b;
        display: flex;
        flex-wrap: wrap;
        height: 600px;
      }
    </style>

  </head>
  <body>
    <div class="box-container">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
      <div class="box">5</div>
      <div class="box">6</div>
      <div class="box">7</div>
      <div class="box">8</div>
      <div class="box">9</div>
    </div>
  </body>
</html>
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já estudou sobre **Flexbox** e as propriedades que afetam um _container_, vamos para a aula ao vivo.

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

### Trybe Tech-Gallery
Após conhecer um pouco mais dos conceitos de **Flexbox**, o que acha de praticar seus conhecimentos em uma aplicação WEB? 

<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-1/images/trybe-tech-gallery.jpeg", class: "rounded mx-auto d-block", caption: "Trybe Tech Gallery Preview", width: "800px", height: "auto", alt: "Trybe Tech Gallery Preview"}) %>

No exemplo acima foi criada uma galeria de fotos de algumas das tecnologias que você aprenderá no curso da Trybe. As imagens utilizadas estarão disponíveis para você, mas...caso queira, sinta-se livre para criar a página com a temática que você preferir ok? Só atente-se aos enunciados para que a proposta do exercício seja cumprida!

**Atenção**: os exercícios estão disponíveis [neste repositório](https://github.com/tryber/exercise-tech-gallery) {: .external-link target="_blank" rel="noreferrer noopener" }. As instruções de como realizar o exercício estão no `README.md` do repositório **exercise-tech-gallery**. As imagens utilizadas estão disponíveis na pasta **images** do repositório. 😉

**Spoiler**: Caso queira praticar ainda mais, na seção de recursos adicionais existem alguns exercícios gamificados que são super divertidos. 🚀

---

## Recursos adicionais (opcional)

* [W3Schools CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CSS Tricks: A Complete Guide To Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício: Flexbox Froggy](https://flexboxfroggy.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício: Flexbox Defense](http://www.flexboxdefense.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playground: The-echoplex ](https://the-echoplex.net/flexyboxes/) {: .external-link target="_blank" rel="noreferrer noopener" } 

* [Playground: Properties for the flex container](https://codepen.io/enxaneta/full/adLPwv) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playground: Scotch.io](https://demos.scotch.io/visual-guide-to-css3-flexbox-flexbox-playground/demos/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Ainda temos muito **CSS Flexbox** pela frente, vamos lá!?

<%= next_button(@conn) %>
