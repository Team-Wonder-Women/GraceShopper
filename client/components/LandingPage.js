import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProducts } from "../store/products";

function ChooseRandomCandle(candles) {
	let max = Object.keys(candles).length;
	let randomCandle = Math.floor(Math.random() * Math.floor(max));
	let candle = candles[randomCandle];
	return (
		<div className="flex-col text-center">
			<h2>{candle.name}</h2>
			<div className="place-self-center">
				<Link to={`products/${candle.id}`}>
					<img src={candle.imageUrl} />
				</Link>
			</div>
			<h3 className="product-description">{candle.description}</h3>
		</div>
	);
}

class LandingPage extends Component {
	componentDidMount() {
		this.props.loadProducts();
	}
	render() {
		const products = this.props.products;
		return (
			<div className="flex-col text-center">
				<h1>Littest Candle of the Moment</h1>
				{products.length ? (
					<ChooseRandomCandle {...products} />
				) : (
					<div>We are burning to show you this!</div>
				)}
				<Link to="/products">
					<span>want to see more?</span>
				</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: state.products
});

const mapDispatchToProps = dispatch => ({
	loadProducts: () => dispatch(getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
