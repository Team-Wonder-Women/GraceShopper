import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addItemUser } from "../store/cartItem";

export default function Products(props) {
	const [count, setCount] = useState(props.count);

	const dispatch = useDispatch();

	function handleAdd() {
		console.log("count in handleAdd -->", props.id);
		dispatch(addItemUser(props.id, count));
		setCount(1);
	}

	return (
		<div className="product-container">
			<Link to={`products/${props.id}`} className="product-link-container">
				<img src={props.imageUrl} />
				<div className="product-text">
					<h2 className="product-name">{props.name}</h2>
					<p className="product-price">${(props.price / 100).toFixed(2)}</p>
				</div>
			</Link>
			<div className="allproducts-quantity">
				<button
					className="quantity-button"
					type="button"
					onClick={() => setCount(count > 1 ? count - 1 : count)}
				>
					-
				</button>
				<h2 id="quantity-counter">{count}</h2>
				<button
					className="quantity-button"
					type="button"
					onClick={() => setCount(count + 1)}
				>
					+
				</button>
			</div>
			<button type="button" onClick={handleAdd}>
				Add to Cart
			</button>
		</div>
	);
}
