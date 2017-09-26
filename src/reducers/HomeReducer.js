import {
  HOME_CHANGE_TEXT,
} from '../actions/types';

const INITIAL_STATE = {
  searchText: null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HOME_CHANGE_TEXT:
      return { ...state, searchText: action.payload };
    default:
      return state;
  }
};
