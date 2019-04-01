import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import pizzaJointsListReducer from '../reducers/pizzaJointsList';
import shoppingCartReducer from '../reducers/shoppingCart';
import ordersReducer from '../reducers/orders';
import userDataReducer from '../reducers/userData';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      pizzaJointsList: pizzaJointsListReducer,
      shoppingCart: shoppingCartReducer,
      orders: ordersReducer,
      userData: userDataReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
