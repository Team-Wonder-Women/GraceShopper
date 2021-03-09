import React, { Component } from "react";
import {
	markUserCartComplete,
	markGuestCartComplete,
	fetchCartItemsUser,
	fetchCartItemsGuest
} from "../store/cartItem";
// import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

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
		if (this.props.isLoggedIn) this.props.checkoutUser();
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
		console.log("cart items -->", this.props.cartItems);
		const { products, total } = this.props.cartItems;
		const { firstName, lastName, address, city, state, zipcode } = this.state;
		const { handleSubmit, handleChange } = this;
		return (
			<div>
				<form onSubmit={handleSubmit}>
					<h2>Checkout Form</h2>
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
						<option value="ANYWHERE">Anywhere else</option>
					</select>
					<label htmlFor="zipcode">
						<h3>Zipcode</h3>
					</label>
					<input
						type="text"
						name="zipcode"
						inputMode="numeric"
						pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
						value={zipcode}
						onChange={handleChange}
						required
					/>
					<div>
						<h2>Your Cart</h2>
						{products.map(product => (
							<div key={product.name}>
								<p>{product.name}</p>
								<p>Qty: {product.cartitem.quantity}</p>
								<p>Price: {(product.price / 100).toFixed(2)}</p>
							</div>
						))}
						<p>Total: {(total / 100).toFixed(2)}</p>
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
		cartItems: state.cartItems
	};
};

const mapDispatch = dispatch => ({
	checkoutUser: () => dispatch(markUserCartComplete()),
	checkoutGuest: () => dispatch(markGuestCartComplete())
});

export default connect(mapState, mapDispatch)(Checkout);
// export default Checkout;
