import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addItem } from "../store/cartItem";

export default function Products(props) {
	return (
		<div className="product-container">
			<Link to={`products/${props.id}`} className="product-link-container">
				<img src={props.imageUrl} />
				<div className="product-text">
					<h2 className="product-name">{props.name}</h2>
					<p className="product-price">${(props.price / 100).toFixed(2)}</p>
				</div>
			</Link>
			<button type="button">Add to Cart</button>
		</div>
	);
}

// class Products extends Component {
// 	render() {
// 		return (

// 		)
// 	}
// }

// const mapStateToProps = state => {

// }

// const mapDispatchToProps = dispatch => {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Products);
