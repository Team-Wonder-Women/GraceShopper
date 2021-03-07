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
			// this.setState({ counts: this.props.products.map(product => 1) });
		}
	}

	handleAdd(props) {
		console.log("props -->", props);
		this.setState(prevState => ({
			counts: {
				...prevState.counts,
				[props.id]: prevState.counts[props.id] + 1
			}
		}));
		// this.setState(prevState => ({ count: prevState.id.count + 1 }));
	}

	handleSubtract() {
		this.state.count < 1
			? this.setState({
					count: 0
			  })
			: this.setState(prevState => ({ count: prevState.count - 1 }));
	}

	render() {
		console.log("this.state -->", this.state);
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
