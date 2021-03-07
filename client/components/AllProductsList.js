import React, { Component } from "react";
import { connect } from "react-redux";

import { getProducts } from "../store/products";
import Products from "./Products";

class AllProductsList extends Component {
	componentDidMount() {
		this.props.loadProducts();
	}

	render() {
		return this.props.products.map(product => {
			return <Products key={product.id} {...product} />;
		});
	}
}

const mapStateToProps = state => ({
	products: state.products
});

const mapDispatchToProps = dispatch => ({
	loadProducts: () => dispatch(getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsList);
