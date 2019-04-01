import {
  SET_ORDER_DETAILS,
  SELECT_ORDER
} from '../actions/types';

const ordersInitialState = {
  orders: [],
  currentOrder: {},
  selectedOrder: {}
};

export default (state = ordersInitialState, action) => {
  switch (action.type) {
  case SET_ORDER_DETAILS:
    return {
      ...state,
      orders: [...state.orders, action.orderDetails],
      currentOrder: action.orderDetails
    };

  case SELECT_ORDER:
    return {
      ...state,
      selectedOrder: action.payload
    };

  default:
    return state;
  }
};

