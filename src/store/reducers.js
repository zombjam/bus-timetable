import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import home from './home';
import nearby from './nearby';
import search from './search';
import detail from './detail';

const searchConfig = {
  key: 'search',
  storage,
  blacklist: ['cityBusList'],
};

export default combineReducers({ search: persistReducer(searchConfig, search), home, nearby, detail });
