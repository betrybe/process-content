## O que vamos aprender?

Você vai aprender a utilizar o [**Redux**](https://redux.js.org/) {: .external-link target="_blank" rel="noreferrer noopener" } em suas aplicações [**React**](https://reactjs.org/) {: .external-link target="_blank" rel="noreferrer noopener" }.

<%= vimeo "471410989" %>

---

### Você será capaz de:

* Criar um _store_ **Redux** em aplicações **React**

* Criar _reducers_ no **Redux** em aplicações **React**

* Criar _actions_ no **Redux** em aplicações **React**

* Criar _dispatchers_ no **Redux** em aplicações **React**

* Conectar **Redux** aos componentes **React**

---

## Por que isso é importante?

**Redux** é uma ferramenta para gerenciar o estado de uma aplicação **JavaScript**.
Antes de entender o porquê de utilizar **React** com **Redux**, deve-se entender o porquê de utilizarmos uma biblioteca externa para controlar e gerenciar o estado de uma aplicação.

A maioria das bibliotecas, como **React**, **Angular** etc, possuem uma forma interna de gerenciar o estado da aplicação sem o auxílio ou necessidade de uma ferramenta externa.
Isto funciona bem para aplicações que possuem poucos componentes mas, à medida que a aplicação cresce, o gerenciamento de estados compartilhados entre componentes torna-se uma tarefa complicada e desgastante.

Em uma aplicação em que muitos dados são compartilhados entre componentes, pode não ficar muito claro onde cada dado deve ficar.
Além disso, algumas vezes pode-se criar uma implementação que não é ideal. Por exemplo: em uma aplicação onde é necessário compartilhar os dados com vários componentes filhos, necessariamente esse dado deve ficar no componente pai.
Aplicações maiores também apresentam a necessidade de compartilhar dados entre componentes que não estão na mesma árvore de componentes.
Para esse compartilhamento ser feito, esse dado terá de passar através de muitos componentes até chegar em seu componente alvo.

Com todos estes exemplos, fica claro que o gerenciamento de estado torna-se confuso à medida que a aplicação cresce.
Por isso, utilizar uma ferramenta externa para gerenciar o estado, como o **Redux**, facilitará o desenvolvimento e crescimento das aplicações.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

**Redux** é uma biblioteca que pode ser utilizada com [React](https://reactjs.org/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Angular](https://angularjs.org/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Vue](https://vuejs.org/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Ember](https://emberjs.com/) {: .external-link target="_blank" rel="noreferrer noopener" } e **JavaScript** puro, para dar só alguns exemplos.
É muito comum o uso de **Redux** com **React**, apesar de serem ferramentas **independentes**.

Quando você utiliza **Redux** com algum _UI framework_ (_User Interface Framework_), é comum usar alguma biblioteca para realizar a conexão (_binding_) entre o **Redux** e o _framework_.
No caso do **React**, a biblioteca **React Redux** é quem faz essa conexão e pode ser instalada em sua aplicação através do comando:

```language-bash
npm install react-redux
```

> React Redux é a biblioteca oficial para realizar a conexão entre **React** e **Redux**

Vamos relembrar alguns conceitos:

### Store

> É onde vamos armazenar todos os dados **compartilhados** da aplicação e é representado por um objeto _JavaScript_.
> O _State_ é armazenado no **Store** do **Redux**.

### Action

> É um objeto _JavaScript_ que representa alguma mudança/alteração que precisa acontecer no **State**.

### Reducer

> É uma função _JavaScript_ que recebe o estado atual (_current state_) e a ação corrente (_current action_) e retorna um novo estado (_new state_).
> É responsabilidade dessa função decidir o que acontecerá com o estado dada uma ação(_action_).

### Dispatch

> É uma função que envia uma ação (_action_) para processamento.

### Configurando Redux com React

Agora que relembramos todos estes conceitos, podemos criar e configurar uma aplicação React que utilizará **Redux**.

Primeiro, criamos nossa aplicação React:

```language-bash
npx create-react-app my-app
```

Depois, instalamos as dependências:

```language-bash
npm install --save redux react-redux
```

> `redux` é a biblioteca que possui a implementação do **Redux**;

> `react-redux` é a biblioteca que realiza a conexão entre o **Redux** e o **React**.

Agora, imagine que vamos implementar uma solução para salvar uma lista de itens que podem ser adicionados por quem utilizar a aplicação.
Inicialmente esta lista estará vazia.
A primeira coisa que precisamos fazer, ao implementar o **Redux** em nossa aplicação React, é criar a nossa fonte universal de estados, o **Store**.

Dessa forma, vamos criar o arquivo `src/store/index.js` com o seguinte conteúdo:

```language-jsx
import { createStore } from 'redux';

const store = createStore();

export default store;
```
{: .line-numbers}

A função `createStore` deve receber como parâmetro um `reducer`. Portanto, vamos criar um no arquivo `src/reducers/index.js`:

O `reducer`, no nosso caso, deverá ser capaz de adicionar itens a lista.

```language-jsx
const INITIAL_STATE = [];

function listReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return [...state, action.value];
    default:
      return state;
  }
}

export default listReducer;
```
{: .line-numbers}

Vamos analisar o que está acontencedo:

* Primeiro, definimos um estado inicial para nosso reducer;

* Um reducer deve receber como parâmetro um estado e uma ação;

* A ação, por convenção, deve ser um objeto e possuir a key _type_. É essa key que define como o `reducer` vai manipular o estado.

* No exemplo, como estamos criando uma lista e só queremos adicionar elementos, caso o _type_ seja igual a " ADD_ELEMENT ", estamos instruindo nosso `reducer` a guardar todo o estado anterior, utilizando _spread operator_, e a adicionar o novo elemento, que nesse caso está na key _value_ da nossa `action`. Caso o _type_ seja diferente de "ADD_ELEMENT", o `reducer` deverá cair no `default` do switch, que preserva o state.

Vamos criar agora o arquivo `src/actions/index.js`, que guardará nossas `actions`:

```language-jsx
export const addAssignment = (value) => ({ type: 'ADD_ELEMENT', value });
```
{: .line-numbers}

Como dito anterioremente, nossa `action`, por convenção, deve ser um objeto. Esse objeto pode possuir apenas a key _type_ ou mais outras keys, caso seja conveniente. Note que, no caso acima, criamos também uma key _value_, que guardará o valor recebido pela action.

Agora precisamos voltar ao nosso `store` e passar o `reducer` como parâmetro para o `createStore`:

```language-jsx
import { createStore, combineReducers } from 'redux';
import listReducer from '../reducers';

const rootReducer = combineReducers({ listReducer });

const store = createStore(rootReducer);

export default store;
```
{: .line-numbers}

Utilizamos também o método `combineReducers` que, como diz seu nome, combina `reducers`. Ele deve receber um objeto com os `reducers` criados. Sem ele, só poderíamos usar um `reducer` em nossa aplicação.

> Dica: Mesmo que tenhamos apenas um `reducer` é uma boa prática que utilizemos o `combineReducers`, pois caso nossa aplicação cresça e necessite de mais de um `reducer` não será necessário alterar sua lógica.

Quando o `combineReducers` é utilizado, o estado da nossa aplicação fica disposto em um objeto. Dentro desse objeto cada `reducer` passado apresentará uma chave cujo valor será o estado que é responsável por gerenciar. Veja como fica o estado inicial da nossa explicação:

```language-jsx
{
  listReducer: [],
}
```
{: .line-numbers}

> Dica: Para facilitar a utilização do Redux, recomendamos fortemente que você instale a extensão `Redux Devtools`. Na seção de `Recursos adicionais` você irá encontrar um link para um artigo que além de ensinar como instalar e habilitar extensão, também mostrará como utilizá-la.

Pronto! `Store`, `Reducer` e `actions` devidamente criados. Pode parecer que isso está desconexo de uma aplicação React, e até o momento realmente está. Essa é a estrutura _pura_ do Redux. Agora, vamos conectá-la ao React.

Para utilizarmos o estado compartilhado que o **Redux** provê, precisamos editar o arquivo `src/App.js` para adicionarmos toda essa configuração:

```language-jsx
import React from 'react';
// o provider é o meio pelo qual disponibilizamos o Store
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          // componentes aqui
        </Provider>
      </div>
    );
  }
}

export default App;
```
{: .line-numbers}

<%= vimeo "471405401" %>

Agora vamos implementar os componentes `List.js` e `InputsList` e conectá-los ao **Redux**.
Primeiramente vamos importar e adicionar os componentes ao componente `App`

```language-jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import List from './List';
import InputsList from './InputsList';

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <InputsList />
          <List />
        </Provider>
      </div>
    );
  }
}

export default App;
```
{: .line-numbers}

Agora vamos à implementação do componente `InputsList`

```language-jsx
import React from 'react';
import { connect } from 'react-redux';
import { addAssignment } from './actions';

class InputsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textValue: '' };
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Digite a tarefa"
          onChange={event => this.setState({ textValue: event.target.value })}
        />
        <button onClick={() => this.props.add(this.state.textValue)}>
          Adicionar tarefa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  add: e => dispatch(addAssignment(e))});

export default connect(null, mapDispatchToProps)(InputsList);
```
{: .line-numbers}

Vamos passar por cada parte do componente para explicar seu funcionamento:

* Primeiro, nós estamos definindo um estado interno do componente chamado _textValue_. Note que, apesar de estarmos usando o **Redux**, que centraliza os _states_, caso haja algum estado o qual não necessite navegar entre outros componentes, podemos declará-lo internamente.

* Estamos criando um input para o usuário digitar a tarefa que deseja adicionar. A cada mudança no valor do input, o valor é salvo no estado _textValue_.

* Um botão com a propriedade _onClick_ foi criado, passando a função `add` que está presente na `props`. Mas como isso foi parar lá? Veremos agora:

### mapDispatchToProps

A função `mapDispatchToProps` é a responsável por disparar - fazer o `dispatch` de - uma ação para o `reducer`.

Para termos acesso às funcionalidades do Redux, seja a de ler os dados ou manipulá-los, precisamos acessá-las como `props` de um componente. Por isso, como explícito no nome da função, o `mapDispatchToProps` mapeia os `dispatchs` para o `props`.

Note que no ínicio do arquivo estamos importanto a `action` _addAssignment_, criada anteriormente. No caso, estamos nomeando uma propriedade chamada `add`, que faz o `dispatch` da `action` _addAssignment_ com um parâmetro.

O **mapDispatchToProps**, assim como o **mapStateToProps**, que veremos logo a frente, podem ser criados via funções convencionais ou arrow functions. O que é indispensável é que o retorno seja um objeto, pois é assim que o Redux o espera.

Lembre-se: a única maneira de enviarmos uma `action` para um `reducer` é fazendo seu `dispatch`.

* Por último, estamos conectando o Redux ao componente. Para isso, precisamos importar o método `connect`.

### connect

O método `connect` possui a seguinte estrutura: `connect()()`. É ele quem nos da acesso ao `store` do Redux.

No primeiro parênteses, devem estar presentes os métodos nativos do Redux. Como nesse caso estamos apenas enviando dados, estamos passando apenas o `mapDispatchToProps`. O `null` presente no `connect` é necessário pois ele entende que o primeiro parâmetro deve ser uma função chamada `mapStateToProps`, que veremos logo a frente.

No segundo parênteses passamos nosso componente.

Agora vamos criar o componente `List`:

```language-jsx
import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.list.map(element => (
            <p>{element}</p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.listReducer});

export default connect(mapStateToProps)(List);
```
{: .line-numbers}

Vamos analisar o que está acontecendo:

* Estamos fazendo um `map` com os elementos presentes no array _list_ que, por sua vez, está presente no `props`. Mas como isso foi parar lá?

### mapStateToProps

A função `mapStateToProps`, auto-descritiva, mapeia as entidades armazenadas nos estados para uma `props`.

Note que as estruturas dos métodos `mapStateToProps` e `mapDispatchToProps` sempre serão as mesmas, o que irá mudar são as propriedades que vamos acessar ou actions que vamos disparar.

No nosso caso, queremos acessar os dados providos pelo `reducer` _listReducer_, portanto basta acessar o caminho do `state` com o `reducer` desejado e nomear a `prop` que o receberá (no caso, chamamos de _list_).

* Por último, conectamos o Redux ao componente, fazendo uso do `connect`. Como visto anteriormente, o `connect` tem o seguinte formato: `connect()()`. Como no caso estamos fazendo apenas leitura dos dados, basta passar a função `mapStateToProps` no primeiro parênteses e o componente no segundo.

**Pronto!** Nossa aplicação com `react-redux` está pronta. Note que a estrutura pura do Redux se baseia em: `store`, `actions` e `reducers`. Já a estrutura de conexão entre o React e o Redux é composta por: `provider`, `connect`, `dispatch`, `mapDispatchToProps` e `mapStateToProps`. Essas são as principais ferramentas que constituem a estrutura `react-redux`.

<%= vimeo "471428393" %>

### Fluxo de dados no Redux

A imagem abaixo resume todas partes e como elas se comunicam para funcionamento do Redux com React.
Basicamente, segue-se os seguintes passos:

1. Um **Store** é criado para armazenar todos o estado da aplicação;
2. O **Store** é disponibilizado através do **Provider** para todos os componentes da aplicação;
3. Os componentes usam o [connect](https://react-redux.js.org/api/connect) {: .external-link target="_blank" rel="noreferrer noopener" } para conectarem-se ao **Store**;
4. As pessoas que utilizam a aplicação interagem com ela e disparam eventos;
5. Estes eventos têm o nome de **Actions** e são enviadas ao **Store** através de um **dispatch**;
6. Os **Reducers** recebem essas **Actions** e alteram o estado da aplicação (criando um novo estado) e salvando no **Store**;
7. Os componentes conectados ao **Store** "ouvem" estas mudanças e atualizam a **View** (visualização).

<%= figure(%{src: "/front-end/redux/react-with-redux-part-1/redux_explained.png"}) %>

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Você irá desenvolver 3 exercícios para solidificar seus conhecimentos de **Redux** com React.

- No primeiro exercício, desenvolveremos um semáforo simples.
- No segundo trabalharemos com mais estados aplicando movimento em 3 carros.
- E para finalizar iremos combinar ambos os exercícios em um só, utilizando o `combineReducers`.

O _README_ do repositório [exercise-react-with-redux-intro](https://github.com/tryber/exercise-react-with-redux-intro) {: .external-link target="_blank" rel="noreferrer noopener" } tem as instruções mais detalhadas para o exercício.

#### BÔNUS

4. Refatore a aplicação do [Todo List](/front-end/react/tests/rtl-queries-events-async/).

  - Os testes em redux não serão necessários nesse momento. Você aprenderá sobre eles ao longo do bloco.
  - Adicione filtros para apresentar apenas as tarefas concluídas e outro para exibir as tarefas em progresso.
  - Utilize **Redux** para armazenar todo o estado da aplicação.
  - **BÔNUS** Implemente a função de desfazer ações. Ações são "adicionar item", "marcar como completo" e "marcar como em andamento".

**Observação:** busque utilizar todos os conceitos, métodos e funcionalidades que você aprendeu.

- `Store`
- `connect`
- `mapStateToProps`
- `mapDispatchToProps`
- `reducers`
- `combineReducers`
- `actions`

Existem várias boas práticas que podem ser adotadas durante os exercícios.
Busque implementá-las.

---

## Recursos adicionais (opcional)

* [Redux Devtools for Dummies](https://codeburst.io/redux-devtools-for-dummies-74566c597d7) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Connect react-redux](https://react-redux.js.org/api/connect) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Why use Redux](https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux: Usage with React](https://redux.js.org/basics/usage-with-react/#usage-with-react) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Why use React Redux](https://react-redux.js.org/introduction/why-use-react-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Redux: Official Redux binding for React](https://react-redux.js.org/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Getting Started with React and Redux](https://scotch.io/courses/getting-started-with-react-and-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Redux API Reference](https://redux.js.org/api/api-reference) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Redux API Reference](https://react-redux.js.org/api/connect#overview) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
