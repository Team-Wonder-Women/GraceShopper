import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemUser, updateCartQuantity } from "../store/cartItem";

export default function CartItemUser(props) {
	const { name, price, cartitem, id } = props;
	const { cartId } = cartitem;

	console.log("props in cartitem user", name);

	// console.log("id ==>", id);

	const [cartItem, setCartItem] = useState(cartitem);
	const [cartItemQuantity, setCartItemQuantity] = useState(cartitem.quantity);

	const dispatch = useDispatch();

	function handleDelete() {
		dispatch(deleteItemUser(cartId, id));
		setCartItem(null);
	}

	function handleDecrement(e) {
		console.log("YOU HIT DECREMENT!");
		if (cartItemQuantity > 1) {
			setCartItemQuantity(cartItemQuantity - 1);
			dispatch(updateCartQuantity(id, "decrement"));
		}
	}

	function handleIncrement(e) {
		setCartItemQuantity(cartItemQuantity + 1);
		dispatch(updateCartQuantity(id, "increment"));
	}

	return (
		<div>
			{cartItem ? (
				<div className="cart-item">
					<h1>{name}</h1>
					<div>
						<button
							className="quantity-button"
							type="button"
							onClick={handleDecrement}
						>
							-
						</button>
						<h2 id="quantity-counter">{cartitem.quantity}</h2>
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
