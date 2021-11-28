import { combineReducers } from 'redux';

import home from './home';
import nearby from './nearby';
import search from './search';
import detail from './detail';
export default combineReducers({ search, home, nearby, detail });
