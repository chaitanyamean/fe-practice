import { useState } from "react";

const initialBoard = Array(9).fill(null);
const useTicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (board) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (idx) => {
    const winner = calculateWinner(board);

    if (winner || board[idx]) return;

    const newBoard = [...board];
    newBoard[idx] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);

    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((cell) => cell !== null)) {
      return "Draw!";
    } else {
      return `Player ${isXNext ? "X" : "O"} Turn`;
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  return {
    board,
    handleClick,
    calculateWinner,
    getStatusMessage,
    resetGame,
  };
};

export default useTicTacToe;
