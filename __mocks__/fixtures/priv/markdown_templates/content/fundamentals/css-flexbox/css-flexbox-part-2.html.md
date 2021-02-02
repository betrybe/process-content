## O que vamos aprender?

Você vai aprender mais sobre **CSS Flexbox**.

Na aula anterior você aprendeu sobre as propriedades **Flexbox** que atuam no _container_. Agora é hora de aprender sobre as propriedades que atuam nos _items_.

---

### Você será capaz de:

* Utilizar _CSS Flexbox_ para criar layouts flexíveis;
* Utilizar _CSS Flexbox_ para alterar o comportamento de _items_.

---

## Por que isso é importante?

Aprender sobre as propriedades **Flexbox** que agem nos _items_ é imprescindível, pois só dessa forma você terá o controle total sobre o _layout_ de uma página.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Os elementos presentes em um **Flex container** (assunto abordado na aula anterior) são chamados de **Flex items**.
O **Flexbox** possui propriedades que impactam diretamente nesses elementos, fazendo com que a pessoa desenvolvedora tenha um controle melhor em relação à estrutura da página.

Agora vamos aprender sobre essas propriedades:

### Propriedade: align-self

A propriedade `align-self` nos permite utilizar os mesmos valores de alinhamento aprendidos anteriormente (`flex-start`, `flex-end`, `stretch`, `baseline`, `center`), porém somente para um item. Assim, podemos criar uma nova classe, pseudo-classe ou id para um item e editar sua posição individualmente, fazendo com que ele, diferente dos demais, fique no início ou ao final do container, centralizado, como preferir.

Para maiores detalhes, assista [este vídeo](https://www.linkedin.com/learning/responsive-layout/aligning-individual-flex-items) {: .external-link target="_blank" rel="noreferrer noopener" } (caso deseje, clique no ícone CC para obter legendas em inglês - é bom para praticar o idioma!).

* Copie o código abaixo e no seu editor de código, teste as possibilidades para a propriedade `align-self`.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS FLEXBOX - ALIGN SELF</title>
    <style>
      .container {
        border: 1px solid black;
        display: flex;
        height: 300px;
        margin: auto;
        width: 500px;
      }

      .keep {
        align-self: center;
        background-color: #FAA488;
        display: flex;
        justify-content: center;
        width: 150px;
      }

      .change {
        /* Altere a propriedade align-self. */
        align-self: center;
        background-color: #FBD26A;
        display: flex;
        justify-content: center;
        width: 200px;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="keep">REFERÊNCIA</div>
      <div class="change">ELEMENTO TESTE</div>
      <div class="keep">REFERÊNCIA</div>
    </div>
  </body>
</html>
```

### Propriedade: order

A propriedade `order` nos permite ordenar itens de um determinado container. Esta propriedade é particular de cada item e, quando utilizada, fará com que o flexbox os exiba em ordem crescente.

Por padrão, a propriedade `order`, implicitamente, possui o valor `0`, isso significa que, se apenas um item dentre 5 em um container recebe a propriedade `order: 1`, todos os outros ficarão ordenados da forma que foram construídos no HTML, enquanto este será posicionado **após** os demais.

É interessante chamar a atenção para o fato de que a propriedade aceita valores negativos. Assim, continuando o exemplo acima, caso o item diferentão receba `order: -1`, ele será exibido **antes** dos demais (porque, como dito acima, `order` sempre tratará os itens em ordem crescente).

Assista o vídeo a seguir para ver essa ordenação na prática:

<%= vimeo "479663953" %>

* Copie o código abaixo e teste as possibilidades de ordenação.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS FLEXBOX - ORDER</title>
    <style>
      .container {
        border: 1px solid black;
        display: flex;
        height: 50px;
        margin: auto;
        width: 500px;
      }

      .box {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 125px;
      }

      .one {
        background-color: #FBD26A;
        display: flex;
        /* Altere a propriedade order. */
        order: 1;
      }

      .two {
        background-color: #FAA488;
        display: flex;
        /* Altere a propriedade order. */
        order: 2;
      }

      .three {
        background-color: #9069EF;
        display: flex;
        /* Altere a propriedade order. */
        order: 3;
      } 

      .four {
        background-color: #006472;
        display: flex;
        /* Altere a propriedade order. */
        order: 4;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="box one">1</div>
      <div class="box two">2</div>
      <div class="box three">3</div>
      <div class="box four">4</div>
    </div>
  </body>
</html>
```


### Propriedades: flex-grow, flex-shrink, flex-basis

As três propriedades acima devem ser expostas em conjunto. `flex-basis` tem a função de definir o tamanho base de um item no container. O valor padrão dessa propriedade é `auto` - mantendo a flexibilidade do item de acordo com o tamanho do container.

Caso o container não tenha espaço suficiente para dispor todos os itens adequadamente, a propriedade `flex-shrink` surge para garantir o quanto um item será comprimido em comparação aos demais.

Por fim, `flex-grow` define o quanto de espaço vago será ocupado por um item.

<%= vimeo "479668999" %>

* Teste as possibilidades para a propriedade `flex-grow`.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS FLEXBOX - ORDER</title>
    <style>
      .container {
        display: flex;
        height: 50px;
        margin: auto;
        width: 100%;
      }

      .box {
        align-items: center;
        display: flex;
        justify-content: center;
      }

      .one {
        background-color: #FBD26A;
        display: flex;
        /* Altere a propriedade grow. */
        flex-grow: 1;
      }

      .two {
        background-color: #FAA488;
        display: flex;
        /* Altere a propriedade grow. */
        flex-grow: 1;
      }

      .three {
        background-color: #9069EF;
        display: flex;
        /* Altere a propriedade grow. */
        flex-grow: 1;
      } 

      .four {
        background-color: #006472;
        display: flex;
        /* Altere a propriedade grow. */
        flex-grow: 1;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="box one">1</div>
      <div class="box two">2</div>
      <div class="box three">3</div>
      <div class="box four">4</div>
    </div>
  </body>
</html>
```

* Teste as possibilidades para a propriedade `flex-shrink`.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS FLEXBOX - SHRINK</title>
    <style>
      .container {
        display: flex;
        height: 50px;
        margin: auto;
        width: 100%;
      }

      .box {
        align-items: center;
        display: flex;
        justify-content: center;
        flex-basis: 500px;
        flex-grow: 0;
        flex-shrink: 1;
      }

      .one {
        background-color: #FBD26A;
        display: flex;
        /* Altere a propriedade shrink. */
        flex-shrink: 1;
      }

      .two {
        background-color: #FAA488;
        display: flex;
        /* Altere a propriedade shrink. */
        flex-shrink: 1;
      }

      .three {
        background-color: #9069EF;
        display: flex;
        /* Altere a propriedade shrink. */
        flex-shrink: 1;
      } 

      .four {
        background-color: #006472;
        display: flex;
        /* Altere a propriedade shrink. */
        flex-shrink: 1;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="box one">1</div>
      <div class="box two">2</div>
      <div class="box three">3</div>
      <div class="box four">4</div>
    </div>
  </body>
</html>
```

* Teste as possibilidades para a propriedade `flex-basis`.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS FLEXBOX - BASIS</title>
    <style>
      .container {
        display: flex;
        height: 50px;
        margin: auto;
        width: 100%;
      }

      .box {
        align-items: center;
        display: flex;
        justify-content: center;
        /* Altere a propriedade flex-basis */
        flex-basis: 500px;
        flex-grow: 0;
        flex-shrink: 1;
      }

      .one {
        background-color: #FBD26A;
      }

      .two {
        background-color: #FAA488;
      }

      .three {
        background-color: #9069EF;
      } 

      .four {
        background-color: #006472;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="box one">1</div>
      <div class="box two">2</div>
      <div class="box three">3</div>
      <div class="box four">4</div>
    </div>
  </body>
</html>
```

**Bônus** Caso queira ver uma explicação mais detalhada a respeito das três propriedades acima, recomendamos assistir o vídeo abaixo:

<%= youtube_video "CFgeJq4l1YM" %>

### Subcontainers, subitens e margin

Depois de aprender sobre as propriedades relativas aos **flex items**, vamos entender um pouco mais sobre _margins_, além de aprender que é possível criar _containers_ dentro de _containers_, para fazer agrupamento e para facilitar a organização da página.

<%= vimeo "480136180" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já estudou sobre **Flexbox** e as propriedades que afetam um _item_, vamos para a aula ao vivo.

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Para os exercícios a seguir, crie um arquivo `HTML` e um arquivo `CSS`, copie o código abaixo e siga as instruções de cada enunciado.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRYFLIX</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <header class="header-container">
      <nav class="menu-container">
        <ul>
          <li>Cadastre-se</li>
          <li>Conecte-se</li>
          <li>Sobre</li>
        </ul>
      </nav>     
      <div class="logo-container">
        <img
          src="https://fontmeme.com/permalink/201215/2044acc483426f38dc2c79c3c84ab998.png"
          alt="Website Logo"
        />
      </div>
    </header>
    
  </body>
</html>
```

```language-CSS
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Ubuntu';
}

body {
  background-color: rgb(247, 247, 247);
}

.header-container {
  background-color: #5C687C;
  display: flex;
}

.logo-container {
  display: flex;
  justify-content: center;
}

.menu-container {
  display: flex;
}

.menu-container ul {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.menu-container li {
  color: white;
  font-weight: 500;
  font-size: 1.3rem;
  list-style: none;
  margin-right: 10px;
}
```

#### Parte 1

1. Adicione uma propriedade que defina o tamanho `Flexbox` base para o container da imagem `268px` e para o container do menu `500px`. Após aplicar as propriedades o `header` deverá estar similar a imagem abaixo:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-1.jpeg", class: "rounded mx-auto d-block", caption: "Header Exercicio 1", width: "800px", height: "auto", alt: "Header exercicio 1"}) %>
2. Adicione uma propriedade `Flexbox` que modifique a **ordem** em que a logomarca e os itens do menu aparecem na tela.
Após aplicar a propriedade o `header` deverá estar similar a imagem abaixo:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-2.jpeg", class: "rounded mx-auto d-block", caption: "Header Exercicio 2", width: "800px", height: "auto", alt: "Header exercicio 2"}) %>
3. Adicione uma propriedade `Flexbox` que modifique o tamanho padrão do container do menu quando a largura da página for maior que `768px`. Após aplicar a propriedade o `header` deverá estar similar a imagem abaixo:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-3.jpeg", class: "rounded mx-auto d-block", caption: "Header Exercicio 3", width: "800px", height: "auto", alt: "Header exercicio 3"}) %>
4. Utilize a propriedade `align-self` no elemento correto para que o `header` da página tenha o seguinte comportamento:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-4.jpeg", class: "rounded mx-auto d-block", caption: "Header Exercicio 4", width: "800px", height: "auto", alt: "Header exercicio 4"}) %>

#### Parte 2

Vamos continuar praticando com a continuação do `header` realizado no exercício acima e construir um `main` com o restante de sua página. Copie o restante dos códigos `HTML` e `CSS` e aplique a seus documentos criados anteriormente.

```language-HTML
    <main class="main-container">
      <div class="movie-container">
        <section>
          <h2>Assista hoje</h2>
          <div class="card-container">
            <div>FILMES 1</div>
            <div>FILMES 2</div>
            <div>FILMES 3</div>
            <div>FILMES 4</div>
            <div>FILMES 5</div>
            <div>FILMES 6</div>
            <div>FILMES 7</div>
            <div>FILMES 8</div>
            <div>FILMES 9</div>
          </div>
        </section>
        <article>
          <h2>Mais assitidos</h2>
          <div class="card-container">
            <div>FILMES 1</div>
            <div>FILMES 2</div>
            <div>FILMES 3</div>
            <div>FILMES 4</div>
            <div>FILMES 5</div>
            <div>FILMES 6</div>
            <div>FILMES 7</div>
            <div>FILMES 8</div>
            <div>FILMES 9</div>
          </div>
        </article>
      </div>
      
      <aside class="aside-container">
        <h3>Últimas notícias</h3>

        <h4>Title</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet officia in provident esse excepturi ipsam!</p>

        <h4>Title</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet officia in provident esse excepturi ipsam!</p>

        <h4>Title</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet officia in provident esse excepturi ipsam!</p>
      </aside>
    </main>
```

```language-CSS
.main-container {
  display: flex;
  flex-wrap: wrap;
}

.movie-container {
  display: flex;
  flex-direction: column;
}

.movie-container h2 {
  margin: 40px 0;
  text-align: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card-container div {
  align-items: center;
  background-color: #5C687C;
  border: black solid 1px;
  display: flex;
  height: 150px;
  justify-content: center;
  margin: 10px;
}

.aside-container {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.aside-container h3, h4 {
  margin-bottom: 10px;
  text-align: center;
}

.aside-container p {
  margin: 10px 0;
  text-align: justify;
}
```

1. Aplique uma base de `350px` para seu container `aside`. Deverá ficar similar a imagem abaixo:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-part2-1.png", class: "rounded mx-auto d-block", caption: "Main do Exercicio 1", width: "800px", height: "auto", alt: "Main do exercicio 1"}) %>

2. Aplique um alinhamento para centralizar e outro para expandir. Seu `aside` apresentar o seguinte comportamento:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-part2-2.png", class: "rounded mx-auto d-block", caption: "Main do Exercicio 2", width: "800px", height: "auto", alt: "Main do exercicio 2"}) %>

3. Adicione uma propriedade que faça com que seu container de filmes tenha uma base de `700px` e outra base de `16%` para as `div` do container de seu card. Deve ficar similar a imagem abaixo:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-part2-3.png", class: "rounded mx-auto d-block", caption: "Main do Exercicio 3", width: "800px", height: "auto", alt: "Main do exercicio 3"}) %>

4. Aplique uma propridade com o valor 10 que expanda o container de filmes. Deve ficar similar a imagem abaixo:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-part2-4.png", class: "rounded mx-auto d-block", caption: "Main do Exercicio 3", width: "800px", height: "auto", alt: "Main do exercicio 3"}) %>

5. Adicione uma propriedade com o valor 1 que faça com que suas `div` do container de filmes ocupe todo o espaço em branco. Deve ficar similar a imagem abaixo:
<%= figure(%{src: "/fundamentals/css-flexbox/css-flexbox-part-2/images/exercicio-part2-5.png", class: "rounded mx-auto d-block", caption: "Main do Exercicio 3", width: "800px", height: "auto", alt: "Main do exercicio 3"}) %>

#### Parte 3 (opcional)

* Para finalizar, escolha alguns exercícios antigos como, por exemplo, o portfólio ou até mesmo os projetos de ***HTML***, ***CSS*** e ***JavaScript*** e estruture as páginas utilizando **Flexbox**.

---

**Spoiler**: Caso queira praticar ainda mais, na seção de recursos adicionais existem alguns exercícios gamificados que são super divertidos. 🚀

---

## Recursos adicionais (opcional)

* [Exercício: Flexbox Froggy - 14 a 24](https://flexboxfroggy.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício: Flexbox Defense - 10 a 12](http://www.flexboxdefense.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

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
