import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCartItems } from "../store/cartItem";
export default function SingleProduct() {
	// in lieu of mapState
	const cartItems = useSelector(state => state.cartItems);
	console.log("* -->", cartItems.products);
	const [items, setItems] = useState(cartItems);
	const [isLoading, setIsLoading] = useState(true);
	console.log("items -->", items);

	// in lieu of match.props.params
	let { id } = useParams();
	console.log(id);
	// in lieu of mapDispatch
	const dispatch = useDispatch();
	// in lieu of componentDidMount
	useEffect(() => {
		dispatch(fetchCartItems(id));
	}, []);

	useEffect(() => {
		setItems(cartItems.products);
		if (items && items.length >= 1) {
			setIsLoading(false);
		}
	});

	// in lieu of componentDidUpdate
	return (
		<div>
			{isLoading ? <h1>Loading...</h1> : <h1>{items[0].name}</h1>}
			{/* <img src={image} />
			<h1>{singleProduct.description}</h1>
			<h1>${(singleProduct.price / 100).toFixed(2)}</h1>
			<button type="button">Add to Cart</button> */}
		</div>
	);
}
