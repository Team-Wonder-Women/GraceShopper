import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../store/allUsers";
import User from "./User";

class AdminDash extends Component {
	componentDidMount() {
		console.log("admin dash componentDidMount");
		this.props.loadUsers();
	}

	render() {
		const { users } = this.props;
		return (
			<div id="admin-dash-container">
				<h2>New Product</h2>
				<Link to="/add-product">
					<button style={{ width: "100%" }} type="button">
						Add New Product
					</button>
				</Link>
				<h2>Registered Users</h2>
				<div id="users-container">
					{users.map(user => {
						return <User key={user.id} {...user} />;
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: state.users
});

const mapDispatchToProps = dispatch => ({
	loadUsers: () => dispatch(getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);
