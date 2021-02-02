## O que vamos aprender?

Hoje, você vai aprender sobre o famoso _DOM_, a estrutura que faz a ponte entre o _HTML_ e o _JavaScript_ e que permite interação entre os dois. Por fim, você vai aprender um pouco sobre algumas das interações possíveis: veremos como recuperar dados do _HTML_ através do _JavaScript_.

---

### Você será capaz de:

* Acessar dados do _HTML_ com o _JavaScript_ através dos seletores do DOM.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

A seguir, você vai aprender sobre **DOM** e **seletores de elementos**.

---

### Parte I - O DOM. Ou: como o _HTML_ e o _JavaScript_ se comunicam?

O `DOM` (Document Object Model) é uma interface que representa como os `HTML` e `XML` são lidos pelo browser. Após a leitura do documento `HTML` pelo browser, o `DOM` cria um objeto que faz uma representação do documento e define meios de como essa estrutura pode ser acessada, dessa forma podemos utilizar o `JavaScript` para manipular o `DOM` e assim alterar o estilo e o conteúdo de nossa página.

No `DOM` nossa página é representada por nós e objetos, e é através deles que iremos realizar a comunicação do nosso `HTML` com o `JavaScript`. Sendo assim, podemos dizer que o `DOM` é uma representação orientada a objetos da página da web, que pode ser modificada com uma linguagem de script como JavaScript.

<%= figure(%{src: "/fundamentals/javascript/images/dom.jpg", class: "rounded mx-auto d-block text-center", caption: "Estrutura DOM", width: "80%"}) %>

Nessa imagem temos um exemplo de estrutura do `DOM`, ou melhor, da árvore do `DOM`, suas marcações e como ela é montada pelo browser. Vejamos um pouco mais sobre os objetos que a imagem apresenta:

* `Window`: Representa uma janela que contém um elemento DOM, sendo possível acessar o documento que a janela contém através de `Window`;

* `location`: Representa a localização do objeto a qual ele está associado, isso é, o documento atual;

* `document`: Representa qualquer página da web carregada no navegador e serve como um ponto de entrada para o conteúdo na página da web, sendo assim o `document` contém todos os documentos `HTML`;

* `history`: Permite a manipulação do histórico da sessão do navegador, ou seja, as páginas visitadas na guia ou quadro em que a página atual está carregada;

* `element`: É a classe base mais geral da qual todos os objetos em um `Document` herdam, isso é, são todos as tags que estão em arquivos `HTML` e se transformam em elementos da árvore `DOM`;

* `text`: Texto que vai entre os elementos, é todo o conteúdo das tags;

* `atribute`: São todos os atributos que um nó específico possui, como uma `class` ou `id`.

Ficou claro? Ou a ideia do que é o DOM ainda está um pouco abstrata?

Pense assim: a página _HTML/CSS/JS_ que você faz é um programa. O navegador é quem interpreta esse código e, a partir dele, gera a página que você vê na Internet.

Pois bem, o DOM é uma estrutura da sua página que o navegador monta quando lê. O seu intuito é justamente permitir ao programa acessar os elementos da página usando código e dar a ele o poder de manipulá-las.

Se, ainda assim, o conceito de DOM estiver um pouco abstrato, não se preocupe! Tudo vai ficar mais claro quando você começar a interagir com ele.

---

### Parte II - Seletores de elementos

Vamos a um exemplo! Suponha que você quer acessar a informação que está dentro da `<div>` de um site. Você pode estar baixando informações de sua página para alimentar uma base de dados, por exemplo.

Utilizando _JavaScript_, você pode, com código, recuperar exatamente o texto que está dentro da `<div>` que você quiser.

Para entender como você pode fazer isso, vamos entender a função `getElementById`.

<%= vimeo "454728923" %>

Curtiu? E observe bem: após recuperar o elemento que escolheu via _JavaScript_, você pode alterá-lo! Para começar a praticar, copie para um arquivo em sua máquina o exemplo abaixo.

```language-html
<!DOCTYPE html>
<html>
  <body>
    <h2 id="page-title">Título</h2>
    <p id="paragraph">Dê uma cor para este parágrafo!</p>
    <h4 id="subtitle">Subtítulo</h4>
    <p id="second-paragraph">Segundo parágrafo!</p>

    <script>
      var paragraph = document.getElementById("paragraph");
      paragraph.style.color = "red";
    </script>
  </body>
</html>
```

Agora você! Faça o seguinte:

1. Recupere o elemento que contém o título da página e faça algo com ele, como alterá-lo para o nome do seu filme favorito.
2. Agora recupere o segundo parágrafo e use sua criatividade para alterá-lo.
3. Por fim, recupere o subtítulo e altere-o também.

Há mais formas de você acessar o conteúdo dos elementos do seu _HTML_. Aí vão algumas outras!

Você pode acessar os elementos filtrando pelo nome da classe:

<%= vimeo "454737663" %>

... E pelo nome da tag!

<%= vimeo "454744976" %>

E a prática?! Tá aqui!

1. Adicione ao seu _HTML_ uma classe com alguns estilos para os seus dois parágrafos.
2. Recupere os seus parágrafos via código _JavaScript_, usando a função `getElementsByClassName`;
3. Altere algum estilo do primeiro deles.
4. Recupere o subtítulo pela tag.

Por fim, há uma função única que você pode usar para fazer todos esses acessos, a `querySelector`.

<%= vimeo "454749281" %>

Mas como fazer uma busca que retorna vários elementos e não apenas o primeiro? Bem, para isso existe o `querySelectorAll`, que tem comportamento semelhante ao `querySelector`. A diferença é simples: ela retorna uma array com todos os elementos que _"casem"_ com a sua seleção, ao invés de retornar apenas o primeiro deles. Veja o vídeo a seguir para entender melhor essa função.

<%= vimeo "454753840" %>

Tanto o `querySelector` quanto o `querySelectorAll` acessam CSS Selectors de todos os tipos. Ou seja, eles podem acessar muito além de valores de ids e classes. Para saber mais sobre CSS Selectors, clique [aqui](https://www.w3schools.com/cssref/css_selectors.asp) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

### Parte III - Qual seletor usar?

O `getElementById(id)` funciona de maneira diferente do `querySelector('#id')`, mas o resultado é o mesmo. Como dito no vídeo, o primeiro tem uma performance melhor, mas o segundo é mais flexível.

Atenção! Enquanto os `getElementsByClassName('ClassName')` e `getElementsByTagName('TagName')` retornam uma HTMLCollection, os `querySelectorAll('.ClassName')` e `querySelectorAll('TagName')` retornam uma NodeList.

Leia sobre a diferença entre HTMLCollection e NodeList [aqui](https://teamtreehouse.com/community/understanding-the-difference-between-an-htmlcollection-and-a-nodelist) {: .external-link target="_blank" rel="noreferrer noopener" }.

Um outro ponto é a forma da resposta, que pode ser diferente entre os seletores (_HTMLCollection_ e _NodeList_). A forma de buscar os dados armazenados nessas estruturas, em alguns casos, pode mudar, então um pouco de cuidado na hora de fazer funções que utilizem o resultado dos seletores pode salvar quem tem dores de cabeça sobre o porquê de uma função aparentemente correta não funcionar.

Para praticar, substitua todas as funções que você usou no exercício anterior por `querySelector` e/ou `querySelectorAll`.

Além disso, vamos consolidar a manipulação dos elementos `HTML`, colocando a cor do Administrador de Tempo da Trybe como na imagem abaixo usando apenas o JavaScript!

<%= figure(%{src: "/fundamentals/javascript/images/time-exercise.png", class: "standard-screenshot text-center", caption: "Administrador de tempo finalizado."}) %>

Você vai precisar usar o que aprendeu sobre `getElementBy` e `querySelector` para colocar em prática.

Antes de iniciar, crie um arquivo _HTML_ na pasta `exercises/5_1` e copie o código abaixo:

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Administrador do Tempo</title>
  </head>
  <body id="container">
    <header id="header-container">
      <h1>Administrador do Tempo da Trybe</h1>
    </header>

    <section class="emergency-tasks">
      <div>
        <h3>Urgente e Importante</h3>
      </div>
      <div>
        <h3>Urgente e Não-Importante</h3>
      </div>
    </section>
  
    <section class="no-emergency-tasks">
      <div>
        <h3>Não-Urgente e Importante</h3>
      </div>
      <div>
        <h3>Não-Urgente e Não-Importante</h3>
      </div>
    </section>

    <footer id="footer-container">
      <div>&copy; Trybe</div>
    </footer>
    <script src="script.js"></script>
  </body>
</html>
```

Crie também um arquivo _CSS_  e copie o código abaixo para adicionar estilo à página. Fique a vontade para soltar a criatividade e alterar o arquivo como desejar!

```language-css
* {
  margin: 0;
}

#container {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
}

#header-container {
  color: white;
  padding: 20px;
}

.emergency-tasks {
  display: inline-block;
  height: 400px;
  margin: 56px 0;
  width: 400px;
}

.emergency-tasks div {
  height: 198px;
}
.emergency-tasks h3 {
  color: white;
  margin-top: 10px;
  padding: 10px;
}

.no-emergency-tasks {
  display: inline-block;
  height: 400px;
  width: 400px;
}

.no-emergency-tasks div {
  height: 198px;
}

.no-emergency-tasks h3 {
  color: white;
  margin-top: 10px;
  padding: 10px;
}

#footer-container {
  color: white;
  font-weight: 700;
  padding: 15px;
  text-align: center;
}
```

Por fim, crie um arquivo _JavaScript_ com o nome de "script.js" na pasta `exercises/5_1` e coloque seus conhecimentos de `getElementBy` e `querySelector` em prática.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Partiu praticar esses conceitos todos juntos?!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Agora vamos exercitar a utilização de funções e o básico do DOM. Você verá que alguns assuntos, como lógica condicional e loops, entre outros, vão reaparecer frequentemente nos nossos exercícios.

<%= versioning_your_code(@conn) %>

### Funções de manipulação do DOM

É hora de aplicar seus conhecimentos em manipular os elementos do `HTML`!

1. A seguir, você verá um trecho de código `HTML e CSS`.
2. Crie um arquivo `HTML` dentro do diretório `exercises/5_1` e copie o código a seguir.
3. Leia as instruções que estão dentro de um comentário na tag `<script>`.
4. Não se esqueça de fazer um `commit` a cada exercício!

```language-html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Exercício 5.1</title>

    <style>
      div {
        border-color: black;
        border-style: solid;
      }
      .title {
        text-align: center;
      }

      .main-content {
        background-color: yellow;
      }

      .main-content .center-content {
        background-color: red;
        width: 50%;
        margin: 0 auto;
      }

      .main-content .center-content p {
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <h1 class="title">Exercício 5.1 - JavaEscripito </h1>
    <div class="main-content">
      <div class="center-content">
        <p>Texto padrão do nosso site</p>
        <p>-----</p>
        <p>Trybe</p>
      </div>
    </div>
    <script>
        /*
        Aqui você vai modificar os elementos já existentes utilizando apenas as funções:
        - document.getElementById()
        - document.getElementsByClassName()
        - document.getElementsByTagName()
        1. Crie uma função que mude o texto na tag <p> para uma descrição de como você se vê daqui a 2 anos. (Não gaste tempo pensando no texto e sim realizando o exercício)
        2. Crie uma função que mude a cor do quadrado amarelo para o verde da Trybe (rgb(76,164,109)).
        3. Crie uma função que mude a cor do quadrado vermelho para branco.
        4. Crie uma função que corrija o texto da tag <h1>.
        5. Crie uma função que modifique todo o texto da tag <p> para maiúsculo.
        6. Crie uma função que exiba o conteúdo de todas as tags <p> no console.
        */
    </script>
  </body>
</html>
```

---

## Recursos adicionais (opcional)

* Mal pode esperar pra estudar mais _JavaScript_? Aqui temos o sumário do [guia definitivo de JS](https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/#toc-start) {: .external-link target="_blank" rel="noreferrer noopener" } pra você saber mais sobre a linguagem.

* [Artigo - Trabalhando com DOM em JavaScript](https://www.devmedia.com.br/trabalhando-com-dom-em-javascript/29039) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Mais exercícios de DOM (mais avançados)](https://www.w3resource.com/javascript-exercises/javascript-dom-exercises.php) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playground do Codepen para praticar](https://codepen.io/andrewatts85/pen/rjmVBG) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Na próxima aula, você vai aprender a acrescentar e remover elementos _HTML_ da página via JavaScript, além de ferramentas mais avançadas de navegação.

<%= next_button(@conn) %>

---
