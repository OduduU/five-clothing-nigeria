import { SET_CURRENT_USER } from "./user.types";

export const setCurrentUser = user => {
	return {
		type: SET_CURRENT_USER,
		payload: user
	};
};

const INITIAL_STATE = {
	currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			};
		default:
			return state;
	}
};

export default userReducer;
