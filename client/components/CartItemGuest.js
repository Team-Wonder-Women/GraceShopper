import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItemsGuest, deleteItemGuest } from "../store/cartItem";

export default function CartItemGuest(props) {
	const { item, cartitem } = props;
	const { quantity, price } = cartitem;

	const [cartItem, setCartItem] = useState(cartitem);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCartItemsGuest());
	}, {});

	function handleDelete() {
		dispatch(deleteItemGuest(item.id));
		setCartItem(null);
	}

	return (
		<div>
			{cartItem ? (
				<div>
					<h1>{item.name}</h1>
					<h1>{quantity}</h1>
					<h1>${(price / 100).toFixed(2)}</h1>
					<button type="button" onClick={handleDelete}>
						Delete
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}
