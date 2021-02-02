## Gabarito dos Exercícios

### Exercícios de fixação

**1.** Faça [este exercício sobre `componentDidMount`](https://www.freecodecamp.org/learn/front-end-libraries/react/use-the-lifecycle-method-componentdidmount) {: .external-link target="_blank" rel="noreferrer noopener" }.

```language-react
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        activeUsers: null
      };
    }
    componentDidMount() {
      setTimeout(() => {
        this.setState({
          activeUsers: 1273
        });
      }, 2500);
    }
    render() {
      return (
        <div>
          <h1>Active Users: {this.state.activeUsers}</h1>
        </div>
      );
    }
  }
```

**2.** Utilizando o código do componente `Counter` adicione, imediatamente após sua montagem, o valor 10 na chave counter do estado.

```language-react
  // Counter.js
  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: 0
      };
      console.log("construtor");
    }

    componentDidMount() {
      this.setState({ counter: 10 });
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log("shouldComponentUpdate");
      return true;
    }

    componentDidUpdate(prevProps, prevState) {
      console.log("componentDidUpdate");
    }

    render() {
      console.log("render");
      return (
        <div>
          <p>Contador</p>
          <button
            onClick={() => this.setState((state) => ({ counter: state.counter + 1 }))}
          >
            Soma
          </button>
          <p>{this.state.counter}</p>
        </div>
      );
    }
  }
```

**3.** Com o mesmo código do exercício anterior, impeça que a renderização seja feita, caso o valor na chave counter esteja entre 13 e 15.

```language-react
  // Counter.js
  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: 0
      };
      console.log("construtor");
    }

    componentDidMount() {
      this.setState({ counter: 10 });
    }

    shouldComponentUpdate(_, nextState) {
      if (nextState.counter > 13 && nextState.counter < 15) return false;
      return true;
    }

    componentDidUpdate(prevProps, prevState) {
      console.log("componentDidUpdate");
    }

    render() {
      console.log("render");
      return (
        <div>
          <p>Contador</p>
          <button
            onClick={() => this.setState((state) => ({ counter: state.counter + 1 }))}
          >
            Soma
          </button>
          <p>{this.state.counter}</p>
        </div>
      );
    }
  }
```

### Exercícios

**1.** Crie uma aplicação que consuma a [API](https://dog.ceo/dog-api/) {: .external-link target="_blank" rel="noreferrer noopener" } de fotos aleatórias de cachorros. Observe a estrutura de dados que ela retorna:

```language-react
  {
    "message": "https:\/\/images.dog.ceo/breeds/bulldog-french/n02108915_5306.jpg",
    "status": "success"
  }
```

  * assim que a página for renderizada, uma primeira requisição deve acontecer, e a imagem deve ser mostrada na tela;

  * enquanto a requisição é feita, o texto `'Loading...'` deve ser a única coisa presente na tela;

  * deve existir um botão que, para cada clique, busque mais um _doguinho_.

```language-react
    import React from "react";

    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
        this.fetchDog = this.fetchDog.bind(this);
      }

      componentDidMount() {
        this.fetchDog();
      }

      fetchDog() {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then(res => res.json())
          .then(result => this.setState({ data: result }));
      }

      render() {
        if (this.state.data === "") return "loading...";
        return (
          <div>
            <p>Doguinhos</p>
            <button onClick={this.fetchDog}>Novo doguinho!</button>
            <div>
              <img src={this.state.data.message} alt="Random dog" />
            </div>
          </div>
        );
      }
    }

    export default App;
```

**2.** Com o código do exercício anterior, você irá implementar mais algumas funcionalidades:

  * a cada tentativa de atualização do componente, verifique se o campo `message` tem a string `terrier`. Se sim, não atualize o componente;

  * guarde a url da última imagem gerada no `localStorage` após cada atualização.

  * após a atualização do componente, exiba um `alert` com a raça do doguinho _(verifique o campo message)_;

```language-react
  import React from "react";

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: ""
      };
      this.fetchDog = this.fetchDog.bind(this);
    }

    componentDidMount() {
      this.fetchDog();
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.data.message.includes("terrier")) {
        return false;
      }
      return true;
    }

    componentDidUpdate() {
      localStorage.setItem("dogURL", this.state.data.message);
      const dogBreed = this.state.data.message.split("/")[4];
      alert(dogBreed);
    }

    fetchDog() {
      fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(result => this.setState({ data: result }));
    }

    render() {
      if (this.state.data === "") return "loading...";
      return (
        <div>
          <p>Doguinhos</p>
          <button onClick={this.fetchDog}>Novo doguinho!</button>
          <div>
            <img src={this.state.data.message} alt="Random dog" />
          </div>
        </div>
      );
    }
  }

  export default App;
```

#### Bônus

Com o código do exercício anterior, implemente:

  * a cada foto que for baixada, através de um `input`, dê um nome ao `doguinho`;

  * crie um botão que guarde os resultados, juntamente com o nome dado ao 'doguinho', em um array;

  * guarde o array no `localStorage` a cada atualização, e não mais a url da última imagem gerada;

  * a cada inicialização da aplicação, verifique se existem dados prévios guardados no `localStorage`. Caso haja, ignore a instrução _"assim que a página for renderizada, uma primeira requisição deve acontecer e a imagem deve ser mostrada na tela"_, e exiba a última imagem guardada.

```language-react
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      name: "",
      array: []
    };
    this.fetchDog = this.fetchDog.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    if (localStorage.namedDogURL) {
      const parseStorage = JSON.parse(localStorage.namedDogURL);
      const lastDog = parseStorage[parseStorage.length - 1].message;
      this.setState({
        array: parseStorage,
        data: { message: lastDog }
      });
    } else {
      this.fetchDog();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.message.includes("terrier")) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      const dogBreed = this.state.data.message.split("/")[4];
      alert(dogBreed);
    }
  }

  fetchDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(result => this.setState({ data: result }));
  }

  saveData() {
    const {
      data: { message },
      name,
      array
    } = this.state;
    const dogData = { message, name };
    const newArray = [...array, dogData];
    this.setState({ array: newArray });
    this.setState({ name: "" });
    localStorage.setItem("namedDogURL", JSON.stringify(newArray));
  }

  render() {
    if (this.state.data === "") return "loading...";
    return (
      <div>
        <p>Doguinhos</p>
        <button onClick={ this.fetchDog }>Novo doguinho!</button>
        <div>
          <input
            type="text"
            value={ this.state.name }
            onChange={ e => this.setState({ name: e.target.value }) }
            placeholder="digite o nome do doguinho"
          />
          <button onClick={this.saveData}>Salvar doguinho!</button>
        </div>
        <div>
          <img src={ this.state.data.message } alt={ this.state.data.message } />
        </div>
      </div>
    );
  }
}

export default App;
```
