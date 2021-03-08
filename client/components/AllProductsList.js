import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../store/products";
import Products from "./Products";

export default function AllProductsList() {
  
	const allProducts = useSelector(state => state.products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, {});

	return (
		// this.state.counts !== null &&
		allProducts.map(product => {
			return <Products key={product.id} {...product} count={1} />;
		})
	);
}