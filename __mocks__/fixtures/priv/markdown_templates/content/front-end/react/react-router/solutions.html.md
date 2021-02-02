## Gabarito dos exercícios

### Exercícios de fixação

[Link](https://github.com/tryber/comprehension-exercises-router) {: .external-link target="_blank" rel="noreferrer noopener" } para o repositório dos exercícios.

**1.** Torne a aplicação navegável, encapsulando o que é retornado pelo `App` dentro do componente `BrowserRouter`.

```language-react
  import React, { Component } from 'react';
  import { BrowserRouter } from 'react-router-dom';
  import Home from './Home';

  class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    }
  }

  export default App;
```

**2.** Agora, adicione dentro de `BrowserRouter` uma lista contendo 3 links:

  * um link que aponte para o caminho de _URL_ "/" contendo o texto `Home`;

  * um link que aponte para o caminho de _URL_ "/about" contendo o texto `About`;

  * um link que aponte para o caminho de _URL_ "/users" contendo o texto `Users`.

    ***Obs***.: averigue que os links estão atualizando a _URL_ do seu browser quando são clicados.

```language-react
  import React, { Component } from 'react';
  import { BrowserRouter, Link } from 'react-router-dom';
  import Home from './Home';

  class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul>
          </nav>
          <Home />
        </BrowserRouter>
      );
    }
  }

  export default App;
```

**3.** Substitua o componente `Home` por um `Route` que mapeia o caminho de _URL_ "/" para `Home`.

```language-react
  import React, { Component } from 'react';
  import { BrowserRouter, Link, Route } from 'react-router-dom';
  import Home from './Home';

  class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul>
          </nav>
          <Route path="/" component={Home}/>
        </BrowserRouter>
      );
    }
  }

  export default App;
```

**4.** Adicione uma rota que mapeie o caminho de _URL_ "/about" para o componente `About`. Acesse `http://localhost:3000/about` para ver se o componente `About` foi renderizado!

```language-react
  import React, { Component } from 'react';
  import { BrowserRouter, Link, Route } from 'react-router-dom';
  import Home from './Home';
  import About from './About';

  class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul>
          </nav>
          <Route path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </BrowserRouter>
      );
    }
  }

  export default App;
```

**5.** Legal, o componente `About` foi renderizado, mas o componente `Home` foi também, o que não era desejado para o nosso caso. 😭 Altere a forma como a correspondência de caminho da _URL_ está sendo feita para renderizar `Home`, de modo que `Home` **somente** seja renderizado se o caminho da _URL_ for **exatamente** igual a "/".

```language-react
  <Route exact path="/" component={Home}/>
  <Route exact path="/about" component={About}/>
```

**6.** Por fim, adicione uma rota que mapeie o caminho de _URL_ "/users" para o componente `Users`. Acesse `http://localhost:3000/users` para ver se **somente** o componente `Users` foi renderizado.

```language-react
  import React, { Component } from 'react';
  import { BrowserRouter, Link, Route } from 'react-router-dom';
  import Home from './Home';
  import About from './About';
  import Users from './Users';

  class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/users" component={Users}/>
        </BrowserRouter>
      );
    }
  }

  export default App;
```

**7.** Altere o componente `Users` para poder fazer o exercício a seguir.

```language-react
  // arquivo Users.js
  import React, { Component } from 'react';

  class Users extends Component {
    render() {
      const { greetingMessage = 'Hi There' } = this.props;
      return (
        <main>
          <h2> Users </h2>
          <p> { greetingMessage }, this is my awesome Users component </p>
        </main>
      );
    }
  }

  export default Users;
```

**8.** No componente `App` há uma rota que renderiza o componente `Users`. Altere a forma como ela renderiza o componente `Users`, passando para ele a prop `greetingMessage` com o valor igual a "Good Morning". Lembre-se de usar a prop correta no `Route`!

```language-react
  // App.js
  <Route exact path="/" component={ Home }/>
  <Route exact path="/about" component={ About }/>
  <Route exact path="/users" render={ () => <Users greetingMessage="Good Morning" /> }/>
```

**9.** Agora, para fixar uso de _URL_ com parâmetros, altere a rota, definindo o parâmetro chamado `id`. Depois, altere o componente `Users`, de modo que mostre no parágrafo o valor recebido para o parâmetro `id`. Teste se está funcionando invocando as urls `localhost:3000/users/10`, `localhost:3000/users/11` e `localhost:3000/users/100`, por exemplo.

Daqui para frente, utilize o componente `Switch`:

  `App.js`

```language-react
  import React, { Component } from 'react';
  import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
  import Home from './Home';
  import About from './About';
  import Users from './Users';

  class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/about" component={ About }/>
            <Route
              exact
              path="/users/:id"
              render={ (props) => <Users {...props} greetingMessage="Good Morning" /> }
            />
          </Switch>
        </BrowserRouter>
      );
    }
  }

  export default App;
```

  `Users.js`

```language-react
  import React, { Component } from 'react';

  class Users extends Component {
    render() {
      const {
        greetingMessage = 'Hi There',
        match: { params: { id }
      } } = this.props;

      return (
        <main>
          <h2> Users </h2>
          <p>
          { `${greetingMessage} User ${id}` }, this is my awesome Users component
          </p>
        </main>
      );
    }
  }

  export default Users;
```

**10.** No componente `App`, você deve possuir 3 rotas: uma para renderizar o componente `Home`, outra para renderizar `About`, e outra para renderizar `Users`, sendo que a última faz uso de parâmetro de _URL_. Encapsule essas 3 rotas em um componente `Switch` e ordene as rotas do mais específico para o mais genérico, começando de cima.

```language-react
  <Switch>
    <Route
      path="/users/:id"
      render={ (props) => <Users {...props} greetingMessage="Good Morning" /> }
    />
    <Route path="/about" component={ About }/>
    <Route exact path="/" component={ Home }/>
  </Switch>
```

Para os próximos exercícios, utilize o componente `Redirect`:

**11.** Adicione, no diretório `src`, um componente chamado `StrictAccess`. Como o próprio nome diz, esse componente é de acesso restrito, e ele deve receber um objeto `user` como props. Se `username` e `password` de `user` for "joao" e "1234", respectivamente, o componente `StrictAccess` renderiza um parágrafo que diz "Welcome joao!". Caso `username` ou `password` não sejam os valores esperados, o componente precisa gerar um alerta dizendo `Access denied` e redirecionar quem usa sua aplicação para a página principal.

```language-react
  // StrictAccess.js
  import React, { Component } from 'react';
  import { Redirect } from 'react-router-dom';

  class StrictAccess extends Component {
    render() {
      const { username, password } = this.props.user;
      if (!(username==='joao' && password === '1234')){
        alert('Access denied');
        return <Redirect to="/" />
      }
      return (
        <p>Welcome joao!</p>
      );
    }
  }

  export default StrictAccess;
```

**12.** Adicione no componente `App` um link que aponte para o caminho de _URL_ "/strict-access" contendo o texto `Strict Access`;

```language-react
  // App.js
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/strict-access">Strict Access</Link></li>
    </ul>
  </nav>
```

**13.** Adicione no componente `App` uma rota que mapeie o caminho de _URL_ "/strict-access" para o componente `StrictAccess`. Para poder testar o fluxo de autenticação, passe para a prop `user` de `StrictAccess` diferentes valores para as propriedades `username` e `password`.

```language-react
  // App.js
  <Switch>
    <Route
      path="/users/:id"
      render={ (props) => <Users {...props} greetingMessage="Good Morning" /> }
    />
    <Route
      path="/strict-access"
      render={ () => (
        <StrictAccess user={ { username: 'joao', password: '1234' } } />
      )}
    />
    <Route path="/about" component={ About }/>
    <Route exact path="/" component={ Home }/>
  </Switch>
```

### Pokedex navegável

***Atenção: Os arquivos de gabarito estão no fim da página, após os enunciados.***

**1 -** Ao carregar a aplicação no caminho de _URL_ "/", é preciso que seja mostrada a Pokédex.

**2 -** Adicione um link de navegação para o pokémon sendo mostrado pela Pokédex, de forma que quem usar a aplicação consiga clicar no link para ver mais detalhes do pokémon em questão. O nome do caminho da _URL_ fica a seu critério. Lembre-se que é preciso passar para a _URL_ um identificador do pokémon, de forma que cada pokémon seja unicamente associado com o caminho de _URL_. Ou seja, se você quer que os detalhes de um pokémon se encontrem no caminho de _URL_ `/pokemons`, você precisa passar para esse caminho um parâmetro de _URL_ para que somente um pokémon seja visualizado. Todo pokémon tem um `id` na Pokédex, logo você poderia usá-lo como parâmetro de _URL_ para permitir que quem usar sua aplicação consiga acessar detalhes do pokémon `Pikachu` via caminho de _URL_ `/pokemons/25`, onde `25` é o `id` do `Pikachu`. 🙂

**3 -** Crie um componente `PokemonDetails` para ser usado na visualização de mais detalhes do pokémon no passo anterior. É preciso que sejam mostradas as seguintes informações:
  * Nome do pokémon;

  * Tipo do pokémon;

  * Peso do pokémon, com sua devida medida de peso;

  * Sumário informativo a respeito do pokémon;

  * Mapa(s) que mostra(m) as possíveis localizações do pokémon.

**4 -** Adicione um conjunto *fixo* de links de navegação no topo de sua aplicação, de forma que ele esteja *sempre* disponível para quem fizer uso. De início, adicione um link que leve quem usa sua aplicação de volta para a Pokédex.

**5 -** Crie um componente `About` para ser usado na visualização que explica brevemente o que é uma Pokédex, com alguma imagem ilustrativa. Use esta [página](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex) {: .external-link target="_blank" rel="noreferrer noopener" } como inspiração. 🙂

**6 -** Adicione no conjunto *fixo* de links de navegação um link que permita levar quem usa sua aplicação para a visualização de explicação da Pokédex.

**7 -** Crie um componente `NotFound`, de forma que *somente* ele seja renderizado caso o caminho atual da _URL_ da aplicação não corresponda a rota alguma definida anteriormente.

### Bônus

Agora que você tem uma aplicação Pokédex navegável, que tal encarar estes bônus? 👀

**8 -** Permita que um pokémon consiga ser favoritado dentro de sua visualização de mais detalhes. Uma vez favoritado, adicione algum indicativo visual, de forma que quem ver o pokémon saiba que ele foi favoritado. O indicativo de que o pokémon foi favoritado precisa também aparecer na página principal, que mostra a Pokédex;

**9 -** Crie uma visualização que mostre somente os pokémons favoritados e torne-a acessível para quem a usar, criando um link para ela no conjunto **fixo** de links que você fez anteriormente;

**10 -** Salve os pokémons favoritados no local storage e recupere-os quando a aplicação for inicializada.

---

É mostrada em sequência uma sugestão de implementação da aplicação, já com todos os bônus. Os arquivos da solução se encontram dentro do diretório `./my-navegable-pokedex/`, onde `my-navegable-pokedex` é o nome do projeto criado com `create-react-app`.

<img class="rounded mx-auto d-block" src="/front-end/react/react-router/pokedex-react-router.gif" alt="Exemplo dos exercícios feitos" width="auto" height="300px">

`./my-navegable-pokedex/public/star-icon.svg`

```language-svg
<svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg">
  <path
    d="m510.652344
      185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844
      6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376
      1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281
      7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468
      21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0
      9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219
      5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219
      10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875
      11.351563-18.539063 7.980469-28.925781zm0 0"
    fill="#ffc107"
  />
</svg>
```

`./my-navegable-pokedex/src/components/about.css`

```language-css
.pokedex-image {
  width: 50%;
}
```

`./my-navegable-pokedex/src/components/About.js`

```language-react
import React from 'react';
import './about.css';

const About = () => (
  <section>
    <h2> About Pokédex </h2>
    <section>
      <p> This application simulates a Pokédex, a digital encliclopedia containing all Pokémons </p>
      <p> One can filter Pokémons by type, and see more details for each one of them </p>
      <img
        className="pokedex-image"
        src="https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"
        alt="Pokédex"
      />
    </section>
  </section>
);

export default About;
```

`./my-navegable-pokedex/src/components/button.css`

```language-css
.button-text {
  text-align: center;
  font-size: 15px;
  color: white;
  background-color: black;
  font-weight: 598;
}
```

`./my-navegable-pokedex/src/components/Button.js`

```language-react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './button.css';

class Button extends Component {
  render() {
    const { className, children, disabled, onClick } = this.props;
    return (
      <button
        onClick={onClick}
        className={`button-text ${className}`}
        disabled={disabled}
        type="button"
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  children: null,
  className: '',
  disabled: false,
};

export default Button;
```

`./my-navegable-pokedex/src/components/favorite-pokemons.css`

```language-css
.favorite-pokemons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.favorite-pokemon {
  margin: 20px;
}
```

`./my-navegable-pokedex/src/components/FavoritePokemons.js`

```language-react
import React from 'react';
import PropTypes from 'prop-types';

import { pokemonType } from '../types';
import Pokemon from './Pokemon';

import './favorite-pokemons.css';

class FavoritePokemons extends React.Component {
  static notFound() {
    return (
      <div>
        <p> No favorite pokemon found </p>
      </div>
    );
  }

  static renderFavoritePokemon(pokemon) {
    return (
      <div key={pokemon.id} className="favorite-pokemon">
        <Pokemon pokemon={pokemon} isFavorite />
      </div>
    );
  }

  renderFavoritePokemons() {
    const { pokemons } = this.props;
    const { renderFavoritePokemon } = FavoritePokemons;

    return (
      <div className="favorite-pokemons">
        {pokemons.map((pokemon) => renderFavoritePokemon(pokemon))}
      </div>
    );
  }

  render() {
    const { notFound } = FavoritePokemons;
    const { pokemons } = this.props;
    const isEmpty = pokemons.length === 0;

    return (
      <div>
        <h2> Favorite pokémons </h2>
        {isEmpty ? notFound() : this.renderFavoritePokemons()}
      </div>
    );
  }
}

FavoritePokemons.propTypes = {
  pokemons: PropTypes.arrayOf(pokemonType.isRequired),
};

FavoritePokemons.defaultProps = {
  pokemons: [],
};

export default FavoritePokemons;
```

`./my-navegable-pokedex/src/components/not-found.css`

```language-css
.not-found {
  width: 70%;
  margin: auto;
}

.not-found-image {
  width: 100%;
  max-width: 50%;
}
```

`./my-navegable-pokedex/src/components/NotFound.js`

```language-react
import React, { Component } from 'react';

import './not-found.css';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h2>
          Page requested not found
      <span role="img" aria-label="Crying emoji"> 😭 </span>
        </h2>
        <img
          className="not-found-image"
          src="https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"
          alt="Pikachu crying because the page requested was not found"
        />
      </div>
    );
  }
}

export default NotFound;
```

`./my-navegable-pokedex/src/components/pokedex.css`

```language-css
.pokedex {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 10px 10px;
  align-items: center;
}

.pokedex-buttons-panel {
  display: flex;
  flex-direction: row;
}

.pokedex-button {
  width: 100px;
  height: 50px;
  background-color: green;
}

.pokedex-button:disabled {
  background-color: #D0D0D0;
}

.filter-button {
  width: 80px;
  height: 50px;
  margin: 10px;
  background-color: orange;
}
```

`./my-navegable-pokedex/src/components/Pokedex.js`

```language-react
import React from 'react';
import PropTypes from 'prop-types';

import { isPokemonFavoriteByIdType, pokemonType } from '../types';
import Button from './Button';
import Pokemon from './Pokemon';
import './pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonIndex: 0, filteredType: 'all' };
  }

  filterPokemons(filteredType) {
    this.setState({ filteredType, pokemonIndex: 0 });
  }

  nextPokemon(numberOfPokemons) {
    this.setState((state) => (
      { pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons }
    ));
  }

  fetchFilteredPokemons() {
    const { pokemons } = this.props;
    const { filteredType } = this.state;

    return pokemons.filter((pokemon) => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

  fetchPokemonTypes() {
    const { pokemons } = this.props;

    return [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
  }

  render() {
    const { isPokemonFavoriteById } = this.props;
    const filteredPokemons = this.fetchFilteredPokemons();
    const pokemonTypes = this.fetchPokemonTypes();
    const { pokemonIndex } = this.state;
    const pokemon = filteredPokemons[pokemonIndex];

    return (
      <div className="pokedex">
        <Pokemon
          pokemon={pokemon}
          isFavorite={isPokemonFavoriteById[pokemon.id]}
        />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={() => this.filterPokemons('all')}
            className="filter-button"
          >
            All
          </Button>
          {pokemonTypes.map((type) => (
            <Button
              key={type}
              onClick={() => this.filterPokemons(type)}
              className="filter-button"
            >
              {type}
            </Button>
          ))}
        </div>
        <Button
          className="pokedex-button"
          onClick={() => this.nextPokemon(filteredPokemons.length)}
          disabled={filteredPokemons.length <= 1}
        >
          Próximo pokémon
        </Button>
      </div>
    );
  }
}

Pokedex.propTypes = {
  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,
  pokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
};

export default Pokedex;
```

`./my-navegable-pokedex/src/components/pokemon-details.css`

```language-css
.pokemon-details {
  width: 85%;
  margin: auto;
}
.pokemon-habitat {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.favorite-form {
  margin: 20px;
}
```

`./my-navegable-pokedex/src/components/pokemon.css`

```language-css
.pokemon {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
  margin: auto;
  min-width: 25%;
  border: 1px gray solid;
  border-radius: 10px;
}

.pokemon-overview {
  margin: 10px;
}

.favorite-icon {
  width: 20px;
  margin: 10px;
  align-self: start;
}
```

`./my-navegable-pokedex/src/components/Pokemon.js`

```language-react
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { pokemonType } from '../types';

import './pokemon.css';

class Pokemon extends React.Component {
  render() {
    const {
      pokemon: {
        averageWeight: {
          measurementUnit,
          value,
        },
        id,
        image,
        name,
        type,
      },
      showDetailsLink,
      isFavorite,
    } = this.props;

    return (
      <div className="pokemon">
        <div className="pokemon-overview">
          <p>{name}</p>
          <p>{type}</p>
          <p>
            {`Average weight: ${value} ${measurementUnit}`}
          </p>
          {showDetailsLink && <Link to={`pokemons/${id}`}> More details </Link>}
        </div>
        <img src={image} alt={`${name} sprite`} />
        {isFavorite && (
          <img
            className="favorite-icon"
            src="/star-icon.svg"
            alt={`${name} is marked as favorite`}
          />
        )}
      </div>
    );
  }
}

Pokemon.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  pokemon: pokemonType.isRequired,
  showDetailsLink: PropTypes.bool,
};

Pokemon.defaultProps = {
  showDetailsLink: true,
};

export default Pokemon;
```

`./my-navegable-pokedex/src/components/PokemonDetails.js`

```language-react
import React from 'react';
import PropTypes from 'prop-types';

import { isPokemonFavoriteByIdType, pokemonType } from '../types';
import Pokemon from './Pokemon';

import './pokemon-details.css';

class PokemonDetails extends React.Component {
  static renderHabitat({ foundAt, name }) {
    return (
      <section>
        <h2>
          {`Game Locations of ${name}`}
        </h2>
        <div className="pokemon-habitat">
          {foundAt.map(({ location, map }) => (
            <div key={location}>
              <img src={map} alt={`${name} location`} />
              <p>
                <em>{location}</em>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  static renderSummary({ summary }) {
    return (
      <section>
        <h2> Summary </h2>
        <p>
          {summary}
        </p>
      </section>
    );
  }

  constructor(props) {
    super(props);

    this.renderFavoriteInput = this.renderFavoriteInput.bind(this);
  }

  findPokemon(givenId) {
    const { pokemons } = this.props;

    return pokemons.find(({ id }) => id === givenId);
  }

  renderFavoriteInput(pokemonId, isFavorite) {
    const { onUpdateFavoritePokemons } = this.props;

    return (
      <form className="favorite-form">
        <label htmlFor="favorite">
          Pokémon favoritado?
          <input
            type="checkbox"
            id="favorite"
            checked={isFavorite}
            onChange={({ target: { checked } }) => onUpdateFavoritePokemons(pokemonId, checked)}
          />
        </label>
      </form>
    );
  }


  render() {
    const { renderHabitat, renderSummary } = PokemonDetails;
    const { renderFavoriteInput } = this;
    const {
      match: { params: { id } },
      isPokemonFavoriteById,
    } = this.props;

    const pokemon = this.findPokemon(parseInt(id, 10));
    const isFavorite = isPokemonFavoriteById[id];

    return (
      <section className="pokemon-details">
        <h2>
          {`${pokemon.name} Details`}
        </h2>
        <Pokemon pokemon={pokemon} showDetailsLink={false} isFavorite={isFavorite} />
        {renderSummary(pokemon)}
        {renderHabitat(pokemon)}
        {renderFavoriteInput(pokemon.id, isFavorite)}
      </section>
    );
  }
}

PokemonDetails.propTypes = {
  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdateFavoritePokemons: PropTypes.func.isRequired,
  pokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
};

export default PokemonDetails;
```

`./my-navegable-pokedex/src/services/pokedexService.js`

```language-react
export const readFavoritePokemonIds = () => (
  JSON.parse(localStorage.getItem('favoritePokemonIds')) || []
);

const saveFavoritePokemons = (pokemons) => (
  localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemons))
);

const addPokemonToFavorites = (pokemonId) => {
  const favoritePokemons = readFavoritePokemonIds();
  const newFavoritePokemons = [...favoritePokemons, pokemonId];

  saveFavoritePokemons(newFavoritePokemons);
};

const removePokemonFromFavorites = (pokemonId) => {
  const favoritePokemons = readFavoritePokemonIds();
  const newFavoritePokemons = favoritePokemons.filter((id) => id !== pokemonId);

  saveFavoritePokemons(newFavoritePokemons);
};

export const updateFavoritePokemons = (pokemonId, isFavorite) => (
  isFavorite ? addPokemonToFavorites(pokemonId) : removePokemonFromFavorites(pokemonId)
);
```

`./my-navegable-pokedex/src/types/index.js`

```language-react
import {
  arrayOf,
  bool,
  number,
  objectOf,
  shape,
  string,
} from 'prop-types';

export const isPokemonFavoriteByIdType = objectOf(bool);

export const pokemonType = shape({
  averageWeight: shape({
    measurementUnit: string,
    value: string,
  }),
  foundAt: arrayOf(shape({
    location: string,
    map: string,
  })),
  id: number,
  image: string,
  moreInfo: string,
  name: string,
  summary: string,
  type: string});
```

`./my-navegable-pokedex/src/App.css`:

```language-css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #09d3ac;
}

.link {
  margin-left: 20px;
  margin-right: 20px;
}
```

`./my-navegable-pokedex/src/App.js`

```language-react
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import About from './components/About';
import FavoritePokemons from './components/FavoritePokemons';
import NotFound from './components/NotFound';
import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';
import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from './services/pokedexService';

import pokemons from './data';

import './App.css';

class App extends React.Component {
  static setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});

    return isPokemonFavorite;
  }

  constructor(props) {
    super(props);
    this.state = { isPokemonFavoriteById: App.setIsPokemonFavoriteById() };
  }

  onUpdateFavoritePokemons(pokemonId, isFavorite) {
    updateFavoritePokemons(pokemonId, isFavorite);

    this.setState(({ isPokemonFavoriteById: App.setIsPokemonFavoriteById() }));
  }

  renderPokedex() {
    const { isPokemonFavoriteById } = this.state;

    return (
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    );
  }

  renderPokemonDetails(match) {
    const { isPokemonFavoriteById } = this.state;

    return (
      <PokemonDetails
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
        pokemons={pokemons}
        onUpdateFavoritePokemons={(pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        )}
      />
    );
  }

  renderRoutes() {
    const { isPokemonFavoriteById } = this.state;
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={({ match }) => this.renderPokedex(match)}
        />
        <Route
          path="/pokemons/:id"
          render={({ match }) => this.renderPokemonDetails(match)}
        />
        <Route path="/favorites" render={() => <FavoritePokemons pokemons={favoritePokemons} />} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <h1> Pokédex </h1>
        <nav>
          <Link className="link" to="/"> Home </Link>
          <Link className="link" to="/about"> About </Link>
          <Link className="link" to="/favorites"> Favorite Pokémons </Link>
        </nav>
        {this.renderRoutes()}
      </div>
    );
  }
}

export default App;
```

`./my-navegable-pokedex/src/index.css`

```language-css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
```

`./my-navegable-pokedex/src/index.js`

```language-react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
```
