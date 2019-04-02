import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import OrderStatusBar from './OrderStatusBar';

const countCartItems = (cart) => {
  if(cart.length) {
    return cart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity, 0
    );
  }
};

function createCartLink (cart) {
  if (cart.length) {
    return <p className="cart-link"><Link to="/cart"> <span className="cart-number">{countCartItems(cart)}</span><img src="/images/cart.png" alt="cart" /></Link></p>;
  }
}

function displayOrderStatus(currentOrder) {
  if(currentOrder && currentOrder.orderId) {
    return <OrderStatusBar id={ currentOrder.orderId }/>;
  };
}

const Header = ({ cart, currentOrder }) => {
  return (
    <div className="header-container">
      <div className="main-header-container">
        <div className="content-wrapper">
          <div className="header-box">
            <h1 className="logo"><Link to="/"><img src="/images/logo.png" alt="logo" /><span className="logo-text">Pizza Joints</span></Link></h1>
            {createCartLink(cart)}
          </div>
        </div>
      </div>

      {displayOrderStatus(currentOrder)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.shoppingCart.cart,
  currentOrder: state.orders.currentOrder
});

Header.propTypes = {
  cart: PropTypes.array,
  currentOrder: PropTypes.object,
};

export default connect(mapStateToProps)(Header);