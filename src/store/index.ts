import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../sagas';
import listReducer from './listState';
import navigationReducer from './navigationState';
import playerReducer from './playerState';
import userReducer from './userState';
import libraryReducer from './libraryState';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    list: listReducer,
    navigation: navigationReducer,
    player: playerReducer,
    user: userReducer,
    library: libraryReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
