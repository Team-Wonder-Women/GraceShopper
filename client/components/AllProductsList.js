import React, { Component } from "react";
import { connect } from "react-redux";

import { getProducts } from "../store/products";
import Products from "./Products";

class AllProductsList extends Component {
	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleSubtract = this.handleSubtract.bind(this);
		this.state = {
			count: 1
		};
	}
	componentDidMount() {
		this.props.loadProducts();
	}

	handleAdd() {
		this.setState(prevState => ({ count: prevState.count + 1 }));
	}

	handleSubtract() {
		this.state.count < 1
			? this.setState({
					count: 0
			  })
			: this.setState(prevState => ({ count: prevState.count - 1 }));
	}

	render() {
		console.log("all products", this.props);
		return this.props.products.map(product => {
			return (
				<Products
					key={product.id}
					{...product}
					add={this.handleAdd}
					subtract={this.handleSubtract}
					count={this.state.count}
				/>
			);
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
