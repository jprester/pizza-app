import {
  SET_CURRENT_USER_LOCATION,
} from './types';

export const setCurrentUserLocation = position => ({
  type: SET_CURRENT_USER_LOCATION,
  userCurrentLocation: {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  },
});