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
	Confirmation,
	InsideCart,
	LandingPage,
	AdminDash,
	AddProduct,
	Checkout
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
		const { isLoggedIn, isAdmin, user } = this.props;
		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/" component={LandingPage} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/checkout" user={user} component={Checkout} />
				<Route exact path="/" component={AllProductsList} />
				<Route exact path="/products" component={AllProductsList} />
				<Route exact path="/products/:productId" component={SingleProduct} />
				<Route exact path="/cart/:id" component={InsideCart} />
				<Route exact path="/confirmation" component={Confirmation} />
				{isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in */}
						<Route exact path="/home" component={LandingPage} />
						{isAdmin && (
							<>
								<Route exact path="/admin" component={AdminDash} />
								<Route exact path="/add-product" component={AddProduct} />
							</>
						)}
					</Switch>
				)}

				{/* Displays our Login component as a fallback */}
				<Route component={Login} />
				<Route path="/" component={LandingPage} />
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
		isLoggedIn: !!state.user.id,
		isAdmin: !!state.user.isAdmin
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
