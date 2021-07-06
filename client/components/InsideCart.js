import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItemsUser, fetchCartItemsGuest } from "../store/cartItem";
import CartItemUser from "./CartItemUser";
import CartItemGuest from "./CartItemGuest";

export default function InsideCart({ setHasItems, cartItems, setTotal }) {
	// in lieu of mapState
	// const cartItems = useSelector(state => state.cartItems.products);
	const user = useSelector(state => state.user);
	const { total } = useSelector(state => state.cartItems);
	const dispatch = useDispatch();
	const { products } = cartItems;
	// in lieu of componentDidMount
	useEffect(() => {
		if (user.id !== undefined) {
			dispatch(fetchCartItemsUser(user.id));
		} else {
			dispatch(fetchCartItemsGuest());
		}
	}, []);
	useEffect(() => {
		if (products.length >= 1) {
			setHasItems(true);
			setTotal(total);
		} else {
			setHasItems(false);
		}
	});
	// in lieu of componentDidUpdate
	return (
		<div>
			{!(products.length >= 1) && total < 1000 ? (
				<h3>You don't have any items in your cart.</h3>
			) : (
				<div className="flex-row">
					{user.id
						? products.map((item, idx) => {
								//unfortunately not the work around when guest cart gets trasported over to user cart :()
								// if(item.item !== undefined){
								// 	item = { ...item.item, cartitem: item.cartitem };
								// 	item.cartitem.cartId = user.id
								// }
								return <CartItemUser key={idx} {...item} />;
						  })
						: products.map((item, idx) => {
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
