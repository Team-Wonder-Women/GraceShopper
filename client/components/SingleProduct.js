import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";

export default function SingleProduct(props) {
	// in lieu of mapState
	const singleProduct = useSelector(state => state.singleProduct);

	// in lieu of match.props.params
	let { productId } = useParams();

	// in lieu of mapDispatch + componentDidMount
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
	}, {});

	return (
		<div>
			<h1>{singleProduct.name}</h1>
			<h1>{singleProduct.description}</h1>
			<h1>{singleProduct.price}</h1>
		</div>
	);
}
