import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchOrderData } from '../../actions/orders';

class Order extends React.Component {
  componentDidMount () {
    const id = this.props.match.params.id;

    this.props.fetchOrderData(id);
  }

  render() {
    if(this.props.selectedOrder.orderId) {
      return (
        <div>
          <h2 className="page-title">Order ID: {this.props.selectedOrder.orderId}</h2>
          <ul className="order-details-list">
            <li>Total price: {this.props.selectedOrder.totalPrice}</li>
            <li>Status: {this.props.selectedOrder.status}</li>
            <li>Estimated delivery: {this.props.selectedOrder.esitmatedDelivery}</li>
          </ul>

          <p><Link to="/orders/" className="link-item">Check all orders</Link></p>
        </div>
      );
    } else {
      return (
        <div><p>Order info</p><p>Loading...</p></div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  selectedOrder: state.orders.selectedOrder
});

Order.propTypes = {
  orderId: PropTypes.number,
  status: PropTypes.string,
  fetchOrderData: PropTypes.func.isRequired,
  selectedOrder: PropTypes.shape({
    status: PropTypes.string,
    orderId: PropTypes.number,
    totalPrice: PropTypes.number,
  }),
};

export default connect(mapStateToProps, { fetchOrderData })(Order);