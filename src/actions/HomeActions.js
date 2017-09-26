import {
  HOME_CHANGE_TEXT,
} from './types';

export const changeText = (text) => {
  return {
    type: HOME_CHANGE_TEXT,
    payload: text,
  };
};
