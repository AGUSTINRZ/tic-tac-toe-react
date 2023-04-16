import React, { useState } from "react";
import Square from "./components/Square";
import "./App.css";
import "./styles/board.css";

const TURNS = {
	X: "X",
	O: "O",
};

const WINNER_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function App() {
	const [board, setBoard] = useState(() => {
		return Array(9).fill(null);
	});

	const [turn, setTurn] = useState(TURNS.X);

	const [winner, setWinner] = useState(null);

	function checkWinner(boardToCheck) {
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo
			if (
				boardToCheck[a] &&
				boardToCheck[a] === boardToCheck[b] &&
				boardToCheck[a] === boardToCheck[c]
			) {
				return boardToCheck[a];
			}
		}
    return null
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null));
	};

	const updateBoard = (index) => {
		if (board[index] || winner) return;
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			setWinner(newWinner);
		}
	};

	return (
		<div className="App">
			<h1>Tic tac toe</h1>
			<button onClick={resetGame} style={{ marginBottom: "2rem" }}>
				Reset game
			</button>
			<section className="board">
				{board.map((square, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{board[index]}
						</Square>
					);
				})}
			</section>

			<section className="turn">
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>
		</div>
	);
}

export default App;
