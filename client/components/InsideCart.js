import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItemsUser, fetchCartItemsGuest } from "../store/cartItem";
import CartItemUser from "./CartItemUser";
import CartItemGuest from "./CartItemGuest";

export default function InsideCart({ setHasItems, setCartItems, setTotal }) {
	// in lieu of mapState
	const cartItems = useSelector(state => state.cartItems.products);
	const user = useSelector(state => state.user);
	const { total } = useSelector(state => state.cartItems);
	const dispatch = useDispatch();
	// in lieu of componentDidMount

	useEffect(() => {
		if (user.id) {
			dispatch(fetchCartItemsUser(user.id));
		} else {
			dispatch(fetchCartItemsGuest());
		}
	}, []);

	useEffect(() => {
		if (cartItems.length >= 1) {
			setHasItems(true);
			setCartItems(cartItems);
			setTotal(total);
		} else {
			setHasItems(false);
		}
	});
	// in lieu of componentDidUpdate
	return (
		<div>
			{!(cartItems.length >= 1) && total < 1000 ? (
				<h3>You don't have any items in your cart.</h3>
			) : (
				<div className="flex-row">
					{user.id
						? cartItems.map((item, idx) => {
								return <CartItemUser key={idx} {...item} />;
						  })
						: cartItems.map((item, idx) => {
								return <CartItemGuest key={idx} {...item} />;
						  })}
					<h1 className="float-right font-bold p-4">
						Total: ${(total / 100).toFixed(2)}
					</h1>
				</div>
			)}
		</div>
	);
}
