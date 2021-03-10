import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	fetchCartItemsGuest,
	deleteItemGuest,
	updateCartQuantityGuest
} from "../store/cartItem";

export default function CartItemGuest(props) {
	const { item, cartitem } = props;
	const { quantity, price } = cartitem;

	const [cartItem, setCartItem] = useState(cartitem);
	const [cartItemQuantity, setCartItemQuantity] = useState(cartitem.quantity);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCartItemsGuest());
	}, {});

	function handleDelete() {
		console.log("this is quantity and price at deletion", quantity, price);
		dispatch(deleteItemGuest(item.id, price));
	}

	function handleDecrement(e) {
		if (cartItemQuantity > 1) {
			setCartItemQuantity(cartItemQuantity - 1);
			dispatch(updateCartQuantityGuest(item.id, "decrement"));
		}
	}

	function handleIncrement(e) {
		setCartItemQuantity(cartItemQuantity + 1);
		dispatch(updateCartQuantityGuest(item.id, "increment"));
	}

	return (
		<div>
			{cartItem ? (
				<div className="cart-item">
					<h1>{item.name}</h1>
					<div>
						<button
							className="quantity-button"
							type="button"
							onClick={handleDecrement}
						>
							-
						</button>
						<h2 id="quantity-counter">{quantity}</h2>
						<button
							className="quantity-button"
							type="button"
							onClick={handleIncrement}
						>
							+
						</button>
					</div>
					<h1>${(price / 100).toFixed(2)}</h1>
					<button id="delete-item" type="button" onClick={handleDelete}>
						Delete
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}
