import axios from "axios";

const GOT_CART_ITEMS = "GOT_CART_ITEMS";
const ADDED_ITEMS = "ADDED_ITEMS";
const DELETED_ITEM = "DELETED_ITEM";

export const gotCartItems = items => ({
	type: GOT_CART_ITEMS,
	items
});

export const addedItems = (items, total) => ({
	type: ADDED_ITEMS,
	items,
	total
});

export const deletedItem = productId => ({
	type: DELETED_ITEM,
	productId
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
			dispatch(gotCartItems(items.products, items.total));
		} catch (err) {
			console.log("We're having trouble fetching the guest cart.");
		}
	};
};

export const addItemUser = (productId, count) => {
	console.log("count inside thunk", count);
	return async dispatch => {
		try {
			const { data: items } = await axios.post(`/api/usercart/${productId}`, {
				count
			});
			console.log("this is items in usercart--->", items);
			dispatch(addedItems(items.products, items.total));
		} catch (err) {
			console.log("We could not add this item to your user cart.");
		}
	};
};

export const addItemGuest = (productId, count) => {
	return async dispatch => {
		try {
			const { data: items } = await axios.get(
				`/api/guestcart/${productId}/${count}`
			);
			console.log("this is items in guestcart--->", items);
			dispatch(addedItems(items.products, items.total));
		} catch (err) {
			console.log("We could not add this item to your guest cart.");
		}
	};
};

export const deleteItemUser = (cartId, productId) => {
	return async dispatch => {
		try {
			await axios.delete(`/api/userCart/${cartId}/${productId}`);
			dispatch(deletedItem(productId));
		} catch (err) {
			console.log("We weren't able to delete this item from your user cart.");
		}
	};
};

export const deleteItemGuest = productId => {
	return async dispatch => {
		try {
			await axios.get(`/api/guestCart/${productId}/remove`);
			dispatch(deletedItem(productId));
		} catch (err) {
			console.log("We weren't able to delete this item from your guest cart.");
		}
	};
};

const initialState = { products: [], total: 0 };

export default function cartItems(state = initialState, action) {
	switch (action.type) {
		case GOT_CART_ITEMS:
			if (action.items) {
				return { ...state, products: [...action.items], total: action.total };
			} else {
				return state;
			}
		case ADDED_ITEMS:
			return { ...state, products: [...action.items], total: action.total };
		case DELETED_ITEM:
			state.products = state.products.filter(
				item => item.id !== action.productId
			);
			return { ...state, products: [...state.products] };
		default:
			return state;
	}
}
