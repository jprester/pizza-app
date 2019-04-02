import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getRestaurantNameFromId } from '../../utils/listFilters';
import { startFetchingPizzaJointMenu, setPizzaJointMenu } from '../../actions/pizzaJointsList';
import { removeAllItems, removeItem, setMessage } from '../../actions/shoppingCart';
import { placeOrder } from '../../actions/orders';
import ShoppingCartList from './ShoppingCartList';

class ShoppingCart extends React.Component {
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
        <ShoppingCartList { ...this.props } />
        {this.displayButtons(this.props)}
      </div>
    );
  }
};


const displayOrderLocation = ({ pizzaJointsList, restaurantId }) => {
  if(pizzaJointsList.length && restaurantId) {
    const restaurant = getRestaurantNameFromId(pizzaJointsList, restaurantId);

    return (
      <p>Ordering from: <Link to={ `/pizzajoint/${restaurantId}` } className="link-item">{restaurant.name}</Link></p>
    );
  }
};


const mapStateToProps = (state) => ({
  cart: state.shoppingCart.cart,
  message: state.shoppingCart.message,
  restaurantId: state.shoppingCart.restaurantId,
  pizzaJointMenu: state.pizzaJointsList.pizzaJointMenu,
  pizzaJointsList: state.pizzaJointsList.pizzaJointsList,
  currentOrder: state.orders.currentOrder
});

ShoppingCart.propTypes = {
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
})(ShoppingCart);