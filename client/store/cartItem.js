import axios from "axios";

const GOT_CART_ITEMS = "GOT_CART_ITEMS";

export const gotCartItems = items => ({
	type: GOT_CART_ITEMS,
	items
});

//logged in
export const fetchCartItemsUser = userId => {
	return async dispatch => {
		try {
			const { data: items } = await axios.get(`/api/usercart/${userId}`);
			dispatch(gotCartItems(items));
		} catch (err) {
			console.log("We're having trouble fetching the user cart.");
		}
	};
};

//guest
export const fetchCartItemsGuest = () => {
	return async dispatch => {
		try {
			const { data: items } = await axios.get(`/api/guestcart`);
			dispatch(gotCartItems(items));
		} catch (err) {
			console.log("We're having trouble fetching the guest cart.");
		}
	};
};

const initialState = [];

export default function cartItems(state = initialState, action) {
	switch (action.type) {
		case GOT_CART_ITEMS:
			return action.items;
		default:
			return state;
	}
}
