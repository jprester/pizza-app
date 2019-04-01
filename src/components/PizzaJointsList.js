import React, { Suspense, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { filterListByLocation } from '../utils/listFilters';
import {startFetchingPizzaJointsList, setPizzaJointsList } from '../actions/pizzaJointsList';
import { setCurrentUserLocation } from '../actions/userData';
import { getLocation } from '../utils/geoLocation';

class PizzaJointsList extends Component {
  componentDidMount = async () => {
    const {
      startFetchingPizzaJointsList,
    } = this.props;

    await startFetchingPizzaJointsList();
    await getLocation(this.props.setCurrentUserLocation);
  };

  render () {
    const { pizzaJointsList, userCurrentLocation } = this.props;
    const filteredList = filterListByLocation(pizzaJointsList, userCurrentLocation);

    return (
      <div>
        <h4>CLOSEST PIZZA RESTAURANTS</h4>
        <Suspense fallback={ <div>Loading...</div> }>
          <ul className="restaurant-list">
            {filteredList.map(listItem => (
              <li key={ listItem.id } >
                <Link to={ `/pizzajoint/${listItem.id}` }>
                  <div className="restaurant-icon-section">
                    <img src="/images/restaurant_icon.png" alt="restaurant icon" />
                  </div>
                  <div className="restaurant-text-section">
                    <p className="restaurant-title">{listItem.name}</p>
                    <p className="restaurant-address">{listItem.address1}</p>
                  </div>
                  <div className="restaurant-arrow-section"><img src="/images/list_arrow_icon.png" alt="restaurant link arrow" /></div>
                </Link>
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  userCurrentLocation: state.userData.userCurrentLocation,
  pizzaJointsList: state.pizzaJointsList.pizzaJointsList,
});

PizzaJointsList.propTypes = {
  startFetchingPizzaJointsList: PropTypes.func.isRequired,
  setPizzaJointsList: PropTypes.func.isRequired,
  setCurrentUserLocation: PropTypes.func.isRequired,
  pizzaJointsList: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps, {
  startFetchingPizzaJointsList,
  setCurrentUserLocation,
  setPizzaJointsList,
})(PizzaJointsList);
