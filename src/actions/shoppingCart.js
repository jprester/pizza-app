import {
  ADD_TO_CART,
  SET_MESSAGE,
  REMOVE_ALL_ITEMS,
  REMOVE_ITEM
} from './types';


export const addToCart = (menuItemId, restaurantId) => ({
  type: ADD_TO_CART,
  payload: {
    restaurantId: restaurantId,
    menuItemId: menuItemId
  },
});

export const setMessage = text => ({
  type: SET_MESSAGE,
  payload: text
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id
});

export const removeAllItems = () => ({
  type: REMOVE_ALL_ITEMS,
});







