## O que vamos aprender?

Na aula de hoje você irá aprender um conceito fundamental para a correta construção das suas aplicações em **_React_**. Todo componente React tem, no contexto da interação da aplicação com cada browser, um `Lifecycle`, ou **ciclo de vida de um componente**. As fases desse `Lifecycle` têm, associadas a si, funções através das quais quem programa pode associar comportamentos.

Por exemplo, a função `componentDidMount` executa logo que um componente acabou de ser montado no DOM. Uma lógica a ser executada nesse exato momento deve ser chamada aí. Vamos ver, na aula de hoje, mais sobre o `Lifecycle` e os vários momentos com os quais se interage através de funções do próprio React.

Vamos aprender a utilizar os métodos do ciclo de vida do componente para que possamos programar cada coisa no seu devido lugar.

<%= vimeo "460187293" %>

---

### Você será capaz de:

- Utilizar o `componentDidMount` para executar uma ação após o componente ser inserido no DOM;

- Utilizar o `shouldComponentUpdate` para avaliar se uma atualização do componente deve ou não acontecer naquele momento;

- Utilizar o `componentDidUpdate` para executar uma ação após o componente ser atualizado;

- Utilizar o `componentWillUnmount` para realizar uma ação antes de o componente ser desmontado.

---

## Por que isso é importante?

Imagine que seu componente nem sequer apareceu na tela da pessoa que utiliza sua página e que você já pediu para atualizar algum elemento gráfico contido no componente. Esse elemento gráfico que você tentou acessar ainda não existe, então esse pedido foi um desperdício de tempo e recursos do computador, concorda? Mas qual o problema disso? Se você enquanto pessoa que programa o software não se preocupar com o momento em que cada recurso deve ser utilizado **(recursos são finitos)**, você provavelmente vai estar utilizando mal esses recursos.

As funções de ciclo de vida do componente vêm para nos dar o controle necessário para utilizar cada recurso no momento certo e para garantir que a assincronicidade do React não prejudique a lógica do que você está tentando executar. Seja para a chamada de uma `API`, seja para atualização de algum elemento gráfico, é fundamental respeitar o momento em que seu componente se encontra.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### O Ciclo de Vida de um componente React

<%= vimeo "460009266" %>

Os componentes **React**, assim como os seres vivos, possuem um ciclo de vida. No caso do React, o ciclo é dividido em 4 etapas. São elas:

- Inicialização - quando o componente recebe as props e os estados;

- Montagem - quando o componente é inserido no DOM;

- Atualização - quando os props ou estados do componente são alterados;

- Desmontagem - quando o componente morre 🧟‍♂️, sumindo do DOM.

Essa é a _big picture_, mas dentro dessas 4 etapas existem vários métodos que podemos interceptar para, assim, agir em determinado momento do ciclo de vida dos componentes.

<%= figure(%{src: "/front-end/react/lifecycle/img4.png", caption: "Imagem que demonstra o ciclo de vida de um componente.", width: "800em", heigh: "auto"}) %>

Você pode acessar o diagrama acima, também visto no vídeo, [aqui!](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) {: .external-link target="_blank" rel="noreferrer noopener" }. O ciclo de vida é acessível por meio de métodos nativos dos _class components_. Como exemplo, pense no `render`, que é um método de renderização dos _class components_ e que é chamado toda vez que uma atualização acontece. Ele possui características intrínsecas que permitem adicionar o componente no DOM. Assim como o `render`, outros métodos possuem suas próprias características e objetivos.

Caso você tenha familiaridade com vídeos em inglês, assista a [esse](https://www.youtube.com/watch?v=m_mtV4YaI8c) {: .external-link target="_blank" rel="noreferrer noopener" } vídeo, que também está presente nos recursos adicionais. Se não se sentir confortável, tudo bem! Os conteúdos abordarão todo o tema.


O ciclo de vida e os **principais** métodos funcionam da seguinte maneira:

- Inicialização:
  - **constructor** - recebe as props e define o estado;
- Montagem:
  - **render** - renderiza o componente, inserindo-o no DOM;
  - **componentDidMount** - dispara uma ou mais ações após o componente ser inserido no DOM _(ideal para requisições)_;
- Atualização:
  - **shouldComponentUpdate** - possibilita autorizar ou não o componente a atualizar;
  - **componentDidUpdate** - dispara uma ou mais ações após o componente ser atualizado;
- Desmontagem:
  - **componentWillUnmount** - dispara uma ou mais ações antes de o componente ser desmontado.

Além dos métodos citados, há também outros que o próprio React intitula de _Métodos Raramente Usados_, como o `getDerivedStateFromProps` e `getSnapshotBeforeUpdate`, e que não serão o foco desta aula. Caso tenha interesse, você pode aprender sobre eles neste [link](https://pt-br.reactjs.org/docs/react-component.html#static-getderivedstatefromprops) {: .external-link target="_blank" rel="noreferrer noopener" }.

<%= vimeo "460007189" %>

#### Construindo um contador

Vamos agora fazer uma simulação, para ver na prática quando cada método é chamado:

```language-react
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    console.log("construtor");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  render() {
    console.log("render");
    return (
      <div>
        <p>Contador</p>
        <button
          onClick={() => this.setState((state) => ({ counter: state.counter + 1 }))}
        >
          Soma
        </button>
        <p>{this.state.counter}</p>
      </div>
    );
  }
}
```

Executando o código acima no browser, sem o clique no botão `Soma`, aparecerão as seguintes mensagens no console:

<%= figure(%{src: "/front-end/react/lifecycle/img1.png", caption: "Imagem que mostra as mensagens 'constructor', 'render' e 'componentDidMount' no console", width: "600em", heigh: "auto"}) %>

Atente-se para a ordem de chamada dos métodos. As mensagens refletem a ordem de execução dos métodos de ciclo de vida do componente.

Os métodos `shouldComponentUpdate` e `componentDidUpdate` não apareceram no console, pois não houve atualização. Caso o botão `Soma` seja clicado, teremos mais mensagens no console:

<%= figure(%{src: "/front-end/react/lifecycle/img2.png", caption: "Imagem que mostra as mensagens 'constructor', 'render', 'componentDidMount', 'shouldComponentUpdate' e 'componentDidUpdate' no console", width: "600em", heigh: "auto"}) %>

Note que, durante o processo de atualização, o método `render` é chamado novamente. Isso acontece porque, quando se atualiza uma props ou estado, o React "pede" que o componente seja renderizado no DOM. Como apresentamos acima, caso seja válido, podemos impedir essa renderização retornando `false` com o método `shouldComponentUpdate`.

Podemos também, nos métodos `shouldComponentUpdate` e `componentDidUpdate`, acessar os estados ou props próximos e anteriores. Para isso, devemos utilizar os parâmetros _nextProps_ e _nextState_ no `shouldComponentUpdate` e _prevProps_ e _prevState_ no `componentDidUpdate`. Veja um exemplo:

Antes, vamos alterar os `console.log()` dos métodos citados acima:

```language-react
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", this.state, nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", this.state, prevState);
  }
```

Clicando uma vez no botão _Somar_, temos:
<%= figure(%{src: "/front-end/react/lifecycle/img3.png", caption: "Imagem que mostra as mensagens 'constructor', 'render', 'componentDidMount', 'shouldComponentUpdate', 'componentDidUpdate' e os estados no console", width: "600em", heigh: "auto"}) %>

Perceba que o estado só é de fato atualizado quando chega no método `componentDidUpdate`. Por isso, caso seja necessário impedir uma renderização, você deve utilizar o método `shouldComponentUpdate`, que permite comparar os atuais e próximos estados ou props e adicionar a lógica.

Agora, vamos dividir nosso componente _Counter_ em dois. O pai será _App_ e terá toda a lógica, enquanto o filho será _CounterDisplay_ e apenas exibirá o valor do contador. Imagine que você queira que apenas números múltiplos de 3 sejam exibidos, mas que, devido a complicações, não há como alterar o componente _App_. Você deve utilizar os métodos de ciclo de vida para solucionar isso:

```language-react
// App.js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div>
        Contador
        <button
          onClick={() => this.setState((state) => ({ counter: state.counter + 1 }))}>
          Soma
        </button>
        <CounterDisplay value={this.state.counter} />
      </div>
    );
  }
}
```

```language-react
// CounterDisplay.js
class CounterDisplay extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value % 3 !== 0) return false;
    return true;
  }

  render() {
    return <div> counter: {this.props.value}</div>;
  }
}
```

Se você rodar a aplicação, vai perceber que, apesar de o método `shouldComponentUpdate` estar retornando _false_ para quando a props não for um múltiplo de 3, o valor da props continua atualizando, só não é renderizado. Isso significa que o método impede apenas a renderização ou atualização do componente no DOM, mas não a atualização de estado ou props.

### Renderização condicional e atualização de arrays no estado

<%= vimeo "460011198" %>

Vimos no vídeo como fazemos para garantir que algo só rode depois do estado ser atualizado! Passamos como segundo parâmetro da `this.setState` uma callback com a dita lógica!

```language-react
this.setState({ meuEstado: novoValor }, () => {
  // ... Sua lógica aqui
})
```

E para o caso mais complicado? Isto é, **atualizar o estado baseado no estado anterior** e **executar alguma lógica somente depois do estado atualizar** ao mesmo tempo?! Nesse caso tanto o primeiro parâmetro quanto o segundo são callbacks!

```language-react
this.setState(
  (estadoAnterior) => ({ meuEstado: estadoAnterior }), // Primeiro parâmetro!
  () => { /* ... Sua lógica aqui */ } // Segundo parâmetro!
)
```

A sintaxe é um tanto confusa, mas guarde isso na sua caixa de ferramentas para fazer lógicas de `Loading...` quando se está esperando a resposta de uma API! E lembre-se: como a `this.setState` não retorna uma promise, usar **async/await** com ela **NUNCA** vai funcionar.

💡 _Aprendemos no vídeo também sobre como atualizar arrays no estado com base no estado anterior! Use o spread operator! `this.setState(({ meuArrayNoEstado }) => ({meuArrayNoEstado: [...meuArrayNoEstado, novoElemento] }))`_

#### Para fixar

**1 -** Faça [este exercício sobre `componentDidMount`](https://www.freecodecamp.org/learn/front-end-libraries/react/use-the-lifecycle-method-componentdidmount) {: .external-link target="_blank" rel="noreferrer noopener" }

**2 -** Utilizando o código do componente _Counter_ adicione, imediatamente após sua montagem, o valor 10 na chave _counter_ do estado.

**3 -** Com o mesmo código do exercício anterior, impeça que a renderização seja feita, caso o valor na chave _counter_ esteja entre 13 e 15.

Por último, reforce seu entendimento sobre onde colocar as requisições assíncronas no **_React_**:[onde devemos integrar chamadas de APIs?](https://pt-br.reactjs.org/docs/faq-ajax.html) {: .external-link target="_blank" rel="noreferrer noopener" } Para ler mais tarde também, guarde [esse conteúdo da documentação do React dá uma visão detalhada de cada método de ciclo de vida do React.](https://pt-br.reactjs.org/docs/react-component.html#commonly-used-lifecycle-methods) {: .external-link target="_blank" rel="noreferrer noopener" }  Pare antes da sessão _"static getDerivedStateFromProps()"_.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora é hora de vermos juntos alguns exemplos de como utilizar os métodos de ciclo de vida de maneira correta!

O link da aula estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática:

Siga as instruções no **[Repositório](https://github.com/tryber/exercise-dog-image) {: .external-link target="_blank" rel="noreferrer noopener" }** para fazer uma API que recupera e filtra fotos (no caso, de cachorros) em React!

---

## Recursos adicionais (opcional)

- [Video sobre React Lifecycle](https://www.youtube.com/watch?v=m_mtV4YaI8c) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Métodos Raramente Usados](https://pt-br.reactjs.org/docs/react-component.html#static-getderivedstatefromprops) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Métodos do ciclo de vida de componentes ReactJS — Um mergulho profundo!](https://medium.com/creditas-tech/m%C3%A9todos-do-ciclo-de-vida-de-componentes-reactjs-um-mergulho-profundo-332ed7b3b782) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre Lifecycle](https://www.fullstackreact.com/30-days-of-react/day-7/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Filas e pilhas em ES6](https://dev.to/dilantha111/stacks-and-queues-in-js-with-es6-classes-and-array-20kh) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Mais informações sobre Lifecycle](https://www.geeksforgeeks.org/reactjs-lifecycle-components/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
