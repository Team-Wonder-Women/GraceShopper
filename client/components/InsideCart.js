import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItemsUser, fetchCartItemsGuest } from "../store/cartItem";
import CartItem from "./CartItem";

export default function InsideCart() {
	// in lieu of mapState
	const cartItems = useSelector(state => state.cartItems.products);
	const user = useSelector(state => state.user);
	const [isEmpty, setIsEmpty] = useState(true);

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
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
		}
	});
	// in lieu of componentDidUpdate
	return (
		<div>
			{isEmpty ? (
				<h3>
					You don't have any items in your cart. <br />
					<br />
					<a href="/products">See all products.</a>
				</h3>
			) : (
				cartItems.map(item => {
					return <CartItem key={item.id} {...item} />;
				})
			)}
		</div>
	);
}
