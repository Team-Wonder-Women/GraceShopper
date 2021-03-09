import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastProvider, useToasts } from "react-toast-notifications";

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
			return (
				<ToastProvider placement="top-right" key={product.id}>
					<Products {...product} count={1} />
				</ToastProvider>
			);
		})
	);
}
