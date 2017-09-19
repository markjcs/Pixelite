import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
});
