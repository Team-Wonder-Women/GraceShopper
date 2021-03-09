import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItemsUser, deleteItemUser } from "../store/cartItem";

export default function CartItemUser(props) {
	const { name, price, cartitem, id } = props;
	const { cartId } = cartitem;

	const [cartItem, setCartItem] = useState(cartitem);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCartItemsUser());
	}, {});

	function handleDelete() {
		dispatch(deleteItemUser(cartId, id));
		setCartItem(null);
	}

	return (
		<div>
			{cartItem ? (
				<div>
					<h1>{name}</h1>
					<h1>{cartitem.quantity}</h1>
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