## O que vamos aprender?

Na quinta parte da aula sobre **_JavaScript_**, você aprenderá a adicionar e remover tags de uma página.

Além disso, aprenderá mais uma forma de buscar os elementos da página.

---

### Você será capaz de:

  * Adicionar e remover elementos _HTML_ da página via _JavaScript_;

  * Buscar os elementos da página com a propriedade `parentNode`.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

---

### Parte I - Buscando elementos

Primeiramente, assista a este vídeo:

<%= vimeo "455741655" %>

Entendeu? A propriedade `parentNode` acessa o elemento pai do elemento sobre o qual a propriedade é chamada. Mas ela não é a única forma de, a partir de um elemento, navegar para outros.

Há, ao todo, as seguintes propriedades:

* `parentNode`: retorna o elemento pai.

* `childNodes`: retorna um array com todos os elementos filhos

* `firstChild`: retorna o primeiro filho

* `lastChild`: retorna o último filho

* `nextSibling`: retorna o próximo nó.

* `previousSibling`: retorna o nó anterior.

* `nextElementSibling`: retorna o próximo elemento.

* `previousElementSibling`: retorna o elemento anterior.

É importante dizer que, à primeira vista, as propriedades `nextSibling` e `nextElementSibling` parecem fazer a mesma coisa, mas uma pega o próximo nó do _DOM_, enquanto a outra pega o próximo elemento, e nem sempre o próximo nó é um elemento, como veremos abaixo.

Entendeu? Então vamos praticar! Adicione o código abaixo a uma página _HTML_ e adicione uma tag `script`. Você deverá fazer tudo a seguir usando somente _JavaScript_.

```language-html

<div id="paiDoPai">
  <div id="pai">
    <div id="primeiroFilho"></div>
    <div id="elementoOndeVoceEsta">
      <div id="primeiroFilhoDoFilho"></div>
      <div id="segundoEUltimoFilhoDoFilho"></div>
    </div>
    Atenção!
    <div id="terceiroFilho"></div>
    <div id="quartoEUltimoFilho"></div>
  </div>
</div>
```

1. Acesse o elemento `elementoOndeVoceEsta`.
2. Acesse `pai` a partir de `elementoOndeVoceEsta` e adicione uma `color` a ele.
3. Acesse o `primeiroFilhoDoFilho` e adicione um texto a ele. Você se lembra dos vídeos da aula anterior, como fazer isso?
4. Acesse o `primeiroFilho` a partir de `pai`.
5. Agora acesse o `primeiroFilho` a partir de `elementoOndeVoceEsta`.
6. Agora acesse o texto `Atenção!` a partir de `elementoOndeVoceEsta`.
7. Agora acesse o `terceiroFilho` a partir de `elementoOndeVoceEsta`.
8. Agora acesse o `terceiroFilho` a partir de `pai`.

---

### Parte II - Criando elementos

Neste vídeo a seguir, você vai aprender como criar elementos _HTML_ usando o _JavaScript_ e como adicioná-lo ao documento.

<%= vimeo "455744347" %>

E a prática? Aqui!

1. Crie um irmão para `elementoOndeVoceEsta`.
2. Crie um filho para `elementoOndeVoceEsta`.
3. Crie um filho para `primeiroFilhoDoFilho`.
4. A partir desse filho criado, acesse `terceiroFilho`.

---

### Parte III - Removendo elementos

Veja como utilizar o _JavaScript_ para remover elementos _HTML_ da página.

<%= vimeo "455748021" %>

Para praticar:

  * Remova todos os elementos da página, menos `pai`, `elementoOndeVoceEsta` e `primeiroFilhoDoFilho`.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Chegou a hora de criarmos e removermos elementos juntos!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Bora fixar o conteúdo de hoje?! 🎯 💪

[Preparamos estes exercícios](https://be-trybe.typeform.com/to/Rib1Qkah?typeform-medium=embed-snippet) {: .external-link target="_blank" rel="noreferrer noopener" } para você fixar seus conhecimentos sobre **JavaScript - Trabalhando com Elementos.** Eles já contam com feedback na hora e são rapidinhos! Vamos lá?



#### Aprofunde seu conhecimento

Antes de começar, crie um arquivo _HTML_ na pasta `exercises/5_2` e copie o código abaixo:

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

O objetivo desses exercícios é colocar em prática o que você acabou de aprender sobre DOM. Por isso, você deve fazer os exercícios utilizando apenas código _JavaScript_, o qual deve ser inserido entre as tags `<script>` e `</script>`.

Para uma melhor organização, faça commits a cada tarefa concluída. Vamos aos exercícios:

1. Adicione a tag `h1` com o texto `Exercício 5.2 - JavaScript DOM` como filho da tag `body`;
2. Adicione a tag `div` com a classe `main-content` como filho da tag `body`;
3. Adicione a tag `div` com a classe `center-content` como filho da tag `div` criada no passo 2;
4. Adicione a tag `p` como filho do `div` criado no passo 3 e coloque algum texto;
5. Adicione a tag `div` com a classe `left-content` como filho da tag `div` criada no passo 2;
6. Adicione a tag `div` com a classe `right-content` como filho da tag `div` criada no passo 2;
7. Adicione uma imagem com `src` configurado para o valor `https://picsum.photos/200` e classe `small-image`. Esse elemento deve ser filho do `div` criado no passo 5;
8. Adicione uma lista não ordenada com os valores de 1 a 10 por extenso como valores da lista. Essa lista deve ser filha do `div` criado no passo 6;
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

## Recursos adicionais (opcional)

* [W3Schools - _JavaScript_ _HTML_ DOM Navigation](https://www.w3schools.com/js/js_htmldom_navigation.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você vai aprender como fazer suas páginas reagirem à interação do usuário!

<%= next_button(@conn) %>
