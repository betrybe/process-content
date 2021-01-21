## Gabarito dos exercícios

Você vai praticar vários dos conceitos do **React** que viu até agora criando um **componente de Dropdown**. Nesse exercício, somando todos os bônus, será possível praticar `props.children`, `checagem de tipos`, `bind`, `default props`, `estado` e `eventos`.

### Exercício 1

O código abaixo é um protótipo de [modal](https://react-bootstrap.github.io/components/modal/) {: .external-link target="_blank" rel="noreferrer noopener" }. Crie a checagem de tipo para todas as props dos componentes. Crie um app react com o `create-react-app` e adicione o código abaixo para começar.

  - App.js

```language-react
import React, { Component } from 'react';
import Button from './Button';
import Alert from './Alert';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      isDisableButton: false,
    }
  }

  changeTitle = (value) => {
    this.setState({ title: value })
  }

  changeShowComponent = () => {
    this.setState((state) => (
      {
        showModal: !state.showModal,
        isDisableButton: !state.isDisableButton
      }
    ))
  }

  render() {
    return (
      <div className='main'>
        <Button content="Clique aqui" isDisable={this.state.isDisableButton} showComponent={this.changeShowComponent} value='Título Show' />
        {this.state.showModal &&
          <Alert
            hideComponent={this.changeShowComponent}
            contentTitle="Modal"
            content="Coloque qualquer coisa aqui."
          />}
      </div>
    )
  }
}

export default App;
```

  - Alert.js

```language-react
import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = (props) => {
  const { hideComponent, contentTitle, content } = props;
  setTimeout(() => hideComponent(), 3000);
  return (
    <div className='Alert'>
      <h1>{contentTitle}</h1>
      <p>{content}</p>
    </div>
  )
}

export default Alert;
```

  - Button.js

```language-react
import React from 'react';
const Button = (props) => {
  const { showComponent, isDisable, content } = props;
  return (
    <button
      type="button"
      disabled={isDisable}
      onClick={() => showComponent()}
    >
      {content}
    </button>
  )
}
export default Button;
```

  - Alert.css

```language-css
.Alert{
  background: gray;
  padding: 20px;
  border-radius: 10px;
}
```

### Solução

  - Alert.js

```language-react
import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = (props) => {
  const { hideComponent, contentTitle, content } = props;
  setTimeout(() => hideComponent(), 3000);
  return (
    <div className='Alert'>
      <h1>{contentTitle}</h1>
      <p>{content}</p>
    </div>
  )
}

export default Alert;

Alert.propTypes = {
  hideComponent: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
};
```

  - Button.js

```language-react
import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { showComponent, isDisable, content } = props;
  return (
    <button
      type="button"
      disabled={isDisable}
      onClick={() => showComponent()}
    >
      {content}
    </button>
  )
}
export default Button;

Button.propTypes = {
  showComponent: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};
```

---

### Exercício 2

 Usando o código anterior, refatore a aplicação para que o `Alert` funcione com qualquer informação. O componente deverá receber, como filho, um objeto com a estrutura `{title: "Algum título", content: "Algum conteúdo", timeSeconds: 3 }`.  O filho é quem definirá o tempo que o modal permanece na tela com o valor da chave `timeSeconds`. Use PropTypes para realizar a validação do formato do objeto.

### Solução

- App.js

```language-react
import React, { Component } from 'react';
import Button from './Button';
import Alert from './Alert';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      isDisableButton: false,
    }
  }

  changeTitle = (value) => {
    this.setState({ title: value })
  }

  changeShowComponent = () => {
    this.setState((state) => (
      {
        showModal: !state.showModal,
        isDisableButton: !state.isDisableButton
      }
    ))
  }

  render() {
    return (
      <div className='main'>
        <Button content="Clique aqui" isDisable={this.state.isDisableButton} showComponent={this.changeShowComponent} value='Título Show' />
        {this.state.showModal &&
          <Alert
            hideComponent={this.changeShowComponent}
          >
            {
              {
                title: "Modal",
                content: "Coloque qualquer coisa aqui.",
                timeSeconds: 4,
              }
            }
          </Alert>}
      </div>
    )
  }
}

export default App;
```

- Alert.js

```language-react
import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = (props) => {
  const { hideComponent, children: { title, content, timeSeconds } } = props;
  setTimeout(() => hideComponent(), timeSeconds * 1000);
  return (
    <div className='Alert'>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}

export default Alert;

Alert.propTypes = {
  hideComponent: PropTypes.func.isRequired,
  children: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timeSeconds: PropTypes.number.isRequired,
  }),
};

Alert.defaultProps = {
  children: {
    title: "Algum título",
    content: "Algum conteúdo",
    timeSeconds: 3
    },
}
```

- Button.js

```language-react
import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { showComponent, isDisable, content } = props;
  return (
    <button
      type="button"
      disabled={isDisable}
      onClick={() => showComponent()}
    >
      {content}
    </button>
  )
}
export default Button;

Button.propTypes = {
  showComponent: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};
```

---

### Exercício 3

Agora vamos criar o **componente de Dropdown**! Observe o gif abaixo, que já está com todos os bônus feitos:

<%= figure(%{src: "/front-end/react/children-and-proptypes/solution.gif", caption: "Exemplo dos exercícios feitos com todos os bonus", class: "rounded mx-auto d-block", width: "400px", height: "auto"}) %>

Entendeu? O conceito é simples. O componente será uma lista de coisas preferidas suas. Por exemplo, os seus livros prediletos. Dado que estamos utilizando uma lista de letras (a, b, c, d), o componente deverá ter:

 - Um título. O componente deve recebê-lo como `children`.

 - Uma caixa, na forma de uma `div` para ser clicada. Seu valor deve ser o primeiro item da lista, como no gif a letra `a`.

 - Ao clicar na caixa, ela se expande em uma lista de opções. Cada opção deve possuir um valor. Esses valores devem estar dentro de um array de objetos, e devem ser passados para dentro de uma props `list={content}`. Exemplo do array:

```language-react
 const content = [
    {id: 1, item: 'a'},
    {id: 2, item: 'b'},
    {id: 3, item: 'c'},
    {id: 4, item: 'd'},
  ];
```

 - Ao clicar na caixa novamente, ela inteira é ocultada.

 - Adicione a `checagem de tipos` para todas as props passadas.

**Dicas:**

- Lembre-se de dividir o seu problema em problemas menores para lidar com um desafio de cada vez;

- Procure usar _Higher Order Functions_! Elas vão deixar sua lógica muito mais simples;

- Para realizar o item 3, você deverá usar `eventos`, `bind` e `state` para alternar os estilos do dropdown entre "escondido" e "exibido". Será necessário utilizar o estado anterior para alterar o seguinte e evitar erros.

### Bônus:

 - Ao clicar em alguma das opções, o valor da caixa deve ser mudado para a opção clicada.

 - Seu componente deve renderizar um título padrão, caso nenhum seja passado como filho do componente.

### Solução

Abaixo, uma proposta de solução para o exercício:

`src/App.js`

```language-javascript
import React from 'react';
import Dropdown from './Dropdown';
import './App.css';

function App() {
  const content = [
    {id: 1, item: 'a'},
    {id: 2, item: 'b'},
    {id: 3, item: 'c'},
    {id: 4, item: 'd'},
  ];

  return (
    <div className="App">
      <Dropdown content={content}>Título da lista customizado</Dropdown>
    </div>
  );
}

export default App;
```

`src/Dropdown.js`

```language-javascript
import React from 'react';
import PropTypes from 'prop-types';
import './dropdown.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      clickedItem: this.props.content[0].id,
    };
  }

  toggleDropdown() {
    return this.setState(state => {
      return {isOpen: !state.isOpen};
    });
  }

  handleItemClick(id) {
    this.setState({clickedItem: id});
  }

  render() {
    const {children, content} = this.props;

    const {item} = content.find(({id}) => id === this.state.clickedItem);

    return (
      <div className="list-container">
        <span>{children}</span>
        <div
          className="dropdown-button"
          onClick={this.toggleDropdown.bind(this)}>
          {item}
        </div>
        <div className={this.state.isOpen ? 'dropdown-menu' : 'dropdown-menu-hidden'}>
          {content.map(({id, item}) => (
            <div key={id} onClick={() => this.handleItemClick(id)}>
              <span>{item}</span>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  children: 'Minha lista',
};

Dropdown.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({id: PropTypes.number, item: PropTypes.string}),
  ).isRequired,
  children: PropTypes.string,
};

export default Dropdown;
```

`src/dropdown.css`

```language-css
.list-container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.dropdown {
  transition: width 1s;
  transition-timing-function: linear;
}

.dropdown-button {
  background-color: white;
  width: 50px;
  height: 20px;
  border: 1px solid;
}

.dropdown-menu {
  background-color: white;
  width: 200px;
  border: 1px solid;
}

.dropdown-menu-hidden {
  display: none;
}
```
