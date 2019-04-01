import {
  SET_ORDER_DETAILS,
  SELECT_ORDER
} from './types';
import { API_ROOT } from '../utils/consts';
import { has } from 'lodash';
import { startFetchJsonData } from '../utils/api';

export const placeOrder = (cart, restaurantId) => async (dispatch) => {
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: {
      "cart": cart,
      "restuarantId": restaurantId
    }
  };

  const resData = await startFetchJsonData(`${API_ROOT}/orders/`, options, 3);

  if(!has(resData, 'error')) {
    dispatch(setOrderDetails(resData));
  }
};

export const fetchOrderData = (id) => async (dispatch) => {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  };

  const resData = await startFetchJsonData(`${API_ROOT}/orders/${id}`, options, 3);

  if(!has(resData, 'error')) {
    dispatch(selectOrder(resData));
  }
};

export const selectOrder = (orderData) => ({
  type: SELECT_ORDER,
  payload: orderData
});

export const setOrderDetails = (orderDetails) => ({
  type: SET_ORDER_DETAILS,
  orderDetails
});