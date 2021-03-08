import React, { Component } from "react";
import { connect } from "react-redux";
import { createSingleProduct } from "../store/products";

class AddProduct extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			description: "",
			price: "",
			size: "2 oz",
			quantity: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.addProduct({ ...this.state });
		this.props.history.push("/products");
	}

	render() {
		const { name, description, price, size, quantity } = this.state;
		const { handleSubmit, handleChange } = this;
		return (
			<div className="add-product-bg">
				<form onSubmit={handleSubmit}>
					<div className="form">
						<h2>Add Product</h2>
						<label htmlFor="name">
							<h3>Name</h3>
						</label>
						<input
							name="name"
							type="text"
							value={name}
							onChange={handleChange}
							required
						/>
						<label htmlFor="description">
							<h3>Description</h3>
						</label>
						<textarea
							name="description"
							value={description}
							onChange={handleChange}
							required
						/>
						<label htmlFor="price">
							<h3>Price</h3>
						</label>
						<span className="dollar-sign">
							$
							<input
								type="number"
								pattern="/^\d*\.?\d*$/"
								name="price"
								min="1"
								max="100"
								step="0.01"
								value={price}
								onChange={handleChange}
								required
							/>
						</span>
						<label htmlFor="size">
							<h3>Size</h3>
						</label>
						<select name="size" value={size} onChange={handleChange}>
							<option value="2 oz">2 oz</option>
							<option value="3 oz">3 oz</option>
							<option value="9 oz">9 oz</option>
						</select>
						<label htmlFor="quantity">
							<h3>Quantity</h3>
						</label>
						<input
							type="number"
							name="quantity"
							min="1"
							max="500"
							value={quantity}
							onChange={handleChange}
							required
						/>
						<button style={{ width: "100%" }} type="submit">
							Add New Product
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addProduct: product => dispatch(createSingleProduct(product))
	};
};

export default connect(null, mapDispatchToProps)(AddProduct);
