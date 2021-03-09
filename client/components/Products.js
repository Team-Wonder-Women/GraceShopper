import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { addItemUser, addItemGuest } from "../store/cartItem";

import { deleteSingleProduct } from "../store/products";

export default function Products(props) {
	const [count, setCount] = useState(props.count);
	const { addToast } = useToasts();
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	console.log("this is userId in products-->", user.id);
	function handleAdd() {
		addToast("Added!", { appearance: "success", autoDismiss: true });
		if (user.id) {
			dispatch(addItemUser(props.id, count));
		} else {
			dispatch(addItemGuest(props.id, count));
		}
		setCount(1);
	}

	function handleDeleteProduct() {
		dispatch(deleteSingleProduct(props.id));
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
			<div className="allproducts-quantity button-container">
				{user.isAdmin ? (
					<button
						type="button"
						className="delete button-item"
						onClick={handleDeleteProduct}
					>
						Delete Product
					</button>
				) : (
					""
				)}
				<button type="button" className="button-item" onClick={handleAdd}>
					Add to Cart
				</button>
			</div>
		</div>
	);
}
