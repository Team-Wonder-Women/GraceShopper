import axios from "axios";

const GOT_CART_ITEMS = "GOT_CART_ITEMS";
const ADDED_ITEMS = "ADDED_ITEMS";
const DELETED_ITEM_USER = "DELETED_ITEM";
const DELETED_ITEM_GUEST = "DELETED_ITEM_GUEST";
const COMPLETED_CART = "COMPLETED_CART";
const UPDATED_CART = "UPDATED_CART";
const UPDATED_GUEST_CART = "UPDATED_GUEST_CART";

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

export const deletedItemUser = (productId, price) => ({
	type: DELETED_ITEM_USER,
	productId,
	price
});

export const deletedItemGuest = (productId, price) => ({
	type: DELETED_ITEM_GUEST,
	productId,
	price
});

export const completedCart = () => ({
	type: COMPLETED_CART
});

export const updatedCart = (items, total) => ({
	type: UPDATED_CART,
	items,
	total
});

export const updatedGuestCart = (items, total) => ({
	type: UPDATED_GUEST_CART,
	items,
	total
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

export const deleteItemUser = (cartId, productId, price) => {
	return async dispatch => {
		try {
			await axios.delete(`/api/usercart/${cartId}/${productId}`);
			dispatch(deletedItemUser(productId, price));
		} catch (err) {
			console.log("We weren't able to delete this item from your user cart.");
		}
	};
};

export const deleteItemGuest = (productId, price) => {
	return async dispatch => {
		try {
			await axios.delete(`/api/guestcart/${productId}`);
			dispatch(deletedItemGuest(productId, price));
		} catch (err) {
			console.log("We weren't able to delete this item from your guest cart.");
		}
	};
};

// mark logged in cart as complete
export const markUserCartComplete = () => {
	return async dispatch => {
		try {
			await axios.put(`/api/usercart/`);
			dispatch(completedCart());
		} catch (err) {
			console.error(err.message);
		}
	};
};

// mark guest cart as complete
export const markGuestCartComplete = () => {
	return function (dispatch) {
		axios.put("/api/guestCart");
		dispatch(completedCart());
	};
};

export const updateCartQuantity = (productId, update) => {
	return async dispatch => {
		try {
			const { data } = await axios.put(`/api/usercart/${productId}`, {
				update
			});
			dispatch(updatedCart(data.products, data.total));
		} catch (err) {
			console.log("We're having trouble updating this user cart.");
		}
	};
};

export const updateCartQuantityGuest = (productId, update) => {
	return async dispatch => {
		try {
			const { data } = await axios.put(`/api/guestcart/${productId}`, {
				update
			});
			console.log("this is data in usercart update--->", data);
			dispatch(updatedGuestCart(data.products, data.total));
		} catch (err) {
			console.log("We're having trouble updating this guest cart.");
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
			state.total = state.total - action.price;
			return { ...state };
		case DELETED_ITEM_GUEST:
			state.products = state.products.filter(
				product => product.item.id !== action.productId
			);
			state.total = state.total - action.price;
			return { ...state };
		case UPDATED_CART:
			return { ...state, products: [...action.items], total: action.total };
		case UPDATED_GUEST_CART:
			return { ...state, products: [...action.items], total: action.total };
		case COMPLETED_CART:
			return initialState;
		default:
			return state;
	}
}
