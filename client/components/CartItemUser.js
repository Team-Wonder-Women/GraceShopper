import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemUser, updateCartQuantity } from "../store/cartItem";

export default function CartItemUser(props) {
	const { name, price, cartitem, id } = props;
	const { cartId } = cartitem;

	const [cartItem, setCartItem] = useState(cartitem);
	const [cartItemQuantity, setCartItemQuantity] = useState(cartitem.quantity);

	const dispatch = useDispatch();

	function handleDelete() {
		let total = cartitem.quantity * price;
		console.log("this is price in hanlde delete--->", price);
		console.log(
			"this is cartitem.quantity in hanlde delete--->",
			cartitem.quantity
		);
		dispatch(deleteItemUser(cartId, id, total));
	}

	function handleDecrement(e) {
		if (cartitem.quantity > 1) {
			console.log("this is cartItem--->", cartItem);
			setCartItemQuantity(cartitem.quantity - 1);
			dispatch(updateCartQuantity(id, "decrement", -1));
		}
	}

	function handleIncrement(e) {
		setCartItemQuantity(cartitem.quantity + 1);
		dispatch(updateCartQuantity(id, "increment", 1));
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
