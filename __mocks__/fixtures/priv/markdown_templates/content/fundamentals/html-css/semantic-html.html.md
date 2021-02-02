## O que vamos aprender?

Chegou a hora de entrar mais fundo na Matrix. 😎

Desde que você começou a fazer uso de elementos ***HTML***, já parou para pensar sobre o **significado** de um elemento? Suponha que você, ao digitar a URL de um site, visualize somente o ***DOM*** construído, e não a renderização da página pelo browser. Se você se deparasse no ***DOM*** com um elemento possuindo a tag `p`, o que você poderia inferir sobre seu conteúdo? Você pode deduzir que o conteúdo é textual e possui uma quebra de linha depois do fim do texto, por exemplo. Tudo isso você conseguiu deduzir olhando somente para a tag `p` do elemento, chegando assim à conclusão de que o elemento **representa um parágrafo**.

Essa representação, esse sentido que um elemento ***HTML*** carrega acerca de seu conteúdo se chama **HTML Semântico**, e é isto que você estudará na aula de hoje.

---

### Você será capaz de:

  * Fazer uso de elementos ***HTML*** de acordo com o **sentido** e o propósito que eles carregam. Tais elementos incluem, mas não se limitam a: `header`, `nav`, `aside`, `article`, `section`, `footer` e `img`;

  * Criar páginas semanticamente válidas e acessíveis de acordo com o [W3CAG](https://achecker.ca/guideline/view_guideline.php?id=8) {: .external-link target="_blank" rel="noreferrer noopener" };

  * Entender a diferença entre elementos de _bloco_ e elementos _inline_.

---

## Por que isso é importante?

Saber aplicar elementos HTML de acordo com o sentido e o propósito que cada um deles carrega, além de reforçar a sua capacidade para modelagem de um problema, resulta em páginas [melhor ranqueadas](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) {: .external-link target="_blank" rel="noreferrer noopener" } em motores de busca _(e.g. Google)_ e [mais acessíveis.](https://www.w3schools.com/html/html_accessibility.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

**HTML Semântico** é o uso do ***HTML*** para reforçar o significado da informação na página e não apenas definir sua estrutura e apresentação. Por exemplo, durante esse tempo todo você fez uso de elementos ***HTML*** com as tags `html`, `head`, `body` e `form`. Esses elementos são exemplos de uso de **HTML Semântico**, pois cada um tem seu conteúdo com um sentido e propósito definidos:

* `html` representa o tipo do documento em questão, que nesse caso é ***HTML***;

* `head` representa os metadados do documento ***HTML***, tais como o título do documento, links para arquivos ***CSS*** e ***JavaScript*** de que o documento precisa;

* `body` representa todo o conteúdo visual do documento ***HTML***;

* `form` representa um formulário para que o usuário consiga inserir dados.

### Aplicando elementos ***HTML*** de acordo com o sentido

Suponha que, no seu dia a dia de desenvolvimento de software, na empresa em que trabalha, você precise implementar uma funcionalidade de mostrar a foto de perfil do usuário na tela inicial do site da empresa, de forma a prover uma experiência mais pessoal.

Qual elemento ***HTML*** você usaria para conter a imagem do usuário?

Hummn... 🤔

Um candidato ideal para esse caso seria o elemento `img`, concorda? Você pode **averiguar** que `img` é um candidato olhando em alguma [documentação do ***HTML***.](https://www.w3schools.com/tags/tag_img.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

Você faz uso de `img`, finaliza o que precisava fazer para implementar a funcionalidade de mostrar a foto do perfil, abre um Pull Request (PR) e seus colegas de trabalho fazem o Code Review (CR).

Alguém no Code Review chega no seu código e comenta:

> Mas eu poderia fazer a mesma coisa usando `div` nessa linha! Por que você usou `img`?

Qual resposta você daria? Uma possível seria algo do tipo:

> Você tem razão, eu poderia, mas será que faria sentido? Eu usar o elemento `img` para guardar uma imagem agrega muito mais valor para o documento do que se eu usasse uma `div`, haja vista que uma `div` é um elemento genérico, que serve para agrupar qualquer coisa. Ao usar o elemento `img`, eu estou comunicando que o conteúdo é uma imagem.

Analogamente, suponha que você precise mostrar para o usuário uma tabela com todas as suas compras. Para cada compra, você precisa mostrar:

* o valor da compra;

* a data que a compra foi efetuada;

* uma descrição da compra.

Qual elemento você usaria para representar essa tabela? Existe um elemento ***HTML*** cujo propósito é definir uma tabela, o `table`.

Agora assista aos vídeos do nosso instrutor, que vão te fazer compreender melhor o que é e como funciona o HTML Semântico.

<%= vimeo "470334089" %>

<%= vimeo "470334844" %>

---

### Elementos de bloco e elementos inline

Para entender como funcionam os elementos de _bloco_ e os elementos _inline_ veja o vídeo a seguir:

<%= vimeo "470336071" %>

Agora que você já sabe sobre as propriedades `display inline` e `display block`, é hora de ver sobre a propriedade `display inline-block`!

<%= vimeo "470339748" %>

Para fixar esse conteúdo, realize o exercício a seguir. Para realizar o exercício, leia atentamente o enunciado. Após entender o que foi pedido, desenvolva a solução e então verifique se você conseguiu cumprir com o que foi solicitado.

1. Para realizar este exercício copie o código `HTML` abaixo. Em seguida, faça a implementação das propriedades `CSS` e se necessário faça adições à estrutura `HTML` existente, para que o resultado final seja similar à imagem referência.
  * Lembre-se que a estrutura da página deve ser mantida para que a semântica do código seja preservada.

<%= figure(%{src: "/fundamentals/html-css/images/podium-final.png", class: "rounded mx-auto d-block", caption: "Podium and prizes final structure", width: "600px", height: "auto"}) %>

```language-html
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking</title>
    <style>
      h1 {
        text-align: center;
      }

      .first {
        background-color: rgb(235, 200, 84);
        font-size: 20px;
        height: 50px;
        text-align: center;
        width: 200px;
      }

      .second {
        background-color: rgb(219, 219, 219);
        font-size: 20px;
        height: 50px;
        text-align: center;
        width: 300px;
      }

      .third {
        background-color: rgb(170, 142, 106);
        font-size: 20px;
        height: 50px;
        text-align: center;
        width: 300px;
      }

    </style>
  </head>
  <body>
    <header>
      <h1>Hackathon Results</h1>
    </header>
    <section>
      <ul>
        <li class="first">1º - Equipe 1</li>
        <li class="second">2º - Equipe 2</li>
        <li class="third">3º - Equipe 3</li>
      </ul>
    </section>
    <section>
      <h3>Premiação Primeiro Lugar:</h3>
      <ul>
        <li>| R$ 1000,00 por integrante da equipe |</li>
        <li>| Bootcamp de 2 meses com possibilidade de contratação |</li>
      </ul>
      <h3>Premiação Segundo Lugar:</h3>
      <ul>
        <li>| R$ 600,00 por integrante da equipe |</li>
        <li>| Participação no processo seletivo para o Bootcamp |</li>
      </ul>
      <h3>Premiação Terceiro Lugar:</h3>
      <ul>
        <li>| R$ 300,00 por integrante da equipe |</li>
        <li>| Participação no processo seletivo para o Bootcamp |</li>
      </ul>
    </section>
  </body>
</html>
```

---

**_Seção opcional!_**

#### Links de referência para os novos elementos semânticos do HTML 5

> Apesar desses artigos possuirem uma versão em português, recomendamos que você o leia em inglês por ser mais completo.
> Todos os links devem ser consumidos apenas até a seção **Examples**.

---

**Estes são alguns dos elementos semânticos que você mais utilizará em sua jornada como pessoa desenvolvedora:**

* **`header`** : O elemento _header_ representa um cabeçalho contendo texto introdutório. Clique no link para ler mais sobre o [elemento header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) {: .external-link target="_blank" rel="noreferrer noopener" }.

* **`nav`** : O elemento _nav_ representa um conjunto de links de navegação. Clique no link para ler mais sobre o [elemento nav](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) {: .external-link target="_blank" rel="noreferrer noopener" }.

* **`aside`** : O elemento _aside_ representa um conteúdo à parte. Alguns exemplos de sua utilização são: barras laterais e/ou conteúdos adjacentes à um conteúdo principal. Clique no link para ler mais sobre o [elemento aside](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) {: .external-link target="_blank" rel="noreferrer noopener" }.

* **`article`** : O elemento _article_ representa um conteúdo autocontido. Ou seja, todo o conteúdo presente dentro de um _article_ provê as informações necessárias para sua compreensão, podendo ser reusado em outras páginas. Clique no link para ler mais sobre o [elemento article](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) {: .external-link target="_blank" rel="noreferrer noopener" }.

* **`section`** : O elemento _section_ representa uma seção do documento, agrupando conteúdos relacionados. Clique no link para ler mais sobre o [elemento section](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) {: .external-link target="_blank" rel="noreferrer noopener" }.

* **`footer`** : O elemento _footer_ representa o rodapé do documento e/ou de uma seção. Clique no link para ler mais sobre o [elemento footer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já entendeu o quanto de significado as tags _HTML_ carregam, é hora de praticarmos juntos!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

A partir de agora você sempre verá uma seção mostrando como realizar o versionamento do seu código antes da descrição dos exercícios do dia. Então, para te ajudar a organizar seus exercícios criamos um conteúdo focado nisso que está cheio de exemplos, você pode acessá-lo [aqui](/real-life-engineer/exercise-portfolio).

No conteúdo que criamos, você será apresentado a uma estrutura de organização utilizando pastas para módulos e para blocos. Essa estrutura é diferente da que você verá na seção de versionamento do código do conteúdo do dia, fica a seu critério decidir qual a melhor forma de organizar seus exercícios!

`Caso haja alguma dúvida ou você queira dar um feedback sobre esse conteúdo, mande uma mensagem no Slack!`

<%= versioning_your_code(@conn) %>

### Agora a prática

Antes de fazer os exercícios, crie um arquivo _HTML_ na pasta `exercises/introducao-a-html-e-css.4` e copie o código abaixo:

```language-html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <!--insira os elementos aqui-->
  </body>
</html>
```

O objetivo desses exercícios é colocar em prática o que você acabou de aprender sobre **HTML semântico**.

Para tal, criaremos uma página que apresenta um dos animais mais impressionantes que existem: o [Stomatopoda.](https://www.nationalgeographic.com/science/phenomena/2014/07/03/natures-most-amazing-eyes-just-got-a-bit-weirder/) {: .external-link target="_blank" rel="noreferrer noopener" } A estilização da página fica a seu critério. 😉

Para uma melhor organização, faça commits a cada tarefa concluída. Vamos aos exercícios:

1. Adicione um cabeçalho na página contendo o título `Soco a 80km/h: Conheça o Stomatopoda`.

2. Adicione um conjunto de links que representam a área de navegação do site.

  1. Crie um link chamado `Página Inicial`.

  2. Crie um link chamado `Sobre`.

  3. Crie um link chamado `Contato`.

3. Crie um artigo que vai conter os fatos interessantes sobre o `Stomatopoda`. O artigo terá o subtítulo `Fatos sobre o Stomatopoda`. Segue [um site animal](https://theoatmeal.com/comics/mantis_shrimp) {: .external-link target="_blank" rel="noreferrer noopener" } de inspiração para pegar fatos.

4. Divida o artigo em seções, organizando-o da seguinte forma:
  1. Uma primeira seção contendo informações gerais a respeito do animal. O subtítulo para essa seção fica a seu critério. É necessário que conste nessa seção seu _nome científico_, que é `Odontodactylus scyllarus`, em itálico. Além disso, é preciso que haja informação tabular a respeito de sua classifição científica, em específico: `Reino `, `Filo `, `Subfilo `, `Classe `, `Subclasse ` e `Ordem`. Tais informações você consegue obter [na Wikipedia.](https://pt.wikipedia.org/wiki/Stomatopoda) {: .external-link target="_blank" rel="noreferrer noopener" }

  2. As outras seções dizem respeito aos fatos interessantes que você escolheu acerca do animal. Para cada fato escolhido você vai criar uma seção.

  3. Adicione para cada seção um subtítulo referente ao fato escolhido.

  4. Adicione, para cada seção, parágrafo(s) descrevendo o fato escolhido. Destaque características impressionantes referentes ao fato que você escolheu, de forma a reforçar a unicidade do `Stomatopoda`. Por exemplo: se você criar uma seção detalhando o soco potente do animal, seria interessante destacar a velocidade desse soco (80km/h) em negrito.

  5. Adicione, para cada seção, uma imagem, como forma de ilustrar o fato.

  6. Adicione, por fim, uma seção de referências bibliográficas, contendo uma lista de todos os links que foram usados como base para compilar a página em questão.

5. Adicione um conteúdo adjacente ao artigo, disponibilizando um link para [este vídeo,](https://www.youtube.com/watch?v=E0Li1k5hGBE) {: .external-link target="_blank" rel="noreferrer noopener" } que mostra o animal em ação.

6. Adicione um rodapé na página, mostrando algo do gênero:

```language-html
"Conteúdo compilado por <insere seu nome>, <ano atual>".
```

*Obs:* para esse exercício, é obrigatório fazer uso de **no mínimo** 6 elementos com as seguintes tags: `header`, `nav`, `article`, `section`, `h1`, `h2`, `h3,` `aside`, `footer`, `table` e `img`.

---

### Validando o exercício

Agora que você criou a página mostrando fatos interessantes a respeito do `Stomatopoda`, suponha que uma pessoa com deficiência visual acesse sua página. Será que sua página estará ***acessível*** para essa pessoa? 🤔

Vamos averiguar!

Entre [neste site](https://achecker.ca/checker/index.php#output_div) {: .external-link target="_blank" rel="noreferrer noopener" }, que valida se sua página é acessível ou não. No site há 3 formas para você submeter seu código ***HTML***:

1. Via url (a primeira, já selecionada quando carrega o site).

2. Via upload do arquivo ***HTML*** (segunda aba).

3. Via copiando + colando o código ***HTML*** (terceira e última aba).

Ao submeter o código, você vai se deparar com erros de validação presentes em sua página, dando início a seu segundo exercício: **consertar todos os erros apontados**.

Para cada erro de validação mostrado, você tem à disposição um link para a página com sua descrição. **Antes** de voltar para o código e já ir consertando, leia a descrição de cada erro para **entendê-lo** e poder consertá-lo.

_No fim do exercício, além de ter uma página acessível, você vai reforçar a prática de **consertar erros**, seja de validação (para este exercício), seja de lógica, com que você vai se deparar ao longo de sua carreira de desenvolvedor._

---

## Recursos adicionais (opcional)

Os artigos sobre os displays `inline` e `block` possuem um vídeo, então caso você prefira aprender assistindo vídeo você terá essa possibilidade, visto que o conteúdo do artigo é o mesmo do vídeo. Fica a seu critério decidir através de qual forma se aprofundar no conteúdo, e claro você também ler o artigo e assistir ao vídeo.

* [Artigo - Pare de chutar e aprenda como funciona o display: inline](https://medium.com/collabcode/pare-de-chutar-e-aprenda-como-funciona-o-display-inline-4ccb7b77371d) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo - Pare de chutar e aprenda como funciona o display: block](https://medium.com/collabcode/pare-de-chutar-e-aprenda-como-funciona-o-display-block-98480c987950) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo - Pare de chutar e aprenda como funciona o display: inline-block](https://medium.com/collabcode/pare-de-chutar-e-aprenda-como-funciona-o-display-inline-block-4e6cba2f19d4) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CSS-Tricks - Why, How, and When to Use Semantic ***HTML*** and ARIA](https://css-tricks.com/why-how-and-when-to-use-semantic-html-and-aria/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [W3C - Kinds of ***HTML*** content](https://www.w3.org/TR/2011/WD-html5-20110525/content-models.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Dev - Stop using so many divs! An intro to semantic ***HTML***](https://dev.to/kenbellows/stop-using-so-many-divs-an-intro-to-semantic-html-3i9i) {: .external-link target="_blank" rel="noreferrer noopener" }

* [BitDegree - ***HTML5*** Semantic Tags: What Is Semantic Markup?](https://www.bitdegree.org/learn/html5-semantic-tags) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Learn the Web - ***HTML*** semantics cheat sheet](https://learn-the-web.algonquindesign.ca/topics/html-semantics-cheat-sheet/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Developer Drive - What are Semantic ***HTML*** Tags and how to use them](https://www.developerdrive.com/what-are-semantic-html-tags/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [SpringboardSEO - What is Semantic ***HTML***?](http://www.springboardseo.com/resources/what-is/semantic-html.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [W3 - How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você irá aprender como adicionar responsividade para as suas páginas com ***CSS***.

<%= next_button(@conn) %>
