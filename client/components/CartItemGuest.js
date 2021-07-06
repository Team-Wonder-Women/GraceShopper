import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import cartItems, {
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
		<div className="mb-3">
			{cartItem && (
				<div className="flex justify-between items-center">
					<div className="w-12 h-12">
						<img
							className="object-scale-down focus:ring rounded"
							src={`/${item.imageUrl}`}
						/>
					</div>
					<h1>{item.name}</h1>
					<div className="grid grid-cols-3">
						<div className="flex">
							<button
								className="bg-indigo-200 w-6 h-6 focus:outline-none focus:ring rounded hover:bg-indigo-300"
								type="button"
								onClick={handleDecrement}
							>
								-
							</button>
							<h2 className="w-6 h-6">{quantity}</h2>
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
				</div>
			)}
		</div>
	);
}
