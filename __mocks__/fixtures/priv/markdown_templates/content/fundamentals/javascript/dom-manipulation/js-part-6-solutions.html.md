## Gabarito dos exercícios

## Exercício 1

### Enunciado

Antes de fazer os exercícios, crie um arquivo *HTML* na pasta `exercises/5_2` e copie o código abaixo:

```language-html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Exercício 5.2</title>
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
        margin-left: auto;
        margin-right: auto;
      }

      .main-content .center-content p {
        font-style: italic;
      }

      .main-content .left-content {
        background-color: green;
        width: 60%;
        margin-left: 0;
        margin-right: auto;
      }

      .main-content .left-content .small-image {
        display: block;
        margin-left: auto;
        margin-right: auto;
        border-radius: 100%;
      }

      .main-content .right-content {
        background-color: blue;
        width: 60%;
        margin-left: auto;
        margin-right: 0;
      }

      .main-content .description {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <script>
      // COLOQUE SEU CÓDIGO AQUI
    </script>
  </body>
</html>
```

O objetivo desses exercícios é colocar em prática o que você acabou de aprender sobre DOM. Por isso, você deve fazê-los utilizando apenas código *JavaScript*, o qual deve ser inserido entre as tags `<script>` e `</script>`.

Para uma melhor organização, faça commits a cada tarefa concluída. Vamos aos exercícios:

1. Adicione a tag `h1` com o texto `Exercício 5.2 - JavaScript DOM` como filho da tag `body`;
2. Adicione a tag `div` com a classe `main-content` como filho da tag `body`;
3. Adicione a tag `div` com a classe `center-content` como filho da tag `div` criada no passo 2;
4. Adicione a tag `p` como filho do `div` criado no passo 3 e coloque algum texto;
5. Adicione a tag `div` com a classe `left-content` como filho da tag `div` criada no passo 2;
6. Adicione a tag `div` com a classe `right-content` como filho da tag `div` criada no passo 2;
7. Adicione uma imagem com `src` configurado para o valor `https://picsum.photos/200` e classe `small-image`. Esse elemento deve ser filho do `div` criado no passo 5;
8. Adicione uma lista não ordenada com os valores de 1 a 10 por extenso, ou seja, `um`, `dois`, `três`, ... como valores da lista. Essa lista deve ser filha do `div` criado no passo 6;
9. Adicione 3 tags `h3`, todas sendo filhas do `div` criado no passo 2.

---

Agora que você criou muita coisa, vamos fazer algumas alterações e remoções:

1. Adicione a classe `title` na tag `h1` criada;
2. Adicione a classe `description` nas 3 tags `h3` criadas;
3. Remova o `div` criado no passo 5 (aquele que possui a classe `left-content`). Utilize a função `.removeChild()`;
4. Centralize o `div` criado no passo 6 (aquele que possui a classe `right-content`). Dica: para centralizar, basta configurar o `margin-right: auto` do `div`;
5. Troque a cor de fundo do elemento pai da `div` criada no passo 3 (aquela que possui a classe `center-content`) para a cor verde;
6. Remova os dois últimos elementos (`nove` e `dez`) da lista criada no passo 8.

---

##### Solução:

```language-html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Exercício 5.2</title>
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
        margin-left: auto;
        margin-right: auto;
      }

      .main-content .center-content p {
        font-style: italic;
      }

      .main-content .left-content {
        background-color: green;
        width: 60%;
        margin-left: 0;
        margin-right: auto;
      }

      .main-content .left-content .small-image {
        display: block;
        margin-left: auto;
        margin-right: auto;
        border-radius: 100%;
      }

      .main-content .right-content {
        background-color: blue;
        width: 60%;
        margin-left: auto;
        margin-right: 0;
      }

      .main-content .description {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <script>
      // Exercise - 1
      const elementH1 = document.createElement('h1');
      elementH1.innerHTML = 'Exercício 5.2 - JavaScript DOM';
      document.body.appendChild(elementH1);

      // Exercise - 2
      const elementDivMain = document.createElement('div');
      elementDivMain.className = 'main-content';
      document.body.appendChild(elementDivMain);

      // Exercise - 3
      const elementDivCenter = document.createElement('div');
      elementDivCenter.className = 'center-content';
      elementDivMain.appendChild(elementDivCenter);

      // Exercise - 4
      const paragraph = document.createElement('p');
      paragraph.innerHTML = 'Texto Show';
      elementDivCenter.appendChild(paragraph);

      // Exercise - 5
      const elementDivLeft = document.createElement('div');
      elementDivLeft.className = 'left-content';
      elementDivMain.appendChild(elementDivLeft);

      // Exercise - 6
      const elementDivRight = document.createElement('div');
      elementDivRight.className = 'right-content';
      elementDivMain.appendChild(elementDivRight);

      // Exercise - 7
      const elementImg = document.createElement('img');
      elementImg.className = 'small-image';
      elementImg.src = 'https://picsum.photos/200';
      elementDivLeft.appendChild(elementImg);

      // Exercise - 8
      const elementUl = document.createElement('ul');
      elementDivRight.appendChild(elementUl);
      const arrayNumbers = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez']
    for (let num in arrayNumbers) {
      const elementLi = document.createElement('li');
      elementLi.innerHTML = arrayNumbers[num];
      elementUl.appendChild(elementLi);
    }

      // Exercise - 9
      for (let index = 1; index <= 3; index++) {
        const elementH3 = document.createElement('h3');
        elementH3.innerHTML = 'Show ' + index;
        elementDivMain.appendChild(elementH3);
      }

      // Segunda Parte


      // Exercise 1
      const title = document.getElementsByTagName('h1')[0];
      title.className = 'title';

      // Exercise 2
      const elementsH3 = document.getElementsByTagName('h3');
      for (let index = 0; index < 3; index++) {
        elementsH3[index].className = 'description';
      }

      // Exercise 3
      const divLeftContent = document.getElementsByClassName('left-content')[0];
      elementDivMain.removeChild(divLeftContent);

      // Exercise 4
      const divRightContent = document.getElementsByClassName('right-content')[0];
      divRightContent.style.marginRight='auto';

      // Exercise 5
    const divCenterContent = document.getElementsByClassName('center-content')[0];
    divCenterContent.parentNode.style.backgroundColor = 'green';

      // Exercise 6
    elementUl.lastChild.remove();
    elementUl.lastChild.remove();

    </script>
  </body>
</html>
```
