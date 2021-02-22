## O que vamos aprender?

Na terceira parte da sua jornada através do **HTML & CSS**, você vai aprender na prática como alterar o _layout_ da página utilizando o _CSS_.

---
### Você será capaz de:

  * Compreender como funciona o _Box Model_ do CSS e como os elementos da página se relacionam visualmente;
  * Posicionar elementos na página de diferentes formas;
  * Combinar e agrupar seletores de CSS para criar regras bem definidas.

---

## Conteúdos

###### Tempo sugerido para realização: 100 minutos

Para que você aprenda na prática, a partir de agora, teremos alguns vídeos feitos pelo nosso time de especialistas e alguns exercícios de fixação que irão te auxiliar nessa caminhada pelo maravilhoso mundo do CSS!

Para fazer os exercícios de fixação, você deverá criar uma pasta específica pra isso no seu repositório de exercícios, `trybe-exercises`. Caso ainda não tenha um, crie-o e siga os passos a seguir:

1. Abra o seu terminal, vá até a pasta onde está o repositório `trybe-exercises` e abra-a. Para isso, utilize o comando `cd` que você aprendeu no primeiro bloco:

```language-sh
$ cd trybe-exercises
```
2. Crie uma `branch` para os desafios de hoje, a partir da `master`;

```language-sh
$ git checkout master
$ git checkout -b exercises/3.3
```
3. Já dentro da `branch exercises/3.3` crie uma pasta para o bloco em que você se encontra **(caso ainda não o tenha feito)**, e então, dentro dessa pasta, crie uma outra pasta para os arquivos dos desafios de hoje;

```language-sh
$ mkdir bloco_3
$ cd bloco_3
$ mkdir dia_3
$ cd dia_3
```
  * A estrutura das pastas será algo parecido com:
  <%= figure(%{src: "/fundamentals/html-css/images/estrutura-pastas.png", class: "rounded mx-auto d-block", caption: "Estrutura das pastas", width: "auto", height: "auto"}) %>

4. A cada exercício de fixação apresentado no conteúdo, crie um arquivo com a extensão `.html` dentro da pasta criada acima e cole nesse arquivo o HTML do exercício, seguindo as instruções para o desenvolvimento das atividades;

5. Após cada exercício de fixação, faça um commit na branch `exercises/3.3` e, no final do dia, abra um PR no seu repositório de exercícios no `GitHub`. Lembre-se que fazer commits frequentes e com mensagens descritivas é uma boa prática que irá te ajudar _muito_ na sua carreira como pessoa desenvolvedora!

```language-sh
$ git add .
$ git commit -m "Exercício de Box Model"
$ git push -u origin exercises/3.3
```

`PS: Peça ajuda no Fórum de Dúvidas ou no Slack caso tenha qualquer dúvida!`

### Modelo de Caixas - CSS

Hoje nós vamos começar pela apresentação do famoso _box model_ ou "modelo de caixas" utilizado como base do CSS. É um conteúdo fundamental para você entender como os elementos se relacionam na tela em uma página HTML renderizada no browser, preste bastante atenção!

Primeiramente, vamos estudar algumas propriedades bem interessantes no vídeo a seguir:

<%= vimeo "504543716" %>

Nesse vídeo você pôde ver algumas propriedades muito importantes do CSS em ação: `display`, `overflow`, `height` e `width`! Mas você sabe porque elas fazem o que fazem?

Para ter um domínio melhor sobre o tema iremos entrar de cabeça em como funcionam os blocos do CSS que montam visualmente as páginas web e vamos aprender sobre o famoso **Box Model**, um dos conceitos fundamentais do CSS!

#### O que é o Box Model?

A primeira coisa que temos que deixar bem explícita é que todos os elementos HTML são renderizados como caixas pelo browser. Por isso nós usamos o termo "box model" ou "modelo de caixas" quando nos referimos a essa forma de renderização e, por tabela, quando falamos de alguns elementos do layout.

Nos conteúdos desse bloco, você já utilizou HTML e CSS para criar e estilizar uma página web, então, mesmo sem saber, você já está usando o modelo de caixas para organizar o seu trabalho!

Só para exemplificar, se você utilizou a propriedade CSS `background-color` em algum dos elementos do seu portfólio web, você certamente percebeu que a cor de fundo foi aplicada não apenas à área diretamente atrás do elemento html, mas também em uma pequena área ao seu redor. Isso acontece porque quando você muda a cor de fundo de um elemento você está colorindo toda a caixa em que ele está contido!

O box model é composto por algumas partes que formam uma caixa para cada tag HTML que você utiliza. Essa caixa funciona mais ou menos assim:

<%= figure(%{src: "/fundamentals/html-css/images/css-box-model.png", caption: "Modelo de Caixas do CSS", width: "80%", height: "auto", margin: "auto"}) %>

A partir dessa imagem, vamos explicar um pouco melhor o que é cada propriedade:

##### _width_ e _height_
Especificam, respectivamente, a largura e a altura da área de conteúdo, desconsiderando as bordas, margens e padding.

##### _padding_
Pode ser traduzido como "enchimento" e controla a quantidade de espaço vazio entre o conteúdo em si e a borda da caixa.

Ele pode ser pensado como se fosse o "plástico bolha" ao redor do conteúdo, e o seu uso, por padrão, aumenta o tamanho total do elemento, enchendo a caixa e fazendo com que ela precise ser maior que as dimensões do conteúdo.

Tenha isso em mente quando for balancear a altura e a largura, afinal, uma caixa precisa ser maior que as dimensões do conteúdo quando ele está coberto com plástico bolha, não é mesmo?

##### _border_

É a borda da caixa, pura e simples. A propriedade `border` em si é considerada uma _shorthand_, ou seja, ela serve como um atalho para controlar um conjunto de outras propriedades que poderiam ser definidas individualmente, nesse caso `border-width`, `border-style`, e `border-color`!

- `border-width`: também pode controlar a largura da borda e o seu valor inicial é `medium`.
- `border-style`: essa propriedade controla o estilo da linha e tem como valor inicial `none`. Por isso que _você não consegue ver nenhuma borda se não alterar essa propriedade_!
- `border-color`: essa propriedade controla a cor da borda, e tem como valor inicial `currentcolor`. Esse valor define a cor da borda como sendo o mesmo do elemento, então na maioria dos casos é desejável modificá-la.

##### _margin_

A margem funciona como um tipo de "campo de força" que expande o elemento para além das suas dimensões visíveis. Ela fica do lado de fora da borda e não é afetada pela estilização do elemento, servindo mais para manejar o afastamento entre as caixas. Ainda assim, não esqueça que a margem faz parte da caixa dentro do _box model_!

#### Visualizando o Box Model na prática

Vamos praticar? Primeiro veja o layout de caixas abaixo:

<%= figure(%{src: "/fundamentals/html-css/images/css-box-model-example.png", width: "66%", height: "auto"}) %>

Agora vamos reproduzir esse esquema de itens no seu browser! Copie os códigos abaixo e cole-os no seu VS Code, criando um arquivo `index.html` e um arquivo `style.css`.

Você provavelmente não conhece algumas das propriedades utilizadas nesse código, mas não tem problema: iremos trabalhá-las mais para frente! Basta se concentrar nas classes que você deve alterar de acordo com as instruções dos comentários.

```language-html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exercício de Fixação: box model</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="caixa width-and-height" style="background: #036b52">A</div>
  <div class="caixa width-and-height padding" style="background: #41197f;">B</div>
  <div class="caixa width-and-height padding margin" style="background: #444955">C</div>
  <div class="caixa width-and-height padding margin border" style="background: #3898EC">D</div>
</body>
</html>
```

```language-css
    .caixa {
      color: white;
      display: inline-block;
      line-height: 50px;
      text-align: center;
      vertical-align: top;
    }

    .width-and-height {
      height: 50px;
      width: 50px;
    }

    .padding {
    /* insira aqui um padding de 20px na classe abaixo para aplicá-lo aos itens B, C e D */
    }

    .margin {
    /* insira aqui uma margem de 30px na classe abaixo para aplicá-la aos itens C e D */
    }

    .border {
    /* insira aqui uma borda com valor '5px solid black' para aplicá-la ao item D */
    }
```

Se você tiver curiosidade para saber sobre as propriedades `display`, `text-align` e `vertical-align`, sinta-se livre para consultar as documentações do [MDN](https://developer.mozilla.org/pt-BR/docs/Aprender/CSS/Construindo_blocos/The_box_model) {: .external-link target="_blank" rel="noreferrer noopener" } e da [W3Schools](https://www.w3schools.com/css/css_boxmodel.asp) {: .external-link target="_blank" rel="noreferrer noopener" }. Mas não se preocupe, iremos falar melhor sobre posicionamento dos elementos em alguns instantes.

O importante é que você tenha compreendido bem como funciona o box model do CSS, que é base para todos esses assuntos! Se tiver alguma dúvida não hesite em perguntar.

### Posicionamento de Elementos

Agora, você vai aprender a posicionar elementos HTML utilizando CSS. Para isso, assista ao vídeo abaixo:

<%= vimeo "504544713" %>

Incrível, né? Nessa aula, é notável o quanto posicionar elementos é importante e nos abre uma gama de possibilidades para estilizar uma página, movendo elementos utilizando propriedades como `top` e `left`. Foi possível observar também a propriedade `absolute`, que permite posicionar qualquer elemento de acordo com o elemento pai que tenha um `position` diferente. E por fim, vimos o `z-index`, que estabelece as camadas em que o objeto irá se posicionar, e o `float`, que lhe possibilita empurrar um elemento para a esquerda ou para a direita da página, permitindo que outras estruturas possam se organizar em torno dele.

Que tal praticarmos como manipular o posicionamento de elementos? Copie o HTML abaixo no seu VSCode, crie um `style.css` e faça o que se pede.

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Posicionamento de elementos</title>
    <link rel="stylesheet" href="" />
  </head>
  <body>
    <h1>Exercícios de fixação 3.3</h1>
    <img src="https://bit.ly/39HLUyi" alt="jumpMario" class="super-mario" />
    <img src="https://bit.ly/3arGfMc" alt="gomba" class="goomba" />
    <p class="word">
      Goomba, do something!
    </p>
    <img src="https://bit.ly/3tmxgED" alt="baloon" class="baloon" />
    <img src="https://bit.ly/2MV2bY0" alt="bowser" class="bowser" />

    <!-- Exercícios:
    1- Posicione o Mário acima do Goomba.
    2- Posicione a tag p para que fique dentro do balão de fala.
    3- Posicione o balão para que se torne uma fala de Bowser.
    4- Posicione os elementos para que tenham alguma distância entre si.
  -->
  </body>
</html>
```

<p style="font-size: 10px !important; color: #aaa !important;">
  Personagens pertencentes à Nintendo©
</p>

---

### Agrupamento de Seletores e Pseudoclasses

Você verá a seguir como agrupar seus seletores e como usar as pseudoclasses para estilizar ainda mais seu site:

<%= vimeo "504546529" %>

Viu como podemos economizar linhas de código simplesmente agrupando estilos? Ao fazer isso, podemos corrigir rapidamente erros de estilo pela página. Imagine: você precisa criar a versão dark-theme do seu site, fazendo todos os backgrounds ficarem escuros, textos ficarem claros e estilizar os títulos. Para isso, você precisaria editar cada elemento, mas agora, basta agrupar os seletores que sofrerão as mesmas mudanças e _Voilà!_ Tudo resolvido!

E quanto às pseudoclasses? Desde um simples `:hover`, para o elemento mudar quando o cursor do mouse passa por cima, até um `:focus` em um input de formulário, para quando o elemento estiver selecionado e puder ter um valor inserido, as pseudoclasses ajudam a estilizar melhor os elementos, dando um retorno visual ao usuário e agregando mais estilo ao seu site.

__*DICA:*__ Experimente colocar a propriedade `transition` nos seus estilos que possuem pseudoclasses. 😉

Vamos praticar o que aprendemos. Copie o código HTML abaixo e faça o que for pedido:

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Agrupando Seletores</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Lista dos Melhores Sites que já vi</h1>
    <p>Top 3 dos melhores sites que existem na web</p>
    <!-- EXERCÍCIOS

      1. Adicione uma lista ordenada dos 3 melhores sites que você conhece.
      2. Crie um arquivo no mesmo diretório e nomeie-o de 'style.css'.
      3. Nesse arquivo .css, adicione os estilos para que:
        3.1 O texto das tags 'h1' e 'p' estejam centralizados.
        3.2 A cor de fundo da sua lista mude quando o cursor estiver sobre o item.
        3.3 A fonte do item mude quando ele for clicado.

    -->
    <p>Principais motivos para eu gostar deles</p>
    <!-- EXERCÍCIOS

      1. Adicione uma lista não ordenada com, pelo menos, 3 características que você gosta.
      2. No 'style.css', adicione a propriedade 'list-style: none' para ambas as listas.

    -->
  </body>
</html>
```

Nesse [link](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Pseudo-classes) {: .external-link target="_blank" rel="noreferrer noopener" }, você irá encontrar a documentação sobre todas as pseudoclasses do CSS.

Para o próximo exercício, você não deve atribuir nenhuma classe ou id aos componentes, mas apenas utilizar pseudoclasses para individualizar cada elemento!

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
  <meta charset="UTF-8">
  <title>Pseudoclasses</title>
  <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Paleta de Cores</h1>
    <p>Vamos criar uma paleta de cores com as divs abaixo:</p>
    <div>
      <h3>Cor primária</h3>
    </div>
    <div>
      <h3>Cor Secundária</h3>
    </div>
    <div>
      <h3>Cor Complementar</h3>
    </div>
    <div>
      <h3>Cor Escura</h3>
    </div>
    <div>
      <h3>Cor Clara</h3>
    </div>
    <!-- EXERCÍCIOS

      1. Estilize as divs para que, ao passar o cursor por cima das mesmas, elas
      ganhem uma borda.
      2. Faça cada div ter uma cor própria.
      3. Estilize cada uma das tags <h3>.
      4. Faça a terceira div ser maior que as demais.
      5. Deixe as tags ímpares <h3> com o texto em itálico.

    -->
  </body>
</html>
```

---

### Combinações e Classes Descendentes

Neste ponto, você já aprendeu sobre o modelo de caixas, sobre como posicionar elementos na sua página e como o agrupamento de seletores e as pseudoclasses funcionam. Agora, você dará um passo mais a fundo na dinâmica do `CSS`, aprendendo sobre combinações de classes em elementos HTML e também a como utilizar a descendência para aplicar estilizações à elementos específicos.

Ufa, parece bastante coisa, certo? Mas calma! Assista ao vídeo **maaaravilhoso** a seguir e veja como sua aplicação é simples, porém poderosa!

<%= vimeo "491265614" %>

E aí? Viu o quão incrível o CSS pode ser?! Agora, para fixar ainda mais o conteúdo, vamos exercitar.

Estrutura do arquivo `index.html`:

```language-html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>#GoTrybe</title>
  </head>
  <body>
    <h1><em>Combinações e Classes Descendentes</em></h1>
    <br />
    <h3>Top 5 frases memoráveis:</h3>
    <ol>
      <li><em>Com grandes poderes vêm grandes responsabilidades.</em> - Tio Ben (Homem Aranha)</li>
      <li><em>Houston, temos um problema.</em> - Jack Swigert</li>
      <li><em>Sempre parece impossível até que esteja feito.</em> - Nelson Mandela</li>
      <li><em>Parte da jornada é o fim.</em> - Tony Stark (Homem de Ferro)</li>
      <li><em>Às vezes, o melhor que podemos fazer é começar novamente.</em> - Steve Rogers (Capitão América)</li>
    </ol>
    <h3>As maiores linguagens de programação:</h3>
    <ul>
      <li>Python</li>
      <li>Java</li>
      <li>JavaScript</li>
      <li>C#</li>
      <li>C / C++</li>
    </ul>
    <h3>Maiores aliados de uma pessoa desenvolvedora:</h3>
    <ul>
      <li>
        <a href="https://pt.stackoverflow.com/">StackOverflow</a>
      </li>
      <li>
        <a href="https://www.w3schools.com/">W3Schools</a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/pt-BR/">MDN Web Docs</a>
      </li>
      <li>
        <a href="https://devdocs.io/">DevDocs</a>
      </li>
      <li>
        <a href="https://app.betrybe.com/">Trybe</a>
      </li>
    </ul>
  </body>
</html>
```

Estrutura do arquivo `style.css`:

```language-css
/*

1 - Faça com que todos os itens de Listas Ordenadas tenham uma cor de fundo amarela. Se a numeração do item for PAR, faça a cor de fonte ser verde. Se o número for considerado primo, utilize a propriedade text-transform para deixar o texto maiúsculo. (Dica: combinar classes pode ser útil aqui).

2 - Faça todas as tags Header (h1, h2...) possuírem cor de fonte vermelha e, se alguma delas estiver em itálico, aumente seu tamanho para 40px e acrescente uma borda de 1px preta e sólida.

3 - Faça todas as li's terem 20px de tamanho de fonte e, para todo texto em itálico dentro de alguma li, utilize a propriedade font-weight para deixá-lo negrito.

4 - Na listagem de linguagens de programação, faça com que as 3 primeiras da lista possuam cor de fonte azul e, se alguma possuir "java*" no texto, utilize uma cor de fundo rosa.

5 - (Bônus) Para cada link na lista de aliados da pessoa desenvolvedora, faça com que ao passar o mouse sobre cada um, o texto fique em negrito e assuma a cor de fonte "temática do site"
  Dica 1: Utilize o seletor :hover para controlar o passar do mouse.
  Dica 2: Sugestão de cores padrão. StackOverflow (laranja), W3Schools (verde), MDN (preta), DevDocs (amarela), Trybe (verde).

*/
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já praticou BASTANTE com **HTML** e **CSS**, que tal fazermos um encontro ao vivo pelo Zoom para colocarmos juntos a mão na massa?

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Hoje vamos finalizar a primeira versão do seu _Portfólio Web_ adicionando seletores e CSS de layout. Sendo assim, hoje também será o último dia trabalhando com um fluxo de versionamento diferente do habitual do curso, no GitHub.

Com este exercício, você será capaz de:

* Aplicar layout mais consistente usando elementos de _bloco_ e _inline_, aplicando todo o conhecimento que você construiu hoje;

* Salvar todas as estilizações dentro de um arquivo externo `style.css`;

* Usar _Box Model_ para organizar melhor os elementos no seu _Portfólio Web_;

* Atualizar seu _Portfólio Web_ no [GitHub Pages](https://pages.github.com/) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Layout e Box Model no seu Portfólio Web

Antes de começar, você deve seguir estas instruções e fazer o setup para o exercício de hoje:

1. Entre no diretório que você criou no dia anterior;
2. Procure a tag `<style></style>`, onde você fez as alterações ontem. Mova todo o conteúdo da tag `style` e coloque em um arquivo `style.css`;
3. Adicione as novas alterações dentro do arquivo `style.css`;
4. Não se esqueça de importar esse arquivo na sua página;
5. Depois de importar o arquivo `style.css`, você já pode remover a tag `style` do seu documento.
6. Lembre-se que para executar o seu código enquanto o desenvolve você deve utilizar a extensão `Live Server`, para saber mais sobre ela acesse nosso [conteúdo](/real-life-engineer/vscode) {: .external-link target="_blank" rel="noreferrer noopener" } sobre isso.

---

### Requisitos

Seu Portfólio Web deve ter um layout usando _Box Model_ com as informações a seguir:

* Coloque seu nome, sua foto e a descrição que você escreveu sobre você dentro de blocos;

* A descrição deve ficar _ao lado_ da foto;

* Centralize seu nome na página;

* Use `padding` e coloque uma cor de fundo na sua foto que seja diferente da cor de fundo do resto da página;

* Adicione `margin` e `padding` nos elementos que julgar necessário;

* Coloque estilo somente nos itens ímpares da lista das suas habilidades.

---

### Dicas

* Use a função de "Inspecionar" do browser para analisar o estilo de outras páginas web;

* Você pode fazer alterações direto no _console_ do browser, depois de inspecionar algum elemento na página:
  * Na aba "Elementos", à direita, tem uma lista com os seletores CSS aplicados ao elemento;
  * Você pode adicionar novas regras CSS a esse elemento especificamente, escrevendo-as dentro de `element.style` no _console_ do browser;
  * Lembre-se de que as alterações não são salvas, então se você recarregar a página elas vão se perder.

---

### Atualizando seu Portfólio Web para o mundo ver!

Agora que você usou layout e _Box Model_ no seu _Portfólio Web_, chegou o momento de atualizar tudo que você fez e colocar no seu GitHub Pages! 🎉

Para isso, basta você atualizar seu projeto usando o que você aprendeu de `Git`.

---

## Recursos adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar no tema. Artigos, tutoriais, livros etc…

* [Tutorial - Como utilizar as ferramentas de desenvolvedor do browser](https://www.khanacademy.org/computing/computer-programming/html-css/web-development-tools/a/using-the-browser-developer-tools) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo - GitHub Pages](http://jmcglone.com/guides/github-pages/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playlist - Curso de HTML 5 - Gustavo Guanabara](https://www.youtube.com/playlist?list=PLHz_AreHm4dlAnJ_jJtV29RFxnPHDuk9o) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - Introdução ao HTML - Scrimba](https://scrimba.com/g/ghtml) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - HTML, CSS, e JavaScript para desenvolvedores web](https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/welcome) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Série de artigos ensinando HTML & CSS](https://internetingishard.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Aprenda a estilizar o HTML com CSS - Mozilla](https://developer.mozilla.org/en-US/docs/Learn/CSS) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Pseudoclasses - Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Pseudo-classes) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Site - CSS Tricks](https://css-tricks.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Chegou a hora de usar a sua _criatividade_ e colocar o conhecimento em prática!

<%= next_button(@conn) %>

---
