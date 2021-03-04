import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";

export default function SingleProduct(props) {
	// in lieu of mapState
	const singleProduct = useSelector(state => state.singleProduct);
	let price = (singleProduct.price / 100).toFixed(2);
	const [image, setImage] = useState("placeholder.jpg");
	console.log("single product -->", singleProduct);

	// in lieu of match.props.params
	let { productId } = useParams();

	// in lieu of mapDispatch + componentDidMount
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
	}, {});

	useEffect(() => {
		setImage(singleProduct.imageUrl);
	});

	return (
		<div>
			<h1>{singleProduct.name}</h1>
			<img src={image} />
			<h1>{singleProduct.description}</h1>
			<h1>{price}</h1>
		</div>
	);
}
