import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
// listens for every action of a specific type that we pass to it
import { takeLatest, call, put, all } from 'redux-saga/effects'

import { FETCH_COLLECTIONS_START } from './shop.types'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionsAsync() {

    try {
        
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
    
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}