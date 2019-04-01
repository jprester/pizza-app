import {
  ADD_TO_CART,
  SET_MESSAGE,
  REMOVE_ALL_ITEMS,
  REMOVE_ITEM
} from '../actions/types';

import { addCartItem, removeCartItem } from '../utils/listFilters';

const shoppingCartInitialState = {
  cart: [],
  restaurantId: 0,
  message: ''
};

export default (state = shoppingCartInitialState, action) => {
  switch (action.type) {
  case ADD_TO_CART:
    return {
      ...state,
      restaurantId: action.payload.restaurantId,
      message: '',
      cart: addCartItem(state.cart, action.payload.menuItemId),
    };
  case SET_MESSAGE:
    return {
      ...state,
      message: action.payload
    };
  case REMOVE_ALL_ITEMS:
    return {
      ...state,
      cart: [],
      restaurantId: 0,
      message: 'All items removed'
    };
  case REMOVE_ITEM:
    return {
      ...state,
      cart: removeCartItem(state.cart, action.payload),
    };
  default:
    return state;
  }
};
