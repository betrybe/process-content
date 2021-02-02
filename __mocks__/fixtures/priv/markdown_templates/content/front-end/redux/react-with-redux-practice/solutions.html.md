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

## Enunciado do exercício
1. Você irá criar um sistema de cadastramento de clientes. Esse sistema deve ser composto por 4 páginas.
    * A primeira página deve ser a **Home**. Ela deverá ter um Link que possibilite ao usuário navegar para a página de login.
    * A segunda página será a de Login. Devem existir 2 campos para pegar os dados do usuário (email e senha). Após o login ser efetuado, o usuário deve ser redirecionado para a página de clientes cadastrados.
    * Caso o login não seja feito, ou seja, o usuário tenha mudado à mão o link do sistema e ido para a página de cadastro ou de clientes, a única mensagem exibida deve ser: "Login não efetuado".
    * A página de clientes cadastrados deverá listar todos os clientes. Caso não haja cliente, a mensagem "Nenhum cliente cadastrado" deve aparecer na tela, juntamente com um botão para ir à pagina de cadastro. Esse botão deve permanecer na tela mesmo caso hajam clientes.
    * A página de cadastro deve conter 3 inputs, para pegar 3 dados do cliente: nome, idade e email. Um botão deve gerar o cadastro. Deve haver também na página um botão que leve o usuário para a página de clientes cadastrados.
    * Estados que não necessitem navegar para outros componentes, podem ser guardados internamente. Todos os outros devem ser trafegados via Redux.

**Solução:**

```language-jsx
// src/actions/index.js
export const addRegister = value => ({ type: 'ADD_REGISTER', data: value });
export const login = value => ({ type: 'LOGIN', value });
```

```language-jsx
// src/reducers/login.js
const Initial_State = {};

function loginReducer(state = Initial_State, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.value;
    default:
      return state;
  }
}

export default loginReducer;
```

```language-jsx
// src/reducers/register.js
const Initial_State = [];

function registerReducer(state = Initial_State, action) {
  switch (action.type) {
    case 'ADD_REGISTER':
      return [...state, action.data];
    default:
      return state;
  }
}

export default registerReducer;
```

```language-jsx
// src/reducers/index.js
import { combineReducers } from 'redux';
import loginReducer from './login';
import registerReducer from './register';

const rootReducers = combineReducers({ registerReducer, loginReducer });

export default rootReducers;
```

```language-jsx
// src/store/index.js
import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

export default store;
```

```language-jsx
// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './store';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Clients from './Clients';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/clients" component={Clients} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
```

```language-jsx
// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        Bem-vindo ao sistema de cadastramento!
        <Link to="/Login">Faça seu Login</Link>
      </div>
    );
  }
}

export default Home;
```

```language-jsx
// src/Login.js
import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="email"
          />
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="senha"
          />
        </div>
        <Link
          to="/clients"
          onClick={() => this.props.login({ email, password })}>
          Entre
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: e => dispatch(login(e))});

export default connect(null, mapDispatchToProps)(Login);
```

```language-jsx
// src/Register.js
import React from 'react';
import { connect } from 'react-redux';
import { addRegister } from './actions';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      email: '',
    };
  }

  validateRegister = () => {
    const { name, age, email } = this.state;
    this.props.addRegister({ name, age, email });
    this.setState({
      name: '',
      age: '',
      email: '',
    });
  };

  render() {
    const { name, age, email } = this.state;
    const { userLogin } = this.props;
    if (!userLogin.email) return <div>Login não efetuado!</div>;
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Idade"
            value={age}
            onChange={e => this.setState({ age: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>
        <button onClick={this.validateRegister}>Registrar Cliente</button>
        <Link to="/clients">Ver clientes cadastrados</Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userLogin: state.loginReducer});
const mapDispatchToProps = dispatch => ({
  addRegister: e => dispatch(addRegister(e))});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
```

```language-jsx
// src/Clients.js
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Clients extends React.Component {
  render() {
    const { registers, userLogin } = this.props;
    if (!userLogin.email) return <div>Login não efetuado!</div>;
    if (registers.length < 1)
      return (
        <div>
          <div>Nenhum cliente cadastrado</div>
          <Link to="/register">Cadastre agora!</Link>
        </div>
      );
    return (
      <div>
        <Link to="/register">Cadastre outros!</Link>
        <div>
          {registers.map((register, index) => {
            return (
              <div key={register.email}>
                <p>ID de registro: {index + 1}</p>
                <p>Nome: {register.name}</p>
                <p>Idade: {register.age}</p>
                <p>Email: {register.email}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registers: state.registerReducer,
  userLogin: state.loginReducer});

export default connect(mapStateToProps)(Clients);
```

### Bônus

Você irá implementar funcionalidades ao código do exercício 1.

* Na página de clientes cadastrados, crie um botão que ordene os clientes em ordem alfabética a partir do campo *nome*. Caso o botão seja clicado novamente, a ordenação original deve ser mostrada.
* Cada cadastro deve ser acompanhado de um botão com o texto *X*. Caso o botão seja clicado, o cadastro deve ser excluído.

_Apenas os arquivos modificados em relação a resolução anterior serão apresentados_

**Solução:**

```language-jsx
// src/Clients.js
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRegister } from './actions';

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordened: false,
    };
  }

  generateRegisters = array =>
    array.map(register => (
      <div key={register.email}>
        <p>Nome: {register.name}</p>
        <p>Idade: {register.age}</p>
        <p>Email: {register.email}</p>
        <button onClick={() => this.props.delete(register)}>X</button>
      </div>
    ));

  orderRegisters = () => {
    const ordened = [...this.props.registers];
    ordened.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    });
    return ordened;
  };
  render() {
    const { registers, userLogin } = this.props;
    const { ordened } = this.state;

    if (!userLogin.email) return <div>Login não efetuado!</div>;
    if (registers.length < 1)
      return (
        <div>
          <div>Nenhum cliente cadastrado</div>
          <Link to="/register">Cadastre agora!</Link>
        </div>
      );
    return (
      <div>
        <Link to="/register">Cadastre outros!</Link>
        <button
          onClick={() => this.setState(state => ({ ordened: !state.ordened }))}>
          Ordenar
        </button>
        <div>
          {this.generateRegisters(ordened ? this.orderRegisters() : registers)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registers: state.registerReducer,
  userLogin: state.loginReducer});

const mapDispatchToProps = dispatch => ({
  delete: e => dispatch(deleteRegister(e))});

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
```

```language-jsx
// src/actions/index.js
export const addRegister = value => ({ type: 'ADD_REGISTER', data: value });
export const deleteRegister = value => ({ type: 'DELETE_REGISTER', value });
export const login = value => ({ type: 'LOGIN', value });
```

```language-jsx
// src/reducers/register.js
const Initial_State = [];

function registerReducer(state = Initial_State, action) {
  switch (action.type) {
    case 'ADD_REGISTER':
      return [...state, action.data];
    case 'DELETE_REGISTER':
      return state.filter(register => register !== action.value);
    default:
      return state;
  }
}

export default registerReducer;
```
