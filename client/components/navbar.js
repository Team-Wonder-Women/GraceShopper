import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Cart from "./Cart";
import { fetchCartItemsGuest } from "../store/cartItem";

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
		this.toggleShow = this.toggleShow.bind(this);
	}
	// async componentDidMount() {
	// 	console.log("component mounts!")
	// 	if (!this.props.isLoggedIn) {
	// 		console.log("i am fetching the guest cart items!")
	// 		await this.props.fetchCartItemsGuest();
	// 	}
	// }
	toggleShow = () => {
		this.setState(prevState => ({ show: !prevState.show }));
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
			<div className="flex justify-between bg-indigo-50 py-3 px-2">
				<div>
					<Link to="/">
						<div className="flex items-end justify-center">
							<img
								className="w-10"
								src="/lit-collective.png"
								alt="lit collective logo"
							/>
							<h1 className="flex justify-center font-extrabolt text-gray-700 text-xl pl-2">
								litCollective
							</h1>
						</div>
					</Link>
				</div>
				<div className="flex justify-between">
					{isLoggedIn ? (
						<div className="flex items-end space-x-10">
							{/* The navbar will show these links after you log in */}
							<div>
								<Link to="/home">Home</Link>
							</div>
							{isAdmin && (
								<div>
									<Link to="/admin">Dashboard</Link>
								</div>
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
					{this.state.show && (
						<Cart show={this.state.show} toggleShow={this.toggleShow} />
					)}
					<div className="flex items-end pl-10 pr-3" onClick={this.toggleShow}>
						<img className="relative" src="/cart.svg" />
						<div>
							<span className="bg-indigo-200 bg-opacity-50 rounded-lg p-1 text-xs absolute top-8 right-3">
								{this.cartCount(cartItems.products)}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	console.log("state", state);
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
		},
		fetchCartItemsGuest() {
			dispatch(fetchCartItemsGuest());
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
