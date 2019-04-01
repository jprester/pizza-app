import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PizzaJointsListMain from '../components/PizzaJointsList';
import PizzaJointDetailsMain from '../components/PizzaJointDetails';
import Cart from'../components/Cart';
import OrderList from '../components/orders/OrderList';
import Order from '../components/orders/Order';


export const history = createBrowserHistory();

const AppRouter = () => (
  <div className="main-container">
    <div className="content-wrapper">
      <Switch>
        <Route exact path="/" component={ PizzaJointsListMain } />
        <Route path="/pizzajoint/:id" component={ PizzaJointDetailsMain } />
        <Route path="/cart" component={ Cart } />
        <Route exact path="/orders" component={ OrderList } />
        <Route path="/orders/:id" component={ Order } />
      </Switch>
    </div>
  </div>
);

export default AppRouter;
