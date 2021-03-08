import axios from "axios";

const GOT_CART_ITEMS = "GOT_CART_ITEMS";
const ADDED_ITEMS = "ADDED_ITEMS";
const DELETED_ITEM = "DELETED_ITEM";

export const gotCartItems = items => ({
	type: GOT_CART_ITEMS,
	items
});

export const addedItems = items => ({
	type: ADDED_ITEMS,
	items
});

export const deletedItem = item => ({
	type: DELETED_ITEM,
	item
});

//retrieve logged in cart
export const fetchCartItemsUser = userId => {
	return async dispatch => {
		try {
			const { data: items } = await axios.get(`/api/usercart/${userId}`);
			dispatch(gotCartItems(items.products));
		} catch (err) {
			console.log("We're having trouble fetching the user cart.");
		}
	};
};

//retrieve guest cart
export const fetchCartItemsGuest = () => {
	return async dispatch => {
		try {
			const { data: items } = await axios.get(`/api/guestcart`);
			dispatch(gotCartItems(items.products));
		} catch (err) {
			console.log("We're having trouble fetching the guest cart.");
		}
	};
};

export const addItem = productId => {
	return async dispatch => {
		try {
			const { data: items } = await axios.get(`/api/guestcart/${productId}`);
			dispatch(addedItems(items.products));
		} catch (err) {
			console.log("We could not add this item to your cart.");
		}
	};
};

export const deleteItem = (cartId, productId) => {
	return async dispatch => {
		try {
			await axios.delete(`/api/userCart/${cartId}/${productId}`);
			console.log("This item was deleted.");
		} catch (err) {
			console.log("We weren't able to delete this item from your cart.");
		}
	};
};

const initialState = { products: [], total: 0 };

export default function cartItems(state = initialState, action) {
	switch (action.type) {
		case GOT_CART_ITEMS:
			if (action.items) {
				return { ...state, products: [...action.items] };
			} else {
				return state;
			}
		case ADDED_ITEMS:
			return { ...state, products: [...action.items] };
		default:
			return state;
	}
}
