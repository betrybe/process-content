## O que vamos aprender?

O dia de hoje se dedica a praticar ainda mais o seu conhecimento sobre **Componentes React** e a aprofundá-lo com o conceito de _Estado_. Esse é um conceito importante no qual você se aprofundar por todo o tempo que estudar React!

Um estado representa um momento de um componente dinâmico. Se o seu componente é um relógio, o _estado atual_ dele é a hora atual. Se o seu componente é uma tabela cujo conteúdo muda de acordo com o que o usuário clica na página, o estado dele contém o conteúdo da tabela. Se o seu componente fosse um jogo de videogame, o estado seria o momento em que você está no jogo, a sua quantidade de vidas, munição, itens etc. Estado é, então, um _momento_ de algo _que pode mudar ao longo do tempo (dinâmico)_. É uma **informação** que você quer preservar enquanto o componente está interagindo com quem usa.

Achou confuso?! A aula de hoje é para esclarecermos o que é isso e como nós usamos! É o primeiro passo no entendimento de uma ferramenta muito importante. Além disso, vamos ver como adicionamos os famosos _eventos_ que já usamos tanto no _JavaScript_ nos nossos componentes React.

<%= vimeo "457593559" %>

---

### Você será capaz de:

- Ler o estado de um componente e usá-lo para alterar o que exibimos no browser;

- Inicializar um componente, dando a ele um estado pré-definido;

- Atualizar o estado de um componente.

- Capturar eventos utilizando a sintaxe do ***React***

---

## Por que isso é importante?

O estado dos componentes é o que dá dinamismo às páginas do **React**, de acordo com a interação de quem usa. Ele é uma abstração essencial para o desenvolvimento de páginas mais ricas e interativas, que respondem a inputs do usuário e se atualizam em função disso.

Se os componentes são a faca do **React**, o estado e os eventos são o queijo. Com os três, você vai ter a faca e o queijo na mão para desenvolver páginas tão interessantes e complexas como hoje você nem imagina! Agora assista ao vídeo abaixo para ter _um gostinho_ do que o Estado no React é capaz de fazer! Ao longo do dia aprenderemos a fazer isso!

<%= vimeo "458158105" %>

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Introdução ao estado

<%= vimeo "457595895" %>

O _Estado_ de um componente é um lugar especial que todo componente tem para armazenar **informações que devem persistir enquanto a tela não for fechada ou atualizada**. É o filtro selecionado, o item da lista destacado, o carrinho de compras, tudo isso e mais!

Essa é, talvez, a peça mais essencial para o funcionamento do React. Enquanto numa aplicação _JavaScript_ sem uso de bibliotecas tais informações ficariam, muito provavelmente, espalhadas e desorganizadas, no React cada componente cuida das suas informações e o React garante que todas estejam atualizadas de maneira otimizada. Mas, antes de nos aprofundarmos em como usamos o _Estado_ de um componente, vamos dar um passo atrás e falar de _Eventos_!

### Introdução aos eventos

<%= vimeo "457592960" %>

Eventos são como os `eventListeners` estudados anteriormentes: você os associa aos elementos que exibirá na tela e eles nortearão como cada componente reage a uma ação de quem usa.

```language-react
import React from 'react';
import './App.css';

/* Embora isso funcione, essa DEFINITIVAMENTE
não é a maneira correta de se criar eventos
em React! A função se refere ao componente,
então deve ser parte de sua classe! */
function handleClick() {
  console.log('Clicou no botão!')
}

class App extends React.Component {
  /* Repare que, diferentemente do HTML, no
  JSX você associa uma função a um evento
  passando a própria função entre chaves `{}` */
  render() {
    return <button onClick={handleClick}>Meu botão</button>
  }
}

export default App;
```

##### Para fixar

**1 -** Crie uma aplicação React com `npx create-react-app fancy-buttons`. Altere o componente `App.js` para que seja um componente de classe e contenha um botão associado a um evento que imprime um texto qualquer via `console.log()`. **Não precisa se preocupar com a sintaxe correta para funções de eventos por enquanto!**

**2 -** Faça com que sua aplicação exiba três botões lado a lado com textos diferentes. Cada botão clicado deve acionar um evento diferente, cada um escrevendo algo diferente no console do navegador via `console.log()`.

### Vinculando funções à classe com `this` e `bind` no `constructor`

<%= vimeo "457596781" %>

Vamos por partes, porque esse vídeo trouxe muita informação!

#### Acessando uma função nossa dentro da classe

Para acessar uma função que criamos dentro de uma classe num `eventListener` precisamos explicitar a origem de nossa função com a sintaxe `this.minhaFuncao`.

```language-react
import React from 'react';
import './App.css';

class App extends React.Component {
  handleClick() {
    console.log('Clicou!')
  }

  render() {
    /* No React, precisamos dizer explicitamente que queremos uma função da nossa classe
    através da sintaxe `this.minhaFuncao` para usá-la num evento */
    return <button type="button" onClick={this.handleClick}>Meu botão</button>;
  }
}

export default App;
```

#### Constructor

Toda classe em _JavaScript_ tem acesso a um método chamado `constructor()`, e com as classes de React, definidas com `class MinhaClasse extends React.Component`, não é diferente! Quando um componente React é criado, ou seja, quando é colocado na tela do navegador, a primeira coisa que é executada é a função `constructor()`. Toda a lógica interna que o **React** adiciona aos seus componentes começa a ser inclusa neles nesse momento.

A grande questão, no entanto, é que é possível adicionar aos **construtores** das classes **React** comportamentos e lógica extras! Fazemos assim:

```language-react
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    // A função `super()` é chamada para garantir que a lógica interna do React rode **antes** da sua. Se não for assim, o código não funcionará
    super()

    // Sua lógica extra vai aqui! O parâmetro `props` é opcional, para você acessar as props diretamente no construtor
  }

  render() {
    return <span>Meu componente!</span>
  }
}

export default App;
```

Pelos motivos que veremos a seguir, conhecer o **construtor** é peça fundamental para usarmos _Eventos_ e _Estados_ nos componentes do **React**!

#### `this`

O `this` acessa, nos componentes React, **um objeto que guarda tudo que importa àquele componente**. Um código de _Hello, World!_ em React, ilustrado abaixo, gera a impressão no console a seguir:

```language-react
import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    console.log(this)
    return <span>Hello, world!</span>
  }
}

export default App;
```

```language-javascript
App {
  context: {}
  props: {}
  refs: {}
  state: null
  updater: { isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ }
  _reactInternalFiber: FiberNode { tag: 1, key: null, stateNode: App, elementType: ƒ, type: ƒ, …}
  _reactInternalInstance: {_processChildContext: ƒ}
  isMounted: (...)
  replaceState: (...)
  __proto__: Component
    constructor: class App
    isMounted: (...)
    render: ƒ render()
    replaceState: (...)
    __proto__: {...}
  // ... Continua
  }
```

Como se pode ver, o `this`, dentro das classes de componentes **React**, é um objeto enorme que contém, basicamente, tudo que concerne aquele componente dentro da aplicação. Quando fazemos `this.props`, estamos acessando a chave `props` dentro do objeto `this`, que irá conter as propriedades (`props` vem de `propriedades`!) passadas àquele componente. Com ele, por exemplo, conseguimos acessar as `props` e outras coisas, como **o estado do componente**, dentro das funções `render` e `constructor`, para dar dois exemplos.

Mas qual é, então, o grande problema do `this`? Quando definimos funções nossas numa classe de componente **React**, ele não funciona tão bem! Veja só:

```language-react
import React from 'react';
import './App.css';

class App extends React.Component {
  handleClick() {
    // Essa chamada ao `this` retorna `undefined`? !
    console.log(this)
    console.log('Clicou')
  }

  render() {
    // Já essa chamada ao `this`, feita de dentro da função `render`, retorna o objeto que esperamos
    console.log(this)
    return <button onClick={this.handleClick}>{this.state.numeroDeCliques}</button>
  }
}

export default App;
```

💡 _Execute os exemplos localmente para ver com seus próprios olhos e digitar com seus próprios dedos as particularidades de React!_

Esse comportamento acontece, em resumo, em função de dificuldades que o _JavaScript_ tem com a implementação de uma lógica de classes, lógica para qual a linguagem não foi feita! (Temos links interessantes para se aprofundar a respeito no final do dia!). A solução é, no `constructor`, fazermos para cada uma de nossas funções um vínculo "manual" da nossa função com o `this`

```language-react
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    // A função abaixo vincula "manualmente" o `this` à nossa função
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    /* Agora esse log retorna o objeto `this`, já acessível para nossa função!
    Com isso, podemos acessar as `props`, estado do componente (ainda vamos ver como!)
    e tudo o mais daqui de dentro */
    console.log(this)
    console.log('Clicou!')
  }

  render() {
    return <button onClick={this.handleClick}>Meu botão</button>
  }
}

export default App;
```

💡 _Se você definir uma função da classe com uma arrow function, com a sintaxe `minhaFuncao = () => {...}`, você não precisará fazer o `bind` no constructor, mas sua aplicação será menos performática! Se quiser ler mais a respeito, busque o texto "Binding vs arrow-function (for react onClick event)" nos Recursos Adicionais!_

##### Para fixar

**3 -** Declare dentro da classe do seu componente dos exercícios de fixação acima a função que lida com o evento que antes era lidado por uma função do lado de fora da classe!

**4 -** Garanta acesso ao objeto `this` na função que você declarou.

### Unindo componentes com estados e eventos

<%= vimeo "457594173" %>

Agora que aprendemos sobre `this` e sobre como lidar com eventos dentro das classes React, vamos finalmente acessar o estado! Veja o exemplo abaixo para conhecer a sintaxe:

```language-react
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    /* Para definir um estado inicial ao componente, a ser definido
    no momento em que o componente for colocado na tela, faça uma atribuição
    de um objeto à chave `state` do `this`, ou seja, ao `this.state`*/
    this.state = {
      numeroDeCliques: 0
    }
  }

  handleClick = () => {
    /* Você **NUNCA** deve fazer atribuições diretamente a `this.state`. Deve,
    ao invés disso, SEMPRE utilizar a função `this.setState(novoEstado)` do
    React*/
    this.setState({
      numeroDeCliques: 1
    })
  }

  render() {
    /*Para LER o estado, você pode usar `this.state.chaveDoMeuEstado`*/
    return <button onClick={this.handleClick}>{this.state.numeroDeCliques}</button>
  }
}

export default App;
```

E **muita atenção ao que foi dito acima!** Você **NUNCA** deve atribuir valores ao estado diretamente com `this.state`. O estado é atualizado de forma assíncrona pelo React, para garantir performance, e o React não garante a ordem em que as atualizações ocorrerão. Se você fizer uma atribuição direta, terá problemas! Faça-o sempre através da função `this.setState(meuNovoObjetoQueRepresentaOEstado)`. **NÃO** se esqueça disso 😃

Mas se a a atualização do estado não ocorre em ordem, vocês perguntam, _"como eu atualizo meu estado com base no estado anterior? Se tudo ocorre fora de ordem, como eu sei que uma conta de `novoEstado = estadoAtual + 1` não dará problemas?"_

Pois bem! Lembre-se de que, com Promises, para garantir que algum código executasse somente após o retorno da Promise, que é assíncrona, você tinha que colocá-lo dentro da função `.then`. Aqui a lógica é da mesma natureza:

```language-react
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      numeroDeCliques: 0
    }
  }

  handleClick = () => {
    /* Passando uma callback à função setState, que recebe de parâmetros
    o estado anterior e as props do componente, você garante que as atualizações
    do estado acontecerão uma depois da outra! */
    this.setState((estadoAnterior, _props) => ({
      numeroDeCliques: estadoAnterior.numeroDeCliques + 1
    }))
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.numeroDeCliques}</button>
  }
}

export defult App;
```

💡 _Se você quisesse chamar, no elemento, um evento passando um parâmetro, você deveria trocar a sintaxe `<button onClick{this.minhaFuncao} ...>` por `<button onClick={() => this.minhaFuncao('meu parametro')}`. Basicamente, substitua a função do evento por uma chamada à mesma feita via callback! Experimente!_

##### Para fixar

**5 -** Agora você vai converter sua aplicação para uma que conta o número de cliques dado em cada botão! Primeiramente, defina um estado inicial para a contagem de cada botão.

🦜 **Dica:**  Uma possibilidade é você definir três chaves, uma para cada botão!

**6 -** Agora, quando um botão foi clicado, altere de forma assíncrona o estado deste botão de zero para um.

**7 -** Por fim, baseie-se no estado anterior ao atual para incrementar a contagem de cliques cada vez que um botão for clicado!

### State vs Props

Você pode entender a diferença `props` vs `state` da seguinte forma:

- `props` são uma forma de passar dados de pai para filho.
- `state` é reservado para dados que seu componente controla.

O conceito é: `state` deve servir para guardar valores/estados do **Componente** que mudam com o uso do mesmo, para guardar uma alteração de estado que pode ter efeito na renderização do próprio componente. As `props` são valores estáticos, ou que no contexto de um Componente sejam estáticos, ou seja, não sofrem alteração dentro do escopo do componente que as recebe.

Pelos princípios do `React` você **nunca** deve tentar alterar o que um componente recebe como `props` como no exemplo abaixo:

```language-javascript
this.props.name = 'novo nome';
```

### Em resumo

Vamos recapitular? Hoje, no conteúdo, começamos a desenvolver as seguintes habilidades:

- Ler o estado de um componente e usá-lo para alterar o que exibimos no browser;

- Inicializar um componente, dando a ele um estado pré-definido;

- Atualizar o estado de um componente.

- Capturar eventos utilizando a sintaxe do ***React***

Para isso estudamos, no conteúdo, os seguintes pontos:

- Todo componente possui seu próprio estado e tem 100% de controle sobre ele;

- Quando um componente é colocado na tela ele executa uma função chamada `construtor`, e usando a linha `super()` podemos sobrescrevê-la para estender seu comportamento;

- O objeto `this`, acessível a toda classe de componente **React**, contém tudo o que concerne àquele componente e deve ser vinculado explicitamente às funções criadas dentro da classe, através da sintaxe `this.minhaFuncao = this.minhaFuncao.bind(this)` no construtor do componente;

- Funções que tratam eventos devem ser vinculadas aos seus respectivos elementos com `{this.minhaFuncao}` ou `{() => this.minhaFuncao('Meu parametro')`.

- É possível ler o estado de um componente via `this.state`, é possível definir um estado inicial no construtor com uma atribuição a `this.state` e deve-se atualizar tal estado somente com a função `this.setState`.

- A atualização do estado é assíncrona e, por isso, se se quiser garantir que uma atualização ocorrerá depois da outra, tal atualização deverá ser definida via callback passada à função `this.setState`, no formato `this.setState((estadoAnterior, props) => novoEstado)`

##### Para fixar

5. Defina uma lógica que estabeleça que, quando o número de cliques no botão for par, ele deve ser verde.

6. A cor atual do botão deve ser impressa num `console.log()` **de dentro** da função do evento que lida com o clique. Faça isso acontecer!

🦜 **Dica:** Lembre-se de substituir a referência à função, no evento, por uma callback que  invoca!

Agora bora pra aula ao vivo e depois pros exercícios?! Hoje nós vamos incrementar a nossa Pokedex!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Teremos uma aula interativa! Juntos, nós faremos uma caixa de busca que filtra o conteúdo de uma página ao apertarmos um botão.

Vamos para o _Slack_, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Hoje você vai incrementar a sua Pokedex utilizando _Estado_.

Você pode encontrar informações mais detalhadas no **[repositorio do exercício!](https://github.com/tryber/exercise-pokedex-state) {: .external-link target="_blank" rel="noreferrer noopener" }**

🦜 **Dica:** Você pode armazenar no estado do componente pai da aplicação o pokemon sobre o qual está iterando no momento _e_ os filtros aplicados sobre a lista.

---

## Recursos adicionais

- [Bulbapedia, the community-driven Pokémon encyclopedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page) {: .external-link target="_blank" rel="noreferrer noopener" }

- [How to become a pro with React setState() in 10 minutes](https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [ReactJS Tutorial - 10 - State](https://www.youtube.com/watch?v=4ORZ1GmjaMc) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Manipulando Eventos - Documentação oficial do React](https://pt-br.reactjs.org/docs/handling-events.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [FAQ sobre Estado - Documentação oficial do React](https://pt-br.reactjs.org/docs/faq-state.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [(React + this + bind) = só sei que é assim - Desmistificando o limiar entre JavaScript e React](https://medium.com/tableless/https-medium-com-tableless-react-this-bind-so-sei-que-e-assim-73e75f2adbd3) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Binding vs arrow-function (for react onClick event)](https://stackoverflow.com/a/56311840) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Na próxima aula, você irá aprender sobre como fazer os tão essenciais formulários no React!

<%= next_button(@conn) %>
