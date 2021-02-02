Hora de colocar em prática tudo que você aprendeu até então, fazendo
[este exercício de fixação.](https://github.com/tryber/exercise-redux-thunk) {: .external-link target="_blank" rel="noreferrer noopener" }

1. Caso ainda não tenha feito, execute o comando npm install para instalar as dependências necessárias para a aplicação: `redux`, `react-redux`, `react-thunk`.

2. Faça as implementações necessárias na `store`.

```language-jsx
    // src/store/index.js
    import { applyMiddleware, createStore } from 'redux';
    import thunk from 'redux-thunk';
    import rootReducer from '../reducers';

    const store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    export default store;
```
{: .line-numbers}

3. No arquivo `actions/index.js`, desenvolva a action assíncrona necessária para a aplicação
rodar adequadamente. Essa action deverá fazer o uso de outras duas da actions:
    1. Da `requestAPI`: para informar ao usuário que a informação solicitada está carregando.
    2. Da `getPicture`: para salvar no estado global da aplicação a URL da imagem solicitada da API.

```language-jsx
    // src/actions/index.js
    export const REQUEST_API = 'REQUEST_API';
    export const GET_PICTURE = 'GET_PICTURE';

    export const requestAPI = () => ({ type: REQUEST_API });

    export const getPicture = (data) => ({ type: GET_PICTURE, data });

    export function fetchAPI() {
      return async (dispatch) => {
        try {
          dispatch(requestAPI());
          const response = await fetch('https://aws.random.cat/meow');
          const data = await response.json();
          dispatch(getPicture(data));
        } catch (error) {
          console.error(error);
        }
      }
    };
```
{: .line-numbers}

## A Game of Thunks... quer dizer, of Thrones!

Vamos fazer uma pequena aplicação que nos permitirá buscar informações sobre os personagens da famosa série de livros "As Crônicas de Gelo e Fogo", que gerou a famosa série _Game of Thrones_.

No repositório linkado na página de conteúdo, você encontrará alguns componentes React prontos. Além do próprio App, você terá o componente `SearchForm` - que se trata de um componente de classe que armazena o valor de `inputText` na medida que se digita algo no campo de busca e, quando se clica no botão da página, leva o texto digitado como valor de `characterSearched`.

1- Execute o comando `npm install` e instale os pacotes `redux`, `react-redux` e `redux-thunk`. Crie o `thunk` que fará a requisição para a API e as `actions` referentes ao retorno com sucesso ou falha na dita requisição (não se esqueça de importar a função `charAPI.js` no seu arquivo `actions.js`).

```language-jsx
// src/actions/characterActions.js
import charAPI from '../services/charAPI';
export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR= 'SEARCH_ERROR';

export const searchBegin = (characterSearched) => (
  { type: SEARCH_BEGIN, loading: true, characterSearched }
);

export const searchSuccess = (character) => (
  { type: SEARCH_SUCCESS, loading: false, character }
);

export const searchFailure = (error) => (
  { type: SEARCH_ERROR, loading: false, error }
);

export function thunkCharacter(name) {
  return (dispatch) => {
    dispatch(searchBegin(name));
    return charAPI(name)
      .then(
        (character) => dispatch(searchSuccess(character)),
        (error) => dispatch(searchFailure(error.message)),
      );
  };
};
```
{: .line-numbers}

2- Crie o `Reducer` que tratará as `actions` criadas no passo 1 e insira-o no `combineReducers`. ***Importante:*** a API retorna uma array com um único objeto, logo você precisa acessar a posição correta do array para, em seguida, se utilizar do objeto.

```language-jsx
// src/reducers/characterReducer.js
import { SEARCH_BEGIN, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/characterActions';

const initialState = {
  isLoading: false,
  character: '',
}

function characterReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        character: action.character[0],
      }
    case SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default characterReducer;
```
{: .line-numbers}

```language-jsx
// src/reducers/index.js
import { combineReducers } from 'redux';
import characterReducer from './characterReducer';

const rootReducer = combineReducers({
  characterReducer});

export default rootReducer;
```
{: .line-numbers}

```language-jsx
// src/store/index.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
```
{: .line-numbers}

3- Conecte a `action` a ser despachada no seu componente `SearchForm` e os `states` oriundos do reducer no componente `characterInfo`, bem como prepare o componente para exibir uma mensagem em caso de erro da API.

```language-jsx
// src/components/SearchForm.js
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { thunkCharacter } from '../actions/characterActions';
import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      characterSearched: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitName = this.submitName.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputText: e.target.value,
      characterSearched: '',
    })
  }

  submitName(e) {
    e.preventDefault();
    const { inputText } = this.state;
    const { importedThunk } = this.props;
    this.setState({
      inputText: '',
      characterSearched: inputText,
    })
    importedThunk(inputText);
  }

  render() {
    const { inputText } = this.state;
    return (
      <div>
        <form onSubmit={this.submitName}>
          <h1>Type a character below:</h1>
          <input onChange={this.handleChange} 
          placeholder="Enter Character"
          value={inputText}
          />
          <div className="buttonSection">
            <button className="submitButton" type="submit" >Search!</button>
          </div>
        </form>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  importedThunk: (name) => dispatch(thunkCharacter(name))
});

export default connect(null, mapDispatchToProps)(SearchForm);

SearchForm.propTypes = {
  importedThunk: propTypes.func.isRequired,
};
```
{: .line-numbers}

```language-jsx
// src/components/CharacterInfo.js
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class CharacterInfo extends React.Component {
  render() {
    //faça a desestruturação das props aqui
    const { loading, character, error } = this.props;
    if (!loading && character) {
      return (
        <ul>
          <li>Name: {character.name}</li>
          <li>Gender: {character.gender}</li>
          <li>Aliases: {character.aliases.map((alias, index) => <p key={`${alias}-${index}`}>{alias}</p>)}</li>
          <li>Books: {character.books.map((book, index) => <p key={`${book}-${index}`}>{book}</p>)}</li>
        </ul>
      )
    }
    if (error) { return <div>{error}</div>; }
    if (loading) { return <div>Loading...</div>; }
    return <div>Type a character name and click to search!</div>;
  }
};

//mapeie o estado global para a propriedade da sua aplicação
const mapStateToProps = ({ characterReducer: { loading, character, error } }) => ({ loading, character, error });

// conecte este componente ao redux
export default connect(mapStateToProps)(CharacterInfo);

CharacterInfo.propTypes = {
  loading: propTypes.bool.isRequired,
  character: propTypes.arrayOf(propTypes.object),
  error: propTypes.string,
};

CharacterInfo.defaultProps = {
  character: null,
  error: null,
};
```
{: .line-numbers}

## Rodando os exercícios localmente

Para executar as aplicações localmente basta seguir os seguintes passos:

1. Crie uma aplicação `create-react-app`:

```language-bash
npx create-react-app reddit
```

2. Instale `prop-types`, `react-redux`, `redux`, `redux-logger`, `redux-thunk` como dependências:

```language-bash
npm install prop-types react-redux redux redux-logger redux-thunk
```

3. Copie os arquivos referentes ao exercício

4. Execute a aplicação:

```language-bash
npm start
```

## Enunciado do exercício

Conhece o [Reddit](https://reddit.com/) {: .external-link target="_blank" rel="noreferrer noopener" }? É uma comunidade na qual pessoas conseguem criar grupos de discussão acerca de algum assunto. Tal grupo é chamado de `subreddit`. Para cada `subreddit` pessoas podem fazer postagens (`posts`).

Como exercício, você vai fazer uma aplicação que permite a quem usá-la ver `posts` referentes a `2` `subreddits`:

1. `reactjs`

2. `frontend`

Sua aplicação deve permitir a quem usá-la poder *escolher* de qual `subreddit` se deseja ver as postagens. No momento que selecionar o `subreddit`, uma requisição precisa ser feita no `reddit` para buscar os `posts` referentes ao `subreddit` escolhido. Para cada postagem você precisa mostrar **pelo menos** o título do `post`.

Além disso, sua aplicação deve permitir a quem usá-la a possibilidade de **atualizar** a lista de postagens referentes ao `subreddit` escolhido.

É **obrigatório** que você gerencie o estado de sua aplicação com ***Redux***, guardando os `subreddits`, assim como os `posts` de cada `subreddit`, no `store`. Você precisa fazer uso do `redux-thunk` para permitir criar `actions` assíncronas.

Pontos importantes:

1. Para buscar os `posts` referentes a um `subreddit`, você pode fazer uma requisição `GET` para `https://www.reddit.com/r/<subreddit>.json`. Ou seja, se você precisar buscar posts do `subreddit` `reactjs`, você faria uma chamada para `https://www.reddit.com/r/reactjs.json`.

  * No `json` retornado você encontra os dados referentes aos `posts` dentro da propriedade `data.children`. Para cada post dentro de `data.children` você encontra seu título correspondente na propriedade `data.title`.

2. Antes de começar a sair implementando, **pare e pense** sobre **como** desenhar o estado da sua aplicação. O que você precisa guardar no estado? Como você vai **estruturar** e **organizar** seus dados? Quais `actions` você precisa ter para **modelar** os eventos que ocorrerão na sua aplicação (fazer uma requisição, obter sua resposta, atualizar a lista, etc...)? Como você vai organizar seus `reducers` (lembrando que **NUNCA** deve-se alterar o estado, e sim **criar** um [novo](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions) {: .external-link target="_blank" rel="noreferrer noopener" })?

**Bônus**

1. Como você está fazendo uma requisição de um recurso externo, o que acontece se a requisição de postagens referentes a um `subreddit` falhar? Adicione na sua aplicação tratamento de erro para esses casos, salvando no estado da sua aplicação a mensagem de erro para o `subreddit` correspondente. Dica: procure e **investigue** no *Google* como fazer tratamento de erro de requisição no contexto de ***Redux***.

2. Como forma de ter um melhor diagnóstico sobre o fluxo de dados em uma aplicação ***Redux***, instale o middleware [`redux-logger`](https://github.com/LogRocket/redux-logger) {: .external-link target="_blank" rel="noreferrer noopener" } e o integre na sua aplicação.

3. Instale a extensão do *Chrome* [`redux-dev-tools`](https://github.com/zalmoxisus/redux-devtools-extension) {: .external-link target="_blank" rel="noreferrer noopener" } e a integre na sua aplicação. Com isso, você tem um ambiente completo para poder analisar e depurar sua aplicação. 🚀

É mostrada em sequência uma sugestão de implementação da aplicação.

<%= figure(%{src: "/front-end/redux/react-with-redux-part-2/solutions.gif", caption: "Exemplo dos exercícios feitos", class: "rounded mx-auto d-block", width: "600px", height: "auto"}) %>

```language-jsx
// src/actions/index.js

import { getPostsBySubreddit } from '../services/redditAPI';

export const REFRESH_SUBREDDIT = 'REFRESH_SUBREDDIT';
export const RECEIVE_POSTS_FAILURE = 'RECEIVE_POSTS_FAILURE';
export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export const selectSubreddit = (subreddit) => ({
  type: SELECT_SUBREDDIT,
  subreddit});

export const refreshSubreddit = (subreddit) => ({
  type: REFRESH_SUBREDDIT,
  subreddit});

export const requestPosts = (subreddit) => ({
  type: REQUEST_POSTS,
  subreddit});

const receivePostsSuccess = (subreddit, json) => ({
  type: RECEIVE_POSTS_SUCCESS,
  posts: json.data.children.map((child) => child.data),
  receivedAt: Date.now(),
  subreddit});

const receivePostsFailure = (subreddit, error) => ({
  type: RECEIVE_POSTS_FAILURE,
  error,
  subreddit});

function fetchPosts(subreddit) {
  return (dispatch) => {
    dispatch(requestPosts(subreddit));

    return getPostsBySubreddit(subreddit)
      .then(
        (posts) => dispatch(receivePostsSuccess(subreddit, posts)),
        (error) => dispatch(receivePostsFailure(subreddit, error.message)),
      );
  };
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];

  if (!posts.items) return true;
  if (posts.isFetching) return false;
  return posts.shouldRefreshSubreddit;
};

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => (
    shouldFetchPosts(getState(), subreddit) && dispatch(fetchPosts(subreddit))
  );
}
```
{: .line-numbers}

```language-jsx
// src/components/Posts.js

import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts }) => (
  <ul>
    {posts.map(({ id, title }) => <li key={id}>{title}</li>)}
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default Posts;
```
{: .line-numbers}

```language-jsx
// src/components/Selector.js

import React from 'react';
import PropTypes from 'prop-types';

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

const Selector = ({ value, onChange, options }) => (
  <span>
    <h1>{`Selected: ${value}`}</h1>
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {renderOptions(options)}
    </select>
  </span>
);

Selector.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
};

export default Selector;
```
{: .line-numbers}

```language-jsx
// src/reducers/index.js

import { combineReducers } from 'redux';
import postsBySubreddit from './postsBySubreddit';
import selectedSubreddit from './selectedSubreddit';

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit});

export default rootReducer;
```
{: .line-numbers}

```language-jsx
// src/reducers/postsBySubreddit.js

import {
  REFRESH_SUBREDDIT,
  RECEIVE_POSTS_FAILURE,
  RECEIVE_POSTS_SUCCESS,
  REQUEST_POSTS,
} from '../actions';

const INITIAL_POSTS_STATE = {
  shouldRefreshSubreddit: false,
  isFetching: false,
};

const INITIAL_POSTS_BY_SUBREDDIT_STATE = {
  frontend: { ...INITIAL_POSTS_STATE },
  reactjs: { ...INITIAL_POSTS_STATE },
};

const posts = (state = INITIAL_POSTS_STATE, action) => {
  switch (action.type) {
    case REFRESH_SUBREDDIT:
      return {
        ...state,
        shouldRefreshSubreddit: true,
      };
    case REQUEST_POSTS:
      return {
        ...state,
        shouldRefreshSubreddit: false,
        isFetching: true,
      };
    case RECEIVE_POSTS_SUCCESS:
      return {
        ...state,
        shouldRefreshSubreddit: false,
        items: action.posts,
        isFetching: false,
        lastUpdated: action.receivedAt,
      };
    case RECEIVE_POSTS_FAILURE:
      return {
        ...state,
        shouldRefreshSubreddit: false,
        error: action.error,
        items: [],
        isFetching: false,
      };
    default:
      return state;
  }
};

const postsBySubreddit = (state = INITIAL_POSTS_BY_SUBREDDIT_STATE, action) => {
  switch (action.type) {
    case REFRESH_SUBREDDIT:
    case RECEIVE_POSTS_SUCCESS:
    case RECEIVE_POSTS_FAILURE:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action),
      };
    default:
      return state;
  }
};

export default postsBySubreddit;
```
{: .line-numbers}

```language-jsx
// src/reducers/selectedSubreddit.js

import {
  SELECT_SUBREDDIT,
} from '../actions';

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

export default selectedSubreddit;
```
{: .line-numbers}

```language-jsx
// src/services/redditAPI.js

const SUBREDDIT_BASE_API = 'https://www.reddit.com';

export const getPostsBySubreddit = (subreddit) => (
  fetch(`${SUBREDDIT_BASE_API}/r/${subreddit}.json`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
```
{: .line-numbers}

```language-jsx
// src/store/index.js

import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger)),
);

export default store;
```
{: .line-numbers}

```language-jsx
// src/App.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectSubreddit, fetchPostsIfNeeded, refreshSubreddit } from './actions';
import Posts from './components/Posts';
import Selector from './components/Selector';

class App extends Component {
  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (prevProps.selectedSubreddit !== props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  selectSubreddit(nextSubreddit) {
    const { dispatch } = this.props;
    dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick(event) {
    event.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(refreshSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  renderLastUpdatedAt() {
    const { lastUpdated } = this.props;

    return (
      <span>
        {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}
      </span>
    );
  }

  renderRefreshButton() {
    const { isFetching } = this.props;

    return (
      <button
        type="button"
        onClick={(event) => this.handleRefreshClick(event)}
        disabled={isFetching}
      >
        Refresh
      </button>
    );
  }

  render() {
    const {
      availableSubreddits,
      selectedSubreddit,
      posts = [],
      isFetching,
      lastUpdated,
    } = this.props;

    const isEmpty = posts.length === 0;

    return (
      <div>
        <Selector
          value={selectedSubreddit}
          onChange={(nextSubreddit) => this.selectSubreddit(nextSubreddit)}
          options={availableSubreddits}
        />
        <div>
          {lastUpdated && this.renderLastUpdatedAt()}
          {this.renderRefreshButton()}
        </div>
        {isFetching && <h2>Loading...</h2>}
        {!isFetching && isEmpty && <h2>Empty.</h2>}
        {!isFetching && !isEmpty && <Posts posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsBySubreddit[selectedSubreddit];

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    availableSubreddits: Object.keys(postsBySubreddit),
  };
};

App.propTypes = {
  availableSubreddits: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  selectedSubreddit: PropTypes.string.isRequired,
};

App.defaultProps = {
  lastUpdated: null,
  posts: [],
};

export default connect(mapStateToProps)(App);
```
{: .line-numbers}

```language-jsx
// src/index.js

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```
{: .line-numbers}
