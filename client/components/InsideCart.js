import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItemsUser, fetchCartItemsGuest } from "../store/cartItem";
import CartItemUser from "./CartItemUser";
import CartItemGuest from "./CartItemGuest";

export default function InsideCart() {
	// in lieu of mapState
	const cartItems = useSelector(state => state.cartItems.products);
	const user = useSelector(state => state.user);
	const { total } = useSelector(state => state.cartItems);
	console.log("this is total", total);
	const [isEmpty, setIsEmpty] = useState(true);
	console.log("these are cartItmes in inside cart-->", cartItems);
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
				<div>
					{user.id
						? cartItems.map(item => {
								console.log("item --->", item);
								return (
									<CartItemUser
										key={item.id}
										{...item}
										count={item.cartitem.quantity}
									/>
								);
						  })
						: cartItems.map((item, idx) => {
								return (
									<CartItemGuest
										key={idx}
										{...item}
										count={item.cartitem.quantity}
									/>
								);
						  })}
					<h1>Total: ${(total / 100).toFixed(2)}</h1>
				</div>
			)}
		</div>
	);
}
