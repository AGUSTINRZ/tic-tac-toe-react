import React, { useState } from "react";
import Square from "./components/Square";
import "./App.css";
import "./styles/board.css";

function App() {

  const [board, setBoard] = useState(() => {
    return Array(9).fill(null)
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null));
  }

  const updateBoard = (index) => {
    const newBoard = [...board];
    newBoard[index] = !newBoard[index];
    setBoard(newBoard);
  } 

	return (
		<div className="App">
			<h1>Tic tac toe</h1>
      <button onClick={resetGame} style={{marginBottom: "2rem"}}>Reset game</button>
			<section className="board">
				{board.map((square, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}/>
					);
				})}
			</section>
		</div>
	);
}

export default App;
