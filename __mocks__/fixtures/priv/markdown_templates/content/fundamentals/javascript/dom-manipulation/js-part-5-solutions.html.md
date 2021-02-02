## Gabarito dos exercícios

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
        1. Crie uma função que mude o texto na tag <p> para uma descrição de como você se vê daqui a 2 anos. (Não gaste tempo pensando no texto, e sim realizando o exercício)
        2. Crie uma função que mude a cor do quadrado amarelo para o verde da Trybe.
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

**Solução**:

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
    1. Crie uma função que mude o texto na tag <p> para uma descrição de como você se vê daqui a 2 anos.(Não gaste tempo pensando no texto, e sim realizando o exercício)
    2. Crie uma função que mude a cor do quadrado amarelo para o verde da Trybe.
    3. Crie uma função que mude a cor do quadrado vermelho para branco.
    4. Crie uma função que corrija o texto da tag <h1>.
    5. Crie uma função que modifique todo o texto da tag <p> para maiúsculo.
    6. Crie uma função que exiba o conteúdo de todas as tags <p> no console.
    */
    //Exercício 1
    function changeText() {
      let paragraph = document.getElementsByTagName('p')[1];
      paragraph.innerHTML = "Ganhar 3.500 e estar em um empresa cabulosa!!"
    }
    changeText();
    //Exercício 2
    function changeSquareToGreen() {
      let squareYellow = document.getElementsByClassName('main-content')[0];
      squareYellow.style.background = "rgb(76,164,109)";
    }
    changeSquareToGreen();
    //Exercício 3
    function changeSquareToWhite() {
      let squareRed = document.getElementsByClassName('center-content')[0];
      squareRed.style.background = "white";
    }
    changeSquareToWhite();
    //Exercício 4
    function correctTitle() {
      let title = document.getElementsByTagName('h1')[0];
      title.innerHTML = "Exercício 5.1 - JavaScript";
    }
    correctTitle();
    //Exercício 5
    function paragraphUpperCase() {
      let paragraph = document.getElementsByTagName('p')[0];
      paragraph.innerHTML = paragraph.innerHTML.toUpperCase();
    }
    paragraphUpperCase();
    //Exercício 6
    function showParagraphs() {
      let paragraphs = document.getElementsByTagName('p');
      for (let index = 0; index < paragraphs.length; index += 1) {
        console.log(paragraphs[index].innerHTML);
      }
    }
    showParagraphs();
  </script>
</body>

</html>
```
