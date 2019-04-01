import {
  SET_PIZZA_JOINTS_LIST,
  SET_PIZZA_JOINT,
  SET_PIZZA_JOINT_MENU,
} from '../actions/types';

const pizzaJointsListInitialState = {
  pizzaJointsList: [],
  pizzaJoint: {},
  pizzaJointMenu: [],
};

export default (state = pizzaJointsListInitialState, action) => {
  switch (action.type) {
  case SET_PIZZA_JOINTS_LIST:
    return {
      ...state,
      pizzaJointsList: [...action.pizzaJointsList]
    };
  case SET_PIZZA_JOINT_MENU:
    return {
      ...state,
      pizzaJointMenu: [...action.pizzaJointMenu]
    };
  case SET_PIZZA_JOINT:
    return {
      ...state,
      pizzaJoint: {
        id: action.pizzaJoint.id,
        name: action.pizzaJoint.name,
        address1: action.pizzaJoint.address1,
        address2: action.pizzaJoint.address2,
        latitude: action.pizzaJoint.latitude,
        longitude: action.pizzaJoint.longitude,
      }
    };
  default:
    return state;
  }
};
