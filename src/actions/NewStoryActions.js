
import {
  NEWSTORY_CREATE_STORY,
  NEWSTORY_UPDATED_STORIES,
} from './types';

const updateStory = (dispatch, updatedStory) => {
  console.log('updatesStory: ', updatedStory);
  dispatch({
    type: NEWSTORY_UPDATED_STORIES,
    payload: updatedStory,
  });
};

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
      }),
    })
    .then(res => {
      const bodyText = JSON.parse(res._bodyText);
      console.log('createNewStory, received bodyText:', bodyText);
      updateStory(dispatch, bodyText);
    }).catch(err => console.log('createNewStory err!: ', err));
  };
};
