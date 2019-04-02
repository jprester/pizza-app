import React from 'react';
import PropTypes from 'prop-types';

const ShoppingCartListItem = ({id, name, quantity, price, removeItem, removeAllItems, cart}) => (
  <li>
    <p>{name}</p>
    <p>{quantity}</p>
    <p>{price}</p>
    <p><button onClick={ () => cart.length > 1 ? removeItem(id) : removeAllItems() }>Delete</button></p>
  </li>
);

ShoppingCartListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  cart: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  removeAllItems: PropTypes.func.isRequired,

};

export default ShoppingCartListItem;