import React, { useState } from "react";
import Square from "./components/Square";
import "./App.css";
import "./styles/board.css";

const TURNS = {
	X: 'X',
	O: 'O',
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

	const [winsX, setWinsX] = useState(0);
	const [winsO, setWinsO] = useState(0);

	const verifyWinner = (turn) => {
		turn === TURNS.X ? setWinsX(winsX + 1) : setWinsO(winsO + 1);
	}

	function checkWinner(boardToCheck) {
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo;
			if (
				boardToCheck[a] &&
				boardToCheck[a] === boardToCheck[b] &&
				boardToCheck[a] === boardToCheck[c]
			) {
				return boardToCheck[a];
			}
		}
		return null;
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);
		setWinsO(0);
		setWinsX(0);
	};

	const restartGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);
	}

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
			verifyWinner(turn);
		} else if (!newBoard.includes(null)) {
			setWinner(false);
			restartGame();
		}
	};

	return (
		<main className="App">
			<h1>Tic tac toe</h1>
			<button onClick={resetGame}>
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
				<div>
					<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
					<span>Wins: {winsX}</span>
				</div>
				<div>
					<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
					<span>Wins: {winsO}</span>
				</div>
			</section>

			{winner !== null && (
				<section className="winner">
					<div className="text">
						<h2>{winner === false ? "Empate" : "Ganó: "}</h2>

						<header className="win">
							{winner && <Square>{winner}</Square>}
						</header>

						<footer>
							<button onClick={restartGame}>Empezar de nuevo</button>
						</footer>
					</div>
				</section>
			)}
		</main>
	);
}

export default App;
