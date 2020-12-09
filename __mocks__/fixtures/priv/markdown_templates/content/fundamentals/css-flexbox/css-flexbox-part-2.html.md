## O que vamos aprender?

Você vai aprender mais sobre **CSS Flexbox**.

Na aula anterior você aprendeu sobre as propriedades **Flexbox** que atuam no *container*. Agora é hora de aprender sobre as propriedades que atuam nos *items*.

---

### Você será capaz de:

* Utilizar _CSS Flexbox_ para criar layouts flexíveis;
* Utilizar _CSS Flexbox_ para alterar o comportamento de *items*.

---

## Por que isso é importante?

Aprender sobre as propriedades **Flexbox** que agem nos *items* é imprescindível, pois só dessa forma você terá o controle total sobre o *layout* de uma página.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Os elementos presentes em um **Flex container** (assunto abordado na aula anterior) são chamados de **Flex items**.
O **Flexbox** possui propriedades que impactam diretamente nesses elementos, fazendo com que a pessoa desenvolvedora tenha um controle melhor em relação à estrutura da página.

Agora vamos aprender sobre essas propriedades:

### Propriedade: align-self

A propriedade `align-self` nos permite utilizar os mesmos valores de alinhamento aprendidos anteriormente (`flex-start`, `flex-end`, `stretch`, `baseline`, `center`), porém somente para um item. Assim, podemos criar uma nova classe, pseudo-classe ou id para um item e editar sua posição individualmente, fazendo com que ele, diferente dos demais, fique no início ou ao final do container, centralizado, como preferir.

Para maiores detalhes, assista [este vídeo](https://www.linkedin.com/learning/responsive-layout/aligning-individual-flex-items) {: .external-link target="_blank" rel="noreferrer noopener" }(caso deseje, clique no ícone CC para obter legendas em inglês - é bom para praticar o idioma!).

* Teste as possibilidades para a propriedade `align-self` [aqui](https://www.w3schools.com/cssref/playit.asp?filename=playcss_align-self) {: .external-link target="_blank" rel="noreferrer noopener" }

### Propriedade: order

A propriedade `order` nos permite ordenar itens de um determinado container. Esta propriedade é particular de cada item e, quando utilizada, fará com que o flexbox os exiba em ordem crescente.

Por padrão, a propriedade `order`, implicitamente, possui o valor `0`, isso significa que, se apenas um item dentre 5 em um container recebe a propriedade `order: 1`, todos os outros ficarão ordenados da forma que foram construídos no HTML, enquanto este será posicionado **após** os demais.

É interessante chamar a atenção para o fato de que a propriedade aceita valores negativos. Assim, continuando o exemplo acima, caso o item diferentão receba `order: -1`, ele será exibido **antes** dos demais (porque, como dito acima, `order` sempre tratará os itens em ordem crescente).

Assista o vídeo a seguir para ver essa ordenação na prática:

<%= youtube_playlist "PLP6Z8YhN_d5SFIrHymOGVBQosmUVEc9Wt" %>

* Teste as possibilidades de ordenação [aqui](https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_order) {: .external-link target="_blank" rel="noreferrer noopener" }

### Propriedades: flex-grow, flex-shrink, flex-basis

As três propriedades acima devem ser expostas em conjunto. `flex-basis` tem a função de definir o tamanho base de um item no container. O valor padrão dessa propriedade é `auto` - mantendo a flexibilidade do item de acordo com o tamanho do container.

Caso o container não tenha espaço suficiente para dispor todos os itens adequadamente, a propriedade `flex` shrink surge para garantir o quanto um item será comprimido em comparação aos demais.

Por fim, `flex grow` define o quanto de espaço vago será ocupado por um item.

<%= youtube_video "92J_6Gqo-GQ" %>

* Teste as possibilidades para a propriedade `flex-grow` [aqui](https://www.w3schools.com/cssref/playit.asp?filename=playcss_flex-grow&preval=1) {: .external-link target="_blank" rel="noreferrer noopener" }

* Teste as possibilidades para a propriedade `flex-shrink` [aqui](https://www.w3schools.com/cssref/playit.asp?filename=playcss_flex-shrink&preval=1) {: .external-link target="_blank" rel="noreferrer noopener" }

* Teste as possibilidades para a propriedade `flex-basis` [aqui](https://www.w3schools.com/cssref/playit.asp?filename=playcss_flex-basis&preval=10px) {: .external-link target="_blank" rel="noreferrer noopener" }

Caso queira ver uma explicação mais detalhada a respeito das três propriedades acima, recomendamos assistir o vídeo abaixo:

<%= youtube_video "CFgeJq4l1YM" %>

### Margin

Depois de aprender sobre as propriedades relativas aos **flex items**, vamos entender um pouco mais sobre *margins*:

<%= youtube_video "nesQ5VcpN-M" %>

### Subcontainers e subitens

É possível criar *containers* dentro de *containers*, para fazer agrupamento e para facilitar a organização da página.

<%= youtube_video "2aFOGu709t8" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já estudou sobre **Flexbox** e as propriedades que afetam um *item*, vamos para a aula ao vivo.

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Para os exercícios a seguir, utilize este [playground](https://the-echoplex.net/flexyboxes/) {: .external-link target="_blank" rel="noreferrer noopener" } para testar como as propriedades **Flexbox** influenciam a disposição dos elementos em um *container*. Existem outros *playgrounds* para **Flexbox** como este, e os links para eles estão nos **Recursos adicionais**.

Como os exercícios serão feitos na própria plataforma, crie um diretório em seu repositório para o site número 1 (problema do sapo) e outro para o site número 2 (problema das torres).
Salve o CSS que você criar na plataforma colocando o número do exercício como o nome do arquivo, como nos exemplos abaixo:

- Para o exercício número 15 do site número 1, o ***CSS*** deve ser salvo em `exercises/6.4/1/15.css`;

- Para o exercício número 10 do site número 2, o ***CSS*** deve ser salvo em `exercises/6.4/2/10.css`;

- Para o exercício número 11 do site número 2, o ***CSS*** deve ser salvo em `exercises/6.4/2/11.css`.

1. Faça os exercícios de **14** a **24** neste [site](https://flexboxfroggy.com/) {: .external-link target="_blank" rel="noreferrer noopener" }. O seu objetivo é colocar os sapos em cima de suas respectivas folhas.

2. Neste segundo [link](http://www.flexboxdefense.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, complete os exercícios de **10** a **12**. Seu objetivo aqui é posicionar as torres de defesa para que elas abatam os inimigos. Você terá de pensar qual é a melhor posição para cada torre.

3. (Opcional) Para finalizar, escolha alguns exercícios antigos como, por exemplo, o portfólio ou até mesmo os projetos de ***HTML***, ***CSS*** e ***JavaScript*** e estruture as páginas utilizando **Flexbox**.

---

## Recursos adicionais (opcional)

* [Flexbox Guia Completo](https://origamid.com/projetos/flexbox-guia-completo/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [MDN Flexbox](https://developer.mozilla.org/en-US/docs/Glossary/Flexbox) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CSS Flexbox cheatsheet](https://devhints.io/css-flexbox) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CSS Flexbox Can I use?](https://caniuse.com/#search=flex-box) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CSS Flexbox Autoprefixer](https://autoprefixer.github.io/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playground: Properties for the flex container](https://codepen.io/enxaneta/full/adLPwv) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playground: Scotch.io](https://demos.scotch.io/visual-guide-to-css3-flexbox-flexbox-playground/demos/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você vai criar um projeto incrível utilizando todas as técnicas que viu esta semana.

<%= next_button(@conn) %>
