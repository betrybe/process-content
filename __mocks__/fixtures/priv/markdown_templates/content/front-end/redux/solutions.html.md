## Enunciado do exercício

Você irá fazer 14 exercícios propostos pelo site `freecodecamp`, com objetivo de consolidar seus conhecimentos acerca dos conceitos presentes no ***Redux***.

1. [Definindo um `action creator`](https://www.freecodecamp.org/learn/front-end-libraries/redux/define-an-action-creator) {: .external-link target="_blank" rel="noreferrer noopener" }

2. [Enviando uma `action` para um `reducer`](https://www.freecodecamp.org/learn/front-end-libraries/redux/dispatch-an-action-event) {: .external-link target="_blank" rel="noreferrer noopener" }

3. [Criando um `Reducer` para receber e manipular uma `action`](https://www.freecodecamp.org/learn/front-end-libraries/redux/handle-an-action-in-the-store) {: .external-link target="_blank" rel="noreferrer noopener" }

4. [Criando um `reducer` que aceita `actions` de tipos distintos](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-a-switch-statement-to-handle-multiple-actions) {: .external-link target="_blank" rel="noreferrer noopener" }

5. [Usando `const` para os `action types`](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-const-for-action-types/) {: .external-link target="_blank" rel="noreferrer noopener" }

6. [Registrando um `listener` para no `store`](https://www.freecodecamp.org/learn/front-end-libraries/redux/register-a-store-listener) {: .external-link target="_blank" rel="noreferrer noopener" }

7. [Combinando múltiplos `reducers`](https://www.freecodecamp.org/learn/front-end-libraries/redux/combine-multiple-reducers) {: .external-link target="_blank" rel="noreferrer noopener" }

8. [Enviando dados através das `actions`](https://www.freecodecamp.org/learn/front-end-libraries/redux/send-action-data-to-the-store) {: .external-link target="_blank" rel="noreferrer noopener" }

9. [Criando um contador com ***Redux***](https://www.freecodecamp.org/learn/front-end-libraries/redux/write-a-counter-with-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

10. [Por que nunca modificar um `state`?](https://www.freecodecamp.org/learn/front-end-libraries/redux/never-mutate-state) {: .external-link target="_blank" rel="noreferrer noopener" }

11. [Utilizando o `spread operator` como ferramenta para manter a imutabilidade do `state`](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-the-spread-operator-on-arrays) {: .external-link target="_blank" rel="noreferrer noopener" }

12. [Removendo itens de um array preservando a imutabilidade](https://www.freecodecamp.org/learn/front-end-libraries/redux/remove-an-item-from-an-array) {: .external-link target="_blank" rel="noreferrer noopener" }

13. [Trabalhando com `Object.assign`](https://www.freecodecamp.org/learn/front-end-libraries/redux/copy-an-object-with-object.assign) {: .external-link target="_blank" rel="noreferrer noopener" }

## Gabarito do exercício

1.

```language-javascript
const actionCreator = () => action;
```

2.

```language-javascript
store.dispatch(loginAction());
```

3.

```language-javascript
switch (action.type) {
  case 'LOGIN':
    return { login: true };
  default:
    return state;
}
```

4.

```language-javascript
  switch (action.type) {
    case 'LOGIN':
      return { authenticated: true };
    case 'LOGOUT':
      return { authenticated: false };
    default:
      return state;
  }
```

5.

```language-javascript
// change code below this line
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
// change code above this line

const defaultState = {
  authenticated: false,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        authenticated: true,
      };
    case LOGOUT:
      return {
        authenticated: false,
      };
    default:
      return state;
  }
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: LOGIN,
  }
};

const logoutUser = () => {
  return {
    type: LOGOUT,
  }
};
```

6.

```language-javascript
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// global count variable:
let count = 0;

// change code below this line
store.subscribe(() => { count += 1 })
// change code above this line

store.dispatch({ type: ADD });
console.log(count);
store.dispatch({ type: ADD });
console.log(count);
store.dispatch({ type: ADD });
console.log(count);
```

7.

```language-javascript
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        authenticated: true,
      };
    case LOGOUT:
      return {
        authenticated: false,
      };
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  count: counterReducer,
  auth: authReducer});

const store = Redux.createStore(rootReducer);
```

8.

```language-javascript
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // change code below this line
    case ADD_NOTE:
      return action.text
    // change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // change code below this line
  return { type: ADD_NOTE, text: note };
  // change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());
```

9.

```language-javascript
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const incAction = () => ({ type: INCREMENT });

const decAction = () => ({ type: DECREMENT });

const store = Redux.createStore(counterReducer);
```

10.

```language-javascript
const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch (action.type) {
    case ADD_TO_DO:
      return [...todos, action.todo];
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo,
  }
}

const store = Redux.createStore(immutableReducer);
```

11.

```language-javascript
const ADD_TO_DO = 'ADD_TO_DO';
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch (action.type) {
    case ADD_TO_DO:
      return [...state, action.todo];
    default:
      return state;
  }
};

const addToDo = (todo) => ({
  type: ADD_TO_DO,
  todo});

const store = Redux.createStore(immutableReducer);
```

12.

```language-javascript
const immutableReducer = (state = [0, 1, 2, 3, 4, 5], action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return state.filter((_number, index) => index !== action.index);
    default:
      return state;
  }
};

const removeItem = (index) => ({
  type: 'REMOVE_ITEM',
  index});

const store = Redux.createStore(immutableReducer);
```

13.

```language-javascript
const ONLINE = 'ONLINE';
const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp',
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ONLINE:
      return Object.assign({}, state, {
        status: 'online'
      });
    default:
      return state;
  }
};

const wakeUp = () => ({
  type: ONLINE});

const store = Redux.createStore(immutableReducer);
```
