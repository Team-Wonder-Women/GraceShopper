import React from "react";
import { useSelector } from "react-redux";

export default function CartItem(props) {
	const { name, price, imageUrl, quantity } = props;

	const cartItems = useSelector(state => state.cartItems);

	console.log("cartItems", cartItems);

	return (
		<div>
			<h1>{name}</h1>
			<h1>{quantity}</h1>
			<h1>${(price / 100).toFixed(2)}</h1>
		</div>
	);
}
