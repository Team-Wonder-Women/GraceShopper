import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCartItems } from "../store/cartItem";
import CartItem from "./CartItem";

export default function InsideCart() {
	// in lieu of mapState
	const cartItems = useSelector(state => state.cartItems);
	const user = useSelector(state => state.user);
	console.log("user -->", user);
	const [items, setItems] = useState(cartItems);
	const [isLoading, setIsLoading] = useState(true);
	console.log("items -->", items);

	console.log("useParams -->", useParams());

	// in lieu of match.props.params
	// let { id } = useParams();
	// console.log(id);
	// in lieu of mapDispatch
	const dispatch = useDispatch();
	// in lieu of componentDidMount
	useEffect(() => {
		console.log("inside first useeffect");
		dispatch(fetchCartItems(user.id));
	}, []);

	useEffect(() => {
		console.log("inside second useeffect");
		setItems(cartItems.products);
		if (items && items.length >= 1) {
			setIsLoading(false);
		}
	});

	// in lieu of componentDidUpdate
	return (
		<div>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				items.map(item => {
					return <CartItem key={item.id} {...item} />;
				})
			)}
		</div>
	);
}
