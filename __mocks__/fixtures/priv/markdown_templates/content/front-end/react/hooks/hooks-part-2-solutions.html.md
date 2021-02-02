## Gabarito do exercícios

A seguir, encontra-se uma sugestão de solução para os exercícios propostos.

### Exercícios de fixação
1. Faça um componente funcional React com as seguintes funcionalidades:

- A cada 10 segundos ele gera e exibe na tela um número aleatório de 1 a 100;
- Se o número for múltiplo de 3 ou 5, uma mensagem "Acerto" é exibida na tela;
- A mensagem de acerto é removida 4 segundos depois de ser exibida;
- O timer é removido quando o componente é desmontado.

`src/App.js`

```language-jsx
import React from 'react';
import useTimer from './useTimer';

const App = () => {
  const { timer, randomNumber, isMultiple } = useTimer();

  return (
    <div className="App">
      {timer}
      <br />
      {randomNumber} 
      <br />
      {isMultiple ? 'Acerto' : ''}
    </div>
  );
}

export default App;
```
{: .line-numbers}

`src/useTimer.js`

```language-jsx
import { useState, useEffect } from 'react';

const useTimer = () => {
  const [timer, setTimer] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);

  const min = 1;
  const max = 100;
  
  const isMultiple = randomNumber && (randomNumber % 3 === 0 || randomNumber % 5 === 0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const newTimer = timer + 1
      const mod10 = newTimer > 0 && newTimer % 10;
      if(mod10 === 0) {
        setRandomNumber(Math.round(Math.random() * (max - min) + min));
      }
      setTimer(newTimer);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    }
  }, [timer])

  useEffect(() => {
    if(isMultiple) {
      setTimeout(() => {
        setRandomNumber(null);
      }, 4000)
    }
  }, [randomNumber, isMultiple])

  return { 
    timer, 
    randomNumber, 
    isMultiple,
  }
}

export default useTimer;
```
{: .line-numbers}
2. Agora é hora de sentir o poder dos Hooks customizados na pele! Faça uma Todo list simples usando um hook customizado useArray para manipular os dados guardados na lista.

`src/App.js`

```language-jsx
import { useState } from 'react';
import TodoList from './TodoList';
import useArray from './hooks/useArray';

function App() {
  const [ newInput, setNewInput ] = useState('');
  const { addTodos, todos } = useArray();
  
  const handleInput = ({ target }) => {
    setNewInput(target.value);
  };

  const handleClick = () => {
    addTodos(newInput);
    setNewInput('');
  };

  return (
    <div>
      <label>Add a task:
        <input
          placeholder="cook"
          name="newItem"
          value={newInput}
          onChange={handleInput}
          />
      </label>
      <button onClick={() => handleClick()}>Add</button>
      <TodoList todos={todos}/>
    </div>
  );
}

export default App;
```
{: .line-numbers}

`src/TodoList.js`

```language-jsx
function TodoList({ todos }) {
  return(
    <div>
      <h1>To-do:</h1>
      <ul>
          {
            todos.map((todo) => <li>{todo}</li>)
          }
        </ul>
    </div>
  );
}

export default TodoList;
```
{: .line-numbers}

`src/hooks/useArray.js`

```language-jsx
import { useState } from 'react';

function useArray() {
  const [todos, setTodos] = useState([]);

  const addTodos = (userInput) => {
    setTodos(todos.concat(userInput))
  }

  return {
    todos,
    addTodos,
  }
}

export default useArray;
```
{: .line-numbers}

### Exercício 1
Refatore o exercício do repositório [exercise-hooks-useEffect-customHooks](https://github.com/tryber/exercise-hooks-useEffect-customHooks) {: .external-link target="_blank" rel="noreferrer noopener" } utilizando Hooks e transforme todos os componentes de classe em componentes funcionais. Não se esqueça de utilizar a hook useEffect para manipular o ciclo de vida do componente. Lembre-se de acessar a branch `exercise-one`, a estrutura da aplicação estará pronta para ser refatorada.


`src/index.js`

```language-jsx
import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { Provider } from './components/RedditContext';

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```
{: .line-numbers}

`src/App.js`

```language-jsx
import React, { useContext, useEffect } from 'react';

import LastUpdate from './components/LastUpdate';
import Posts from './components/Posts';
import RefreshButton from './components/RefreshButton';
import Selector from './components/Selector';
import { Context } from './components/RedditContext';

const App = () => {
  const {
    fetchPosts,
    selectedSubreddit,
    postsBySubreddit,
    isFetching,
  } = useContext(Context);

  useEffect(() => {
    fetchPosts();
  }, []);

  const { items: posts = [] } = postsBySubreddit[selectedSubreddit];
  const isEmpty = posts.length === 0;

  return (
    <div>
      <Selector />
      <div>
        <LastUpdate />
        <RefreshButton />
      </div>
      {isFetching && <h2>Loading...</h2>}
      {!isFetching && isEmpty && <h2>Empty.</h2>}
      {!isFetching && !isEmpty && <Posts />}
    </div>
  );
};

export default App;
```
{: .line-numbers}

`src/components/LastUpdate.js`

```language-jsx
import React, { useContext } from 'react';

import { Context } from './RedditContext';

const LastUpdate = () => {
  const { selectedSubreddit, postsBySubreddit } = useContext(Context);
  const { lastUpdated } = postsBySubreddit[selectedSubreddit];

  if (!lastUpdated) return null;

  return (
    <span>
      {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}
    </span>
  );
};

export default LastUpdate;
```
{: .line-numbers}

`src/components/Posts.js`

```language-jsx
import React, { useContext } from 'react';

import { Context } from './RedditContext';

const Posts = () => {
  const { posts } = useContext(Context);

  return (
    <ul>
      {posts.map(({ id, title }) => <li key={id}>{title}</li>)}
    </ul>
  );
};

export default Posts;
```
{: .line-numbers}

`src/components/RefreshButton.js`

```language-jsx
import React, { useContext } from 'react';

import { Context } from './RedditContext';

const RefreshButton = () => {
  const { isFetching, refreshSubreddit } = useContext(Context);

  if (isFetching) return null;

  return (
    <button
      type="button"
      onClick={(event) => refreshSubreddit(event)}
      disabled={isFetching}
    >
      Refresh
    </button>
  );
};

export default RefreshButton;
```
{: .line-numbers}

`src/components/Selector.js`

```language-jsx
import React, { useContext } from 'react';

import { Context } from './RedditContext';

const renderOptions = (options) => (
  options.map((option) => (
    <option
      value={option}
      key={option}
    >
      {option}
    </option>
  ))
);

const Selector = () => {
  const {
    selectedSubreddit,
    availableSubreddits,
    selectSubreddit,
  } = useContext(Context);

  return (
    <span>
      <h1>{`Selected: ${selectedSubreddit}`}</h1>
      <select
        onChange={(e) => selectSubreddit(e.target.value)}
        value={selectedSubreddit}
      >
        {renderOptions(availableSubreddits)}
      </select>
    </span>
  );
};

export default Selector;
```
{: .line-numbers}

`src/components/RedditContext.js`

```language-jsx
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostsBySubreddit } from '../services/redditAPI';

const Context = createContext();

const INITIAL_POSTS_BY_SUBREDDIT = {
  frontend: {},
  reactjs: {},
};

const RedditProvider = ({ children }) => {
  const [postsBySubreddit, setPostsBySubreddit] = useState(INITIAL_POSTS_BY_SUBREDDIT);
  const [selectedSubreddit, setSelectedSubreddit] = useState('reactjs');
  const [shouldRefreshSubreddit, setShouldRefreshSubreddit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  function shouldFetchPosts() {
    const posts = postsBySubreddit[selectedSubreddit];

    if (!posts.items) return true;
    if (isFetching) return false;
    return shouldRefreshSubreddit;
  }

  function handleFetchSuccess(json) {
    const lastUpdated = Date.now();
    const items = json.data.children.map((child) => child.data);
    const newPostsBySubreddit = {
      ...postsBySubreddit,
      [selectedSubreddit]: { items, lastUpdated },
    };

    setPostsBySubreddit(newPostsBySubreddit);
    setShouldRefreshSubreddit(false);
    setIsFetching(false);
  }

  function handleFetchError(error) {
    const newPostsBySubreddit = {
      ...postsBySubreddit,
      [selectedSubreddit]: {
        error: error.message,
        items: [],
      },
    };

    setPostsBySubreddit(newPostsBySubreddit);
    setShouldRefreshSubreddit(false);
    setIsFetching(false);
  }

  function fetchPosts() {
    if (!shouldFetchPosts()) return;

    setShouldRefreshSubreddit(false);
    setIsFetching(true);

    getPostsBySubreddit(selectedSubreddit)
      .then(handleFetchSuccess, handleFetchError);
  }

  function handlRefreshSubreddit() {
    setShouldRefreshSubreddit(true);
  }

  useEffect(() => {
    fetchPosts();
  }, [selectedSubreddit, shouldRefreshSubreddit]);
  const context = {
    postsBySubreddit,
    selectedSubreddit,
    shouldRefreshSubreddit,
    isFetching,
    selectSubreddit: setSelectedSubreddit,
    fetchPosts,
    refreshSubreddit: handlRefreshSubreddit,
    availableSubreddits: Object.keys(postsBySubreddit),
    posts: postsBySubreddit[selectedSubreddit].items,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

RedditProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RedditProvider as Provider, Context };
```
{: .line-numbers}

`src/services/redditAPI.js`

```language-jsx
const SUBREDDIT_BASE_API = 'https://www.reddit.com';

export const getPostsBySubreddit = (subreddit) => (
  fetch(`${SUBREDDIT_BASE_API}/r/${subreddit}.json`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getPostsBySubreddit;
```
{: .line-numbers}


### Exercício 2
Faça os exercícios 2.1, 2.2 e 2.3 deste repositório: [exercise-hooks-useEffect-customHooks](https://github.com/tryber/exercise-hooks-useEffect-customHooks) {: .external-link target="_blank" rel="noreferrer noopener" }. Os enunciados estão nos arquivos `description.md`. Lembre-se de acessar as branchs `exercise-two.one`, `exercise-two.two` e `exercise-two.three`, a estrutura de cada aplicação estará pronta para ser resolvida.

`exercise-two.one`

```language-jsx

import React, { useState } from 'react';

function Greeting() {
  const [name, setName] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;

export default Usage
```
{: .line-numbers}

`exercise-two.two`

```language-jsx
import React, { useState, useEffect } from 'react';

function Greeting({ initialName = '' }) {
  const localStorageName = window.localStorage.getItem('name') || initialName;
  const [name, setName] = React.useState(localStorageName);

  useEffect(() => {
    window.localStorage.setItem('name', name);
  }, [name]);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
```
{: .line-numbers}

`exercise-two.three`

```language-jsx
import React from 'react';

function Name({ name, onNameChange }) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  );
}

function FavoriteAnimal({ animal, onAnimalChange }) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  );
}

function Display({ name, animal }) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>;
}

function App() {
  const [animal, setAnimal] = React.useState('');
  const [name, setName] = React.useState('');
  return (
    <form>
      <Name name={name} onNameChange={(event) => setName(event.target.value)} />
      <FavoriteAnimal animal={animal} onAnimalChange={(event) => setAnimal(event.target.value)} />
      <Display name={name} animal={animal} />
    </form>
  );
}

export default App;
```
{: .line-numbers}
