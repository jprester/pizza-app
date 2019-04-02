import React from 'react';
import { Link } from 'react-router-dom';

const OrderStatusBar = ({ id }) => (
  <div className="active-order-widget-container">
    <div className="active-order-widget">
      <div className="content-wrapper">
        Your have an active order.  <Link to={ `/orders/${id}` } className="link-item">Order status</Link>
      </div>
    </div>
  </div>
);

export default OrderStatusBar;