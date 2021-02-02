## O que vamos aprender?

Você já aprendeu que testar é a melhor maneira de proteger nossas aplicações. Porém, quando utilizamos frameworks ou bibliotecas, como é o caso do Redux, algumas adequações podem ser necessárias pra que os testes funcionem da maneira correta.

<%= vimeo "472624189" %>

---

### Você será capaz de:

* Testar aplicações react-redux de forma síncrona.

---

## Por que isso é importante?

Independente do que você irá adicionar à sua aplicação, como uma biblioteca, testar sempre será extremamente útil.

Isso se aplica também ao Redux. Ainda que tenhamos algumas pontuais alterações na maneira de testar uma aplicação React, testar continuará sendo a principal forma de manter a integridade de nosso sistema.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Testando Redux

Quando conectamos o Redux ao React, algumas alterações são necessárias pra que a aplicação funcione. Um exemplo é o `Provider`. Como já visto, é ele quem _provê_ o acesso ao estado de um `reducer` para os componentes.

Quando fazemos testes em `React`, o primeiro passo é renderizar um componente no ambiente simulado dos testes. Geralmente esse componente é o `App.js`. Por causa do necessário uso do `Provider` em aplicações react-redux, no momento dos testes também temos que utilizar o `Provider`, ou ficaremos sem o acesso ao `state`.

Você se lembra da função `renderWithRouter` utilizada para renderizar componentes que trafegam entre rotas? Para o Redux, temos uma função parecida, chamada `renderWithRedux`:

```language-javascript
const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}
```

A função `renderWithRedux` recebe um componente como primeiro parâmetro e desconstrói um objeto como o segundo. Ele obtém o valor de uma chave `initialState` desse objeto e o armazena em uma variável com o mesmo nome. Além disso, ele atribui um valor padrão para a chave `store`, e esse valor é uma nova `store` criada com um `reducer` importado e o `initialState` que você acabou de desconstruir. Leia esta função com calma para ter certeza que você entendeu.

Então, isso basicamente renderiza o componente envolvido pela `store` que você criou para o contexto do seu teste. Ela também retorna a própria `store`, caso você precise acessá-la diretamente em seu teste. **Em resumo:** a função `renderWithRedux` acrescenta ao seu componente renderizado um `store` criado para os testes. Veremos como fazer isso mais a frente!

Vamos utilizar de exemplo um contador de cliques para criar os testes, rode os comandos e faça as alterações necessárias nos arquivos descritos.

Crie o contador a partir de `npx create-react-app` e após instale o redux e o react-redux com o comando `npm install --save redux react-redux`. Agora crie e/ou altere os arquivos abaixo:

```language-javascript
// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ButtonClicks from './ButtonClicks';
import NumberClicks from './NumberClicks';
class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ButtonClicks />
          <NumberClicks />
        </Provider>
      </div>
    );
  }
}
export default App;
```

```language-javascript
// src/ButtonClicks.js
import React from 'react';
import { connect } from 'react-redux';
import addClick from './actions';
class ButtonClicks extends React.Component {
  render () {
    return (
      <div>
        <button onClick={this.props.add}>Clique aqui</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(addClick())});
export default connect(null, mapDispatchToProps)(ButtonClicks);
```

```language-javascript
// src/NumberClicks
import React from 'react';
import { connect } from 'react-redux';
class NumberClicks extends React.Component {
  render() {
    return <div>{this.props.counter}</div>;
  }
}

const mapStateToProps = state => ({
  counter: state.clickReducer.counter});

export default connect(mapStateToProps)(NumberClicks);
```

```language-javascript
// src/store/index.js
import { createStore, combineReducers } from 'redux';
import clickReducer from '../reducers';
const rootReducer = combineReducers({ clickReducer });

const store = createStore(rootReducer);

export default store;
```

```language-javascript
// src/reducers/index.js
const Initial_State = {
  counter: 0,
};
function clickReducer(state = Initial_State, action) {
  switch (action.type) {
    case 'ADD_CLICK':
      return { counter: state.counter + 1 };
    default:
      return state;
  }
}
export default clickReducer;
```

```language-javascript
// src/actions/index.js
const addClick = () => ({ type: 'ADD_CLICK' });

export default addClick;
```

Teste a aplicação utilizando o `npm start`, se tudo estiver funcionando corretamente, você ja pode seguir e começar a criar os testes abaixo.

Para utilizar a função `renderWithRedux` em nossos testes, é necessário também fazer alguns `imports`:

```language-javascript
import React from 'react'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react';
import App from './App';
```

Esses `imports` servem para termos acesso às ferramentas necessárias pra _mockar_ o `store`.

Um detalhe **muito** importante: como é utilizado um `combineReducers` na resolução do exercício, quando formos implementar os testes, temos que criar o `store` mockado com a mesma estrutura do padrão. Portanto, vamos importar o `combineReducers` e adaptar a função `renderWithRedux` para utilizá-lo.

```language-javascript
// demais imports...
import { createStore, combineReducers } from 'redux';
import clickReducer from './reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(combineReducers({ clickReducer }), initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}
```

Outro detalhe que pode ser notado é que, no caso, nosso `reducer` se chama _clickReducer_, por isso temos que importá-lo e usá-lo com o nome correto.

Por último, mais uma mudança é necessária. Você aprendeu a utilizar o Redux colocando o `Provider` no arquivo `App.js` mas, para que os testes funcionem, é necessário que movamos o `Provider` para o `index.js`. Afinal de contas, nós precisamos ignorar o `store` provido na aplicação em favor do `store` que nossos testes proveem (e que podemos controlar!).
Repare, portanto, que se renderizamos o componente `<App />` nos testes nós não renderizamos o `store` da aplicação, que está **fora** desse componente. Assim ficamos livres para criar um novo store que podemos controlar no ambiente de testes!

```language-javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Store provido pela nossa aplicação. Nos testes, precisamos prover um novo store para podermos controlá-lo

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

Pronto! Adaptações feitas, vamos para os testes!

Como primeiro teste, vamos averiguar se o botão _Clique aqui_ e o texto "0" estão na tela.

```language-javascript
describe('testing clicks', () => {
  beforeEach(cleanup);
  test('the page should has a button and a text 0', () => {
    const { queryByText } = renderWithRedux(<App />);
    const buttonAdicionar = queryByText('Clique aqui');

    expect(buttonAdicionar).toBeInTheDocument();
    expect(queryByText('0')).toBeInTheDocument();
  });
});
```

Bastou usar a função `renderWithRedux` no lugar do `render`, que os testes ocorreram perfeitamente. Note que não passamos valor inicial algum para o `clickReducer` e por isso ele utilizou o valor padrão 0, definido no código da aplicação.

Caso seja interessante alterar o valor inicial do `clickReducer`, isso também é possível passando como segundo parâmetro para a função `renderWithRedux` um objeto com as propriedades que respeitem o formato original do `state`. Isto é:

```language-javascript
const { queryByText } = renderWithRedux(<App />, { initialState: { clickReducer: { counter: 5 }}});
```

Observe: o objeto `initialState` representa o valor inicial do `state`. O `clickReducer` representa o `reducer` criado. O `counter` representa a propriedade que criamos dentro do nosso `reducer`. Vamos testar essa alteração no estado inicial:

```language-javascript
  test('a click in a button should increment the value of clicks', () => {
    const { queryByText } = renderWithRedux(<App />, { initialState: { clickReducer: { counter: 5 }}});

    expect(queryByText('5')).toBeInTheDocument();
  });
```


#### Para fixar

Utilize o mesmo exemplo acima do contador de cliques.

1. Crie um teste com o valor padrão do `reducer` e teste se um clique funciona.
2. Altere o valor inicial do `counter` para 10, faça um clique do botão e crie os testes para esses comportamentos.

### Testes assíncronos

No vídeo abaixo, vamos rever tudo que aprendemos hoje com um outro exemplo: uma aplicação que faz requisições a uma API!

<%= vimeo "472624646" %>

Recapitulando o código que vimos, temos:

```language-javascript
// src/helper/index.js
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import reducer from '../../reducers';

const createMockStore = (initialState) => (
  createStore(combineReducers({ reducer }), initialState, applyMiddleware(thunk))
);

const renderWithRedux = (
  component, { initialState, store = createMockStore(initialState) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store});

export default renderWithRedux;
```

Aqui definimos o nosso `renderWithRedux` como acima, acrescentando ao mesmo o `thunk` para permitirmos o teste de funções assíncronas.

```language-javascript
// src/App.test.js
import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import fetchMock from 'fetch-mock-jest';
import App from '../App';
import renderWithRedux from './helpers';

describe('Página principal', () => {
  test('Testa que o botão de adicionar cachorro está presente', async () => {
    const { queryByText } = renderWithRedux(<App />);
    const buttonDoguinho = queryByText('Novo Doguinho');

    expect(buttonDoguinho).toBeInTheDocument();

    fetchMock.getOnce('https://dog.ceo/api/breeds/image/random', {
      body: { message: 'myDogUrl' },
    });

    fireEvent.click(buttonDoguinho);
    await waitFor(() => expect(fetchMock.called()).toBeTruthy());
  });
});
```

Aqui nós usamos a biblioteca [fetch-mock-jest](https://www.npmjs.com/package/fetch-mock-jest) {: .external-link target="_blank" rel="noreferrer noopener" } para facilitar a nossa execução de testes assíncronos! É perfeitamente possível fazer os testes sem ela também, mas fica como sugestão para experimentarem!

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

1. Crie os testes para a aplicação criada no [exercício 2](/front-end/redux/react-with-redux-part-1/). Sinta-se livre para criar `data-testid`. Teste se as informações foram devidamente renderizadas na tela.

2. Crie os testes para a Todo List do [exercício bônus](/front-end/redux/react-with-redux-part-1/). Sinta-se livre para criar `data-testid`. Teste se as informações foram devidamente renderizadas na tela.

---

## Recursos adicionais (opcional)

* [Jest-RTL Redux](https://react-testing-examples.com/jest-rtl/redux/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Writing Tests](https://redux.js.org/recipes/writing-tests) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Redux Example](https://testing-library.com/docs/example-react-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Testing React And Redux Apps With Jest](https://scotch.io/tutorials/testing-react-and-redux-apps-with-jest) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
