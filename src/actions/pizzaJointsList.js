import { has } from 'lodash';
import { startFetchJsonData } from '../utils/api';
import {
  SET_PIZZA_JOINTS_LIST,
  SET_PIZZA_JOINT,
  SET_PIZZA_JOINT_MENU,
} from './types';
import { API_ROOT } from '../utils/consts';

export const setPizzaJointsList = (pizzaJointsList, location) => ({
  type: SET_PIZZA_JOINTS_LIST,
  pizzaJointsList,
  location,
});

export const setPizzaJoint = (pizzaJoint) => ({
  type: SET_PIZZA_JOINT,
  pizzaJoint,
});

export const setPizzaJointMenu = (pizzaJointMenu) => ({
  type: SET_PIZZA_JOINT_MENU,
  pizzaJointMenu,
});

export const startFetchingPizzaJointsList = () => async (dispatch) => {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  const resData = await startFetchJsonData(`${API_ROOT}/restaurants/`, options, 3);

  if(!has(resData, 'error')) {
    dispatch(setPizzaJointsList(resData));
  }
};

export const startFetchingPizzaJointMenu = (id) => async (dispatch) => {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  const resData = await startFetchJsonData(`${API_ROOT}/restaurants/${id}/menu?category=Pizza&orderBy=rank`, options, 3);
  if(!has(resData, 'error')) {
    dispatch(setPizzaJointMenu(resData));
  }
};

export const startFetchingPizzaJoint = (pizzaJoint, id) => async (dispatch) => {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  const resData = await startFetchJsonData(`${API_ROOT}/restaurants/${id}`, options, 3);

  if(!has(resData, 'error')) {
    dispatch(setPizzaJoint(resData));
  }
};

