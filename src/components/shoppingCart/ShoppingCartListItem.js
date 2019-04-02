import React from 'react';

const ShoppingCartListItem = ({id, name, quantity, price, removeItem, removeAllItems, cart}) => (
  <li>
    <p>{name}</p>
    <p>{quantity}</p>
    <p>{price}</p>
    <p><button onClick={ () => cart.length > 1 ? removeItem(id) : removeAllItems() }>Delete</button></p>
  </li>
);

export default ShoppingCartListItem;