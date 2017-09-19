
import {
  PROFILE_DELETE_STORY,
  PROFILE_SHOW_MAP,
  // PROFILE_MAP_CHANGED,
  PROFILE_STORY_SELECTED,
} from '../actions/types';

const INITIAL_STATE = {
  stories: [],
  selectedStory: null,
  isShowingMap: false,
};

const profileChange = (state, action) => {
  switch (action.type) {
    case PROFILE_DELETE_STORY:
      let stories = state.stories;
      let index;
      stories.forEach((story, i) => {
        if (story._id.$oid === action.payload) {
          index = i;
        }
      });
      return [...stories.slice(0, index), ...stories.slice(index + 1)];
    default:
      return state;
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_DELETE_STORY:
      return { ...state, stories: profileChange(state, action) };
    case PROFILE_SHOW_MAP:
      return { ...state, isShowingMap: !state.isShowingMap };
    case PROFILE_STORY_SELECTED:
      return { ...state, selectedStory: action.payload };
    default:
      return state;
  }
};
