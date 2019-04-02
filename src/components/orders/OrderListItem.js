import React from 'react';
import { Link } from 'react-router-dom';

const OrderListItem = ({orderId, totalPrice, esitmatedDelivery, orderedAt}) => (
  <li key={ orderId }>
    <p>Order ID: {orderId}</p>
    <p>Total Price: {totalPrice}</p>
    <p>Ordered at: {orderedAt}</p>
    <p>Estimated delivery: {esitmatedDelivery}</p>
    <Link to={ `/orders/${orderId}` } className="link-item">Go to order</Link>
    <hr/>
  </li>
);

export default OrderListItem;
