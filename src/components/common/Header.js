import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    return (
      <div className="active-order-widget-container">
        <div className="active-order-widget">
          <div className="content-wrapper">
            Your have an active order.  <Link to={ `/orders/${currentOrder.orderId}` } className="link-item">Order status</Link>
          </div>
        </div>
      </div>);
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

export default connect(mapStateToProps)(Header);