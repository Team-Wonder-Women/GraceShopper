import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProducts } from "../store/products";

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			candle: {}
		};
	}
	async componentDidMount() {
		await this.props.loadProducts();
		let candles = this.props.products;
		let max = Object.keys(candles).length;
		let randomCandle = Math.floor(Math.random() * Math.floor(max));
		this.setState({ candle: candles[randomCandle] });
	}

	render() {
		const { isLoggedIn, firstName } = this.props;
		return (
			<div className="flex-col text-center space-y-6 my-auto">
				{isLoggedIn && (
					<h1 className="text-4xl font-black mt-16 mb-10">
						{firstName}, check out our candle of the day
					</h1>
				)}
				{this.state.candle ? (
					<div className="grid grid-flow-col grid-cols-4 gap-x-1 mx-6 mb-6">
						<div></div>
						<Link
							to={`products/${this.state.candle.id}`}
							className="inline-block align-center"
						>
							<img
								className="inline border-2 border-indigo-50"
								src={this.state.candle.imageUrl}
							/>
						</Link>
						<div className="flex flex-col pt-2 p-5 text-center border-2 border-indigo-50">
							<h2 className="text-3xl font-extrabold my-6">
								{this.state.candle.name}
							</h2>
							{this.state.candle.description && (
								<h3>{this.state.candle.description.slice(0, 173)}...</h3>
							)}
							<div className="flex-grow flex items-end justify-end align-text-bottom">
								<Link
									to="/products"
									className="flex-end bg-indigo-200 hover:bg-indigo-400 text-white focus:outline-none focus:ring rounded px-3 py-1 transition ease-in-out duration-700"
								>
									want to see more?
								</Link>
							</div>
						</div>
					</div>
				) : (
					<div>We are burning to show you this!</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: state.products,
	isLoggedIn: !!state.user.id,
	firstName: state.user.firstName
});

const mapDispatchToProps = dispatch => ({
	loadProducts: () => dispatch(getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
