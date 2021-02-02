## O que vamos aprender?

Existem dois jeitos de se criar um componente React. Você pode definir uma classe que estende `React.Component` ou você pode definir uma função que retorna o que é renderizado.

Qual é a diferença entre essas duas formas? A classe te dá *muito mais ferramentas*, mas é mais complicada de se criar. Você pode definir estados, acessar contextos, usar métodos de ciclo de vida de componente etc. Mas você precisa, também, fazer _bind_ nas funções que não forem _arrow functions_ e que deseja passar como _callbacks_ para outros componentes, além de ser necessário definir um construtor, caso você utilize estado ou métodos de ciclo de vida. Dessa forma, na hora de separar lógica em vários componentes e reutilizá-la, a complexidade da aplicação tende a aumentar muito rápido.

Assim sendo, por vezes seria ótimo fazer algo _mais simples_, como um componente funcional, mas *utilizando estados, contextos e tudo o mais*. Pois bem! Os _React Hooks_ vêm pra resolver esses problemas! Com eles, fazer componentes complexos é *mais simples*, *mais rápido* e fica *mais fácil de compartilhar e agrupar suas lógicas.*

<%= vimeo "477738355" %>

---

### Você será capaz de:

* Utilizar o _React Hook_ useState;

* Utilizar o _React Hook_ useContext.

---

## Por que isso é importante?

_React Hooks_ são uma das mais modernas formas de se trabalhar lógicas complexas em componentes React. Eles têm adoção crescente na comunidade, resolvem problemas que a criação de componentes com classes traz e facilitam muito a vida de quem quer criar componentes, muitas vezes, mais simples. Eles são uma ferramenta fundamental para quem desenvolve ter em seu portfólio!

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

Você já deve ter notado que sempre que uma nova aplicação `React` é criada, o `App.js` vem como um componente funcional e se você precisar usar um estado ou um ciclo de vida dentro dele, é necessário mudar todo seu componente pra classe, e junto com ela vinha constructor, super(), render(), this, binds... 😖

Não seria muito melhor se pudessemos deixar as classes de lado e usar uma função que fosse capaz de utilizar estados e ciclo de vida de forma simples e muito menos verbosa?? Com a chegada dos `Hooks` na versão 16.8.0 do `React` isso se tornou possível!

(ノಥ,_｣ಥ)ノ彡 React.Component 🗑

function ヾ(Ő‿Ő✿)

### useState

<%= vimeo "477702508" %>

O `useState` é o _hook_ mais comum e ele permite que você utilize o _state_ e outros recursos do **React** sem escrever uma classe. Para entender melhor do que estamos falando, veja este componente com _Estado_ feito com uma classe e em seguida o mesmo componente feito com _hooks_:

```language-react

import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <div>Counter: {counter}</div>
        <button
          type="button"
          onClick={() =>
            this.setState((prevState) => ({ counter: prevState.counter + 1 }))
          }
        >
          Increase Counter
        </button>
      </div>
    );
  }
}

export default App;
```

Vamos agora criar esse mesmo componente usando função e utilizar hooks para entender como o useState funciona:

```language-react
import React, { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>Counter: {counter}</div>
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increase Counter
      </button>
    </div>
  );
}

export default App;
```

* A primeira mudança é que não é mais necessário importar o `Component`, somente o `useState`.

* O `constructor`, junto com o `super` e o `this.state` também foram removidos. Ao invés disso foi adicionado o useState: O `counter` é o valor do estado, o `setCounter` é a função que será usada para definir novos valores ao estado e o `useState(0)` é onde você adiciona o valor inicial do seu estado, neste caso `0`. E repare que não precisamos nos preocupar em como atualizar um estado com base no estado anterior! Essa lógica funciona de forma transparente.

* Nosso _event handler_ `onClick` também mudou. No lugar de `this.setState` temos somente a chamada da função `setCounter` definida anteriormente, recebendo como parâmetro o novo valor de `counter`, neste caso `counter + 1`.

Com o `useState`, no lugar de ter todos os estados do componente dentro de um grande objeto, teremos um `useState` diferente para cada valor de estado que estiver sendo utilizado.

### useContext

<%= vimeo "478474221" %>

O `useContext` é o `hook` que vai te ajudar a trabalhar com a **Context API**. Ele funciona como um _Consumer_, mas de uma forma muito menos complexa e que torna seu código bem mais legível!

Assim como seria feito utilizando o _Consumer_, vamos fazer um setup inicial para podermos utilizar o `useContext`:

Primeiro criamos o Context:

```language-react

import { createContext } from 'react';

const AppContext = createContext();

export default AppContext;
```

Em seguida criamos o Provider:

```language-react

import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [stateA, setStateA] = useState('initialStateA');
  const [stateB, setStateB] = useState('initialStateB');
  const contextValue = {
    stateA,
    setStateA,
    stateB,
    setStateB,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;
```

Com o `Context` e o `Provider` criados, precisamos adicionar o `Provider` à aplicação:

```language-react

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import Provider from '../utils/Provider'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Com o setup concluído, podemos utilizar o estado criado no `Provider` em qualquer componente que for necessário utilizando o `useContext`. Pra isso, precisamos importar o `Context` e o `useContext`:

```language-react
import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

const ComponenteX = () => {
  const { stateA, setStateA, stateB } = useContext(AppContext);

  return (
    <div>
      <p>{stateA}</p>
      <p>{stateB}</p>
      <button onClick={() => setStateA("newState")}>Click</button>
    </div>
  );
};

export default ComponenteX;
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos fixar o conhecimento acerca de _React Hooks_ refatorando um componente de classe para funcional.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

**Exercício 1**: Refatore o exercicio do repositório [exercise-react-hooks-refactoring](https://github.com/tryber/exercise-react-hooks-refactoring) {: .external-link target="_blank" rel="noreferrer noopener" }, substituindo toda a lógica de classes para a lógica de _React Hooks_, deixando todos os componentes funcionais. Lembre-se de acessar a branch `exercise-one`, a estrutura da aplicação estará pronta para ser refatorada.

**Exercício 2**:  Refatore o exercício do repositório [exercise-react-hooks-refactoring](https://github.com/tryber/exercise-react-hooks-refactoring) {: .external-link target="_blank" rel="noreferrer noopener" }, como fez no exercício anterior, substitua toda a lógica de classes para a lógica de _React Hooks_, deixando todos os componentes funcionais. Lembre-se de acessar a branch `exercise-two`, a estrutura da aplicação estará pronta para ser refatorada.

### Bônus

**Exercício 3**: Refatore o exercício do repositório [exercise-react-hooks-refactoring](https://github.com/tryber/exercise-react-hooks-refactoring) {: .external-link target="_blank" rel="noreferrer noopener" }, também substituindo toda a lógica de classes para a lógica de _React Hooks_, deixando todos os componentes funcionais. Aproveite que ele possui testes e veja como é prático refatorar uma aplicação que já foi testada! Lembre-se de acessar a branch `exercise-three`, a estrutura da aplicação estará pronta para ser utilizada.

---

## Recursos adicionais (opcional)

* [React Hooks Introduction, by Renan Lopes](https://www.youtube.com/watch?v=0pxd1DtockM) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Hooks useContext, by Renan Lopes](https://www.youtube.com/watch?v=dbU-ZwDOCaE) {: .external-link target="_blank" rel="noreferrer noopener" }

* [From Class Components to Function Components](https://www.robinwieruch.de/react-hooks-migration) {: .external-link target="_blank" rel="noreferrer noopener" }

* [API de Referência dos Hooks](https://pt-br.reactjs.org/docs/hooks-reference.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
