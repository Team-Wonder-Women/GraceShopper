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
		<div className="grid grid-flow-rows md:grid-cols-3 sm:grid-cols-2 gap-4 mt-6 mx-6">
			{allProducts.map(product => {
				return <Products key={product.id} {...product} count={1} />;
			})}
		</div>
	);
}
