import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import AuthReducer from './AuthReducer';
import NewStoryReducer from './NewStoryReducer';

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  newStory: NewStoryReducer,
});
