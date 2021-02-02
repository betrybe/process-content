## O que vamos aprender?

Agora que você já aprendeu sobre como fazer mocks e a testar formulários com a `react-testing-library`, vamos aprender a testar rotas, para sermos capazes de testar o fluxo de nossas aplicações.

<%= vimeo "466629334" %>

---

### Você será capaz de:

* Testar rotas criadas com _React Router_ com a React Testing Library.

---

## Por que isso é importante?

Aprendendo a testar rotas, vamos ter meios de fazer nossos testes navegarem pela aplicação, então podemos escrever testes imaginando como o usuário vai usar a página, isto nos possibilita testar o fluxo de uso do programa.

Outra opção que ganhamos ao aprender a testar rotas, é que podemos testar páginas de maneira separada, o que é ótimo para se certificar de que os componentes de uma página fazem exatamente o que se espera deles.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Testando React Router

<%= vimeo "466638917" %>

Para começar a entender como fazer testes, precisamos passar por alguns pontos antes, entendê-los nos trará uma maior compreensão do que vamos realizar:

1. A biblioteca `history` é uma ferramenta que lhe permite acessar a sessão de histórico do navegador e também a localização atual (URL), onde quer que o *JavaScript* execute, nesse [link](https://reacttraining.com/react-router/web/api/history) {: .external-link target="_blank" rel="noreferrer noopener" } tem uma documentação de fácil consulta.

    * Na documentação acima, tem uma explicação sobre todos os métodos da biblioteca, mas para nossos testes, os métodos mais utilizados são o `push`, que te permite mudar de rota dentro do **ambiente de testes**, e o `location.pathname`, que te retorna a URL exata em que você está.

    * De dentro da biblioteca, você também importará a `createMemoryHistory`, que é feita para ser utilizada em ambientes que não possuem DOM, por exemplo, em testes automatizados. O trabalho dessa *função* é criar um novo histórico de navegação, para ser utilizado durante o teste. Essa biblioteca é bastante utilizada nesses casos, como veremos no próximo tópico.

2. A função `renderWithRouter` é uma função customizada para fazer testes com rotas, uma vez que a função `render` normal da RTL não dá suporte ao `router`. Ela pode ser muito útil e usa o `createMemoryHistory` para embutir no seu componente renderizado a lógica de _histórico de navegação_, para uso nos testes. Veja o [código de exemplo](https://testing-library.com/docs/example-react-router#reducing-boilerplate) {: .external-link target="_blank" rel="noreferrer noopener" } para se familiarizar. Vamos praticar com um novo app React:

  * Primeiro, utilize o `create-react-app` com o nome que desejar.
  * Depois disso, vamos instalar as dependências que utilizaremos nesse projeto, a `react-router-dom`, `history` e a `@testing-library/react`, com o comando abaixo.

```language-shell
npm i react-router-dom
```

  * Por último vamos copiar esse código para dentro do nosso arquivo `App.js` apagando tudo o que já estiver lá.

```language-react
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export const About = () => <h1>Você está na página Sobre</h1>;
export const Home = () => <h1>Você está na página Início</h1>;
export const NoMatch = () => <h1>Página não encontrada</h1>;

export default function App() {
  return (
    <div>
      <Link to="/">Início</Link>
      <br />
      <Link to="/about">Sobre</Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
```

  * Repare que, para efeito de aprendizado, temos mais de um componente dentro do arquivo `App.js`, por isso o `export default` no componente `App`. Os outros componentes, que estão sendo exportados acima do component `App`, também terão os seus respectivos `exports`. Lembrando que isso **não é uma boa prática**. Estamos fazendo dessa forma para diminuirmos a complexidade da aplicação, com o intuito de facilitar o entendimento.

  * Outro ponto de atenção é que, quando utilizamos o `export default` e o `export`, a maneira de importar os componentes sofre uma pequena alteração - que veremos na hora de realizar os testes.

  * Ao terminar de instalar, vamos nos deparar com um problema! A nossa página dará o seguinte erro:

```language-react
You should not use <Link> outside a <Router>
```

  * Esse erro acontece porque o `BrowserRouter` deve encapsular todos os itens chamados pelo `react-router-dom` e, no nosso caso, existem dois `<Link>` no `App.js`, o que nos leva a esse erro. Vamos resolver isso colocando a tag `<BrowserRouter>` no arquivo `index.js`, deixando ele da seguinte forma:

```language-react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

  * Agora sim! Vamos ao navegador entender o que esse código está fazendo. Basicamente, o nosso código cria um router básico com duas páginas, a **Home** e a **About**, além de criar uma página de **Not Found** para quando a pessoa coloca uma *URL* que não existe.

  * Após isso, vamos usar a função `renderWithRouter` que é uma função *helper* ou assistente. Uma função *helper* executa uma tarefa específica e não depende de outras funções.

  * No nosso caso, a *helper* irá criar um histórico e renderizar o componente que iremos testar. Para não ficarmos sem contexto de onde essa função veio, ela foi tirada da documentação oficial da **Testing Library** que você pode encontrar [aqui.](https://testing-library.com/docs/example-react-router#reducing-boilerplate) {: .external-link target="_blank" rel="noreferrer noopener" } Vamos salvar a *helper* num arquivo `src/renderWithRouter.js` e entendê-la antes de escrevermos os testes:

```language-react
//src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

export default renderWithRouter;
```

  * Aqui utilizaremos a biblioteca `history` para criar um histórico de navegação. A *helper* irá passar o histórico para o componente `Router`, e vai renderizar o componente que quisermos dentro dele, bastando apenas passar o componente como argumento quando a chamarmos.

  * Existe uma forma de fazer sem o `helper`, mas ela implica em escrever bem mais código. [Esse link](https://testing-library.com/docs/example-react-router) {: .external-link target="_blank" rel="noreferrer noopener" } tem um exemplo muito parecido com o que estamos fazendo juntos, a grande diferença é que lá eles não utilizam uma função auxiliar. Repare que a sintaxe que utilizaremos será bem parecida com a do site, com a diferença de verbosidade que no exemplo do link acima será bem maior.

  * Com a ajuda desta função, vamos escrever muito menos código na hora de testar, porque vai ser questão de chamar a `renderWithRouter`. Aqui, um detalhe de muita importância é que devemos colocar o `<BrowserRouter />` encapsulando o componente `<App />` inteiro.

  * Para fazermos isso, devemos colocá-lo no `index.js`. Isto é necessário porque queremos ter controle sobre o `BrowserRouter` nos testes e se ele está dentro do componente que vamos testar, nós perdemos o controle sobre ele.

  * Uma outra característica dessa função é que ela retorna tanto o componente que passamos como parâmetro, já encapsulado no router, quanto o histórico que geramos em si, o que também serve para nos levar a outras páginas com facilidade.

  * Agora que vimos o App que vamos testar e entendemos a função que vamos utilizar, iremos escrever os testes, dentro do arquivo `src/App.test.js`:

```language-react
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from './App';

it('deve renderizar o componente App', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Você está na página Início/);
  expect(home).toBeInTheDocument();
});
```

  * Aqui, fizemos os imports necessários: o próprio `react`, a *helper* e o *componente* que iremos testar.

  * Importamos o teste em si, que chama a *helper* passando o *componente* a ser renderizado. Nesse primeiro caso, mostraremos como renderizar a aplicação toda, fazendo um teste geral, depois vamos ver como renderizar um componente específico.

  * Continuando os testes, vamos clicar no link `About` em nossa aplicação e verificar se estamos na página correta.

```language-react
// import React from 'react';
import { fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import App from './App';

// it('deve renderizar o componente App', () => {
//   const { getByText } = renderWithRouter(<App />);
//   const home = getByText(/Você está na página Início/);
//   expect(home).toBeInTheDocument();
// });

it('deve renderizar o componente Sobre', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Sobre/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
  const aboutAll = getByText(/Você está na página Sobre/);
  expect(aboutAll).toBeInTheDocument();
});
```

  * Com o `fireEvent` (que deve ser importado da `@testing-library/react`), podemos interagir com os elementos da tela (nesse caso, vamos clicar no link `Sobre`). Depois disso, utilizaremos o `history.location.pathname` para verificar se estamos na página correta e, por último, verificamos se o texto que aparece quando clicamos nesse link no navegador foi encontrado.

  * Agora que temos mais um caso de uso, é interessante colocar o describe, ele ajudará bastante na hora de separar os testes e numa eventual falha, saberemos qual teste falhou. Vamos colocá-lo abaixo:

```language-react
// import React from 'react';
// import { fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import App from './App';

describe('teste da aplicação toda', () => {
// it('deve renderizar o componente App', () => {
//   const { getByText } = renderWithRouter(<App />);
//   const home = getByText(/Você está na página Início/);
//   expect(home).toBeInTheDocument();
// });

// it('deve renderizar o componente Sobre', () => {
//   const { getByText, history } = renderWithRouter(<App />);
//   fireEvent.click(getByText(/Sobre/i));
//   const pathname = history.location.pathname;
//   expect(pathname).toBe('/about');
//   const aboutAll = getByText(/Você está na página Sobre/);
//   expect(aboutAll).toBeInTheDocument();
// });
});
```

  * Encerrando esse teste de aplicação total, vamos testar a página que deveria aparecer ao digitar na barra de endereços uma página que não existe:

```language-react
// import React from 'react';
// import { fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import App from './App';

// describe('teste da aplicação toda', () => {
//   it('deve renderizar o componente App', () => {
//     const { getByText } = renderWithRouter(<App />);
//     const home = getByText(/Você está na página Início/);
//     expect(home).toBeInTheDocument();
//   });

//   it('deve renderizar o componente Sobre', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     fireEvent.click(getByText(/Sobre/i));
//     const pathname = history.location.pathname;
//     expect(pathname).toBe('/about');
//     const aboutAll = getByText(/Você está na página Sobre/);
//     expect(aboutAll).toBeInTheDocument();
//   });

  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Página não encontrada/i);
    expect(noMatch).toBeInTheDocument();
  });
// });
```

  * A diferença nesse caso é que utilizamos a função `history.push()` e passamos como argumento algum link que não existe dentro de nossa aplicação. Depois disso, testamos se o texto que aparece no navegador, ao digitar um caminho para uma página que não existe, é encontrado.

  * Por último, vamos mostrar como testar um componente separadamente:

```language-react
it('deve renderizar o componente About (apenas componente)', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutOnly = getByText(/Você está na página Sobre/i);
  expect(aboutOnly).toBeInTheDocument();
});
```

  * Você verá que, ao copiar esse test, o `Jest` retornará um erro, dizendo que o componente `About` não foi definido. Isso é porque ele não foi importado nesse arquivo! Altere a linha de import do `App.js` para:

```language-react
  import App, { About } from './App';
```

  * Talvez você esteja se perguntando porque o `App` não foi importado com `{}` e o `About` foi. Isso aconteceu porque só pode haver um `export default` por arquivo (que faz o componente ser importável sem as chaves `{}`) e o `App` tomou esse espaço, então os outros componentes exportados ficam em "segundo plano". Por isso, para serem importados corretamente, necessitam do `{}`.

  * Para ver a diferença entre a renderização da aplicação inteira e de apenas um componente, cause um erro nos testes, alterando o que é esperado no `getByText` dos testes. Você verá que, ao importar apenas o componente, todo o resto ao redor dele não é renderizado. No nosso caso de exemplo, os links do topo não são renderizados.

<%= vimeo "466625359" %>

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. Vamos para o Slack onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

Para os exercícios de hoje é necessário realizar um fork de um repositório.

Esse comando copia um repositório do GitHub para a sua conta. Quando realizamos o git clone apenas o código é copiado para a nossa máquina, e qualquer alteração que fizer e pushar será adicionada ao repositório original. Com o fork um novo repositório é criado. Logo, todas as alterações que pushar serão feitas no novo repositório, e não no original. Veja este tutorial de como realizar um fork.

Após realizar o fork, realize o git clone desse seu repositório para a sua máquina.
O readme desse repositório contém as instruções de como realizar os exercícios, basta entrar na branch correta e começar a realizá-los, quando terminar abra um PR para ele!

### Exercício: Portfólio Web

Para esse exercício, tomaremos como base o nosso antigo portifólio - que foi feito em `HTML` e `CSS` puros no Bloco [3.1](https://app.betrybe.com/course/fundamentals/html-css/html-css-part-1) {: .external-link target="_blank" rel="noreferrer noopener" } - e o faremos novamente usando React e TDD!

O *README* do [repositório do Portfólio Web](https://www.github.com/tryber/exercise-portfolio-web) {: .external-link target="_blank" rel="noreferrer noopener" } tem as instruções mais detalhadas para o exercício.

---

## Recursos adicionais (opcional)

* [Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Video - Migrating from shallow rendering react components to explicit component mocks](https://www.youtube.com/watch?v=LHUdxkThTM0) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Router Example](https://testing-library.com/docs/example-react-router) {: .external-link target="_blank" rel="noreferrer noopener" }

* [History Docs](https://github.com/ReactTraining/history/tree/master/docs) {: .external-link target="_blank" rel="noreferrer noopener" }

* [RTL FAQ](https://testing-library.com/docs/react-testing-library/faq) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Sending Emails with ReactJS](https://blog.mailtrap.io/react-send-email/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Explore aqui as funcionalidades mais modernas da RTL!](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
