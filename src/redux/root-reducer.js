import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import user from "./user/user.reducer";
import cart from "./cart/cart.reducer"

const rootReducer = combineReducers({
	user,
	cart
});

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
