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
			<div className="allproducts-quantity">
				<button
					className="quantity-button"
					type="button"
					onClick={() => props.subtract(props.id)}
				>
					-
				</button>
				<h2 id="quantity-counter">{props.count}</h2>
				<button
					className="quantity-button"
					type="button"
					onClick={() => props.add(props.id)}
				>
					+
				</button>
			</div>
			<button type="button">Add to Cart</button>
		</div>
	);
}
