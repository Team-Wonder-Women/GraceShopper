import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

export const SingleProduct = props => {
	const dispatch = useDispatch();
	// const [name, setName] = useState;
	const selectedCandle = useSelector(state => state.singleProduct);
	useEffect(() => {
		dispatch(fetchSingleProduct(id));
	});
	return (
		<div>
			<h1>Hi</h1>
		</div>
	);
};

// function mapStateToProps(state) {
// 	return {
// 		product: state.singleProduct.selected
// 	};
// }

// function mapDispatchToProps(dispatch) {
// 	return {
// 		getSingleProduct: id => dispatch(fetchSingleProduct(id))
// 	};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
