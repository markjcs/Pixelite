import {
  NEWSTORY_CREATE_STORY,
  NEWSTORY_GET_PHOTOS,
} from '../actions/types';

const INITIAL_STATE = {
  story: null,
};

/*
isTextEditable: false,
arePhotosSelected: false,
titleValue: '',
textValue: '',
selectedPhotos: {},
selectedCity: null,
selectedCountry: null,
travelPeriod: null,
thumbnailUrl: 'http://travel.home.sndimg.com/content/dam/images/travel/fullset/2014/12/3/top-10-caribbean-beaches-eagle-beach-aruba.jpg.rend.hgtvcom.966.725.suffix/1491584555480.jpeg',
locations: [],
*/


const newSotryChange = (state, action) => {
  switch (action.type) {
    case NEWSTORY_GET_PHOTOS:
      return {};
    default:
      return state;
  }
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWSTORY_CREATE_STORY:
      return { ...state, story: action.payload };
    case NEWSTORY_GET_PHOTOS:
      return { ...state, newStoryChange(state, action) };
    default:
      return state;
  }
};
