import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

function SingleProduct(props) {
	const [name, setName] = useState;
}

function mapStateToProps(state) {
	return {
		product: state.singleProduct.selected
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getSingleProduct: id => dispatch(fetchSingleProduct(id))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
