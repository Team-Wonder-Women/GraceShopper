import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItemsGuest, deleteItemGuest } from "../store/cartItem";

export default function CartItemGuest(props) {
	const { item, cartitem } = props;
	const { price } = cartitem;

	const [cartItem, setCartItem] = useState(cartitem);
	const [count, setCount] = useState(props.count);

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
					<h1>${(price / 100).toFixed(2)}</h1>
					<button
						className="quantity-button"
						type="button"
						onClick={() => setCount(count > 1 ? count - 1 : count)}
					>
						-
					</button>
					<h1>{count}</h1>
					<button
						className="quantity-button"
						type="button"
						onClick={() => setCount(count + 1)}
					>
						+
					</button>
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
