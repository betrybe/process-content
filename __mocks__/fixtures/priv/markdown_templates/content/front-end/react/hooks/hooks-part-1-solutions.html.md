## Gabarito do exercícios

A seguir, encontra-se uma sugestão de solução para os exercícios propostos.

### Exercício 1

Refaça o exercício do repositório [exercise-react-hooks-refactoring](https://github.com/tryber/exercise-react-hooks-refactoring) {: .external-link target="_blank" rel="noreferrer noopener" } substituindo toda a lógica de classes para a lógica de _React Hooks_, deixando todos os componentes funcionais. Lembre-se de acessar a branch exercise-one , a estrutura da aplicação estará pronta para ser refatorada.

`src/context/Context.js`

```language-jsx
import React, { createContext, useState } from 'react';

const Context = createContext();

const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState({
    red: false,
    blue: false,
    yellow: false,
  });

  const moveCar = (car, side) => {
    setCars({
      ...cars,
      [car]: side,
    });
  };

  const context = { cars, moveCar };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

export { Context, CarsProvider as Provider };
```
{: .line-numbers}

`src/Cars.js`

```language-jsx
import React, { useContext } from 'react';
import { Context } from './context/Context';
import carBlue from './images/carBlue.jpeg';
import carRed from './images/carRed.jpeg';
import carYellow from './images/carYellow.jpeg';

const Cars = () => {
    const { cars, moveCar } = useContext(Context);
    const { red, blue, yellow } = cars; 
    return (
      <div>
        <div>
          <img
            className={red ? 'car-right' : 'car-left'}
            src={carRed}
            alt="red car"
          />
          <button
            onClick={() => moveCar('red', !red)}
            type="button"
          >
            Move
        </button>
        </div>
        <div>
          <img
            className={blue ? 'car-right' : 'car-left'}
            src={carBlue}
            alt="blue car"
          />
          <button
            onClick={() => moveCar('blue', !blue)}
            type="button"
          >
            Move
        </button>
        </div>
        <div>
          <img
            className={yellow ? 'car-right' : 'car-left'}
            src={carYellow}
            alt="yellow car"
          />
          <button
            onClick={() => moveCar('yellow', !yellow)}
            type="button"
          >
            Move
        </button>
        </div>
      </div>
    );
};

export default Cars;
```
{: .line-numbers}

`src/index.js`

```language-jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './context/Context';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```
{: .line-numbers}

### Exercício 2

Refatore o exercício 2 do repositório [exercise-react-hooks-refactoring](https://github.com/tryber/exercise-react-hooks-refactoring) {: .external-link target="_blank" rel="noreferrer noopener" }, como fez no exercício anterior, substituindo toda a lógica de classes para a lógica de _React Hooks_, deixando todos os componentes funcionais. Lembre-se de acessar a branch exercise-two , a estrutura da aplicação estará pronta para ser refatorada.

`src/context/Context.js`

```language-jsx
// src/context/Provider.js

import React, { createContext, useState } from 'react';

const Context = createContext();

const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState({
    red: false,
    blue: false,
    yellow: false,
  });
  const [signal, setColor] = useState({ color: 'red' });

  const moveCar = (car, side) => {
    setCars({
      ...cars,
      [car]: side,
    });
  };

  const changeSignal = (signalColor) => {
    setColor({ color: signalColor });
  };

  const context = { cars, moveCar, signal, changeSignal };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

export { Context, CarsProvider as Provider };
```
{: .line-numbers}

`src/TrafficSignal.js`

```language-jsx
import React, { useContext } from 'react';
import { Context } from './context/Context';
import redSignal from './images/redSignal.jpeg';
import yellowSignal from './images/yellowSignal.jpeg';
import greenSignal from './images/greenSignal.jpeg';

function renderSignal(signalColor) {
  if (signalColor === 'red') return redSignal;
  if (signalColor === 'yellow') return yellowSignal;
  if (signalColor === 'green') return greenSignal;
  return null;
};

const TrafficSignal = () => {
  const { signal, changeSignal } = useContext(Context);
  const { color } = signal;

  return (
    <div>
      <div className="button-container">
        <button onClick={() => changeSignal('red')} type="button">
          Red
          </button>
        <button onClick={() => changeSignal('yellow')} type="button">
          Yellow
          </button>
        <button onClick={() => changeSignal('green')} type="button">
          Green
          </button>
      </div>
      <img className="signal" src={renderSignal(color)} alt="" />
    </div>
  );
};

export default TrafficSignal;
```
{: .line-numbers}

### Bônus

### Exercício 3
Agora, refatore o exercício do repositório [exercise-react-hooks-refactoring](https://github.com/tryber/exercise-react-hooks-refactoring) {: .external-link target="_blank" rel="noreferrer noopener" }, também substituindo toda a lógica de classes para a lógica de _React Hooks_, deixando todos os componentes funcionais. Acesse a branch exercise-three, a estrutura da aplicação estará pronta para ser utilizada. Aproveite que ele possui testes e veja como é prático refatorar uma aplicação que já foi testada! E lembre-se: os bônus daquele exercício contam como bônus aqui também!

`src/TicTacToe.js`

```language-jsx
import React, { useState } from 'react';
import GameBoard from './GameBoard';

function TicTacToe() {
  const [activePlayer, setActivePlayer] = useState(1);
  const [gameBoard, setGameBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const toggleActivePlayer = () => setActivePlayer(activePlayer === 1 ? 2 : 1);

  const updateState = (cellClicked) => {
    if (gameBoard[cellClicked] !== 0) return false;

    let newGameBoard = [...gameBoard];
    newGameBoard[cellClicked] = activePlayer;
    setGameBoard(newGameBoard);
    toggleActivePlayer();
  };

  const victoryArchivedInLine = () => {
    for (let i = 0; i <= 6; i += 3) {
      if (
        gameBoard[i] === gameBoard[i + 1] &&
        gameBoard[i + 1] === gameBoard[i + 2] &&
        gameBoard[i] !== 0
      )
        return true;
    }
    return false;
  };

  const victoryArchivedInColumn = () => {
    for (let i = 0; i <= 2; i++) {
      if (
        gameBoard[i] === gameBoard[i + 3] &&
        gameBoard[i + 3] === gameBoard[i + 6] &&
        gameBoard[i] !== 0
      )
        return true;
    }
    return false;
  };

  const victoryArchivedInDiagonals = () => {
    if (gameBoard[4] === 0) return false;
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) return true;
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) return true;
    return false;
  };

  const victoryArchieved = () => {
    return (
      victoryArchivedInLine() || victoryArchivedInColumn() || victoryArchivedInDiagonals()
    );
  };

  if (victoryArchieved()) return <h1>Fim de Jogo</h1>;
  return <GameBoard gameState={gameBoard} updateGame={updateState} />;
}

export default TicTacToe;
```
{: .line-numbers}

`src/GameBoard.js`

```language-jsx
import React from 'react';
import GameCell from './GameCell';
import PropTypes from 'prop-types';
import './GameBoard.css';

function GameBoard({ gameState, updateGame }) {
  return (
    <div className="game-board">
      {gameState.map((playerId, i) => (
        <GameCell id={i} key={i} onClick={() => updateGame(i)} content={playerId} />
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  gameState: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateGame: PropTypes.func.isRequired,
};

export default GameBoard;
```
{: .line-numbers}

`src/GameCell.js`

```language-jsx
import React from 'react';
import PropTypes from 'prop-types';
import './GameCell.css';
import xImage from './x.png';
import oImage from './o.svg';

function GameCell({ content = 0, onClick, id }) {
  if (content === 1) {
    return (
      <div data-testid={`cell_${id}`} className="game-cell" onClick={onClick}>
        <img data-testid={`cell_${id}_image`} alt="X" src={xImage} />
      </div>
    );
    } else if (content === 2) {
    return (
      <div data-testid={`cell_${id}`} className="game-cell" onClick={onClick}>
        <img data-testid={`cell_${id}_image`} alt="O" src={oImage} />
      </div>
    );
  }
  return <div data-testid={`cell_${id}`} className="game-cell" onClick={onClick} />;
}

GameCell.defaultProps = {
  content: 0,
};

GameCell.propTypes = {
  content: PropTypes.oneOf([0, 1, 2]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GameCell;
```
{: .line-numbers}
