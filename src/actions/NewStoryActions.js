
import {
  NEWSTORY_CREATE_STORY,
  NEWSTORY_UPDATED_STORIES,
} from './types';

const updateStories = (dispatch, updatedStories) => {
  console.log("ddddd");
  console.log("updatedStories: ", updateStories);
  dispatch ({
    type: NEWSTORY_UPDATED_STORIES,
    payload: updatedStories,
  });
}

export const newStoryCreateStory = (story, user) => {
  return (dispatch) => {
    // dispatch({ type: NEWSTORY_CREATE_STORY });
    fetch('http://localhost:5000/createNewStory', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        story: story,
        user: user,
      })
    })
    .then(res => JSON.parse(res._bodyText))
    .then(bodyText => updateStories(dispatch, bodyText.stories))
    .catch(err => console.log(err));
  };
};
