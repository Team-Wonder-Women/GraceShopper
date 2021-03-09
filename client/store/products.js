import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_SINGLE_PRODUCT = "ADD_SINGLE_PRODUCT";
const DELETED_SINGLE_PRODUCT = "DELETED_SINGLE_PRODUCT";

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({ type: GET_PRODUCTS, products });

export const addSingleProduct = product => ({
	type: ADD_SINGLE_PRODUCT,
	product
});

export const deletedSingleProduct = productId => ({
	type: DELETED_SINGLE_PRODUCT,
	productId
});

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
	try {
		const { data } = await axios.get("/api/products");
		dispatch(gotProducts(data));
	} catch (err) {
		console.error(err);
	}
};

export const createSingleProduct = product => {
	return async dispatch => {
		try {
			const { data: created } = await axios.post("/api/products/add", product);
			dispatch(addSingleProduct(created));
		} catch (err) {
			console.log("We're having trouble adding this product.");
		}
	};
};

export const deleteSingleProduct = productId => {
	return async dispatch => {
		try {
			await axios.delete(`/api/products/delete/${productId}`);
			dispatch(deletedSingleProduct(productId));
		} catch (err) {
			console.log("We're having trouble deleting this product.");
		}
	};
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.products;
		case ADD_SINGLE_PRODUCT:
			return [...state, action.product];
		case DELETED_SINGLE_PRODUCT:
			return [...state].filter(product => product.id !== action.productId);
		default:
			return state;
	}
}
