import { useCallback, useEffect, useState } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [tieScore, setTieScore] = useState(0);

  const calculateWinner = useCallback((squares) => {
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
  }, []);

  const handleClick = useCallback((i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = currentPlayer;
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [currentPlayer, squares, calculateWinner]);

  const checkForWinner = () => {
    const winner = calculateWinner(squares);
    if (winner) {
      if (winner === 'X') {
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }
      resetGame();
    }
  };

  const checkForTie = () => {
    if (!squares.includes(null)) {
      setTieScore(tieScore + 1);
      resetGame();
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
    localStorage.removeItem('squares');
  };

  useEffect(() => {
    checkForWinner();
    checkForTie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  useEffect(() => {
    const player1Score = localStorage.getItem('player1Score');
    const player2Score = localStorage.getItem('player2Score');
    const tieScore = localStorage.getItem('tieScore');
    if (player1Score) {
      setPlayer1Score(parseInt(player1Score));
    }
    if (player2Score) {
      setPlayer2Score(parseInt(player2Score));
    }
    if (tieScore) {
      setTieScore(parseInt(tieScore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('player1Score', player1Score);
    localStorage.setItem('player2Score', player2Score);
    localStorage.setItem('tieScore', tieScore);
  }, [player1Score, player2Score, tieScore]);

  return (
    <div className="app">
      <Board squares={squares} handleClick={handleClick} />
      <Scoreboard player1Score={player1Score} player2Score={player2Score} tieScore={tieScore} />
    </div>
  );
};

export default App;

