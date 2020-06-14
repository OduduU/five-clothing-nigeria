import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import "./App.css";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import SignInAndSignUp from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// import { setCurrentUser, checkUserSession } from "./redux/user/user.actions";
import { setCurrentUser, checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

const App = ({ checkUserSession, currentUser }) => {
	// unsubscribeFromAuth = null;

	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	// componentDidMount() {
		// const { setCurrentUser } = this.props;

		// user authentication using firestore observable method
		// this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
		// 	if (userAuth) {
		// 		const userRef = await createUserProfileDocument(userAuth);

		// 		userRef.onSnapshot(snapShot => {
		// 			setCurrentUser({
		// 				id: snapShot.id,
		// 				...snapShot.data()
		// 			});
		// 		});
		// 	} else {
		// 		setCurrentUser(userAuth);
		// 	}
		// });

		// const { checkUserSession } = this.props;
		// checkUserSession();
	// }

	// componentWillUnmount() {
	// 	this.unsubscribeFromAuth();
	// }

	// render() {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route path="/shop" component={ShopPage} />
				<Route exact path="/checkout">
					<CheckoutPage />
				</Route>
				<Route
					exact
					path="/signin"
					render={() =>
						currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
					}
				/>
			</Switch>
		</div>
	);
	// }
}

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
	// setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
