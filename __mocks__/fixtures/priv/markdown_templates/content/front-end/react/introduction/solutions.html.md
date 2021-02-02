## Gabarito dos exercícios

1. Crie um novo projeto utilizando `npx create-react-app`.

  * Solução: `npx create-react-app nomeDoSeuApp`

2. Crie uma lista de tarefas simples que:

    * Leia as tarefas de dentro de um Array.

    * Use a função `map` para criar cada item da lista no HTML.

    * Solução:

```language-react
    import React from 'react';
    import './App.css';

    const tarefas = ["Acordar", "Tomar café", "Escovar os dentes", "Ir trabalhar"];

    const App = () => ( <ul>{ tarefas.map(tarefa => <li>{ tarefa }</li>) }</ul> );

    export default App;
```

3. Acesse [este link](https://www.freecodecamp.org/learn/front-end-libraries/react/) {: .external-link target="_blank" rel="noreferrer noopener" } e faça cada um dos exercícios em ordem, sendo o último o "Create a Component with Composition"

    * Solução:

    3.1. Create a Simple JSX Element

```language-jsx
    const JSX = <h1>Hello JSX!</h1>;
```

    3.2. Create a Complex JSX Element

```language-react
    const JSX = (
      <div>
        <h1>my h1</h1>
        <p>my p</p>
        <ul>
          <li>item1</li>
          <li>item2</li>
          <li>item3</li>
        </ul>
      </div>
    );
```

    3.3. Add Comments in JSX

```language-jsx
    const JSX = (
      <div>
        <h1>This is a block of JSX</h1>
        <p>subtitle</p>
        {/*comment*/}
      </div>
    );
```

    3.4. Render HTML Elements to the DOM

```language-jsx
    const JSX = (
      <div>
        <h1>Hello World</h1>
        <p>Lets render this to the DOM</p>
      </div>
    );
    // change code below this line

    ReactDOM.render(JSX, document.getElementById("challenge-node"));
```

    3.5. Define an HTML Class in JSX

```language-jsx
    const JSX = (
      <div className="myDiv">
        <h1>Add a class to this div</h1>
      </div>
    );
```

    3.6. Learn About Self-Closing JSX Tags

```language-jsx
      const JSX = (
        <div>
          <h2>Welcome to React!</h2> <br />
          <p>Be sure to close all tags!</p>
          <hr />
        </div>
      );
```

    3.7. Create a Stateless Functional Component

```language-jsx
      const MyComponent = function() {
        // change code below this line
        return (
          <div>
            <p>Some string of text</p>
          </div>
        )
        // change code above this line
      };
```

    3.8. Create a React Component

```language-jsx
      class MyComponent extends React.Component {
        constructor(props) {
          super(props);
        }

        render() {
          // change code below this line
          return(
            <div>
              <h1>Hello React!</h1>
            </div>
          );
          // change code above this line
        }
      };
```

    3.9. Create a Component with Composition

```language-jsx
      const ChildComponent = () => {
        return (
          <div>
            <p>I am the child</p>
          </div>
        );
      };

      class ParentComponent extends React.Component {
        constructor(props) {
          super(props);
        }

        render() {
          return (
            <div>
              <h1>I am the parent</h1>
              <ChildComponent />
            </div>
          );
        }
      };
```

4. **Bônus** Por último, entenda como funciona o código [deste link](https://codepen.io/nathansebhastian/pen/qgOJKe) {: .external-link target="_blank" rel="noreferrer noopener" }. Adicione mais dois `cards` com descrição e link à sua escolha.

  * Solução:

```language-react
  function Card(props) {
      return (
        <div className="card">
          <img className="card-img-top" src={props.featureImage} alt={props.title} />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <a href={props.link} className="btn btn-primary">Learn more</a>
          </div>
        </div>
      );
  }

  function CardList() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <Card
            featureImage="https://sebhastian.com/static/eb0e936c0ef42ded5c6b8140ece37d3e/fcc29/feature-image.png"
            title="How To Make Interactive ReactJS Form"
            description="Let's write some interactive form with React"
            link="https://sebhastian.com/interactive-react-form"
          />
        </div>
        <div className="col-sm-4">
          <Card
            featureImage="https://sebhastian.com/static/4257b49310455388f3e155f8d5ab632e/fcc29/feature-image.png"
            title="Babelify your JavaScript code"
            description="Babel make JavaScript code browser-compatible."
            link="https://sebhastian.com/babel-guide"
          />
        </div>
        <div className="col-sm-4">
          <Card
            featureImage="https://sebhastian.com/static/4d13c75e6afd3976800de29628da5ba5/fcc29/feature-image.png"
            title="JavaScript Basics Before You Learn React"
            description="Learn the prerequisites of learning React fast"
            link="https://sebhastian.com/js-before-react"
          />
        </div>
        <div className="col-sm-4">
          <Card
            featureImage="https://sebhastian.com/static/4d13c75e6afd3976800de29628da5ba5/fcc29/feature-image.png"
            title="JavaScript Basics Before You Learn React"
            description="Learn the prerequisites of learning React fast"
            link="https://sebhastian.com/js-before-react"
          />
        </div>
        <div className="col-sm-4">
          <Card
            featureImage="https://sebhastian.com/static/4d13c75e6afd3976800de29628da5ba5/fcc29/feature-image.png"
            title="JavaScript Basics Before You Learn React"
            description="Learn the prerequisites of learning React fast"
            link="https://sebhastian.com/js-before-react"
          />
        </div>
      </div>
    );
  }

  ReactDOM.render(<CardList />, document.getElementById('root'))
```
