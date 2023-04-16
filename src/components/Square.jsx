import React from "react";
import "../styles/square.css";
import Cross from "./Cross";
import Circle from "./Circle";

function Square({children, updateBoard, index, isSelected}) {

	const className = `square ${isSelected ? "is-selected" : ""}`;

	const handleClick = () => {
		updateBoard(index);
	}

	return (
		<div className={className} onClick={handleClick}>
			{children}
		</div>
	);
}

export default Square;
