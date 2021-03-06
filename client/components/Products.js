import React from "react";
import { Link } from "react-router-dom";

export default function Products(props) {
	return (
		<div className="product-container">
			<Link to={`products/${props.id}`} className="product-link-container">
				<img src={props.imageUrl} />
				<div className="product-text">
					<h2 className="product-name">{props.name}</h2>
					<p className="product-price">${(props.price / 100).toFixed(2)}</p>
				</div>
			</Link>
			<button
				className="quantity-button"
				type="button"
				onClick={() => props.subtract()}
			>
				-
			</button>
			<h2 id="quantity-counter">{props.count}</h2>
			<button
				className="quantity-button"
				type="button"
				onClick={() => props.add()}
			>
				+
			</button>
			<button type="button">Add to Cart</button>
		</div>
	);
}
