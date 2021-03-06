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

	render() {
		const { handleClick, isLoggedIn } = this.props;
		return (
			<div className="navbar">
				<div className="header-logo">
					<Link to="/products">
						<h1>Lit Collective</h1>
					</Link>
					<img id="logo" src="lit-collective.png" alt="lit collective logo" />
				</div>
				<div id="nav-buttons">
					<div>
						{isLoggedIn ? (
							<div className="nav-buttons-left-container">
								{/* The navbar will show these links after you log in */}
								<Link className="nav-buttons-left" to="/home">
									Home
								</Link>
								<a className="nav-buttons-left" href="#" onClick={handleClick}>
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
							</div>
						)}
					</div>
					<Cart show={this.state.show} handleClose={this.hideCart}>
						<div className="cart-content">
							<h1>Your Cart</h1>
							<InsideCart />
						</div>
					</Cart>
					<div id="cart" onClick={this.showCart}>
						<img src="cart.svg" />
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
		isLoggedIn: !!state.user.id
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
