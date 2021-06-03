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
		<div className="mb-3">
			{cartItem && (
				<div className="flex justify-between">
					<h1>{name}</h1>
					<div className="grid grid-cols-3">
						<button
							className="bg-indigo-200 w-6 h-6 focus:outline-none focus:ring rounded hover:bg-indigo-300"
							type="button"
							onClick={handleDecrement}
						>
							-
						</button>
						<h2 className="w-6 h-6">{cartitem.quantity}</h2>
						<button
							className="bg-indigo-200 w-6 h-6 focus:outline-none focus:ring rounded hover:bg-indigo-300"
							type="button"
							onClick={handleIncrement}
						>
							+
						</button>
					</div>
					<h1>${(price / 100).toFixed(2)}</h1>
					<button type="button" onClick={handleDelete}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
}
