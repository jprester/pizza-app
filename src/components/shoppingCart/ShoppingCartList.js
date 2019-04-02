import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMenuItemFromId } from '../../utils/listFilters';
import ShoppingCartListItem from './ShoppingCartListItem';

const ShoppingCartList = (props) => {
  const { cart,
    pizzaJointMenu,
    removeAllItems,
    message,
    currentOrder
  } = props;

  if(pizzaJointMenu.length && cart.length){
    let totalPrice = 0;

    return (
      <div>
        <ul className="cart-items-list-header"><li>Menu Item</li><li>Quantity</li><li>Price</li></ul>
        <ul className="cart-items-list">
          {cart.map(item => {
            const menuItem = getMenuItemFromId(item.menuItemId, pizzaJointMenu);

            totalPrice = totalPrice + (menuItem.price * item.quantity);

            return (
              <ShoppingCartListItem key={ menuItem.id } { ...props } { ...menuItem } quantity={ item.quantity } />
            );
          })}
        </ul>
        <p className="cart-items-total">
          Total Price: {totalPrice}
        </p>
        <button className="link-item" onClick = { removeAllItems }>Remove all items</button>
      </div>
    );
  } else if(message && currentOrder.orderId) {
    return <p className="message-content">{message}. Check your order <Link to={ `/orders/${currentOrder.orderId}` } className="link-item">here</Link></p>;
  } else if(message) {
    return <p className="message-content">{message}</p>;
  }

  return <div>Loading</div>;
};

ShoppingCartList.propTypes = {
  restaurantId: PropTypes.number,
  cart: PropTypes.array,
  removeAllItems: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  currentOrder: PropTypes.object,
  pizzaJointMenu: PropTypes.array,
  message: PropTypes.string
};

export default ShoppingCartList;