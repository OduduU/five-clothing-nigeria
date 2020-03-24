import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCUdHB4HP2ZCW_OXtLAqWdZ9kjpWJlNkXg",
	authDomain: "five-clothing-db.firebaseapp.com",
	databaseURL: "https://five-clothing-db.firebaseio.com",
	projectId: "five-clothing-db",
	storageBucket: "five-clothing-db.appspot.com",
	messagingSenderId: "82307577860",
	appId: "1:82307577860:web:233938552e2e13fd0b1d51",
	measurementId: "G-J7VCYX6C27"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
