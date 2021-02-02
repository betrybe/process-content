## O que vamos aprender?

Você já aprendeu diversas formas de utilizar o _JavaScript_ para manipular os elementos _HTML_ e até alterar os estilos da página, certo?

Agora você vai aprender como utilizar os _eventos do JavaScript_ para fazer com que funções sejam executadas quando alguém as usa ou quando o navegador fizer alguma interação com a sua página web.

---

### Você será capaz de:

* Mudar o conteúdo, estilo e outros atributos de elementos HTML a partir de eventos do _JavaScript_;

* Aplicar no seu código _JavaScript_ eventos de `click` e `change`, entre outros.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Uma das funcionalidades mais poderosas do _JavaScript_ é a capacidade de _"reagir"_ a eventos que acontecem em uma página web.

Praticamente qualquer interação de quem usa com a página pode ser considerada um evento. O _rolar da tela_, o _passar do mouse_ por um elemento, o _click do mouse_, o _digitar do teclado_, entre outros.

A partir de agora, você vai aprender como usar o _JavaScript_ para criar um código que execute a partir da ocorrência desses eventos, fazendo com que suas páginas se comportem dinamicamente, de acordo com as interações de quem usa. 🎉

---

### Parte I - O que é um escutador de eventos?

Agora, você vai aprender a criar um tipo específico de código, chamado _escutador de eventos_, ou _event listener_, em inglês.

Ele tem esse nome porque é um código colocado em um elemento que tem uma única razão de ser: ficar ali esperando que um evento específico ocorra (um click, por exemplo) e, quando isso acontecer, executar uma função pré-determinada pelo programador.

No vídeo abaixo, você aprenderá sobre o que é um evento e também verá alguns exemplos:

<%= vimeo "455785842" %>

---

### Parte II - Conheça o addEventListener

O código mais comum para criar um escutador de eventos em um elemento é através de uma função nativa do _JavaScript_, chamada `addEventListener`. Funções nativas são funções que já existem prontas dentro da linguagem e, como toda função, podem receber parâmetros.

No seu uso mais comum, `addEventListener` recebe dois parâmetros:

1. O evento que estamos esperando escutar: Exemplos: `click`, `change`, `mouseover` etc.

2. A função (criada por você) que será executada quando o evento acontecer.

A seguir, você vai aprender a como utilizar essa função:

<%= vimeo "455778458" %>

Para conhecer mais eventos, acesse [este link](https://www.w3schools.com/jsref/dom_obj_event.asp) {: .external-link target="_blank" rel="noreferrer noopener" }, no qual são listados vários eventos diferentes para você utilizar. Os mais comuns são: `click`, `change`, `mouseover` e `keyup`.

Outra coisa que vale a pena se lembrar sempre é que **todos os elementos** podem receber eventos. Tudo depende apenas de sua necessidade. Você pode usar eventos em caixas de texto, botões e até mesmo elementos estáticos, como `div` e `p`.

Agora que você já tem entendimento sobre o funcionamento de alguns eventos, acesse [este link](https://codepen.io/johnatas-henrique/pen/jOEQQvZ) {: .external-link target="_blank" rel="noreferrer noopener" } e veja um exemplo interativo. Nele você verá a diferença entre o evento `change` e o evento `keyup`.

Para finalizar o conteúdo do dia que tal alguns exercícios para treinarmos a o que você acabou de aprender?! Mas, antes disso, uma dica importante:

* **Você pode colocar quantos _event listeners_ quiser em um mesmo _elemento_**;

Para os exercícios, utilizaremos outros links do **CodePen**. Você não precisará **alterar nada** no _HTML_ nem no _CSS_. Foque apenas no _JavaScript_ e nos _event listeners_.

Exercício 1 - [Clique AQUI](https://codepen.io/johnatas-henrique/pen/xxbQeOb) {: .external-link target="_blank" rel="noreferrer noopener" }.

Exercício 2 - [Clique AQUI](https://codepen.io/johnatas-henrique/pen/oNgQOoY) {: .external-link target="_blank" rel="noreferrer noopener" }.

Exercício 3 - [Clique AQUI](https://codepen.io/johnatas-henrique/pen/bGNQJXZ) {: .external-link target="_blank" rel="noreferrer noopener" }.

Exercício 4 - [Clique AQUI](https://codepen.io/johnatas-henrique/pen/jOEQovq) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já conhece sobre os eventos do _JavaScript_, que tal fazermos um encontro ao vivo pelo Zoom para colocarmos juntos a mão na massa?

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Se você acha que já praticou bastante sobre eventos, vamos criar páginas que respondem às interações dos usuários com os exercícios a seguir.

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Bora fixar o conteúdo de hoje?! 🎯 💪


[Preparamos estes exercícios](https://be-trybe.typeform.com/to/Nr36WCRK) {: .external-link target="_blank" rel="noreferrer noopener" } para você fixar seus conhecimentos sobre **JavaScript - Eventos.** Eles já contam com feedback na hora e são rapidinhos! Vamos lá?



### Calendário Tryber

<%= figure(%{src: "/fundamentals/javascript/dom-manipulation/gif/calendario.gif", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto", caption: "GIF Calendario Tryber."}) %>

Antes de fazer os exercícios, crie um arquivo _HTML_ na pasta `exercises/5_3` e copie o código abaixo:

```language-html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Calendar</title>
  </head>
  <body>
    <header class="month-container">
      <ul>
        <li id="month">Dezembro</li>
        <li id="year">2020</li>
      </ul>
    </header>
    <div class="week-days-container">
      <ul class="week-days">
      </ul>
    </div>
    <div class="days-container">
      <ul id="days">
      </ul>
    </div>
    <div class="buttons-container">
    </div>
    <section class="tasks-container">
      <div class="my-tasks">
        <h3>MINHAS TAREFAS</h3>
      </div>
      <div class="input-container">
        <h3>COMPROMISSOS</h3>
        <label for="task-input">Novo:</label>
        <input type="text"
          id="task-input"
          placeholder="Escreva seu compromisso"
        >
        <button id="btn-add">Adicionar</button>
      </div>
      <div class="task-list-container">
        <ul class="task-list">
        </ul>
      </div>
    </section>
    <script src="script.js"></script>
  </body>
</html>
```

Crie também um arquivo _CSS_  e copie o código abaixo para adicionar estilo à página. Fique a vontade para soltar a criatividade e alterar o arquivo como desejar!

```language-css

* {
  margin: 0;
}

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #eee;
}

button {
  margin: 20px;
}

#btn-add {
  margin: 0;
}

.buttons-container {
  background-color: #eee;
  display: inline-block;
  text-align: center;
  width: 100%;
}

#days {
  margin: 0;
}

#days li {
  color: #777;
  display: inline-block;
  font-size:20px;
  margin: 5px 0;
  text-align: center;
  vertical-align: middle;
  width: 13.6%;
}

.input-container {
  width: 49%;
  height: 100px;
  display: inline-block;
}

input {
  margin-top: 8px;
}

label {
  color: #666;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
  vertical-align: middle;
}

.month-container {
  background: green;
  padding: 40px 25px;
  text-align: center;
}

.month-container ul li {
  color:white;
  font-size: 20px;
  letter-spacing: 3px;
  list-style-type: none;
  text-transform: uppercase;
}

.my-tasks {
  clear: both;
  float: left;
  height: 100px;
  vertical-align: middle;
  width: 49%;
}

.my-tasks div {
  border: 1px solid black;
  border-radius: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: inline-block;
  height: 35px;
  margin-left: 10px;
  vertical-align: middle;
  width: 35px;
}

.my-tasks div:hover {
  height: 45px;
  width: 45px;
}

.my-tasks span {
  color: #666;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 3px;
  padding-bottom: 10px;
  vertical-align: middle;
}

.tasks-container {
  height: 130px;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.tasks-container h3 {
  color: #666;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  text-decoration: underline;
  letter-spacing: 3px;
}

.task-list {
  margin-top: 20px;
}

.task-list-container {
  display: inline-block;
}

.task-list-container ul {
  list-style-type: none;
  padding: 0;
  color: #666;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
  vertical-align: middle;
}

.week-days-container {
  margin-left: 35px;
}

.week-days li {
  color: #666;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 13.6%;
}

.week-days {
  font-size: 20px;
  margin: 0px;
  padding: 10px 0;
}
```

Por fim, crie um arquivo _JavaScript_ com o nome de "script.js" na pasta `exercises/5_3` e copie o código abaixo:

```language-javascript
function createDaysOfTheWeek() {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  };
};

createDaysOfTheWeek();

// Escreva seu código abaixo.
```

O objetivo destes exercícios é colocar em prática o que você aprendeu sobre DOM, seletores, manipulação de elementos _HTML_ e Eventos em _JavaScript_. Por isso, você deve fazer os exercícios utilizando apenas código _JavaScript_, o qual deve ser inserido no arquivo "scripts.js".

Para uma melhor organização, faça commits a cada tarefa concluída. Vamos aos exercícios:

#### Exercício 1:

O array `dezDaysList` contém os dois últimos dias de novembro e os dias do mês de dezembro. Desenvolva uma função que crie dinamicamente cada dia do calendário e os adicione como filhos/filhas da tag `<ul>` com ID `"days"`. Note que os dias 29 e 30 de novembro estão no array pois representam respectivamente Segunda-feira e Terça-feira.

* Os dias devem estar contidos em uma tag `<li>`, e todos devem ter a classe `day`. Ex: `<li class="day">3</li>`
* Os dias 24, 25 e 31 são feriados e, além da classe `day`, devem conter também a classe `holiday`. Ex: `<li class="day holiday">24</li>`
* Os dias 4, 11, 18 e 25 são Sexta-feira. Eles devem conter a classe `day` e a classe `friday`. Ex: `<li class="day friday">4</li>`

```language-javascript
const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];;
```

#### Exercício 2:

Implemente uma função que receba como parâmetro a string "Feriados" e crie dinamicamente um botão com o nome "Feriados".

  * Adicione a este botão a ID `"btn-holiday"`.
  * Adicione este botão como filho/filha da tag `<div>` com classe `"buttons-container"`.

#### Exercício 3:

Implemente uma função que adicione ao botão "Feriados" um evento de "click" que muda a cor de fundo dos dias que possuem a classe `"holiday"`.

  * É interessante que este botão possua também a lógica inversa. Ao ser clicado novamente ele retorna à configuração inicial com a cor *"rgb(238,238,238)"*.

#### Exercício 4:

Implemente uma função que receba como parâmetro a string "Sexta-feira" e crie dinamicamente um botão com o nome "Sexta-feira".

  * Adicione a este botão o ID `"btn-friday"`.
  * Adicione este botão como filho/filha da tag `<div>` com classe `"buttons-container"`.


#### Exercício 5:

Implemente uma função que adicione ao botão "Sexta-feira" um evento de "click" que modifica o texto exibido nos dias que são Sexta-feira.

  *  É interessante que este botão possua também a lógica inversa. Ao ser clicado novamente ele retorna à configuração inicial exibindo os dias.

#### Exercício 6:

Implemente duas funções que criem um efeito de "zoom". Ao passar o ponteiro do mouse em um dia do mês no calendário, o texto desse dia deve aumentar e, quando o ponteiro do mouse sair do dia, o texto deve retornar ao tamanho original.

  * [Dica - Propriedade: `event.target`.](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) {: .external-link target="_blank" rel="noreferrer noopener" }


#### Exercício 7:

Implemente uma função que adiciona uma tarefa personalizada ao calendário. A função deve receber como parâmetro a string com o nome da tarefa (ex: "cozinhar") e criar dinamicamente um elemento com a tag `<span>` contendo a tarefa.

  * O elemento criado deverá ser adicionado como filho/filha da tag `<div>` que possui a classe `"my-tasks"`.

#### Exercício 8:

Implemente uma função que adiciona uma legenda com cor para a tarefa criada no exercício anterior. Esta função deverá receber como parâmetro uma string ("cor") e criar dinamicamente um elemento de tag `<div>` com a classe `task`.

  * O parâmetro cor deverá ser utilizado como cor de fundo da `<div>` criada.
  * O elemento criado deverá ser adicionado como filho/filha da tag `<div>` que possui a classe `"my-tasks"`.

#### Exercício 9:

Implemente uma função que adiciona um evento que ao clicar no elemento com a tag `<div>` referente a cor da sua tarefa, atribua a este elemento a classe `task selected`, ou seja, quando sua tarefa possuir a classe `task selected` ela estará selecionada.

  * Ao clicar novamente no elemento a sua classe deverá voltar a ser somente `task`, ou seja, esta tarefa está deixando de ser uma tarefa selecionada.

#### Exercício 10: 

Implemente uma função que adiciona um evento que ao clicar em um dia do mês no calendário, atribua a este dia a cor da legenda da sua tarefa selecionada.

  * Ao clicar novamente no dia com a cor da legenda, a sua cor deverá voltar à configuração inicial `rgb(119,119,119)`.

#### Bônus: 

Vamos adicionar compromissos ao seu calendário? Implemente uma função que, ao digitar um compromisso na caixa de texto "COMPROMISSOS", adiciona o item à lista "MEUS COMPROMISSOS" ao clicar no botão "ADICIONAR".

  * Se nenhum caractere for inserido no campo `input`, a função deve retornar um `alert` com uma mensagem de erro ao clicar em "ADICIONAR".
  * Ao pressionar a tecla "enter" o evento também deverá ser disparado.
  * [Dica - Propriedade: `keyCode`.](https://www.w3schools.com/JSREF/event_key_keycode.asp) {: .external-link target="_blank" rel="noreferrer noopener" }


---

## Recursos adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar sobre o tema. Artigos, tutoriais, livros etc.

* [Mais exercícios do W3Schools](https://www.w3schools.com/js/exercise_js.asp?filename=exercise_js_events1) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como comparar datas no JavaScript](https://pt.stackoverflow.com/questions/217881/comparar-data-atual-com-javascript?rq=1) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como comparar datas no JavaScript de outra forma](https://medium.com/lucianobragaweb/comparar-datas-em-javascript-9b1d1febbe9a) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Documentação sobre eventos do W3Schools](https://www.w3schools.com/js/js_htmldom_events.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Documentação sobre `eventListener` do W3Schools](https://www.w3schools.com/js/js_htmldom_eventlistener.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exemplos de eventos em JavaScript do W3Schools](https://www.w3schools.com/js/js_events_examples.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial da Mozilla sobre eventos JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo da Mozilla sobre eventos JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/Guide/Events/criando_e_disparando_eventos) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Livro 'Eloquent JavaScript' traduzido para portguês, online e gratuito](http://braziljs.github.io/eloquente-javascript/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Antes de seguir em frente, reflita durante um minuto sobre o quanto você já aprendeu até aqui.

Já imaginou quanta coisa bacana **você** já consegue desenvolver com _HTML_, _CSS_ e _JavaScript_ ?

<%= next_button(@conn) %>
