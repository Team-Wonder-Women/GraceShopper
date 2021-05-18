import axios from "axios";
import history from "../history";
import { fetchCartItemsUser, fetchCartItemsGuest } from "./cartItem";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
	try {
		const res = await axios.get("/auth/me");
		dispatch(getUser(res.data || defaultUser));
		if (res.data !== null) {
			dispatch(fetchCartItemsUser(res.data.id));
		}
	} catch (err) {
		console.error(err);
	}
};

export const auth = (
	email,
	password,
	method,
	firstName,
	lastName
) => async dispatch => {
	let res;
	try {
		if (method === "signup") {
			res = await axios.post(`/auth/${method}`, {
				email,
				password,
				firstName,
				lastName
			});
		} else {
			res = await axios.post(`/auth/${method}`, { email, password });
		}
	} catch (authError) {
		return dispatch(getUser({ error: authError }));
	}

	try {
		dispatch(getUser(res.data));
		dispatch(fetchCartItemsUser(res.data.id));
		history.push("/home");
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

export const logout = () => async dispatch => {
	try {
		await axios.post("/auth/logout");
		dispatch(removeUser());
		dispatch(fetchCartItemsGuest());
		history.push("/");
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		default:
			return state;
	}
}
