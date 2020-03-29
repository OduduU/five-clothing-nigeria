import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import user from "./user/user.reducer";

const rootReducer = combineReducers({
	user
});

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
