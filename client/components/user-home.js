import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HipsterQuote from "./HipsterQuote";
import LandingPage from "./LandingPage";

/**
 * COMPONENT
 */
export const UserHome = props => {
	const { firstName } = props;
	return (
		<div id="user-welcome">
			<h3 className="user-welcome">
				🕯 {firstName}, welcome to the collective 🕯
			</h3>
			<HipsterQuote />
			<LandingPage />
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		firstName: state.user.firstName
	};
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	email: PropTypes.string
};
