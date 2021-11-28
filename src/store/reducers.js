import { combineReducers } from 'redux';

import home from './home';
import nearby from './nearby';
import search from './search';
export default combineReducers({ search, home, nearby });
