import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Confirmation extends Component {
	render() {
		const { firstName, email } = this.props.user;
		return email ? (
			<div id="confirmation-container">
				<img src="lit-collective.png" />
				<h1>Thanks, {firstName}, for shopping Lit Collective!</h1>
				<p>
					A confirmation for order #{Math.floor(Math.random() * 1233172)} has
					been sent to {email}. You will receieve a shipping notification as
					soon as your lit kit is on its way. Thanks so much for the support!
				</p>
				<sub>Stay lit... 🕯</sub>
			</div>
		) : (
			<div id="confirmation-container">
				<img src="lit-collective.png" />
				<h1>Thanks for shopping Lit Collective!</h1>
				<p>
					A confirmation for order #{Math.floor(Math.random() * 1233172)} has
					been emailed to you. You will receieve a shipping notification as soon
					as your lit kit is on its way.{" "}
					<Link to="signup">Join the collective here</Link> for order history
					and 10% off your next order. Thanks so much for the support!
				</p>
				<sub>Stay lit... 🕯</sub>
			</div>
		);
	}
}

const mapState = state => ({
	user: state.user
});

export default connect(mapState)(Confirmation);
