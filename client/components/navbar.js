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
		return (
			<div className="flex-col">
				<Link to="/">
					<div className="flex items-end justify-center">
						<img
							className="w-10"
							src="/lit-collective.png"
							alt="lit collective logo"
						/>
						<h1 className="flex justify-center">Lit Collective</h1>
					</div>
				</Link>
				<div className="flex justify-between">
					{isLoggedIn ? (
						<div className="flex content-end space-x-10">
							{/* The navbar will show these links after you log in */}
							<div>
								<Link to="/home">Home</Link>
							</div>
							{isAdmin ? (
								<div>
									<Link to="/admin">Dashboard</Link>
								</div>
							) : (
								<></>
							)}
							<div>
								<Link to="/products">All Candles</Link>
							</div>
							<a href="" onClick={handleClick}>
								Logout
							</a>
						</div>
					) : (
						<div className="flex items-end space-x-10">
							{/* The navbar will show these links before you log in */}
							<div>
								<Link to="/login">Login</Link>
							</div>
							<div>
								<Link to="/signup">Sign Up</Link>
							</div>
							<div>
								<Link to="/products">All Candles</Link>
							</div>
						</div>
					)}
					{this.state.show ? (
						<Cart show={this.state.show} handleClose={this.hideCart}>
							<div className="cart-content">
								<h1>Your Cart</h1>
								<InsideCart />
								{/* {cart} */}
							</div>
						</Cart>
					) : null}
					<div className="flex m-2" onClick={this.showCart}>
						<img
							className="relative bg-indigo-500 rounded-sm p-2"
							src="/cart.svg"
						/>
						<div className="z-10 absolute top-12 right-1">
							<span className="bg-yellow-300 rounded-lg p-1">
								{this.cartCount(cartItems.products)}
							</span>
						</div>
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
		// checkoutUser() {
		// 	dispatch(markUserCartComplete());
		// },
		// checkoutGuest() {
		// 	dispatch(markGuestCartComplete());
		// }
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
