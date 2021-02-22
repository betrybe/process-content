## O que vamos aprender?

Agora que você já aprendeu a usar as principais ferramentas que a `react-testing-library` oferece, vamos aprofundar em alguns casos mais avançados. Na aula de hoje você irá aprender mais sobre _mocks_ e testes de inputs.

<%= vimeo "466146057" %>

---

### Você será capaz de:

* Criar _mocks_ de APIs utilizando fetch;
* Testar inputs;

---

## Por que isso é importante?

Ter uma boa cobertura de testes aumenta a confiabilidade da sua aplicação, o que significa que também teremos que testar formulários. Para manter uma boa cobertura de testes de maneira sustentável, também é necessário garantir que seus testes executem rápido. É aí que entram os _mocks_, que nos permitem evitar chamadas reais a APIs e transições CSS, por exemplo, que podem demorar muito e em alguns casos, como na falta de internet, não funcionar adequadamente durante os testes.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Antes de começar

<%= vimeo "466182977" %>

Pra muita coisa poder funcionar você precisa colocar no seu src/setupTests.js essas linhas:

```language-js
// setupTests.js
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
```

Obs: Esta biblioteca serve para monitoramento de alterações no DOM da página.

### Mocking Modules

Vamos a um exemplo com a api de piadas aleatórias, para acompanhar os exemplos, primeiro crie uma aplicação com `npx create-react-app`, substitua o `App.js` pelo conteúdo abaixo:

```language-react
// App.js
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      joke: '',
    }
  }

  componentDidMount() {
    const API_URL = 'https://icanhazdadjoke.com/';
    fetch(API_URL, { headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then((data) => this.setState({ joke: data.joke }));
  }

  render() {
    return (
      <div className="App">
        {this.state.joke}
      </div>
    );
  }
}

export default App;
```

Teste se sua aplicação tem o funcionamento correto no navegador retornando uma piada aleatória a cada vez que a pagina é atualizada.

Agora temos o problema, como testar a aplicação sem que quebre toda vez que nossa api retornar uma nova piada diferente? 🤔

Para resolver esse problema, vamos ver dois exemplos com o _Jest_ que vão nos permitir _mockar_, respectivamente, um módulo e sua implementação.

<%= vimeo "466139601" %>

#### Exemplo 1

Substitua o arquivo App.test.js pelo conteúdo abaixo:

```language-react
// App.test.js
import React from 'react';
import { render } from '@testing-library/react'
import App from './App';

afterEach(() => jest.clearAllMocks());
it('fetch joke', async () => {
  const joke = {
    id: '7h3oGtrOfxc',
    joke: 'Whiteboards ... are remarkable.',
    status: 200,
  };

  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(joke),
  });
  const { findByText } = render(<App />);
  await findByText('Whiteboards ... are remarkable.');
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith(
    'https://icanhazdadjoke.com/',
    {"headers": {"Accept": "application/json"}}
  );
});
```

Vamos em partes entender o que esta acontecendo:

-  A constante `joke` cria um objeto similar ao que é retornado da `API`;


-  O `jest.spyon` espiona as chamadas a função `fetch` do objeto `global`, é por meio deste objeto `global` que conseguimos usar qualquer função do sistema, por exemplo a função `parseInt`;


- Quando a função `fetch` for chamada, ao invés de fazer uma requisição a uma `API` externa será chamando nosso `mock`. Repare que para cada `.then` utilizamos `.mockResolvedValue` e simulamos o retorno que o `fetch` teria, primeiro retornamos um objeto que contem a função `.json` e dentro dela criamos um mock que retorna a nossa piada, satisfazendo o que é esperado no nosso componente;


- É importante termos o `async` em `it('fetch joke', async () => {`, para que se possa utilizar `await findByText` onde estamos dizendo ao nosso teste: **ei espere até que consiga encontrar esse texto no dom ou de erro por limite de tempo**;


- As funções `toBeCalledTimes` e `toBeCalledWith` servem para garantir respectivamente, o número de chamadas ao nosso `fetch` e que ele foi chamado com os argumentos corretos.


- A linha `afterEach(() => jest.clearAllMocks()); ` faz com que, após cada teste, nosso `mock` seja limpo, ou seja, no caso acima, garante que após o teste o `fetch` não seja mais um `mock`, isso é bem util para que não tenha interferência entre um teste e outro.


#### Exemplo 2

Existem diversas formas de `mockagem`, você se lembra que a função `fetch` é uma `Promise`? Que vantagem isso traz dentro dos testes? Veja no código abaixo:

```language-react
import React from 'react';
import { render } from '@testing-library/react'
import App from './App';

afterEach(() => jest.clearAllMocks());
it('should fetch users', async () => {
  const joke = {
    id: '7h3oGtrOfxc',
    joke: 'Whiteboards ... are remarkable.',
    status: 200,
  };

  global.fetch = jest.fn(()=>
  Promise.resolve({
    json: ()=> Promise.resolve(joke)
  }));

  const { findByText } = render(<App />);
  await findByText('Whiteboards ... are remarkable.');
  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://icanhazdadjoke.com/', {"headers": {"Accept": "application/json"}});
});
```

O código é muito similar ao do primeiro exemplo, alterando somente o `mock`.

Nesse exemplo estamos dizendo que `global.fetch` agora é uma função `mockada` com `jest.fn` que retorna uma `Promise`, e na primeira vez que ela for resolvida, deve se retornar um objeto com uma outra função `json` que também é uma `Promise`, que quando resolvida retorna sua piada.

Outra forma de escrever o mesmo exemplo seria com a sintaxe `async/await`, onde temos o mock dessa forma:

```language-react
global.fetch = jest.fn(async () => ({
  json: async () => joke
}));
```

<%= figure(%{src: "/front-end/react/tests/ursopicapau.gif", class: "text-center", caption: "Gif do Urso do Pica Pau", width: "500em", heigh: "auto"}) %>

Mockar requisições é uma coisa realmente complexa mas, **Palma, palma, não priemos cânico**, você pode revisitar o conteúdo sempre que precisar e com o tempo e prática, estará fazendo `mocks` como se não fosse nada.

Nestes casos, utilizamos o _mock_ para evitar uma chamada externa à API, tornando o nosso teste mais rápido e confiável, retornando o resultado contido na constante `joke`. Imagine que a API saia do ar ou que perdemos acesso à internet enquanto o teste roda. O teste quebraria, apesar do seu código estar funcionando. _Mockar_ a chamada à API evita esse tipo de problema. Outro ponto é que seus testes vão rodar mais rápido se você não fizer uma chamada real à API todas as vezes que você for rodar seu teste.

### Testando inputs em React

  * Agora, vamos falar um pouco sobre teste de formulários, que são um pouco diferentes do resto da página porque normalmente os componentes já estão em tela no momento do carregamento mas os valores do input não estão. Então precisamos, nos testes, interagir com o input como o usuário faria para poder testá-lo corretamente.

  * Vamos primeiro criar dois campos de texto, um para digitar nome e outro para digitar e-mail.

  * No arquivo `App.js` de sua aplicação react coloque o código abaixo e veja no navegador e no console dele como funciona:

```language-react
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
  }

  handleInput(e) {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h1>Teste de inputs</h1>
        <p>
          Nome:
          <input
            onChange={(e) => this.handleInput(e)}
            name='nome'
            value={this.state.nome}
          />
        </p>
        <p>
          E-mail:
          <input
            onChange={(e) => this.handleInput(e)}
            name='email'
            value={this.state.email}
          />
        </p>
      </div>
    );
  }
}

export default App;
```

  * Agora, vamos testar se esses componentes estão na tela corretamente, e se conseguimos digitar valores neles no teste. Para nos ajudar a identificar os campos, é interessante utilizar a propriedade `data-testid` nos `inputs`, como veremos a seguir. Coloque as propriedades e depois começaremos os testes:

```language-react
<p>
//  Nome:
//  <input
//    onChange={(e) => this.handleInput(e)}
//    name='nome'
      data-testid='input-nome'
//    value={this.state.nome}
//  />
//  </p>
//  <p>
//  E-mail:
//  <input
//    onChange={(e) => this.handleInput(e)}
//    name='email'
      data-testid='input-email'
//    value={this.state.email}
//  />
</p>
```

  * Agora vamos escrever o test para os dois campos. A estrela aqui é o `fireEvent`, que dispara um evento sobre o componente renderizado, que no nosso caso será o `change`.

  * Vamos escrever o teste, ele vai interagir com os inputs, colocar valores neles, assim como quem navegar pela página faria. Depois, vamos testar se o que for digitado aparece na página.

```language-react
// App.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import App from './App';
it('alterando o valor dos campos e testando o valor guardado', () => {
  const { getByTestId } = render(<App />);
  const inputNome = getByTestId('input-nome');
  expect(inputNome).toHaveValue('');
  fireEvent.change(inputNome, { target: { value: 'Estudante da Trybe' } });
  expect(inputNome).toHaveValue('Estudante da Trybe');

  const inputEmail = getByTestId('input-email');
  expect(inputEmail).toHaveValue('');
  fireEvent.change(inputEmail, { target: { value: 'estudante@trybe.com' } });
  expect(inputEmail).toHaveValue('estudante@trybe.com');
});
```

  * No código, vemos como utilizar o `fireEvent`. Para isso, temos que passar para ele o que queremos escrever dentro do input durante o teste. A sintaxe parece estranha, mas é simplesmente porque nós temos um item (que estamos selecionando com o `data-testid`) e a propriedade dele que guarda o valor digitado no input fica dentro da propriedade target. Dá para fazer um paralelo bem interessante aqui com o `eventListener` que aprendemos no começo de `JavaScript`, onde utilizávamos o valor de `event.target.value`. Por conta disso que a sintaxe é de objeto dentro de objeto.

  * Uma coisa que pode ajudar a entender o que está acontecendo é O `console.log` na função `handleInput` do arquivo `App.js` exibindo a variável `value`. Fazendo isso, o `console.log` aparece no teste, o que lhe dará a certeza de que a `RTL` está realmente renderizando sua página e inserindo nos campos os valores, da mesma forma que o usuário faria.

  * Para visualizar o comportamento dos testes acima basta ter uma aplicação react e substituir o arquivo `App.js` e `App.test.js`.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. Vamos para o Slack onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

Para esse exercício, faremos testes em uma aplicação simples, já pronta, para fixar o que foi aprendido.

O _README_ do [repositório do Digimon Finders](https://github.com/tryber/exercise-digimon-finders) {: .external-link target="_blank" rel="noreferrer noopener" } tem as instruções mais detalhadas para a execução dos exercícios.

---

## Recursos adicionais (opcional)

* [JavaScript, o Global Object e o this](https://medium.com/@felquis/javascript-o-global-object-e-o-this-ceda36059cff) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Public fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields) {: .external-link target="_blank" rel="noreferrer noopener" }

* [But really, what is a JavaScript mock?](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Video - Migrating from shallow rendering react components to explicit component mocks](https://www.youtube.com/watch?v=LHUdxkThTM0) {: .external-link target="_blank" rel="noreferrer noopener" }

* [JEST - requireActual](https://jestjs.io/docs/en/jest-object#jestrequireactualmodulename) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Form Submit - react-testing-library](https://codesandbox.io/s/3vrjmrpr05) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Sending Emails with ReactJS](https://blog.mailtrap.io/react-send-email/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [RTL FAQ](https://testing-library.com/docs/react-testing-library/faq) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
