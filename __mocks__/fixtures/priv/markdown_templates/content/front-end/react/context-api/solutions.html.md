## Gabarito dos exercícios

A seguir, encontra-se uma sugestão de solução para os exercícios propostos.

### Exercício 1

Refatore o exercício do repositório [exercise-contextAPI-refactoring](https://github.com/tryber/exercise-contextAPI-refactoring/tree/master) {: .external-link target="_blank" rel="noreferrer noopener" } substituindo o Redux por Context API para gerenciar o estado da aplicação. As instruções de como criar um fork e iniciar o exercício encontram-se no próprio repositório. Para o exercício 1, mude para a branch `exercise-one`.

Nesse exercício temos três carros com as cores Red, Blue e Yellow. Cada um deles apresenta um botão que ao ser clicado passa um estado para o Redux com um booleano.

Esse estado irá ser utilizado para alterar o CSS com a imagem do carro, para que ele se mova ou não.

Nesse exercício toda a estrutura de Redux já está pronta. Utilize Context API em substituição ao Redux para armazenar todo o estado da aplicação.

`src/context/CarsContext.js`

```language-jsx

import { createContext } from 'react';

const CarsContext = createContext();

export default CarsContext;
```
{: .line-numbers}

`src/context/Provider.js`

```language-jsx

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CarsContext from './CarsContext';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: {
        red: false,
        blue: false,
        yellow: false,
      },
    }
    this.moveCar = this.moveCar.bind(this);
  }

  moveCar(car, side) {
    this.setState({
      cars: {
        ...this.state.cars,
        [car]: side,
      },
    });
  };

  render() {
    const context = {
      ...this.state,
      moveCar: this.moveCar,
    };

    const { children } = this.props;

    return (
      <CarsContext.Provider value={context}>
        {children}
      </CarsContext.Provider>
    );
  }
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
```
{: .line-numbers}

`src/Cars.js`

```language-jsx

import React, { Component } from 'react';
import CarsContext from './context/CarsContext';
import carBlue from './images/carBlue.jpeg';
import carRed from './images/carRed.jpeg';
import carYellow from './images/carYellow.jpeg';

class Cars extends Component {
  render() {
    const { redCar, blueCar, yellowCar } = this.context.cars;
    const { moveCar } = this.context;
    return (
      <div>
        <div>
          <img
            className={redCar ? 'car-right' : 'car-left'}
            src={carRed}
            alt="red car"
          />
          <button
            onClick={() => moveCar('redCar', !redCar)}
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
            onClick={() => moveCar('blueCar', !blueCar)}
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
            onClick={() => moveCar('yellowCar', !yellowCar)}
            type="button"
          >
            Move
        </button>
        </div>
      </div>
    )
  }
};

Cars.contextType = CarsContext;

export default Cars;
```
{: .line-numbers}

`src/index.js`

```language-jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Provider from './context/Provider';


ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```
{: .line-numbers}

`src/App.js`

```language-jsx
import React from 'react';
import './App.css';
import Cars from './Cars';

function App() {
  return (
    <Cars />
  );
}

export default App;
```
{: .line-numbers}

---

### Exercício 2

Refatore o exercício do repositório [exercise-contextAPI-refactoring](https://github.com/tryber/exercise-contextAPI-refactoring/tree/master) {: .external-link target="_blank" rel="noreferrer noopener" } substituindo o Redux pela Context API para gerenciar o estado da aplicação. Utilize como base a branch exercise-two deste repositório.

Nesse exercício utilizaremos os códigos dos exercícios 1 e 2. Aqui foi feita a junção dos reducers dos dois primeiros exercícios para que eles possam ser carregados juntos na mesma página da aplicação.

O funcionamento dos dois componentes DEVE se manter o mesmo.

Nesse exercício toda a estrutura de Redux já está pronta, você precisará refatorar a estrutura dele para Context API.

`src/context/Provider.js`

```language-jsx
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CarsContext from './CarsContext';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: {
        red: false,
        blue: false,
        yellow: false,
      },
      signal: {
        color: 'red',
      },
    }
    this.moveCar = this.moveCar.bind(this);
    this.changeSignal = this.changeSignal.bind(this);
  }

  moveCar(car, side) {
    this.setState({
      cars: {
        ...this.state.cars,
        [car]: side,
      },
    });
  };

  changeSignal(signalColor) {
    this.setState({
      signal: {
        ...this.state.signal,
        color: signalColor,
      },
    });
  };

  render() {
    const context = {
      ...this.state,
      moveCar: this.moveCar,
      changeSignal: this.changeSignal,
    };

    const { children } = this.props;

    return (
      <CarsContext.Provider value={context}>
        {children}
      </CarsContext.Provider>
    );
  }
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
```
{: .line-numbers}

`src/App.js`

```language-jsx
import React from 'react';
import './App.css';
import Cars from './Cars';
import TrafficSignal from './TrafficSignal';

function App() {
  return (
    <div className="container">
      <Cars />
      <TrafficSignal />
    </div>
  );
}

export default App;
```
{: .line-numbers}

`src/TrafficSignal.js`

```language-jsx
import React, { Component } from 'react';
import CarsContext from './context/CarsContext';
import redSignal from './images/redSignal.jpeg';
import yellowSignal from './images/yellowSignal.jpeg';
import greenSignal from './images/greenSignal.jpeg';

const renderSignal = (signalColor) => {
  if (signalColor === 'red') return redSignal;
  if (signalColor === 'yellow') return yellowSignal;
  if (signalColor === 'green') return greenSignal;
  return null;
};

class TrafficSignal extends Component {
  render() {
    const { color } = this.context.signal;
    const { changeSignal } = this.context;
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
        <img className="signal" src={renderSignal(color)} alt="" />
      </div>
    );
  }
};

TrafficSignal.contextType = CarsContext;

export default TrafficSignal;
```
{: .line-numbers}

### Bônus

Refatore o exercício sobre o Reddit que está na branch `exercise-three` do repositório [exercise-contextAPI-refactoring](https://github.com/tryber/exercise-contextAPI-refactoring/tree/master) {: .external-link target="_blank" rel="noreferrer noopener" }. Mofique a aplicação para utilizar Context API para gerenciar o estado no lugar de Redux.

`src/context/RedditContext.js`

```language-jsx
import { createContext } from 'react';

const RedditContext = createContext();

export default RedditContext;
```
{: .line-numbers}

`src/context/Provider.js`

```language-jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RedditContext from './RedditContext';
import { getPostsBySubreddit } from '../services/redditAPI';

const { Provider, Consumer } = RedditContext;

class RedditProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postsBySubreddit: {
        frontend: {},
        reactjs: {},
      },
      selectedSubreddit: 'reactjs',
      shouldRefreshSubreddit: false,
      isFetching: false,
    };

    this.fetchPosts = this.fetchPosts.bind(this);
    this.shouldFetchPosts = this.shouldFetchPosts.bind(this);
    this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.handleSubredditChange = this.handleSubredditChange.bind(this);
    this.handleRefreshSubreddit = this.handleRefreshSubreddit.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { state } = this;
    const { shouldRefreshSubreddit } = state;
    const selectedSubredditChanged = prevState.selectedSubreddit !== state.selectedSubreddit;

    if (selectedSubredditChanged || shouldRefreshSubreddit) {
      this.fetchPosts();
    }
  }

  fetchPosts() {
    if (!this.shouldFetchPosts()) return;

    this.setState({
      shouldRefreshSubreddit: false,
      isFetching: true,
    });

    const { selectedSubreddit } = this.state;
    getPostsBySubreddit(selectedSubreddit)
      .then(this.handleFetchSuccess, this.handleFetchError);
  }

  shouldFetchPosts() {
    const {
      selectedSubreddit,
      postsBySubreddit,
      shouldRefreshSubreddit,
      isFetching,
    } = this.state;
    const posts = postsBySubreddit[selectedSubreddit];

    if (!posts.items) return true;
    if (isFetching) return false;
    return shouldRefreshSubreddit;
  }

  handleFetchSuccess(json) {
    const lastUpdated = Date.now();
    const items = json.data.children.map((child) => child.data);

    this.setState((state) => {
      const newState = {
        ...state,
        shouldRefreshSubreddit: false,
        isFetching: false,
      };

      newState.postsBySubreddit[state.selectedSubreddit] = {
        items,
        lastUpdated,
      };

      return newState;
    });
  }

  handleFetchError(error) {
    this.setState((state) => {
      const newState = {
        ...state,
        shouldRefreshSubreddit: false,
        isFetching: false,
      };

      newState.postsBySubreddit[state.selectedSubreddit] = {
        error: error.message,
        items: [],
      };

      return newState;
    });
  }

  handleSubredditChange(selectedSubreddit) {
    this.setState({ selectedSubreddit });
  }

  handleRefreshSubreddit() {
    this.setState({ shouldRefreshSubreddit: true });
  }

  render() {
    const { children } = this.props;
    const { selectedSubreddit, postsBySubreddit } = this.state;
    const context = {
      ...this.state,
      selectSubreddit: this.handleSubredditChange,
      fetchPosts: this.fetchPosts,
      refreshSubreddit: this.handleRefreshSubreddit,
      availableSubreddits: Object.keys(postsBySubreddit),
      posts: postsBySubreddit[selectedSubreddit].items,
    };

    return (
      <Provider value={context}>
        {children}
      </Provider>
    );
  }
}

RedditProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RedditProvider as Provider, Consumer };
```
{: .line-numbers}

`src/index.js`

```language-jsx
import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { Provider } from './context/Provider';

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
// src/App.js

import React, { Component } from 'react';
import Posts from './components/Posts';
import Selector from './components/Selector';
import RedditContext from './context/RedditContext';

class App extends Component {
  componentDidMount() {
    const { fetchPosts } = this.context;
    fetchPosts();
  }

  renderLastUpdatedAt() {
    const { selectedSubreddit, postsBySubreddit } = this.context;
    const { lastUpdated } = postsBySubreddit[selectedSubreddit];

    if (!lastUpdated) return null;

    return (
      <span>
        {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}
      </span>
    );
  }

  renderRefreshButton() {
    const { isFetching, refreshSubreddit } = this.context;

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
  }

  render() {
    const { selectedSubreddit, postsBySubreddit, isFetching } = this.context;
    const { items: posts = [] } = postsBySubreddit[selectedSubreddit];
    const isEmpty = posts.length === 0;

    return (
      <div>
        <Selector />
        <div>
          {this.renderLastUpdatedAt()}
          {this.renderRefreshButton()}
        </div>
        {isFetching && <h2>Loading...</h2>}
        {!isFetching && isEmpty && <h2>Empty.</h2>}
        {!isFetching && !isEmpty && <Posts />}
      </div>
    );
  }
}

App.contextType = RedditContext;

export default App;
```
{: .line-numbers}

`src/components/Selector.js`

```language-jsx
import React from 'react';

import { Consumer } from '../context/Provider';

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

const Selector = () => (
  <Consumer>
    {({ selectedSubreddit, availableSubreddits, selectSubreddit }) => (
      <span>
        <h1>{`Selected: ${selectedSubreddit}`}</h1>
        <select
          onChange={(e) => selectSubreddit(e.target.value)}
          value={selectedSubreddit}
        >
          {renderOptions(availableSubreddits)}
        </select>
      </span>
    )}
  </Consumer>
);

export default Selector;
```
{: .line-numbers}

`src/components/Posts.js`

```language-jsx
import React from 'react';
import { Consumer } from '../context/Provider'

const Posts = () => (
  <Consumer>
    {
      ({ posts }) => (
        <ul>
          {posts.map(({ id, title }) => <li key={id}>{title}</li>)}
        </ul>
      )
    }
  </Consumer>
);

export default Posts;
```
{: .line-numbers}
