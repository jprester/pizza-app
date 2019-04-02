import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OrderListItem from './OrderListItem';

const OrderList = (props) => {
  if(props.orders.length) {
    return (
      <div>
        <h2>My Orders</h2>
        <ul>
          {props.orders.map(item => {
            return (
              <OrderListItem key={ item.orderId } { ...item }/>
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