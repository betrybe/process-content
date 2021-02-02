## Rodando os exercícios localmente

Para executar as aplicações que estão no repositório, tudo o que você precisa fazer é:

1. Instalar todo o necessário para a aplicação (`npm install`)
2. Carregar a aplicação (`npm start`)

## Enunciado dos exercícios

### Exercício 1 - branch: *exercise-one*

- Nesse exercício temos três botões de nomes Red, Yellow e Green. Esses botões devem ao serem clicados, passar um estado para o `Redux` com seus nomes.

- Esse estado irá ser utilizado para carregar a imagem com a luz de semáforo acesa condizente com o nome do botão clicado.

- Nesse exercício toda a store já está pronta, o único arquivo a ser alterado é o arquivo de nome `TrafficSignal.jsx`.

- Utilize **Redux** para armazenar todo o estado da aplicação.

```language-jsx
// src/TrafficSignal.js

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSignal } from './redux/actionCreators';
import redSignal from './images/redSignal.jpeg';
import yellowSignal from './images/yellowSignal.jpeg';
import greenSignal from './images/greenSignal.jpeg';

const renderSignal = (signalColor) => {
  if (signalColor === 'red') return redSignal;
  if (signalColor === 'yellow') return yellowSignal;
  if (signalColor === 'green') return greenSignal;
  return null;
};

const TrafficSignal = ({ signalColor, changeSignal }) => {
  return (
    <div>
      <div className="button-container">
        <button onClick={() => changeSignal('red')} type="button">
          Red
        </button>
        <button onClick={() => changeSignal('yellow')} type="button">
          Yellow
        </button>
        <button onClick={() => changeSignal('green')} type="button">
          Green
        </button>
      </div>
      <img className="signal" src={renderSignal(signalColor)} alt="" />
    </div>
  );
};

const mapStateToProps = (state) => ({ signalColor: state.signal.color });

const mapDispatchToProps = (dispatch) => ({
  changeSignal: (payload) => dispatch(changeSignal(payload))});

TrafficSignal.propTypes = {
  changeSignal: PropTypes.func.isRequired,
  signalColor: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrafficSignal);
```

### Exercício 2 - branch: *exercise-two*

- Nesse exercício temos três carros com as cores Red, Blue e Yellow. Cada um deles apresenta um botão que ao ser clicado passa um estado para o `Redux` com um booleano.

- Esse estado irá ser utilizado para alterar o CSS com a imagem do carro, para que ele se mova ou não.

- Nesse exercício toda a store já está pronta, o único arquivo a ser alterado é o arquivo de nome `Cars.jsx`.

- Utilize **Redux** para armazenar todo o estado da aplicação.

```language-jsx
// src/Cars.jsx

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import carBlue from './images/carBlue.jpeg';
import carRed from './images/carRed.jpeg';
import carYellow from './images/carYellow.jpeg';
import { moveCar } from './redux/actionCreators';

function Cars({ redCar, blueCar, yellowCar, moveCar }) {
  return (
    <div>
      <div>
        <img
          className={redCar ? 'car-right' : 'car-left'}
          src={carRed}
          alt="red car"
        />
        <button
          onClick={() => moveCar('red', !redCar)}
          type="button"
        >
          Move
        </button>
      </div>
      <div>
        <img
          className={blueCar ? 'car-right' : 'car-left'}
          src={carBlue}
          alt="blue car"
        />
        <button
          onClick={() => moveCar('blue', !blueCar)}
          type="button"
        >
          Move
        </button>
      </div>
      <div>
        <img
          className={yellowCar ? 'car-right' : 'car-left'}
          src={carYellow}
          alt="yellow car"
        />
        <button
          onClick={() => moveCar('yellow', !yellowCar)}
          type="button"
        >
          Move
        </button>
      </div>
    </div>
  );
}

Cars.propTypes = {
  moveCar: PropTypes.func.isRequired,
  blueCar: PropTypes.bool.isRequired,
  redCar: PropTypes.bool.isRequired,
  yellowCar: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  redCar: state.cars.red,
  blueCar: state.cars.blue,
  yellowCar: state.cars.yellow});

const mapDispatchToProps = { moveCar };

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
```

### Exercício 3 - branch: *exercise-three*

- Nesse exercício utilizaremos os códigos dos exercícios 1 e 2. Aqui vamos juntar (combinar) os reducers dos dois primeiros exercícios, para que eles possam ser carregados juntos na mesma página da aplicação.

- O funcionamento dos dois componentes **DEVE** se manter o mesmo.

- Nesse exercício toda a `store` já está pronta, você precisará criar os arquivos para cada reducer e mover o código do reducer de cada exercício para um arquivo diferente, utilizar o arquivo `redux/index.js` para montar sua `store` e combinar os dois reducers. Além de alterar os componentes `Cars.jsx` e `TrafficSignal.jsx` para receberem seus respectivos reducers.

- Utilize **Redux** para armazenar todo o estado da aplicação.

```language-jsx
// src/TrafficSignal.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSignal } from './redux/actionCreators';
import redSignal from './images/redSignal.jpeg';
import yellowSignal from './images/yellowSignal.jpeg';
import greenSignal from './images/greenSignal.jpeg';

const renderSignal = (signalColor) => {
  if (signalColor === 'red') return redSignal;
  if (signalColor === 'yellow') return yellowSignal;
  if (signalColor === 'green') return greenSignal;
  return null;
};

const TrafficSignal = ({ signalColor, changeSignal }) => {
  return (
    <div>
      <div className="button-container">
        <button onClick={() => changeSignal('red')} type="button">
          Red
        </button>
        <button onClick={() => changeSignal('yellow')} type="button">
          Yellow
        </button>
        <button onClick={() => changeSignal('green')} type="button">
          Green
        </button>
      </div>
      <img className="signal" src={renderSignal(signalColor)} alt="" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  signalColor: state.trafficReducer.signal.color
});

const mapDispatchToProps = { changeSignal };

TrafficSignal.propTypes = {
  changeSignal: PropTypes.func.isRequired,
  signalColor: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrafficSignal);
```

```language-jsx
// src/Cars.jsx

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import carBlue from './images/carBlue.jpeg';
import carRed from './images/carRed.jpeg';
import carYellow from './images/carYellow.jpeg';
import { moveCar } from './redux/actionCreators';

function Cars({ redCar, blueCar, yellowCar, moveCar }) {
  return (
    <div>
      <div>
        <img
          className={redCar ? 'car-right' : 'car-left'}
          src={carRed}
          alt="red car"
        />
        <button
          onClick={() => moveCar('red', !redCar)}
          type="button"
        >
          Move
        </button>
      </div>
      <div>
        <img
          className={blueCar ? 'car-right' : 'car-left'}
          src={carBlue}
          alt="blue car"
        />
        <button
          onClick={() => moveCar('blue', !blueCar)}
          type="button"
        >
          Move
        </button>
      </div>
      <div>
        <img
          className={yellowCar ? 'car-right' : 'car-left'}
          src={carYellow}
          alt="yellow car"
        />
        <button
          onClick={() => moveCar('yellow', !yellowCar)}
          type="button"
        >
          Move
        </button>
      </div>
    </div>
  );
}

Cars.propTypes = {
  moveCar: PropTypes.func.isRequired,
  blueCar: PropTypes.bool.isRequired,
  redCar: PropTypes.bool.isRequired,
  yellowCar: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  redCar: state.carReducer.cars.red,
  blueCar: state.carReducer.cars.blue,
  yellowCar: state.carReducer.cars.yellow});

const mapDispatchToProps = { moveCar };

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
```

```language-jsx
// src/redux/carReducer.jsx

import { MOVE_CAR } from './actionCreators';

const initialState = {
  cars: {
    red: false,
    blue: false,
    yellow: false,
  },
};

function carReducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_CAR:
      return {
        ...state,
        cars: { ...state.cars, [action.car]: action.side }
      };
    default:
      return state;
  }
}

export default carReducer;
```

```language-jsx
// src/redux/trafficReducer.jsx

import { CHANGE_SIGNAL } from './actionCreators';

const initialState = {
  signal: { color: 'red' },
}

function trafficReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SIGNAL:
      return {
        ...state,
        signal: { ...state.signal, color: action.payload }
      };
    default:
      return state;
  }
}

export default trafficReducer;
```

```language-jsx
// src/redux/index.js

import { createStore, combineReducers } from 'redux';
import carReducer from './carReducer';
import trafficReducer from './trafficReducer';

const reducer = combineReducers({
  carReducer,
  trafficReducer});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```

### Bônus

4. Refatore a aplicação Todo List criada no [dia 16.1](/front-end/react/tests/rtl-queries-events-async/).

  - Os testes em redux não serão necessários nesse momento. Você aprenderá sobre eles ao longo do bloco.
  - Adicione filtros para apresentar apenas as tarefas concluídas e outro para exibir as tarefas em progresso.
  - Utilize **Redux** para armazenar todo o estado da aplicação.
  - **BÔNUS** Implemente a função de desfazer ações. Ações são "adicionar item", "marcar como completo" e "marcar como em andamento".

```language-jsx
// src/App.js
import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import AddTodo from './components/AddTodo';
import FilterTodos from './components/FilterTodos';
import TodoList from './components/TodoList';

const App = () => (
  <Provider store={store}>
    <AddTodo />
    <FilterTodos />
    <TodoList />
  </Provider>
);

export default App;
```

```language-jsx
// src/components/AddTodo.js
import React from 'react';
import { connect } from 'react-redux';

import * as TodoActions from '../store/actions/todo';

const AddTodo = ({ addTodo }) => {
  let input;

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        addTodo(input.value);
        input.value = '';
      }
      }>
        <input ref={(node) => { input = node; }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTodo: (text) => dispatch(TodoActions.addTodo(text))});

export default connect(null, mapDispatchToProps)(AddTodo);
```

```language-jsx
// src/components/FilterTodos.js
import React from 'react';
import { connect } from 'react-redux';

import * as TodoActions from '../store/actions/todo';

const FilterTodos = ({ filter }) => (
  <div>
    <button type="button" onClick={() => filter('all')}>Todos</button>
    <button type="button" onClick={() => filter('done')}>Finalizados</button>
    <button type="button" onClick={() => filter('progress')}>Em andamento</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  filter: (filter) => dispatch(TodoActions.filter(filter))});

export default connect(null, mapDispatchToProps)(FilterTodos);
```

```language-jsx
// src/components/TodoList.js
import React from 'react';
import { connect } from 'react-redux';

import * as TodoActions from '../store/actions/todo';

const getTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'done':
      return todos.filter((todo) => todo.completed);
    case 'progress':
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
};

const TodoList = ({ todos, toogle, filter }) => (
  <ul>
    {
      getTodos(todos, filter).map((todo) => (
        <li key={todo.id} onClick={() => toogle(todo.id)} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
          {todo.text}
        </li>
      ))
    }
  </ul>
);

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
  filter: state.todo.filter});

const mapDispatchToProps = (dispatch) => ({
  toogle: (id) => dispatch(TodoActions.toogleTodo(id))});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

```language-jsx
// src/store/actions/todo.js

export const ADD_TODO = 'ADD_TODO';
export const TOOGLE_TODO = 'TOOGLE_TODO';
export const FILTER_TODOS = 'FILTER_TODOS';

export const addTodo = (text) => ({
  type: ADD_TODO,
  text});

export const toogleTodo = (id) => ({
  type: TOOGLE_TODO,
  id});

export const filter = (filter) => ({
  type: FILTER_TODOS,
  filter});
```

```language-jsx
// src/store/reducers/todo.js
import { ADD_TODO, TOOGLE_TODO, FILTER_TODOS } from '../actions/todo';

const INITIAL_STATE = {
  todos: [],
  currentId: 1,
  filter: 'all',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: state.currentId,
            text: action.text,
            completed: false,
          },
        ],
        currentId: state.currentId + 1,
      };
    case TOOGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return (todo.id === action.id) ? { ...todo, completed: !todo.completed } : todo;
        }),
      };
    case FILTER_TODOS:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default reducer;
```

```language-jsx
// src/store/reducers/index.js
import { combineReducers } from 'redux';

import todo from './todo';

export default combineReducers({
  todo});
```

```language-jsx
// src/store/index.js
import { createStore } from 'redux';

import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;
```

Veja um outro exemplo [aqui](https://github.com/reduxjs/redux/tree/master/examples/todos-with-undo) {: .external-link target="_blank" rel="noreferrer noopener" }
