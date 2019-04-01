import React, { Suspense, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { startFetchingPizzaJoint, setPizzaJoint, startFetchingPizzaJointMenu } from '../actions/pizzaJointsList';
import { addToCart, setMessage } from '../actions/shoppingCart';

class PizzaJointDetails extends Component {
  componentDidMount = async () => {
    this.props.setMessage("");

    const id = this.props.match.params.id;
    const pizzaJoint= this.props.pizzaJointsList.filter(item => {
      return item.id === +id;
    });

    if (pizzaJoint.length) {
      this.props.setPizzaJoint(pizzaJoint[0]);
    } else {
      this.props.startFetchingPizzaJoint(id);
    }
    this.props.startFetchingPizzaJointMenu(id);
  }

  addToCart = (menuItemId, pizzaJointId, restaurantId) => {
    // user is not allowed to add items from another restaurant if he already has items in the cart from different restaurant.
    if (restaurantId && restaurantId !== pizzaJointId) {
      this.props.setMessage("You already have items in the cart from other restaurant. Please complete that order first.");
    } else {
      this.props.addToCart(menuItemId, pizzaJointId);
      this.props.setMessage("Item added to cart.");
    }
  }

  displayGoToCartButton(cart) {
    if(cart.length) {
      return <Link className="main-button back" to={ '/cart' }>Cart</Link>;
    }
  }

  render() {
    return (
      <div>
        <Suspense fallback={ <div>Loading...</div> }>
          <div>
            <h2 className="page-title">{this.props.pizzaJoint.name}</h2>
            <p className="page-map"><img src="/images/map_icon.png" alt="restaurant map" />
              <span className="page-address">{this.props.pizzaJoint.address1}</span>
            </p>
            <p className="message-content">{this.props.message}</p>
            <h5 className="sub-title">Menu</h5>
          </div>
        </Suspense>
        <Suspense fallback={ <div>Loading...</div> }>
          <div>
            {this.props.pizzaJointMenu.map(item => (
              <div key={ item.name } className="menu-items">
                <p className="menu-item-name">{item.name}</p>
                <p className="menu-item-price">{item.price},00 SEK</p>
                <button className="menu-item-add-button" onClick={ () => this.addToCart(item.id, this.props.pizzaJoint.id, this.props.restaurantId) }>Add</button>
              </div>
            ))}
          </div>
        </Suspense>
        <div className="main-buttons-container">
          <Link to={ '/' } className="main-button forward">Back</Link>
          {this.displayGoToCartButton(this.props.cart)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pizzaJointsList: state.pizzaJointsList.pizzaJointsList,
  pizzaJoint: state.pizzaJointsList.pizzaJoint,
  cart: state.shoppingCart.cart,
  message: state.shoppingCart.message,
  restaurantId: state.shoppingCart.restaurantId,
  pizzaJointMenu: state.pizzaJointsList.pizzaJointMenu,
});

PizzaJointDetails.propTypes = {
  pizzaJointsList: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps, {
  startFetchingPizzaJoint,
  setPizzaJoint,
  startFetchingPizzaJointMenu,
  addToCart,
  setMessage
})(PizzaJointDetails);
