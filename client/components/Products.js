import React from "react";
import { Link } from "react-router-dom";

export default function Products(props) {
	console.log("producs props", props);
	let price = props.price;

	return (
		<div className="product-container">
			<Link to={`products/${props.id}`}>
				<img src={props.imageUrl} />
				<h2 className="product-name">{props.name}</h2>
				<p className="product-price">${(props.price / 100).toFixed(2)}</p>
			</Link>
			<button type="button">Add to Cart</button>
		</div>
	);
}
