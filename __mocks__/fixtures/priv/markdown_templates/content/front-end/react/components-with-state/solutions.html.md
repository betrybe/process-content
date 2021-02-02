## Gabarito dos exercícios

1. Altere a sua página para que, ao invés de exibir toda a lista de pokémons, ela exiba um pokémon por vez. Ao apertar um botão de `Próximo pokémon`, a página passa a exibir o próximo pokémon da lista, e depois o próximo, e assim sucessivamente. Ao se chegar ao último pokémon da lista, a pokedex deve voltar para o primeiro pokémon no apertar do botão. Dica: Lembre-se [disso](https://pt-br.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous) {: .external-link target="_blank" rel="noreferrer noopener" }!

2. Sua pokedex deve ter dois botões contendo os tipos `Fire` e `Psychic`. A partir dessa seleção, a pokedex deve circular somente pelos pokémons daquele tipo. Quando a página carrega, um desses filtros deve estar selecionado.


### Bônus

Agora que você pegou todos os pokémons, consegue pegar todos os bônus?! *Não é fácil completar todos!*

* Separe os estilos de CSS _por componente_, fazendo um arquivo `.css` pra cada.

* Sua pokedex deve ter um terceiro botão chamado `All` para resetar o filtro. Após clicá-lo, a pokedex deve voltar a circular por todos os pokémons. Quando a página carrega, o filtro selecionado deve ser o `All`.

* Crie um componente `Button` e use-o para fazer os botões reutilizáveis da sua Pokedex. Dica: pesquise sobre o `this.props.children` do React!

* Faça os botões de filtragem serem dinâmicos: sua pokedex deve gerar um botão de filtragem para cada tipo de pokémon disponível nos dados, independente de quais ou quantos sejam, sem repetição de tipos. Ou seja, se sua pokedex possui pokémons do tipo `Fire`, `Psychic`, `Electric` e `Normal`, deve aparecer como opção de filtro um botão para cada um desses tipos. Além disso, ela deve manter o botão `All`.

* Faça o botão de `Próximo pokémon` ser desabilitado se a lista filtrada de pokémons tiver um só pokémon.

---

A seguir, temos possíveis soluções para a pokedex completa, já com todos os bônus.

<%= figure(%{src: "/front-end/react/components-with-state/pokedex.gif", caption: "Exemplo dos exercícios feitos", class: "rounded mx-auto d-block", width: "600px", height: "auto"}) %>

* Primeiramente, inicialize um projeto react com o `create-react-app`

* Em seguida, crie os seguintes componentes:

`Pokedex.js`

```language-javascript
import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemonIndex: 0, filteredType: 'all'};
  }

  filterPokemons(filteredType) {
    this.setState({filteredType, pokemonIndex: 0});
  }

  nextPokemon(numberOfPokemons) {
    this.setState(state => ({
      pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons,
    }));
  }

  fetchFilteredPokemons() {
    const {pokemons} = this.props;
    const {filteredType} = this.state;

    return pokemons.filter(pokemon => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

  fetchPokemonTypes() {
    const {pokemons} = this.props;

    return [...new Set(pokemons.reduce((types, {type}) => [...types, type], []))];
  }

  render() {
    const filteredPokemons = this.fetchFilteredPokemons();
    const pokemonTypes = this.fetchPokemonTypes();
    const pokemon = filteredPokemons[this.state.pokemonIndex];

    return (
      <div className="pokedex">
        <Pokemon pokemon={pokemon} />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={() => this.filterPokemons('all')}
            className="filter-button">
            All
          </Button>
          {pokemonTypes.map(type => (
            <Button
              key={type}
              onClick={() => this.filterPokemons(type)}
              className="filter-button">
              {type}
            </Button>
          ))}
        </div>
        <Button
          className="pokedex-button"
          onClick={() => this.nextPokemon(filteredPokemons.length)}
          disabled={filteredPokemons.length <= 1}>
          Próximo pokémon
        </Button>
      </div>
    );
  }
}

export default Pokedex;
```

`pokedex.css`

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

`Pokemon.js`

```language-javascript
import React from 'react';
import './pokemon.css';

class Pokemon extends React.Component {
  render() {
    const {name, type, averageWeight, image} = this.props.pokemon;

    return (
      <div className="pokemon">
        <div>
          <p>{name}</p>
          <p>{type}</p>
          <p>
            Average weight: `${averageWeight.value} ${averageWeight.measurementUnit}`
          </p>
        </div>
        <img src={image} alt={`${name} sprite`} />
      </div>
    );
  }
}

export default Pokemon;
```

`pokemon.css`

```language-css
.pokemon {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1 1 auto;
  min-width: 25%;
  margin: 10px 10px;
  border: 1px gray solid;
  border-radius: 10px;
}
```

`Button.js`

```language-javascript
import React from "react";
import "./button.css";

const Button = ({ className, children, disabled, onClick }) => (
  <button
    onClick={onClick}
    className={`button-text ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
```

`button.css`

```language-css
.button-text {
  text-align: center;
  font-size: 15px;
  color: white;
  background-color: black;
  font-weight: 598;
}
```
