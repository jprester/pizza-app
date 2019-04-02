import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PizzaJointsList from '../components/PizzaJointsList';
import PizzaJointDetails from '../components/PizzaJointDetails';
import ShoppingCart from'../components/shoppingCart/ShoppingCart';
import OrderList from '../components/orders/OrderList';
import Order from '../components/orders/Order';


export const history = createBrowserHistory();

const AppRouter = () => (
  <div className="main-container">
    <div className="content-wrapper">
      <Switch>
        <Route exact path="/" component={ PizzaJointsList } />
        <Route path="/pizzajoint/:id" component={ PizzaJointDetails } />
        <Route path="/cart" component={ ShoppingCart } />
        <Route exact path="/orders" component={ OrderList } />
        <Route path="/orders/:id" component={ Order } />
      </Switch>
    </div>
  </div>
);

export default AppRouter;
