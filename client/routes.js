import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
	AllProductsList,
	SingleProduct,
	UserHome,
	Login,
	Signup,
	Checkout,
	InsideCart,
	LandingPage,
	AdminDash,
	AddProduct
} from "./components";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;
		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/" component={LandingPage} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/" component={AllProductsList} />
				<Route exact path="/products" component={AllProductsList} />
				<Route exact path="/products/:productId" component={SingleProduct} />
				<Route exact path="/cart/:id" component={InsideCart} />
				{isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in */}
						<Route path="/home" component={UserHome} />
						<Route path="/admin" component={AdminDash} />
						<Route path="/checkout" component={Checkout} />
						<Route path="/add-product" component={AddProduct} />
					</Switch>
				)}
				{/* Displays our home component as a fallback */}
				{/* <Route component={Login} /> */}
				<Route exact path="/" component={LandingPage} />
				<Route path="/checkout" component={Checkout} />
			</Switch>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me());
		}
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
