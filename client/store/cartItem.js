import axios from "axios";

const GOT_CART_ITEMS = "GOT_CART_ITEMS";
const ADDED_ITEMS = "ADDED_ITEMS";
const DELETED_ITEM_USER = "DELETED_ITEM";
const DELETED_ITEM_GUEST = "DELETED_ITEM_GUEST";

export const gotCartItems = (items, total) => ({
	type: GOT_CART_ITEMS,
	items,
	total
});

export const addedItems = (items, total) => ({
	type: ADDED_ITEMS,
	items,
	total
});

export const deletedItemUser = productId => ({
	type: DELETED_ITEM_USER,
	productId
});

export const deletedItemGuest = productId => ({
	type: DELETED_ITEM_GUEST,
	productId
});

//retrieve logged in cart
export const fetchCartItemsUser = userId => {
	return async dispatch => {
		try {
			const { data: items } = await axios.get(`/api/usercart/${userId}`);
			dispatch(gotCartItems(items.products, items.total));
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
			console.log("these are the items in user cart-->", items);
			dispatch(gotCartItems(items.products, items.total));
		} catch (err) {
			console.log("We're having trouble fetching the guest cart.");
		}
	};
};

export const addItemUser = (productId, count) => {
	return async dispatch => {
		try {
			const { data: items } = await axios.post(`/api/usercart/${productId}`, {
				count
			});
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
			dispatch(addedItems(items.products, items.total));
		} catch (err) {
			console.log("We could not add this item to your guest cart.");
		}
	};
};

export const deleteItemUser = (cartId, productId) => {
	return async dispatch => {
		try {
			await axios.delete(`/api/usercart/${cartId}/${productId}`);
			dispatch(deletedItemUser(productId));
		} catch (err) {
			console.log("We weren't able to delete this item from your user cart.");
		}
	};
};

export const deleteItemGuest = productId => {
	return async dispatch => {
		try {
			await axios.delete(`/api/guestcart/${productId}`);
			dispatch(deletedItemGuest(productId));
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
				return {
					...state,
					products: [...action.items],
					total: action.total ? action.total : state.total
				};
			} else {
				return state;
			}
		case ADDED_ITEMS:
			return { ...state, products: [...action.items], total: action.total };
		case DELETED_ITEM_USER:
			state.products = state.products.filter(
				item => item.id !== action.productId
			);
			return { ...state };
		case DELETED_ITEM_GUEST:
			state.products = state.products.filter(
				product => product.item.id !== action.productId
			);
			return { ...state };
		default:
			return state;
	}
}
