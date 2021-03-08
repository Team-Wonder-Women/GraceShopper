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
				<div>
					<form>
						<div>
							<label htmlFor="name">
								<small>Name</small>
							</label>
							<input name="name" type="text" />
						</div>
						<div>
							<label htmlFor="description">
								<small>Description</small>
							</label>
							<textarea name="description" />
						</div>
						<button style={{ width: "100%" }} type="submit">
							Add New Product
						</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	// loadUsers: () => dispatch(getUsers())
});

export default connect(null, mapDispatchToProps)(AddProduct);
