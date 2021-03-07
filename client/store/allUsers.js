import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_USERS = "GET_USERS";

/**
 * INITIAL STATE
 */
const allUsers = [];

/**
 * ACTION CREATORS
 */
const gotUsers = users => ({ type: GET_USERS, users });

/**
 * THUNK CREATORS
 */
export const getUsers = () => async dispatch => {
	try {
		const { data } = await axios.get("./api/users");
		dispatch(gotUsers(data));
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function (state = allUsers, action) {
	switch (action.type) {
		case GET_USERS:
			return action.users;
		default:
			return state;
	}
}
