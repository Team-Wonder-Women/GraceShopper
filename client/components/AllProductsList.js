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
			counts: null
		};
	}
	componentDidMount() {
		this.props.loadProducts();
	}

	componentDidUpdate() {
		if (this.state.counts === null) {
			let productCounts = this.props.products.reduce((accumulator, elem) => {
				accumulator[elem.id] = 1;
				return accumulator;
			}, {});
			this.setState({
				counts: productCounts
			});
		}
	}

	handleAdd(id) {
		this.setState(prevState => ({
			counts: {
				...prevState.counts,
				[id]: prevState.counts[id] + 1
			}
		}));
	}

	handleSubtract(id) {
		this.setState(prevState => ({
			counts:
				prevState.counts[id] > 0
					? { ...prevState.counts, [id]: prevState.counts[id] - 1 }
					: { ...prevState.counts, [id]: prevState.counts[id] }
		}));
	}

	render() {
		return (
			this.state.counts !== null &&
			this.props.products.map(product => {
				return (
					<Products
						key={product.id}
						{...product}
						add={this.handleAdd}
						subtract={this.handleSubtract}
						count={this.state.counts[product.id]}
					/>
				);
			})
		);
	}
}

const mapStateToProps = state => ({
	products: state.products
});

const mapDispatchToProps = dispatch => ({
	loadProducts: () => dispatch(getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsList);
