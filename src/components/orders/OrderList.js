import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const OrderList = (props) => {
  if(props.orders.length) {
    return (
      <div>
        <h2>My Orders</h2>
        <ul>
          {props.orders.map(item => {
            return (
              <li key={ item.orderId }>
                <p>Order ID: {item.orderId}</p>
                <p>Total Price: {item.totalPrice}</p>
                <p>Ordered at: {item.orderedAt}</p>
                <p>Estimated delivery: {item.esitmatedDelivery}</p>
                <Link to={ `/orders/${item.orderId}` } className="link-item">Go to order</Link>
                <hr/>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return(
      <div>
        <h2>My Orders</h2>
        <p>No orders information</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
});

OrderList.propTypes = {
  orders: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(OrderList);