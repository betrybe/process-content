## O que vamos aprender?

Você vai aprender sobre CSS Flexbox Layout (_Flexible Box_).
Flexbox é um módulo que visa a fornecer uma maneira mais eficiente de organizar, alinhar e distribuir espaço entre os itens em um *container*, mesmo quando seu tamanho é desconhecido.

Um *container* pode ser qualquer elemento HTML que contenha outros elementos, como, por exemplo, um `<div>` ou `<section>`.
Esse elemento pai é chamado de *container*, e os elementos filhos serão os itens.

A ideia principal por trás do "layout flexível" é dar ao *container* a habilidade de alterar o tamanho (_width_ e *height*) e a ordem dos itens para melhor ocupar o espaço disponível.
Essa habilidade nos permite acomodar uma página em todos os tipos de dispositivos e tamanhos de tela.

---

### Você será capaz de:

  * Utilizar _CSS Flexbox_ para criar layouts flexíveis;
  * Utilizar _CSS Flexbox_ para alterar o comportamento de *containers*.

---

## Por que isso é importante?

O acesso à Internet não é feito apenas por computadores e notebooks. *Tablets* e principalmente *smartphones* também são utilizados para essa função.
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

<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-1/images/css_flexbox_axes.png", class: "rounded mx-auto d-block", caption: "CSS Flexbox Axes", width: "600px", height: "auto", alt: "CSS Flexbox axes description"}) %>

Os flex items são dispostos dentro de um Flex container seguindo o **Main Axis**.
O **Main Axis** tem a direção definida pela propriedade **flex-direction**, que pode ser *horizontal*, quando flex-direction é **row** ou **row-reverse**, e *vertical*, quando é **column** ou **column-reverse**.

#### Flex Lines

São linhas imaginárias usadas para agrupamento e alinhamento de flex items dentro de seus respectivos containers.
Um Flex container pode ser **single-line** ou **multi-line**, dependendo da propriedade `flex-wrap`:

- Um Flex container **single-line** dispõe todos os seus filhos (flex items) em uma única linha;

<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-1/images/css_flexbox_single_line.png", class: "rounded mx-auto d-block", caption: "CSS Flexbox Single Line", width: "600px", height: "auto"}) %>

- Um Flex container **multi-line** quebra seus flex items em múltiplas linhas. Isso é similar ao que acontece quando um texto é quebrado em uma nova linha quando está muito grande (_overflow_).

<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-1/images/css_flexbox_multi_line.png", class: "rounded mx-auto d-block", caption: "CSS Flexbox Multi Line", width: "600px", height: "auto"}) %>

Agora vamos ver a estrutura e propriedades do Flexbox.

### Introdução, estrutura básica, flex-direction, flex-wrap, flex-flow e reverse

<%= vimeo "458341305" %>

A propriedade `flex-direction` é aquela que define a direção dos flex items e modifica quem é o **Main Axis**. Por padrão essa propriedade é `row` (linha), com isso os elementos ficam um ao lado do outro. Os outros valores que essa propriedade possui são o `row-reverse`, os itens ficam em linha reversa, o `column`, onde os itens ficam em uma única coluna, um embaixo do outro, e o `column-reverse`, em que os itens também ficam um embaixo do outro, porém em ordem reversa.

Já a propriedade `flex-wrap` define se os itens devem quebrar ou não a linha, sendo que por padrão esse propriedade é `nowrap`, ou seja, os itens não quebram a linha. Os valores que fazem com que a linha quebra são o `wrap`, que quebra a linha, e o `wrap-reverse`, que quebra a linha na direção contrária.

Por sua vez o `flex-flow` é um atalho para as propriedades `flex-direction` e `flex-wrap`, o primeiro valor que recebe é o do `flex-direction` e o segundo o do `flex-wrap`.

* Teste as possibilidades (`row`, `column`, `row-reverse` e `column-reverse`) para a propriedade `flex-direction` [ aqui](https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox_flex-direction_column) {: .external-link target="_blank" rel="noreferrer noopener" }

* Teste as possibilidades (`wrap` e `nowrap`) para a propriedade `flex-wrap` [ aqui](https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox_flex-wrap_wrap) {: .external-link target="_blank" rel="noreferrer noopener" }

* Teste as possibilidades para a propriedade `flex-flow` [ aqui](https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox_flex-flow_row_wrap) {: .external-link target="_blank" rel="noreferrer noopener" }

### Propriedades: justify-content, align-items e align-content

<%= vimeo "458352391" %>

O `justify-content` alinha os flex items no container de acordo com a direção. Essa propriedade possui os valores `flex-start` que alinha os itens ao início do container, `flex-end` que alinha os itens ao final do container, `center` que alinha os itens ao centro do container, `space-between` cria um espaçamento igual entre os elementos, mantendo o primeiro grudado no início e o último no final, e `space-around` também cria um espaçamento entre os elementos, mas os espaçamentos do meio são duas vezes maiores que o inicial e final.

Já a propriedade `align-items` alinha os flex items de acordo com o eixo transversal (cross-axis). Os valores que essa propriedade aceita são `stretch`, que é seu valor padrão e faz com os flex items cresçam igualmente, `flex-start` alinha os itens ao início, `flex-end` alinha os itens ao final, `center` alinha os itens ao centro e `baseline` que alinha os itens de acordo com a linha base da tipografia.

Por fim, a propriedade `align-content` alinha as linhas do container em relação ao eixo transversal (cross-axis), sendo que essa propriedade só funciona caso haja mais de uma linha de flex items. As opções de alinhamento que o `align-content` apresenta são `stretch`, seu valor padrão que faz com que os flex items cresçam igualmente na vertical, `flex-start`, alinha todas as linhas de itens ao início, `flex-end`, que alinha todas as linhas de itens ao final, `center` que alinha todas as linhas ao centro, `space-between`, que cria um espaçamento igual entre as linhas, mantendo a primeira grudada no topo e a última no bottom, e `space-around`, que também cria um espaçamento entre as linhas, mas os espaçamentos do meio são duas vezes maiores que o top e o bottom.

* Teste as possibilidades (`center`, `flex-start`, `flex-end`, `space-around` e `space-between`) para a propriedade `justify-content` [ aqui](https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox_justify-content_center) {: .external-link target="_blank" rel="noreferrer noopener" }

* Teste as possibilidades (`center`, `flex-start`, `flex-end`, `stretch` e `baseline`) para a propriedade `align-items` [ aqui](https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox_align-items_baseline) {: .external-link target="_blank" rel="noreferrer noopener" }

* Teste as possibilidades (`center`, `flex-start`, `flex-end`, `stretch`, `space-around` e `space-between`) para a propriedade `align-content` [ aqui](https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox_align-content_space-between) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já estudou sobre **Flexbox** e as propriedades que afetam um *container*, vamos para a aula ao vivo.

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática

Para os exercícios a seguir, utilize este [playground](https://the-echoplex.net/flexyboxes/) {: .external-link target="_blank" rel="noreferrer noopener" } para testar como as propriedades **Flexbox** influenciam a disposição dos elementos em um *container*. Existem outros *playgrounds* para **Flexbox** como este, e os links para eles estão nos **Recursos adicionais**.

Como os exercícios serão feitos na própria plataforma, crie um diretório em seu repositório para o site número 1 (problema do sapo) e outra para o site número 2 (problema das torres).
Salve o ***CSS*** que você criar na plataforma colocando o número do exercício como nome do arquivo, veja exemplos abaixo:

- Para o exercício número 3 do site número 1, o ***CSS*** deve ser salvo em `exercises/6.3/1/3.css`;

- Para o exercício número 8 do site número 2, o ***CSS*** deve ser salvo em `exercises/6.3/2/8.css`;

- Para o exercício número 9 do site número 2, o ***CSS*** deve ser salvo em `exercises/6.3/2/9.css`.

1. Faça os exercícios de **1** a **13** neste [site](https://flexboxfroggy.com/) {: .external-link target="_blank" rel="noreferrer noopener" }. O seu objetivo é colocar os sapos em cima de suas respectivas folhas.
2. Neste segundo [link](http://www.flexboxdefense.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, complete os exercícios de **1** a **9**. Seu objetivo aqui é posicionar as torres de defesa para que elas abatam os inimigos. Você terá de pensar qual é a melhor posição para cada torre.

---

## Recursos adicionais (opcional)

* [W3Schools CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CSS Tricks: A Complete Guide To Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playground: Properties for the flex container](https://codepen.io/enxaneta/full/adLPwv) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playground: Scotch.io](https://demos.scotch.io/visual-guide-to-css3-flexbox-flexbox-playground/demos/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Ainda temos muito **CSS Flexbox** pela frente, vamos lá!?

<%= next_button(@conn) %>
