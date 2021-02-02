## Rodando os exercícios localmente

Para executar as aplicações localmente basta seguir os seguintes passos:

1. Crie uma aplicação `create-react-app`:

```language-bash
npx create-react-app reddit
```

2. Instale `react-redux`, `redux`, `react-router-dom` como dependências:

```language-bash
npm install react-redux redux react-router-dom
```

### Exercício 1

Crie os testes para a aplicação criada no exercício 2 da [aula 17-2](/front-end/redux/react-with-redux-part-1/). Sinta-se livre para criar `data-testid`. Teste se as informações foram devidamente renderizadas na tela.

**Solução:**

```language-jsx
// App.test.js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  render, fireEvent, cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import sumReducer from '../reducers';
import App from '../App';


const mockInitialState = {
  value1: 0,
  value2: 0,
  value3: 0,
};

afterEach(cleanup);

function renderWithRedux(
  component,
  { initialState, store = createStore(sumReducer, initialState) } = {},
  ) {
    return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

test('can render with redux with defaults', () => {
  const { getByTestId } = renderWithRedux(
    <App />,
    { initialState: mockInitialState },
  );
  const firstField = getByTestId('input1');
  expect(firstField).toBeInTheDocument();
});

test('typing numbers', () => {
  const { getByTestId, getByText } = renderWithRedux(
    <App />,
    { initialState: mockInitialState },
  );
  const firstField = getByTestId('input1');
  expect(firstField).toBeInTheDocument();
  fireEvent.change(firstField, { target: { value: 1 } });
  const secondField = getByTestId('input2');
  fireEvent.change(secondField, { target: { value: 6 } });
  expect(getByText('7')).toBeInTheDocument();
  const thirdField = getByTestId('input3');
  fireEvent.change(thirdField, { target: { value: 12 } });
  expect(getByText('19')).toBeInTheDocument();
});
```

```language-jsx
// src/InputsSum.js
import React from 'react';
import { connect } from 'react-redux';
import { sumValue1, sumValue2, sumValue3 } from './actions';

class InputsSum extends React.Component {
  render() {
    const { sumValue1, sumValue2, sumValue3 } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="input1"
          placeholder="Digite um valor"
          onChange={e => sumValue1(e.target.value)}
        />
        <input
          type="number"
          data-testid="input2"
          placeholder="Digite um valor"
          onChange={e => sumValue2(e.target.value)}
        />
        <input
          type="number"
          data-testid="input3"
          placeholder="Digite um valor"
          onChange={e => sumValue3(e.target.value)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sumValue1: e => dispatch(sumValue1(e)),
  sumValue2: e => dispatch(sumValue2(e)),
  sumValue3: e => dispatch(sumValue3(e))});

export default connect(null, mapDispatchToProps)(InputsSum);
```

```language-jsx
// src/Sum.js
import React from 'react';
import { connect } from 'react-redux';

class Sum extends React.Component {
  render() {
    return <div data-testid="sumNumbers">{this.props.sum}</div>;
  }
}

const mapStateToProps = state => ({
  sum:
    state.sumReducer.value1 + state.sumReducer.value2 + state.sumReducer.value3});

export default connect(mapStateToProps)(Sum);
```
