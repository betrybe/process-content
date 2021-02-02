## O que vamos aprender?

<%= vimeo "460037983" %>

Até então, você aprendeu como criar aplicações ***React*** via:

* composição de componentes;

* gerenciamento de estado e de ciclo de vida de componentes;

* captura de eventos no contexto de ***React***.

Para inicializar sua aplicação ***React***, você executa o comando `npm start`, acessa `http://localhost:3000/`, e toda a interação com a aplicação se dá nessa *URL*.

Agora, você já parou para pensar em como prover *navegação* entre páginas em uma aplicação ***React***? Por exemplo:

 * suponha que, na página inicial de sua aplicação ***React***, haja uma lista de produtos vendidos, e deseja-se que cada um desses produtos seja clicável, de forma que, uma vez clicado, seus detalhes sejam mostrados a quem usar sua aplicação. Como você *levaria* quem usa sua aplicação para ver esses detalhes?

 * como você provê a opção de voltar/avançar *URL* em sua aplicação ***React***?

 * como você disponibiliza a opção de poder favoritar *URL* em sua aplicação ***React***?

De forma a responder a essas perguntas, você aprenderá nesta aula como fazer uso de `React Router`, que permite tornar sua aplicação ***React*** navegável, e também, aprenderá a utilizar `props.children` que permite a você flexibilizar a lógica de um componente, garantindo que ele possa ser usado de várias formas e em vários contextos diferentes, sempre de forma legível e com sintaxe simples.

**Você utilizará React Router Dom quase todos os dias dentro do front-end na Trybe daqui pra frente, então mantenha o foco!**

<img class="rounded mx-auto d-block" src="/front-end/react/react-router/focus.webp" alt="Gif exibindo um cachorro balançando as patas em frente ao notebook" width="auto" height="300px">

---

### Você será capaz de:

* Utilizar o `props.children` para acessar os filhos de um componente React e interagir com eles;

* Utilizar o componente `BrowserRouter` corretamente;

* Criar links de navegação na aplicação com o componente `Link`;

* Criar rotas, mapeando o caminho da _URL_ com o componente correspondente, via `Route`;

* Estruturar e organizar as rotas da sua aplicação com o componente `Switch`;

* Usar o componente `Redirect` pra alternar entre rotas.

---

## Por que isso é importante?

Ao tornar sua aplicação ***React*** navegável, `React Router` possibilita uma melhor experiência para quem fizer uso de sua aplicação, criando páginas com estruturas sofisticadas e intuitivas. Além disso, a boa utilização da props.children é essencial no desenvolvimento de Apps complexos e reutilizáveis.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Single Page Application

Antes de começar a falar sobre `React Router`, é preciso entender um tipo de aplicação chamado `Single Page Application` (`SPA`), haja vista que aplicações em `React Router` são `SPA`s. Logo, assista a este vídeo, que explica o conceito e o funcionamento de uma `SPA`.

<%= vimeo "460038827" %>

### props.children

Children é uma ótima ferramenta para reutilização de componentes. A utilização é bem simples, veja abaixo:

```language-react
class App extends Component {
  render() {
    return (
      <div className='main'>
        <ComponentePai>
          <p>SUPIMPA</p>
        </ComponentePai>
      </div>
    )
  }
}
```

E dessa forma podemos acessar e exibir na tela o valor `SUPIMPA` no `ComponentePai`:

```language-react
const ComponentePai = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}
```

Nesse exemplo utilizamos uma tag `p`, mas note que poderia ser um ou vários elementos de qualquer natureza, seja uma tag, ou até um componente. Ainda sim, ela é acessada da mesma forma dentro de `ComponentePai`. É importante perceber que, no caso acima, `props.children` é um **objeto** por ser apenas um elemento. Caso o `ComponentePai` esteja com mais de um elemento dentro como no exemplo abaixo, `props.children` se torna um **array de objetos**, com as informações de cada filho.

```language-react
class App extends Component {
  render() {
    return (
      <div className='main'>
        <ComponentePai>
          <p>SUPIMPA</p>
          <h1>BACANA</h1>
          <span>INCRÍVEL</span>
        </ComponentePai>
      </div>
    )
  }
}
```

### Instalação React Router Dom

Para poder fazer uso de `React Router`, é preciso que se instale em uma aplicação ***React*** o pacote [react-router-dom:](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) {: .external-link target="_blank" rel="noreferrer noopener" }

```language-shell
npm install react-router-dom
```

### Componentes `BrowserRouter` e `Route`

Agora, assista a este vídeo, que fala a respeito dos componentes `BrowserRouter` e `Route` e sobre como fazer uso deles em conjunto:

<%= vimeo "460036023" %>

Em suma:

1. `BrowserRouter` é o componente que encapsula a sua aplicação, de forma a te possibilitar fazer uso de navegação.

2. `Route` é o componente fundamental em `React Router`, que estabelece o mapeamento entre o caminho de _URL_ declarado com o componente. Tal mapeamento, no que diz respeito à correspondência entre o caminho da _URL_ atual e a presente no componente, pode ser feito das seguintes formas, ilustradas pelos seguintes exemplos:

  * `<Route path="/about" component={About} />`: lê-se que se o caminho da _URL_ atual do navegador *começa* com o caminho `/about`, como declarado na prop `path` no componente `Route`, há uma correspondência entre os caminhos da _URL_ e do componente `Route`, e o componente `About` será renderizado. Ou seja, se o caminho da _URL_ atual for `/home`, não há correspondência, logo o componente `About` não será renderizado. Entretanto, se a _URL_ atual for `/about` ou `/about/me`, há correspondência, e o componente `About` é renderizado. O parâmetro **exact** entra em ação quando você tem vários caminhos com nomes semelhantes.

  * `<Route exact path="/about" component={About} />`: lê-se que, se houver uma correspondência **exata** entre o caminho da _URL_ atual e o caminho `/about` declarado em `Route`, o componente será renderizado. Ou seja, se o caminho da _URL_ atual for `/home` ou `/about/me`, não há correspondência exata, logo o componente `About` não será renderizado. Entretanto, se a _URL_ atual for `/about`, há correspondência exata, e o componente `About` será renderizado.

  * _OBS_: Além dessas duas formas de renderização de componente com `Route`, você pode fazer uso de elemento `children`. Ou seja, se você tiver a rota `<Route path="/about" component={About} />`, você também poderá fazer da seguinte forma:

```language-react
    <Route path="/about" >
      <About />
    </Route>
```

3. Se houver vários componentes apresentando correspondência entre seu caminho de _URL_ e o caminho atual da aplicação, **todos os componentes apresentando correspondência serão renderizados**. Ou seja, suponha que houvesse a seguinte lista de componentes do tipo `Route`:

```language-react
<Route path="/about" component={About} />
<Route path="/contact" component={Contact} />
<Route path="/" component={Home} />
```

  * Se o caminho atual da _URL_ da aplicação for `/`, **todos** esses componentes serão renderizados, haja vista que todas as rotas **não** fazem correspondência exata entre o caminho da _URL_ atual e o definido via prop `path`, e fazer `path="/"` faz correspondência com qualquer caminho de _URL_;

  * Agora, se o caminho atual da _URL_ da aplicação for `/contact`, os componentes `Contact` e `Home` serão renderizados. Isso pode ser um problema, e uma forma de atacá-lo é organizar essas rotas via componente `Switch`, que você verá com mais detalhes em instantes. 😉


### Componente `Link`

Agora, vamos ver um vídeo em que o `Link` é utilizado e que mostra como a navegação funciona por meio do `React Router`:

<%= vimeo "460038333" %>

No vídeo acima, vimos que `Link` é o componente a ser usado no lugar de elementos com a tag `a`, de forma a disponibilizar navegação por _URL_ na sua aplicação `SPA` sem o recarregamento de página que a tag `a` exige. Ou seja, se você quiser definir um link que leve quem usa sua aplicação para a _URL_ com o caminho `/about`, você poderia chamar o componente `Link` da seguinte forma:

```language-react
<Link to="/about" > About </Link>
```

E lembre-se: palavras, imagens, até mesmo outros componentes podem ser componentes filhos do `Link`! Ser filho do `Link` significa que, se você clicar neste filho, irá para onde o `Link` te direciona!

#### Para fixar

Faça os exercícios 1 a 6 deste **[repositório.](https://github.com/tryber/comprehension-exercises-router) {: .external-link target="_blank" rel="noreferrer noopener" }**

### Componentes `Route` com passagem de props

Assista a este vídeo, que fala a respeito de como fazer uso de parâmetros de _URL_ em componentes do tipo `Route`:

<%= vimeo "460043947" %>

Vamos recapitular o que você aprendeu até aqui:

* No que diz respeito ao componente `Route`, você pode associar um componente com o caminho da _URL_ via `children`, `component` **ou** `render`;

* Faz-se uso da prop `component` de `Route` quando **não é necessário** passar informações adicionais via props para o componente a ser mapeado. Ou seja, se você tem um componente `About` que não precisa de props setadas para ser chamado, e você precisa mapeá-lo para o caminho de _URL_ `/about`, você poderia criar uma rota da seguinte forma: `<Route path="/about" component={About} />`;

* Já a prop `render` de `Route` é usada quando **é necessário** passar informações adicionais via props para o componente a ser mapeado. Ou seja, se você tem um componente `Movies` que precisa receber uma lista de filmes via props `movies`, e você precisa mapeá-lo para o caminho de _URL_ `/movies`, você poderia criar uma rota da seguinte forma: `<Route path="/movies" render={(props) => <Movies {...props} movies={['Cars', 'Toy Story', 'The Hobbit']} />} />`;

* Tanto `component` quanto `render` permitem que você tenha acesso a informações de rota (`match`, `location` e `history`) via props do componente que você está mapeando. Ou seja, se você tem a rota `<Route path="/about" component={About} />`, `About` terá `match`, `location` e `history` setadas via props.

### Componentes `Route` com passagem de parâmetro (rotas dinâmicas)

O interessante em rotas dinâmicas é que podemos utilizar o mesmo componente para renderizar vários caminhos diferentes. Para fazer uso de parâmetro de _URL_ em `Route`, é preciso fazer uso da sintaxe `:nome_do_parametro` dentro da propriedade `path`. Ou seja, `<Route path="/movies/:movieId" component={Movie} />` vai definir um parâmetro chamado `movieID`, e o componente `Movie` é mapeado a qualquer um dos seguintes caminhos de _URL_:

  * `/movies/1`;

  * `/movies/2`;

  * `/movies/thor`.

#### Para fixar

Faça os exercícios 7 a 9 deste **[repositório.](https://github.com/tryber/comprehension-exercises-router) {: .external-link target="_blank" rel="noreferrer noopener" }**

### Componente `Switch`

O componente `Switch` é usado para encapsular um conjunto de rotas que você definiu via `Route`.

Dada a _URL_ atual da aplicação, o `Switch` procura **de cima para baixo** pelo **primeiro** `Route` que possuir correspondência entre seu caminho definido na prop `path` do componente e a _URL_ atual da aplicação. Ou seja, se tivermos um `Switch` com as rotas abaixo:

```language-react
<Switch>
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route path="/movies" component={Movies} />
  <Route path="/" component={Home} />
</Switch>
```

Ao mudarmos a _URL_ da aplicação para que seu caminho seja `/contact`, **somente** o componente `Contact` será renderizado.

Todos os filhos de um `Switch` devem ser `Route` ou `Redirect`. Apenas o primeiro filho que corresponder ao local atual será renderizado. Se não houvesse o `Switch` mais de um componente poderia ser renderizado na mesma rota de forma errada.

Em uma comparação direta, é como o `switch case` do `javascript`:

**É apenas uma comparação, não utilize o exemplo abaixo.**

```language-react
  switch (rota) {
    case '/about':
      return <About />;
    case '/contact':
      return <Contact />;
    case '/movies':
      return <Movies />;
    default:
      return <Home />
  }
```

### Componente `Redirect`

Conforme o próprio nome diz, `Redirect` é um componente que permite **ativamente** levar quem usa a aplicação para diferentes locais dela. Um caso de uso bastante comum de `Redirect` é autenticação: a pessoa só pode acessar informações sensíveis (tipo conta bancária) de uma aplicação *se* ela já estiver autenticada; caso contrário, ela é *redirecionada* para uma página de login.

De sempre **prioridade** para a utilização de `Redirect` para redirecionar, uma vez que, ele é criado para isso.

#### Para fixar

Faça os exercícios 10 a 13 deste **[repositório.](https://github.com/tryber/comprehension-exercises-router) {: .external-link target="_blank" rel="noreferrer noopener" }**

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver como utilizar tudo que aprendemos até agora sobre **React Router**.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

Realize os exercícios da **[Pokédex](https://github.com/tryber/exercise-pokedex-router) {: .external-link target="_blank" rel="noreferrer noopener" }** para torna-lá **navegável**, exatamente da forma como vimos no vídeo de introdução ao React!

---

## Recursos adicionais (opcional)

* [Handling 404 pages (catch all routes) with React Router v4](https://tylermcginnis.com/react-router-handling-404-pages/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [URL Parameters with React Router v4](https://tylermcginnis.com/react-router-url-parameters/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Ambiguous Matches with React Router v4](https://tylermcginnis.com/react-router-ambiguous-matches/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [URL Parameters with React Router](https://tylermcginnis.com/react-router-url-parameters/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Router v4: Philosophy and Introduction](https://tylermcginnis.com/react-router-philosophy-introduction/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Documentação do React Router](https://reacttraining.com/react-router/web/guides/quick-start) {: .external-link target="_blank" rel="noreferrer noopener" }

* [prop `match` disponbilizada pelo componente `Route`](https://reacttraining.com/react-router/web/api/match) {: .external-link target="_blank" rel="noreferrer noopener" }

* [prop `location` disponbilizada pelo componente `Route`](https://reacttraining.com/react-router/web/api/location) {: .external-link target="_blank" rel="noreferrer noopener" }

* [prop `history` disponbilizada pelo componente `Route`](https://reacttraining.com/react-router/web/api/history) {: .external-link target="_blank" rel="noreferrer noopener" }

* [A Simple React Router v4 Tutorial](https://blog.pshrmn.com/simple-react-router-v4-tutorial/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Fragments](https://reactjs.org/docs/fragments.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
