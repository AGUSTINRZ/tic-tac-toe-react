import React from "react";
import "../styles/square.css";
import Cross from "./Cross";
import Circle from "./Circle";

function Square() {
	

	function obtainValue(value) {
		switch (value) {
			case true:
				return <Circle />;
			case false:
				return <Cross />;
			case undefined:
				return null; // Añadido retorno de valor en caso de undefined
			default:
				return null; // Añadido retorno de valor por defecto
		}
	}

	return (
		<div className="square">
		</div>
	);
}

export default Square;
