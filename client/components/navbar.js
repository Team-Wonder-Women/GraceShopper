import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Cart from "./Cart";
import InsideCart from "./InsideCart";

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
		this.showCart = this.showCart.bind(this);
		this.hideCart = this.hideCart.bind(this);
	}

	showCart = () => {
		this.setState({ show: true });
	};

	hideCart = () => {
		this.setState({ show: false });
	};

	cartCount = itemsArr => {
		let count = 0;
		itemsArr.forEach(item => {
			count += item.cartitem.quantity;
		});
		return count;
	};

	render() {
		const { handleClick, isLoggedIn, isAdmin, cartItems } = this.props;
		// let cart;
		// if (isLoggedIn) {
		// 	cart = <InsideCart />;
		// } else {
		// 	cart = "";
		// }
		return (
			<div className="navbar">
				<div className="header-logo">
					<Link to="/">
						<img
							id="logo"
							src="/lit-collective.png"
							alt="lit collective logo"
						/>
						<h1 id="company-title">Lit Collective</h1>
					</Link>
				</div>
				<div id="nav-buttons">
					<div>
						{isLoggedIn ? (
							<div className="nav-buttons-left-container">
								{/* The navbar will show these links after you log in */}
								<Link className="nav-buttons-left" to="/home">
									Home
								</Link>
								{isAdmin ? (
									<Link className="nav-buttons-left" to="/admin">
										Dashboard
									</Link>
								) : (
									<></>
								)}
								<Link className="nav-buttons-left" to="/products">
									All Candles
								</Link>
								<a className="nav-buttons-left" href="" onClick={handleClick}>
									Logout
								</a>
							</div>
						) : (
							<div className="nav-buttons-left-container">
								{/* The navbar will show these links before you log in */}
								<Link className="nav-buttons-left" to="/login">
									Login
								</Link>
								<Link className="nav-buttons-left" to="/signup">
									Sign Up
								</Link>
								<Link className="nav-buttons-left" to="/products">
									All Candles
								</Link>
							</div>
						)}
					</div>
					<Cart show={this.state.show} handleClose={this.hideCart}>
						<div className="cart-content">
							<h1>Your Cart</h1>
							<InsideCart />
							{/* {cart} */}
						</div>
					</Cart>
					<div id="cart" onClick={this.showCart}>
						<img src="/cart.svg" />
						<span id="lblCartCount">{this.cartCount(cartItems.products)}</span>
					</div>
				</div>
				<hr />
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		cartItems: state.cartItems,
		isLoggedIn: !!state.user.id,
		isAdmin: !!state.user.isAdmin
	};
};

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout());
		}
	};
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
