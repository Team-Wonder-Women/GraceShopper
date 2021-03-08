import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../store/products";
import Products from "./Products";

export default function AllProductsList() {
	// constructor(props) {
	// 	super(props);
	// 	// this.incrementCount = this.incrementCount.bind(this);
	// 	// this.decrementCount = this.decrementCount.bind(this);
	// 	this.state = {
	// 		counts: null
	// 	};
	// }

	const allProducts = useSelector(state => state.products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, {});

	// componentDidMount() {
	// 	this.props.loadProducts();
	// }

	// componentDidUpdate() {
	// 	if (this.state.counts === null) {
	// 		let productCounts = this.props.products.reduce((accumulator, elem) => {
	// 			accumulator[elem.id] = 1;
	// 			return accumulator;
	// 		}, {});
	// 		console.log("productCounts", productCounts);
	// 		this.setState({
	// 			counts: productCounts
	// 		});
	// 	}
	// }

	// incrementCount(id) {
	// 	this.setState(prevState => ({
	// 		counts: {
	// 			...prevState.counts,
	// 			[id]: prevState.counts[id] + 1
	// 		}
	// 	}));
	// }

	// decrementCount(id) {
	// 	this.setState(prevState => ({
	// 		counts:
	// 			prevState.counts[id] > 1
	// 				? { ...prevState.counts, [id]: prevState.counts[id] - 1 }
	// 				: { ...prevState.counts, [id]: prevState.counts[id] }
	// 	}));
	// }

	return (
		// this.state.counts !== null &&
		allProducts.map(product => {
			return <Products key={product.id} {...product} count={1} />;
		})
	);
}

// const mapStateToProps = state => ({
// 	products: state.products
// });

// const mapDispatchToProps = dispatch => ({
// 	loadProducts: () => dispatch(getProducts())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(AllProductsList);
