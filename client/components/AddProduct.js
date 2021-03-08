import React, { Component } from "react";
import { connect } from "react-redux";

class AddProduct extends Component {
	componentDidMount() {
		// this.props.loadUsers();
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const name = evt.target.name;
		const description = evt.target.description.value;
		const price = evt.target.price.value;
		const size = evt.target.size.value;
		const quantity = evt.target.quantity.value;
	}

	render() {
		return (
			<div className="add-product-bg">
				<form onSubmit={handleSubmit}>
					<div className="form">
						<h2>Add Product</h2>
						<label htmlFor="name">
							<h3>Name</h3>
						</label>
						<input name="name" type="text" required />
						<label htmlFor="description">
							<h3>Description</h3>
						</label>
						<textarea name="description" required />
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
								required
							/>
						</span>
						<label htmlFor="size">
							<h3>Size</h3>
						</label>
						<select name="size">
							<option value="2 oz">2 oz</option>
							<option value="3 oz">3 oz</option>
							<option value="9 oz">9 oz</option>
						</select>
						<label htmlFor="quantity">
							<h3>Quantity</h3>
						</label>
						<input type="number" name="price" min="1" max="500" required />
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
	return {};
};

export default connect(null, mapDispatchToProps)(AddProduct);
