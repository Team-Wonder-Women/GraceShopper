import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
export default function SingleProduct() {
	// in lieu of mapState
	const singleProduct = useSelector(state => state.singleProduct);
	const [image, setImage] = useState("/placeholder.jpg");
	// in lieu of match.props.params
	let { productId } = useParams();
	// in lieu of mapDispatch
	const dispatch = useDispatch();
	// in lieu of componentDidMount
	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
	}, {});
	// in lieu of componentDidUpdate
	useEffect(() => {
		setImage(`/${singleProduct.imageUrl}`);
	});
	return (
		<div>
			<h1>{singleProduct.name}</h1>
			<img src={image} />
			<h1>{singleProduct.description}</h1>
			<h1>${(singleProduct.price / 100).toFixed(2)}</h1>
		</div>
	);
}
