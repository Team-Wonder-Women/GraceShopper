import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = "GET_PRODUCTS";

/**
 * INITIAL STATE
 */
const products = [];

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({ type: GET_PRODUCTS, products });

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
	try {
		const { data } = await axios.get("./api/products");
		dispatch(gotProducts(data));
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function (state = products, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.products;
		default:
			return state;
	}
}
