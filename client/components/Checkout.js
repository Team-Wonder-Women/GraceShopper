import React, { Component } from "react";
import { markUserCartComplete, markGuestCartComplete } from "../store/cartItem";
import { connect } from "react-redux";

class Checkout extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			address: "",
			city: "",
			state: "",
			zipcode: ""
		};
		this.handleCheckout = this.handleCheckout.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCheckout = () => {
		if (this.props.user.id) this.props.checkoutUser();
		else this.props.checkoutGuest();
	};

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	handleSubmit(evt) {
		evt.preventDefault();
		this.handleCheckout();
		this.props.history.push("/confirmation");
	}

	render() {
		const { products, total } = this.props.cartItems;
		const { firstName, lastName, address, city, state, zipcode } = this.state;
		const { handleSubmit, handleChange } = this;
		return (
			<div className="checkout-container">
				<h1 id="checkout-form">Checkout Form</h1>
				<form className="checkout-form" onSubmit={handleSubmit}>
					<div className="checkout-div">
						<label htmlFor="firstName">
							<h3>First Name</h3>
						</label>
						<input
							name="firstName"
							type="text"
							value={firstName}
							onChange={handleChange}
							required
						/>
						<label htmlFor="lastName">
							<h3>Last Name</h3>
						</label>
						<input
							name="lastName"
							type="text"
							value={lastName}
							onChange={handleChange}
							required
						/>
						<label htmlFor="address">
							<h3>Address</h3>
						</label>
						<input
							name="address"
							type="text"
							value={address}
							onChange={handleChange}
							required
						/>
						<label htmlFor="lastName">
							<h3>City</h3>
						</label>
						<input
							name="city"
							type="text"
							value={city}
							onChange={handleChange}
							required
						/>
						<label htmlFor="state">
							<h3>State</h3>
						</label>
						<select name="state" value={state} onChange={handleChange}>
							<option value="NY">NY</option>
							<option value="IL">IL</option>
						</select>
						<label htmlFor="zipcode">
							<h3>Zipcode</h3>
						</label>
						<input
							type="text"
							name="zipcode"
							inputMode="numeric"
							pattern="[0-9]{5}"
							value={zipcode}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="checkout-cart">
						<h2>Your Cart:</h2>
						{products.map(product => (
							<div key={product} id="checkout-product">
								<img
									src={
										product.imageUrl ? product.imageUrl : product.item.imageUrl
									}
									id="product-image"
								/>
								<p>
									<b>{product.name ? product.name : product.item.name}</b>
								</p>
								<p>Qty: {product.cartitem.quantity}</p>
								<p>
									Price: $
									{product.price
										? (product.price / 100).toFixed(2)
										: (product.item.price / 100).toFixed(2)}
								</p>
							</div>
						))}
						<div id="total">
							<h2>Total:</h2>
							<h1>${(total / 100).toFixed(2)}</h1>
						</div>
					</div>
					<button style={{ width: "50%" }} type="submit">
						Checkout!
					</button>
				</form>
			</div>
		);
	}
}

const mapState = state => {
	return {
		cartItems: state.cartItems,
		user: state.user
	};
};

const mapDispatch = dispatch => ({
	checkoutUser: () => dispatch(markUserCartComplete()),
	checkoutGuest: () => dispatch(markGuestCartComplete())
});

export default connect(mapState, mapDispatch)(Checkout);
