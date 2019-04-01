import {
  SET_CURRENT_USER_LOCATION,
} from '../actions/types';

const userDataInitialState = {
  userCurrentLocation: {},
};

export default (state = userDataInitialState, action) => {
  switch (action.type) {
  case SET_CURRENT_USER_LOCATION:
    return {
      ...state,
      userCurrentLocation: { ...action.userCurrentLocation },
    };
  default:
    return state;
  }
};
