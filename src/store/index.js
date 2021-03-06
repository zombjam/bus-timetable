import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['home', 'nearby', 'detail'],
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});
