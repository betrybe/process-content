## Gabarito dos exercícios

### Exercício Todo list

Aplicação Todo list pronta.

`src/App.js`

```language-react
import React, { Component } from 'react';
import InputTodo from './InputTodo';
import Item from './Item';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listTodo: [],
    };

    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(todo) {
    this.setState((state) => ({ listTodo: [...state.listTodo, todo] }));
  }

  render() {
    const { listTodo } = this.state;
    return (
      <div className="App">
        <InputTodo addTodo={(todo) => this.addTodo(todo)} />
        {listTodo
          && (
          <ul>
            {
              listTodo.map((todo) => (
                <li key={index + 1}>
                  <Item content={todo} />
                </li>
              ))
            }
          </ul>
          )}
      </div>
    );
  }
}
export default App;
```

`src/InputTodo.js`

```language-react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textTodo: '',
    };

    this.changeTextTodo = this.changeTextTodo.bind(this);
  }

  changeTextTodo(value) {
    this.setState({ textTodo: value });
  }

  addItem(value, callback) {
    this.setState({ textTodo: '' });
    callback(value);
  }

  render() {
    const { addTodo } = this.props;
    const { textTodo } = this.state;
    return (
      <div className="InputTodo">
        <label htmlFor="inputTodo">Tarefa:</label>
        <input
          id="inputTodo"
          type="text"
          value={textTodo}
          onChange={(e) => this.changeTextTodo(e.target.value)}
        />
        <input
          id="btnAdd"
          type="button"
          value="Adicionar"
          onClick={() => this.addItem(textTodo, addTodo)}
        />
      </div>
    );
  }
}
export default InputTodo;

InputTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
```

`src/Item.js`

```language-react
import React from 'react';
import PropTypes from 'prop-types';

function Item(props) {
  const { content } = props;
  return (
    <div className="Item">
      {content}
    </div>
  );
}

export default Item;

Item.propTypes = {
  content: PropTypes.string.isRequired,
};
```

`src/test/exerciseOne.test.js`

```language-react
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Testando a aplicação, testando botão, e sua funcionalidade', () => {
  test('Verifica se o botão está na tela com o texto "Adicionar"', () => {
    const { getByText } = render(<App />);
    const buttonAdd = getByText('Adicionar');
    expect(buttonAdd).toBeInTheDocument();
    expect(buttonAdd.type).toBe('button');
  });

  test('Verifica se ao ser clicado é adicionado o que o usuário digitou', () => {
    const { getByLabelText, queryByText } = render(<App />);

    const inputTask = getByLabelText('Tarefa:');
    const buttonAdd = queryByText('Adicionar');
    fireEvent.change(inputTask, { target: { value: 'Beber agua!' } });
    expect(queryByText('Beber agua!')).not.toBeInTheDocument();
    fireEvent.click(buttonAdd);
    expect(queryByText('Beber agua!')).toBeInTheDocument();
  });
});
```

`src/test/exerciseTwo.test.js`

```language-react
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import Item from '../Item';

describe('Testa a aplicação, e o input', () => {
  test('Testa a adição de vários itens a aplicação', () => {
    const listTodo = ['Realizar CR', 'Ler Post no Medium', 'Beber água'];

    const { getByLabelText, getByText } = render(<App />);
    const inputTask = getByLabelText('Tarefa:');
    const btnAdd = getByText('Adicionar');

    listTodo.forEach((task) => {
      fireEvent.change(inputTask, { target: { value: task } });
      fireEvent.click(btnAdd);
    });

    listTodo.forEach((task) => {
      expect(getByText(task)).toBeInTheDocument();
    });
  });
});

describe('Testa o Componente item', () => {
  test('Ao receber uma string na props ela precisa aparecer na tela.', () => {
    const { getByText } = render(<Item content="Limpar a casa" />);
    expect(getByText('Limpar a casa')).toBeInTheDocument();
  });
});
```

### Exercício Jogo da Velha

Aplicação jogo da velha pronta.

`src/App.js`

```language-react
import React from 'react';
import TicTacToe from './TicTacToe';
import './App.css';

function App() {
  return <TicTacToe />;
}

export default App;
```

`src/App.css`

```language-css
.App {
  text-align: center;
}
```

`src/TicTacToe.js`

```language-react
import React from 'react';
import GameBoard from './GameBoard';

class TicTacToe extends React.Component {
  static victoryArchivedInLine(gameBoard) {
    for (let i = 0; i <= 6; i += 3) {
      if (
        gameBoard[i] === gameBoard[i + 1]
        && gameBoard[i + 1] === gameBoard[i + 2]
        && gameBoard[i] !== 0
      ) return gameBoard[i];
    }
    return false;
  }

  static victoryArchivedInColumn(gameBoard) {
    for (let i = 0; i <= 2; i += 1) {
      if (
        gameBoard[i] === gameBoard[i + 3]
        && gameBoard[i + 3] === gameBoard[i + 6]
        && gameBoard[i] !== 0
      ) return gameBoard[i];
    }
    return false;
  }

  static victoryArchivedInDiagonals(gameBoard) {
    if (gameBoard[4] === 0) return false;
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
      return gameBoard[0];
    }
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
      return gameBoard[2];
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      activePlayer: 1,
      gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    this.updateState = this.updateState.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  resetGame() {
    this.setState({
      activePlayer: 1,
      gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
  }

  toggleActivePlayer() {
    const { activePlayer } = this.state;
    if (activePlayer === 1) return 2;
    return 1;
  }

  updateState(cellClicked) {
    this.setState((state) => {
      const newState = [...state.gameBoard];
      let newActivePlayer = state.activePlayer;

      if (state.gameBoard[cellClicked] === 0) {
        newState[cellClicked] = state.activePlayer;
        newActivePlayer = this.toggleActivePlayer();
      } else newState[cellClicked] = state.gameBoard[cellClicked];

      return {
        activePlayer: newActivePlayer,
        gameBoard: newState,
      };
    });
  }

  victoryArchieved() {
    const { gameBoard } = this.state;

    return (
      TicTacToe.victoryArchivedInLine(gameBoard)
      || TicTacToe.victoryArchivedInColumn(gameBoard)
      || TicTacToe.victoryArchivedInDiagonals(gameBoard)
    );
  }

  renderButton() {
    return (
      <button
        type="button"
        onClick={this.resetGame}
        data-testid="restart-button"
      >
        Recomeçar Jogo
      </button>
    );
  }

  render() {
    const { gameBoard } = this.state;
    const win = this.victoryArchieved();
    if (!gameBoard.includes(0)) {
      return (
        <>
          {this.renderButton()}
          <h1>Empate</h1>
        </>
      );
    }
    return (
      <>
        {this.renderButton()}
        {(!win)
          ? (
            <GameBoard
              gameState={gameBoard}
              updateGame={this.updateState}
            />
          )
          : <h1>{`Player ${win === 2 ? 'O' : 'X'} Ganhou`}</h1>}
      </>
    );
  }
}

export default TicTacToe;
```

`src/GameBoard.js`

```language-react
import React from 'react';
import PropTypes from 'prop-types';
import GameCell from './GameCell';
import './GameBoard.css';

class GameBoard extends React.Component {
  render() {
    const { gameState, updateGame } = this.props;
    return (
      <div className="game-board">
        {gameState.map((playerId, i) => (
          <GameCell
            id={i}
            key={i}
            onClick={() => updateGame(i)}
            content={playerId}
          />
        ))}
      </div>
    );
  }
}

GameBoard.propTypes = {
  gameState: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateGame: PropTypes.func.isRequired,
};

export default GameBoard;
```

`src/GameBoard.css`

```language-css
.game-board {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: 120px;
}
```

`src/GameCell.js`

```language-react
import React from 'react';
import PropTypes from 'prop-types';
import './GameCell.css';
import xImage from './x.png';
import oImage from './o.svg';

class GameCell extends React.Component {
  render() {
    const { content, onClick, id } = this.props;

    if (content === 1) {
      return (
        <div
          data-testid={`cell_${id}`}
          className="game-cell"
          onClick={onClick}
          role="button"
          tabIndex="0"
          aria-label="Cell"
          onKeyPress={onClick}
        >
          <img data-testid={`cell_${id}_image`} alt="X" src={xImage} />
        </div>
      );
    }
    if (content === 2) {
      return (
        <div
          data-testid={`cell_${id}`}
          className="game-cell"
          onClick={onClick}
          role="button"
          tabIndex="0"
          aria-label="Cell"
          onKeyPress={onClick}
        >
          <img data-testid={`cell_${id}_image`} alt="O" src={oImage} />
        </div>
      );
    }
    return (
      <div
        role="button"
        tabIndex="0"
        aria-label="Cell"
        onKeyPress={onClick}
        data-testid={`cell_${id}`}
        className="game-cell"
        onClick={onClick}
      />
    );
  }
}

GameCell.propTypes = {
  content: PropTypes.oneOf([0, 1, 2]),
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

GameCell.defaultProps = {
  content: 0,
};
export default GameCell;
```

`src/GameCell.css`

```language-css
.game-cell {
  border: 1px solid black;
  height: 38px;
  width: 38px;
}

img {
  width: 100%;
}
```

`src/TicTacToe.test.js`

```language-react
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';

afterEach(cleanup);

describe("gameboard's starting status", () => {
  test('renders nine game cells', () => {
    const { getByTestId } = render(<TicTacToe />);

    for (let i = 0; i <= 8; i += 1) {
      expect(getByTestId(`cell_${i}`)).toBeDefined();
    }
  });

  test('renders game board, at first, without any symbols', () => {
    const { queryByAltText } = render(<TicTacToe />);
    expect(queryByAltText('X')).toBeNull();
    expect(queryByAltText('O')).toBeNull();
  });

  test("renders no 'Player O Ganhou' message at game's start", () => {
    const { queryByText } = render(<TicTacToe />);

    expect(queryByText('Player O Ganhou')).toBeNull();
  });
});

describe("gamecell's behaviour", () => {
  test('clicking a game cell creates a symbol in it and nowhere else', () => {
    const { getByTestId, getAllByAltText, queryByAltText } = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    expect(getAllByAltText('X')).toHaveLength(1);
    expect(queryByAltText('O')).toBeNull();

    fireEvent.click(getByTestId('cell_1'));
    expect(getAllByAltText('X')).toHaveLength(1);
    expect(getAllByAltText('O')).toHaveLength(1);

    fireEvent.click(getByTestId('cell_2'));
    expect(getAllByAltText('X')).toHaveLength(2);
    expect(getAllByAltText('O')).toHaveLength(1);
  });

  test("toggles symbols when clicking the cells starting by 'X'", () => {
    const {
      getByTestId, getByAltText, getAllByAltText, queryByTestId,
    } = render(
      <TicTacToe />,
    );

    fireEvent.click(getByTestId('cell_0'));
    expect(getByAltText('X')).toBeDefined();

    fireEvent.click(getByTestId('cell_1'));
    expect(getByAltText('O')).toBeDefined();

    fireEvent.click(getByTestId('cell_2'));
    expect(queryByTestId('cell_2_image')).toBeDefined();
    expect(getAllByAltText('X')).toHaveLength(2);
  });

  test("doesn't toggle symbols when clicking cells already filled", () => {
    const { getByTestId, getByAltText, queryByAltText } = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    expect(getByAltText('X')).toBeDefined();

    fireEvent.click(getByTestId('cell_0'));
    fireEvent.click(getByTestId('cell_2'));
    expect(queryByAltText('O')).not.toBeNull();
  });

  test("doesn't alter older symbols when clicking on new cells", () => {
    const { getByTestId, getByAltText, getAllByAltText } = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    const cellZeroImage = getByTestId('cell_0_image');
    expect(cellZeroImage).toEqual(getByAltText('X'));

    fireEvent.click(getByTestId('cell_1'));
    const cellOneImage = getByTestId('cell_1_image');
    expect(cellZeroImage).toEqual(getByAltText('X'));
    expect(cellOneImage).toEqual(getByAltText('O'));

    fireEvent.click(getByTestId('cell_2'));
    const cellTwoImage = getByTestId('cell_2_image');
    expect(cellZeroImage).toEqual(getAllByAltText('X')[0]);
    expect(cellOneImage).toEqual(getByAltText('O'));
    expect(cellTwoImage).toEqual(getAllByAltText('X')[1]);
  });

  test("doesn't change a cell's symbol if it's clicked twice", () => {
    const { getByTestId, getByAltText, queryByAltText } = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    const cellZeroImage = getByTestId('cell_0_image');
    expect(cellZeroImage).toEqual(getByAltText('X'));

    fireEvent.click(getByTestId('cell_0'));
    expect(cellZeroImage).toEqual(queryByAltText('X'));
  });
});

const winnerSymbols = ['X', 'O'];

winnerSymbols.forEach((winnerSymbol) => {
  describe(`victory conditions for Player ${winnerSymbol}`, () => {
    const getStartOfAnotherLine = (cellId) => {
      if (cellId >= 0 && cellId <= 2) return 3;
      if (cellId >= 3 && cellId <= 5) return 6;
      return 0;
    };

    const firstCellsOfLines = [0, 3, 6];
    firstCellsOfLines.forEach((cellId) => {
      test(`same symbols in a line archive victory starting at cell ${cellId}`,
        () => {
          const opponentsLine = getStartOfAnotherLine(cellId);
          const { getByTestId, queryByText } = render(<TicTacToe />);

          if (winnerSymbol === 'O') {
            const cellNotRelatedToVictory = getStartOfAnotherLine(opponentsLine);
            fireEvent.click(getByTestId(`cell_${cellNotRelatedToVictory}`));
          }

          fireEvent.click(getByTestId(`cell_${cellId}`));
          fireEvent.click(getByTestId(`cell_${opponentsLine}`));
          fireEvent.click(getByTestId(`cell_${cellId + 1}`));
          fireEvent.click(getByTestId(`cell_${opponentsLine + 1}`));
          fireEvent.click(getByTestId(`cell_${cellId + 2}`));
          const winPlayer = winnerSymbol === 'O' ? 'O' : 'X';
          expect(queryByText(`Player ${winPlayer} Ganhou`)).not.toBeNull();
        });
    });

    const getStartOfAnotherColumn = (cellId) => {
      if (cellId === 0 || cellId === 3 || cellId === 6) return 1;
      if (cellId === 1 || cellId === 4 || cellId === 7) return 2;
      return 0;
    };

    const firstCellsOfColumns = [0, 1, 2];
    firstCellsOfColumns.forEach((cellId) => {
      test(`same symbols in a column archive victory starting at column ${cellId}`, () => {
        const opponentsColumn = getStartOfAnotherColumn(cellId);
        const { getByTestId, queryByText } = render(<TicTacToe />);

        if (winnerSymbol === 'O') {
          const cellNotRelatedToVictory = getStartOfAnotherColumn(opponentsColumn);
          fireEvent.click(getByTestId(`cell_${cellNotRelatedToVictory}`));
        }

        fireEvent.click(getByTestId(`cell_${cellId}`));
        fireEvent.click(getByTestId(`cell_${opponentsColumn}`));
        fireEvent.click(getByTestId(`cell_${cellId + 3}`));
        fireEvent.click(getByTestId(`cell_${opponentsColumn + 3}`));
        fireEvent.click(getByTestId(`cell_${cellId + 6}`));
        const winPlayer = winnerSymbol === 'O' ? 'O' : 'X';
        expect(queryByText(`Player ${winPlayer} Ganhou`)).not.toBeNull();
      });
    });

    test('same symbols on left to right diagonal archive victory', () => {
      const { getByTestId, queryByText } = render(<TicTacToe />);

      if (winnerSymbol === 'O') fireEvent.click(getByTestId('cell_5'));
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_2'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_8'));
      const winPlayer = winnerSymbol === 'O' ? 'O' : 'X';
      expect(queryByText(`Player ${winPlayer} Ganhou`)).not.toBeNull();
    });

    test('same symbols on right to left diagonal archive victory', () => {
      const { getByTestId, queryByText } = render(<TicTacToe />);

      if (winnerSymbol === 'O') fireEvent.click(getByTestId('cell_8'));
      fireEvent.click(getByTestId('cell_2'));
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_6'));
      const winPlayer = winnerSymbol === 'O' ? 'O' : 'X';
      expect(queryByText(`Player ${winPlayer} Ganhou`)).not.toBeNull();
    });
  });
  describe('bonus case', () => {
    test('test draw game', () => {
      const { getByTestId, queryByText } = render(<TicTacToe />);
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_1'));
      fireEvent.click(getByTestId('cell_2'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_7'));
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_5'));
      fireEvent.click(getByTestId('cell_8'));
      fireEvent.click(getByTestId('cell_6'));

      expect(queryByText('Empate')).not.toBeNull();
    });
    test('draw game restart test', () => {
      const { getByTestId, queryByText, queryByAltText } = render(<TicTacToe />);
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_1'));
      fireEvent.click(getByTestId('cell_2'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_7'));
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_5'));
      fireEvent.click(getByTestId('cell_8'));
      fireEvent.click(getByTestId('cell_6'));

      expect(queryByText('Empate')).not.toBeNull();

      fireEvent.click(getByTestId('restart-button'));
      expect(queryByText('Empate')).toBeNull();
      expect(queryByAltText('X')).toBeNull();
      expect(queryByAltText('O')).toBeNull();
    });
    test('mid-game restart test', () => {
      const { getByTestId, queryByAltText } = render(<TicTacToe />);
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_1'));
      fireEvent.click(getByTestId('cell_2'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_7'));
      fireEvent.click(getByTestId('restart-button'));
      expect(queryByAltText('X')).toBeNull();
      expect(queryByAltText('O')).toBeNull();
    });
    test('win-game X restart test', () => {
      const { getByTestId, queryByAltText, queryByText } = render(<TicTacToe />);
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_1'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_2'));
      expect(queryByText('Player X Ganhou')).not.toBeNull();
      fireEvent.click(getByTestId('restart-button'));
      expect(queryByAltText('X')).toBeNull();
      expect(queryByAltText('O')).toBeNull();
    });
    test('win-game O restart test', () => {
      const { getByTestId, queryByAltText, queryByText } = render(<TicTacToe />);
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_1'));
      fireEvent.click(getByTestId('cell_8'));
      fireEvent.click(getByTestId('cell_2'));
      expect(queryByText('Player O Ganhou')).not.toBeNull();
      fireEvent.click(getByTestId('restart-button'));
      expect(queryByAltText('X')).toBeNull();
      expect(queryByAltText('O')).toBeNull();
    });
  });
});
```
