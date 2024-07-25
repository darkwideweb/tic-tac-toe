import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Modal from './Modal';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isChoosing, setIsChoosing] = useState(true);
  const [isPlayingWithComputer, setIsPlayingWithComputer] = useState(false);

  // Обработчик кликов
  const handleClick = useCallback((i) => {
    const historyUpToStep = history.slice(0, stepNumber + 1);
    const current = historyUpToStep[historyUpToStep.length - 1];
    const squares = current.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyUpToStep.concat([squares]));
    setStepNumber(historyUpToStep.length);
    setXIsNext(!xIsNext);
  }, [history, stepNumber, xIsNext]);

  // Обработчик хода компьютера
  const handleComputerMove = useCallback(() => {
    const current = history[stepNumber];
    const emptySquares = current
      .map((square, index) => (square === null ? index : -1))
      .filter(index => index !== -1);
    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    handleClick(randomIndex);
  }, [history, stepNumber, handleClick]);

  // Эффект для хода компьютера
  useEffect(() => {
    if (!xIsNext && isPlayingWithComputer) {
      handleComputerMove();
    }
  }, [xIsNext, isPlayingWithComputer, handleComputerMove]);

  // Обновление счета при победе
  useEffect(() => {
    const current = history[stepNumber];
    const winner = calculateWinner(current);
    if (winner) {
      setScore(prevScore => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1
      }));
    }
  }, [history, stepNumber]);

  // Перейти к конкретному шагу
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // Перезапуск игры
  const restartGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
    setShowRestartModal(false);
  };

  // Отмена последнего хода
  const undoMove = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
      setHistory(history.slice(0, history.length - 1));
      setXIsNext(!xIsNext);
    }
  };

  // Выбор символа игрока
  const chooseSymbol = (symbol) => {
    setXIsNext(symbol === 'X');
    setIsChoosing(false);
  };

  // Обработка выбора режима игры
  const handleModeChange = (event) => {
    const playWithComputer = event.target.value === 'computer';
    setIsPlayingWithComputer(playWithComputer);
    restartGame();
  };

  // Определение текущего состояния
  const current = history[stepNumber];
  const winner = calculateWinner(current);
  let status;
  if (winner) {
    status = 'Победитель: ' + winner;
  } else if (stepNumber === 9) {
    status = 'Ничья';
  } else {
    status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O');
  }

  if (isChoosing) {
    return (
      <div className="game">
        <div className="choose-symbol">
          <h2>Выберите ваш символ:</h2>
          <button className="button symbol-button" onClick={() => chooseSymbol('X')}>X</button>
          <button className="button symbol-button" onClick={() => chooseSymbol('O')}>O</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-info">
        <div className="scoreboard">
          <p>Счет - X: {score.X} O: {score.O}</p>
        </div>
        <div className="status">{status}</div>
        <button className="button" onClick={undoMove}>Отменить последний ход</button>
        <button className="button" onClick={() => setShowModal(true)}>История</button>
        <button className="button" onClick={() => setShowRestartModal(true)}>Перезапустить игру</button>
        <div className="mode-selector">
          <label>
            <input
              type="radio"
              value="twoPlayers"
              checked={!isPlayingWithComputer}
              onChange={handleModeChange}
            />
            Два игрока
          </label>
          <label>
            <input
              type="radio"
              value="computer"
              checked={isPlayingWithComputer}
              onChange={handleModeChange}
            />
            Играть с роботом
          </label>
        </div>
      </div>
      <div className="game-board">
        <Board squares={current} onClick={(i) => handleClick(i)} />
      </div>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h2>История ходов</h2>
        <ol>
          {history.map((step, move) => {
            const desc = move ? 'Перейти к ходу #' + move : 'К началу игры';
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </Modal>
      <Modal show={showRestartModal} handleClose={() => setShowRestartModal(false)}>
        <h2>Перезапуск игры</h2>
        <p>Вы уверены, что хотите перезапустить игру?</p>
        <button className="button" onClick={restartGame}>Да</button>
        <button className="button" onClick={() => setShowRestartModal(false)}>Нет</button>
      </Modal>
    </div>
  );
};

// Функция для определения победителя
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
