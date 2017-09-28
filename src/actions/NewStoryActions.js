
import {
  NEWSTORY_CREATE_STORY,
  NEWSTORY_UPDATED_STORIES,
  NEWSTORY_GET_PHOTOS,
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


export const newStoryGetPhotos = (newPhotos, arePhotosSelected) => {
  const newTravelPeriod = getTravelPeriod(compareDates(Object.keys(newPhotos)));
  const newArePhotosSelected = arePhotosSelected ? !arePhotosSelected : null;
  return {
    type: NEWSTORY_GET_PHOTOS,
    payload: { newPhotos, newTravelPeriod, newArePhotosSelected },
  };
}

const compareDates = (dates) => {
  month = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return dates.sort((a, b) => {
    const first = a.split(' ').map((element, i) => { if (i === 0 || i === 2) return Number(element); return element; });
    const second = b.split(' ').map((element, i) => { if (i === 0 || i === 2) return Number(element); return element; });
    if (first[2] > second[2]) {
      return first[2] - second[2] > 0;
    } else if (first[2] === second[2]) {
      if (first[1] === second[1]) {
        return first[0] - second[0] > 0;
      }
      return month.indexOf(first[1]) - month.indexOf(second[1]) > 0;
    }
    return a - b < 0;
  });
}

const getTravelPeriod = (dates) => {
  if (dates.length === 1) {
    return dates[0];
  } else {
    const early = dates[0].split(' ').map((element, i) => { if (i === 0 || i === 2) return Number(element); return element; });
    const late = dates[dates.length - 1].split(' ').map((element, i) => { if (i === 0 || i === 2) return Number(element); return element; });

    if(early[2] === late[2] && early[1] === late[1]) {
      return `${early[0]} - ${late[0]} ${late[1]} ${late[2]}`;
    } else if( early[2] === late[2]) {
      return `${early[0]} ${early[1]} - ${late[0]} ${late[1]} ${late[2]}`;
    } else {
      return `${early.join(' ')} - ${late.join(' ')}`;
    }
  }
}
