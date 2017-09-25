import {
  NEWSTORY_CREATE_STORY,
} from '../actions/types';

const INITIAL_STATE = {
  story: null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWSTORY_CREATE_STORY:
      return { ...state, story: action.payload };
    default:
      return state;
  }
};
