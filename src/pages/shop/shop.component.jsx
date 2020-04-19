import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import {
	firestore,
	convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	constructor(props) {
		super();
		this.state = {
			loading: true,
		};
	}

	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;

		const collectionRef = firestore.collection("collections");

		// observable/observer pattern of interfacing with firestore library which constantly update us with live data
		// this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
		// 	const collectionMap = convertCollectionsSnapshotToMap(snapshot);
		// 	updateCollections(collectionMap);
		// 	this.setState({ loading: false });
		// });

		// Promise base pattern by leveraging the firestore collectionRef that we get back from firestore library
		collectionRef.get().then(snapshot => {
			const collectionMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionMap);
			this.setState({ loading: false });
		});

		// Using the fetch pattern which is very deeply nested before we can access our desired data
		// fetch('https://firestore.googleapis.com/v1/projects/five-clothing-db/databases/(default)/documents/collections')
		// .then(response => response.json())
		// .then(collections => console.log('collections:', collections))

	}

	render() {
		const { match } = this.props;
		const {loading} = this.state
		return (
			<div className="shop-page">
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<CollectionsOverviewWithSpinner isLoading={loading} {...props} />
					)}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					render={(props) => (
						<CollectionPageWithSpinner isLoading={loading} {...props} />
					)}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionMap) =>
		dispatch(updateCollections(collectionMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
