import React, { Component } from "react";
import { connect } from "react-redux";

class AddProduct extends Component {
	componentDidMount() {
		// this.props.loadUsers();
	}

	render() {
		return (
			<div>
				<h2>Add Product</h2>
				<h2>Registered Users</h2>
				<div id="users-container">
					{users.map(user => {
						return <User key={user.id} {...user} />;
					})}
					<button style={{ width: "100%" }} type="button">
						Add New Product
					</button>
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
