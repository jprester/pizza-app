import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMenuItemFromId } from '../utils/listFilters';
import { startFetchingPizzaJointMenu, setPizzaJointMenu } from '../actions/pizzaJointsList';
import { removeAllItems, removeItem, setMessage } from '../actions/shoppingCart';
import { placeOrder } from '../actions/orders';

class Cart extends React.Component {
  componentDidMount () {
    this.props.setPizzaJointMenu([]);
    this.props.setMessage("");
    if(this.props.restaurantId) {
      this.props.startFetchingPizzaJointMenu(this.props.restaurantId);
    }
  }

  displayButtons() {
    if(this.props.cart.length) {
      return (
        <div className="main-buttons-container">
          <button onClick={ () => this.props.history.goBack() } className="main-button back">Back</button>
          <button className="main-button forward" onClick={ () => this.onClickOrderButton() }>Order</button>
        </div>
      );
    }

    return (
      <div className="main-buttons-container">
        <button onClick={ () => this.props.history.goBack() } className="main-button back">Back</button>
      </div>
    );
  };

  onClickOrderButton() {
    if(this.props.cart.length && this.props.restaurantId) {
      this.props.placeOrder(this.props.cart, this.props.restaurantId)
        .then(() => {
          this.props.removeAllItems();
          this.props.setMessage("Order successful! Your food should be coming soon.");
        });
    }
  }

  render() {
    return (
      <div>
        <h2 className="page-title">Cart Page</h2>
        {displayOrderLocation(this.props)}
        {displayCartItems(this.props)}
        {this.displayButtons(this.props)}
      </div>
    );
  }
};


const getRestaurantName = (restaurantList, id) => {
  return restaurantList.find(item => {
    if(item.id === id) {
      return item.name;
    }}
  );
};

const displayOrderLocation = ({ pizzaJointsList, restaurantId }) => {
  if(pizzaJointsList.length && restaurantId) {
    const restaurant = getRestaurantName(pizzaJointsList, restaurantId);

    return (
      <p>Ordering from: <Link to={ `/pizzajoint/${restaurantId}` } className="link-item">{restaurant.name}</Link></p>
    );
  }
};

const displayCartItems = ({ cart, pizzaJointMenu, removeAllItems, message, currentOrder, removeItem, }) => {
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
              <li key={ menuItem.id }><p>{menuItem.name}</p> <p>{item.quantity}</p><p>{menuItem.price}</p><p><button onClick={ () => cart.length > 1 ? removeItem(menuItem.id) : removeAllItems() }>Delete</button></p></li>
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


const mapStateToProps = (state) => ({
  cart: state.shoppingCart.cart,
  message: state.shoppingCart.message,
  restaurantId: state.shoppingCart.restaurantId,
  pizzaJointMenu: state.pizzaJointsList.pizzaJointMenu,
  pizzaJointsList: state.pizzaJointsList.pizzaJointsList,
  currentOrder: state.orders.currentOrder
});

Cart.propTypes = {
  message: PropTypes.string,
  restaurantId: PropTypes.number,
  cart: PropTypes.array,
  pizzaJointMenu: PropTypes.array,
  startFetchingPizzaJointMenu: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
  removeAllItems: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  startFetchingPizzaJointMenu,
  setPizzaJointMenu,
  placeOrder,
  setMessage,
  removeAllItems,
  removeItem
})(Cart);