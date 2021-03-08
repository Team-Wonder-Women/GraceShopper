import axios from "axios";

// ACTION TYPES
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const ADD_SINGLE_PRODUCT = "ADD_SINGLE_PRODUCT";

// ACTION CREATORS
export const setSingleProduct = product => ({
	type: SET_SINGLE_PRODUCT,
	product
});

export const addSingleProduct = product => ({
	type: ADD_SINGLE_PRODUCT,
	product
});

// THUNK CREATORS
export const fetchSingleProduct = id => {
	return async dispatch => {
		try {
			const { data: product } = await axios.get(`/api/products/${id}`);
			dispatch(setSingleProduct(product));
		} catch (err) {
			console.log("We're having trouble fetching this product.");
		}
	};
};

export const createSingleProduct = (product, history) => {
	return async dispatch => {
		try {
			const { data: created } = await axios.post("/api/products/add", product);
			dispatch(addSingleStudent(created));
			history.push("/products");
		} catch (err) {
			console.log("We're having trouble adding this product.");
		}
	};
};

// INITIAL STATE
const initialState = {};

// REDUCER
export default function singleProductReducer(state = initialState, action) {
	switch (action.type) {
		case SET_SINGLE_PRODUCT:
			return action.product;
		case ADD_SINGLE_PRODUCT:
			return action.product;
		default:
			return state;
	}
}
