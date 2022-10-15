import {all} from "redux-saga/effects"
import {listWatcher} from "./listSaga";

export function* rootWatcher() {
    yield all([listWatcher()])
}