## O que vamos aprender?

Vamos recapitular o que você aprendeu até então:

* Você aprendeu a fazer uso de ***Redux*** para prover gerenciamento de estado à sua aplicação;

* Você viu como o fluxo de dados funciona em uma aplicação que usa ***Redux*** se baseia em 3 entidades fundamentais:

   1. `store`, que é a **única fonte da verdade referente ao estado compartilhado da sua aplicação**. Ou seja, é na `store` e somente lá que se encontram os dados compartilhados da sua aplicação.

   2. `actions`, que são nada mais que simples objetos ***JavaScript*** que descrevem um evento que acabou de acontecer. É **obrigatório** que haja **pelo menos** a propriedade `type` no objeto, para que seja possível identificar **qual** evento ocorreu. Para uma `action` é feito um envio (`dispatch`) através `store` para um `reducer`. Para que uma `action` seja reutilizada ao longo de sua aplicação, em ***Redux*** existe o conceito `action creators` que, como o próprio nome diz, nada mais são do que funções que criam uma `action`. Uma boa prática é inserir todas as suas `actions` dentro de uma única pasta, separada de demais arquivos.

   3. `reducer`, que é uma função **pura:** dada a mesma entrada, retorna sempre a mesma saída e não tem efeitos colaterais, ou seja, não altera nada fora dela mesma. Ele tem como responsabilidade gerenciar o estado da `store` de acordo com a `action` recebida. Ou seja, ele provê um **novo** estado para a `store`, com as devidas alterações relacionadas a `action` que lhe foi entregue. É possível combinar vários `reducers` `A`, `B`, ..., `N` em um `reducer` `X` só, de forma que somente `X` seja enviado para criar a `store`. Assim como as `actions`, é uma boa prática inserir todos os seus `reducers` em uma pasta própria.

* Por fim, você viu como integrar ***Redux*** com ***React***, haja visto que ***Redux*** **não** é exclusivo para aplicações ***React***. Tal integração é feita via o pacote **react-redux**, permitindo que componentes ***React*** consigam acessar a `store` e enviar `actions` para ela.

Foquemos agora no fluxo de dados de uma aplicação ***Redux***: "out of the box", o ***Redux*** suporta somente o fluxo **síncrono** de dados, e isso consegue ser percebido ao olhar para `actions`: uma `action` é um objeto ***JavaScript*** que descreve algum evento que **já aconteceu** e esse objeto é enviado para a `store` para que seu estado seja atualizado.

Mas, e se fosse preciso ter uma `action` assíncrona, que precisa fazer uma requisição para uma ***API***, de forma que os devidos dados necessários estejam presentes para gerar a `action`? De antemão não teríamos tais dados para formar essa `action`, esse objeto, haja visto que é preciso esperar pela requisição ser concluída. Logo, como se cria `actions` assíncronas? É isso que você aprenderá na aula de hoje.

<%= vimeo "472414484" %>

---

### Você será capaz de:

* Criar `actions` assíncronas na sua aplicação ***React*** que faz uso de ***Redux***.

---

## Por que isso é importante?

Na sua carreira de desenvolvimento operações assíncronas serão extremamente recorrentes. Agora que você está usando ***Redux***, vai ser comum você precisar salvar na `store` algum dado que veio de forma assíncrona (um _endpoint_ que retorna informações do usuário logado, para que esteja disponível para sua aplicação, por exemplo).

Tal necessidade, por si só, **não** é sanada pelo pacote ***Redux***, haja visto que ele suporta somente fluxo **síncrono** de dados. Isso faz com que seja necessário fazer uso de outros pacotes, entre eles o mais popular: `redux-thunk`. Tal pacote provê uma interface simples para dar suporte a `action creators` que geram `actions` assíncronas, e é ele que você aprenderá para tornar sua aplicação mais completa.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### redux-thunk

A solução padrão recomendada na documentação do ***Redux*** para se ter `actions` assíncronas é via uso do pacote [`redux-thunk.`](https://github.com/reduxjs/redux-thunk) {: .external-link target="_blank" rel="noreferrer noopener" } Fun-fact: a lógica desse pacote se encontra em um [arquivo](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js) {: .external-link target="_blank" rel="noreferrer noopener" } `.js` com `14` linhas de código, e é usado por aproximadamente `480.000` repositórios. Olha o que `14` linhas de código conseguiram prover para a comunidade. Que sirva de inspiração para todos nós! 🙂

<%= vimeo "472414975" %>

Vamos reforçar, a seguir, os conceitos pricipais do **redux-thunk**:

1. `redux-thunk` é um **middleware** que, no contexto de uma aplicação ***Redux***, nada mais é que um **interceptador** que captura **todas** as `actions` enviadas pela `store` **antes** delas chegarem a um `reducer`. Ou seja, fazendo analogia com pedido online de produto, se a `action` fosse o produto que você comprou em algum site, e o `reducer` fosse você, o **middleware** seria o correio, que intercepta o produto antes de chegar até você para garantir que ele chegue como se deve. Depois, se quiser ler mais sobre **middlewares**, acesse o _Redux - Middleware_ na sessão de recursos adicionais.


2. Para fazer uso do `redux-thunk`, é preciso instalá-lo via `npm`:

```language-bash
npm install redux-thunk
```

3. Para habilitar o uso dele na sua aplicação, é preciso fazer uso da função `applyMiddleware()` do ***Redux***:

```language-js
// arquivo onde a redux store é criada
import { createStore, applyMiddleWare } from 'redux';
import thunk from 'redux-thunk';
import reducer from '/path/to/your/root/reducer';

...

const store = createStore(reducer, applyMiddleware(thunk));
...
```

4. `thunk` nada mais é do que uma função que encapsula uma operação para que ela seja feita posteriormente. Em termos práticos, isso significa que você está definindo uma função que vai ser **retornada** por uma outra função com mais lógica adicionada a ela. Se tiver curiosidade sobre o que é um "thunk", de forma geral, leia _What the heck is a 'thunk'?, por Dave Ceddia_ na sessão de recursos adicionais.

5. Com `redux-thunk`, você consegue definir uma `action creator` **que retorna uma função** (que será invocada pelo `redux-thunk`) **em vez de retornar somente um objeto (o que você tem feito até a aula de hoje)**. Na função retornada você pode realizar uma operação assíncrona, como fazer chamadas de **API** e, uma vez finalizada a operação, você consegue enviar uma `action` com os dados obtidos por ela, da mesma forma que tem feito até então. Note a conveniência que isso traz: toda essa lógica de lidar com operações assíncronas está encapsulada na sua respectiva `action` assíncrona, deixando transparente para quem for fazer uso dela, que para o seu caso seriam os componentes ***React***! Sob a perspectiva do componente, ele estaria consumindo uma `action` como uma outra qualquer!

6. Para ser devidamente usada pelo `redux-thunk` a `action creator` precisa retornar uma função, que pode fazer uso de `dispatch` e `getState` da `store` como parâmetros. Segue um exemplo de uma `action creator` definida em conformidade com tal contrato:

```language-javascript
export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';

// action creator que retorna um objeto, que você tem feito até então
const requestMovies = () => ({
  type: REQUEST_MOVIES});

// outro action creator que retorna um objeto, que você tem feito até então
const receiveMovies = (movies) => ({
  type: RECEIVE_MOVIES,
  movies});

// action creator que retorna uma função, possível por conta do pacote redux-thunk
export function fetchMovies() {
  return (dispatch) => { // thunk declarado
    dispatch(requestMovies());
    return fetch('alguma-api-qualquer.com')
      .then((response) => response.json())
      .then((movies) => dispatch(receiveMovies(movies)));
  };
}

// componente onde você usaria a action creator fetchMovies assíncrona como uma outra qualquer
...
class MyConectedAppToRedux extends Component {
  ...
  componentDidMount() {
    const { dispatch, fetchMovies } = this.props;
    dispatch(fetchMovies()); // enviando a action fetchMovies
  }
  ...
}
...
```

  **OBS**: é possível passar também um terceiro argumento para a função retornada. Para ver como fazer isso, leia esta [seção](https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument) {: .external-link target="_blank" rel="noreferrer noopener" } do repositório do `redux-thunk`.

Em síntese, um `thunk` nada mais é do que uma `action` que, quando despachada, faz uma requisição assícrona e aguarda o resultado da requisição, podendo disparar uma ação em caso de sucesso (tratando as informações recebidas) ou disparando outra ação em caso de falha para buscar a informação.

### Exemplos guiados

<%= vimeo "472410450" %>

Agora que já temos uma ideia de como o `thunk` funciona, vamos ver um exemplo que mostra o que ele faz na prática. Para isso, vamos montar um app. Primeiro, vamos começar um novo app em React. Crie um diretório e use o comando:

```language-bash
npx create-react-app doguinhos-app
```

Depois de terminar, vamos acessar o diretório do nosso novo app e instalar as dependências necessárias:

```language-bash
cd doguinhos-app
npm i redux react-redux
```

Dê uma olhada no código da aplicação e gaste um tempo entendendo o que está sendo feito aqui. Exceto a parte do thunk (que não está completa), você tem conhecimento sobre tudo.

Vamos começar pelo arquivo `index.js`, onde conectamos o Provider aos componentes do nosso App.

```language-jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);
```
{: .line-numbers}

Também temos que verificar o arquivo do componente. Como esse nosso App vai apenas fazer uma requisição externa (um **fetch**), só teremos um componente, o `App.js`.
Nós estamos utilizando o `mapStateToProps` para trazer o resultado do `fetch` e o valor da variável `isFetching`, que está na store, e o `mapDispatchToProps` para que se envie a action ao clicar no botão.

```language-jsx
// src/App.js
import React from 'react';
import { connect } from 'react-redux';
import { fetchDog } from './store';

function App({ isFetching, src, fetchDog }) {
  return (
    isFetching ? <p>Loading</p>
      : (
        <div style={{ width: 500 }}>
          <button
            style={{ display: 'block' }}
            onClick={fetchDog}
            type="button"
          >
            Novo Doguinho
          </button>
          <img style={{ width: '100%' }} src={src} alt="dog" />
        </div>
      )
  );
}

const mapStateToProps = (state) => ({
  src: state.imagePath,
  isFetching: state.isFetching});

const mapDispatchToProps = (dispatch) => ({
  fetchDog: () => dispatch(fetchDog())});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

Por último, vamos copiar o arquivo que contém nossa store, action e reducer. Para fins didáticos estamos com tudo no mesmo arquivo, mas as boas práticas pedem que deixemos cada parte em um arquivo separado, tanto para manter o código mais fácil de ser lido, quanto para fazer da manutenção menos complexa.

```language-jsx
// src/store/index.js
import { createStore } from 'redux';

const GET_IMAGE = 'GET_IMAGE';
const REQUEST_IMAGE = 'REQUEST_IMAGE';
const FAILED_REQUEST = 'FAILED_REQUEST';

function getImage(json) {
  return { type: GET_IMAGE, payload: json.message };
}

function requestDog() {
  return { type: REQUEST_IMAGE };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchDog() {
  return (dispatch) => {
    dispatch(requestDog());
    return fetch('https://dog.ceo/api/breeds/image/random')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getImage(json)),
          (error) => dispatch(failedRequest(error)),
        ));
  };
}

const initialState = {
  isFetching: false,
  imagePath: '',
  error: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_IMAGE:
      return { ...state, isFetching: true };
    case GET_IMAGE:
      return { ...state, imagePath: action.payload, isFetching: false };
    case FAILED_REQUEST:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
```

Agora, rode o `npm start` e depois disso clique no botão **Novo Doguinho**. Você irá se deparar com o seguinte erro:

<%= figure(%{src: "/front-end/redux/react-with-redux-part-2/erro-thunk.png", caption: "Erro - Falta do redux-thunk", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Esse erro, _Actions must be plain objects_ mostra algo que já nos foi ensinado anteriormente: actions precisam ser objetos puros, ou seja, não podem ser funções. Para usar actions que são funções nós precisamos de um middleware especial, e é aí onde se encaixa o `thunk` na arquitetura **Redux**.

Então podemos entender que o que aquele código de 14 linhas faz: ele nos permite usar funções (incluindo funções assíncronas) como actions.

Para vermos o app rodando corretamente, vamos instalar o pacote e alterar nosso código para utilizar o `thunk` corretamente.

```language-bash
npm i redux-thunk
```

Após a instalação, devemos inserir o `thunk` em nossa aplicação. O código abaixo está com as linhas não-alteradas comentadas, perceba que para utilizar o thunk é preciso acrescentar poucas linhas.

```language-javascript
// src/store/index.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// const GET_IMAGE = 'GET_IMAGE';
// const REQUEST_IMAGE = 'REQUEST_IMAGE';
// const FAILED_REQUEST = 'FAILED_REQUEST';

// function getImage(json) {
//   return { type: GET_IMAGE, payload: json.message };
// }

// function requestDog() {
//   return { type: REQUEST_IMAGE };
// }

// function failedRequest(error) {
//   return { type: FAILED_REQUEST, payload: error };
// }

// export function fetchDog() {
//   return (dispatch) => {
//     dispatch(requestDog());
//     return fetch('https://dog.ceo/api/breeds/image/random')
//       .then((r) => r.json()
//         .then(
//           (json) => dispatch(getImage(json)),
//           (error) => dispatch(failedRequest(error)),
//         ));
//   };
// }

// const initialState = {
//   isFetching: false,
//   imagePath: '',
//   error: '',
// };

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case REQUEST_IMAGE:
//       return { ...state, isFetching: true };
//     case GET_IMAGE:
//       return { ...state, imagePath: action.payload, isFetching: false };
//     case FAILED_REQUEST:
//       return { ...state, error: action.payload, isFetching: false };
//     default:
//       return state;
//   }
// }

const store = createStore(reducer, applyMiddleware(thunk));

// export default store;
```

Não se preocupe, pois esse conteúdo exige prática! Caso ainda tenha dúvidas sobre a necessidade ou o funcionamento do `thunk`, a aula ao vivo e o Slack estão à disposição para esclarece-las.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

1. Hora de colocar em prática tudo que você aprendeu até então, fazendo [o exercício de fixação deste repositório.](https://github.com/tryber/exercise-redux-thunk) {: .external-link target="_blank" rel="noreferrer noopener" }

2. Vamos fazer uma pequena aplicação que nos permitirá buscar informações sobre os personagens da famosa série de livros "As Crônicas de Gelo e Fogo", que gerou a famosa série _Game of Thrones_.

No repositório linkado abaixo você encontrará alguns componentes React prontos e maiores informações a respeito. Vamos lá, pois _O inverno está chegando_.

[Link do repositório](https://github.com/tryber/exercise-game-of-thrones-characters)

#### Bônus

Como Redux exige muita prática, eis aqui mais um exercício! Desta vez, um mini-projeto para se desenvolver e guardar no portfólio!

Conhece o [Reddit](https://reddit.com/) {: .external-link target="_blank" rel="noreferrer noopener" }? É uma comunidade na qual pessoas conseguem criar grupos de discussão acerca de algum assunto. Tal grupo é chamado de `subreddit`. Para cada `subreddit` pessoas podem fazer postagens (`posts`). Como exercício, você vai fazer uma aplicação que permite a quem usá-la ver `posts` referentes a `2` `subreddits`:

1. `reactjs`

2. `frontend`

Sua aplicação deve permitir a quem usá-la poder *escolher* de qual `subreddit` se deseja ver as postagens. No momento que selecionar o `subreddit`, uma requisição precisa ser feita no `reddit` para buscar os `posts` referentes ao `subreddit` escolhido. Para cada postagem você precisa mostrar **pelo menos** o título do `post`. Além disso, sua aplicação deve permitir a quem usá-la a possibilidade de **atualizar** a lista de postagens referentes ao `subreddit` escolhido.

É **obrigatório** que você gerencie o estado de sua aplicação com ***Redux***, guardando os `subreddits`, assim como os `posts` de cada `subreddit`, no `store`. Você precisa fazer uso do `redux-thunk` para permitir criar `actions` assíncronas.

**Pontos importantes:**

1. Para buscar os `posts` referentes a um `subreddit`, você pode fazer uma requisição `GET` para `https://www.reddit.com/r/<subreddit>.json`. Ou seja, se você precisar buscar posts do `subreddit` `reactjs`, você faria uma chamada para `https://www.reddit.com/r/reactjs.json`.

  * No `json` retornado você encontra os dados referentes aos `posts` dentro da propriedade `data.children`. Para cada post dentro de `data.children` você encontra seu título correspondente na propriedade `data.title`.

2. Antes de começar a sair implementando, **pare e pense** sobre **como** desenhar o estado da sua aplicação. O que você precisa guardar no estado? Como você vai **estruturar** e **organizar** seus dados? Quais `actions` você precisa ter para **modelar** os eventos que ocorrerão na sua aplicação (fazer uma requisição, obter sua resposta, atualizar a lista, etc...)? Como você vai organizar seus `reducers` (lembrando que **NUNCA** deve-se alterar o estado, e sim **criar** um [novo](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions) {: .external-link target="_blank" rel="noreferrer noopener" })?

3. Como você está fazendo uma requisição de um recurso externo, o que acontece se a requisição de postagens referentes a um `subreddit` falhar? Adicione na sua aplicação tratamento de erro para esses casos, salvando no estado da sua aplicação a mensagem de erro para o `subreddit` correspondente. Dica: procure e **investigue** no *Google* como fazer tratamento de erro de requisição no contexto de ***Redux***.

4. Como forma de ter um melhor diagnóstico sobre o fluxo de dados em uma aplicação ***Redux***, instale o middleware [`redux-logger`](https://github.com/LogRocket/redux-logger) {: .external-link target="_blank" rel="noreferrer noopener" } e o integre na sua aplicação.

5. Instale a extensão do *Chrome* [`redux-dev-tools`](https://github.com/zalmoxisus/redux-devtools-extension) {: .external-link target="_blank" rel="noreferrer noopener" } e a integre na sua aplicação. Com isso, você tem um ambiente completo para poder analisar e depurar sua aplicação. 🚀

É mostrada em sequência uma sugestão de implementação da aplicação.

<%= figure(%{src: "/front-end/redux/react-with-redux-part-2/solutions.gif", caption: "Exemplo dos exercícios feitos", class: "rounded mx-auto d-block", width: "600px", height: "auto"}) %>

---

## Recursos adicionais (opcional)

* [Redux - Middleware](https://redux.js.org/advanced/middleware) {: .external-link target="_blank" rel="noreferrer noopener" }

* [What the heck is a 'thunk'?, por Dave Ceddia](https://daveceddia.com/what-is-a-thunk) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux Thunk, por Davi Felipe](http://davifelipe.com.br/redux-thunk) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Redux, por Davi Felipe, com o código usado no artigo anterior](http://davifelipe.com.br/react-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux Thunk - Why do I need this?](https://github.com/reduxjs/redux-thunk#why-do-i-need-this) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux - Async Actions](https://redux.js.org/advanced/async-actions) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux - Async Flow](https://redux.js.org/advanced/async-flow) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux - Usage with React Router](https://redux.js.org/advanced/usage-with-react-router) {: .external-link target="_blank" rel="noreferrer noopener" }

* [GitHub - Awesome Redux](https://github.com/xgrommx/awesome-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux - API Reference](https://redux.js.org/api/api-reference) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
