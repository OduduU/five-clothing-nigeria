import { UPDATE_COLLECTION } from "./shop.types";

export const updateCollections = (collectionMap) => {
	return {
		type: UPDATE_COLLECTION,
		payload: collectionMap,
	};
};
