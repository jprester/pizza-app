import haversine from 'haversine';

export const filterListByLocation = (list, userCurrentLocation) => {
  const listWithProximity = list.map(item => {
    const jointLocation = {
      latitude: item.latitude,
      longitude: item.longitude,
    };
    const proximity = haversine(userCurrentLocation, jointLocation, {unit: 'meter'});
    return {
      ...item,
      proximity,
    };
  });

  const sortedlist = listWithProximity
    .sort((a, b) => a.proximity > b.proximity)
    .map(item => {
      const { proximity, ...itemValues } = item;
      return itemValues;
    });

  return sortedlist;
};

export const addCartItem = (list, addCartItemId) => {
  const duplicateItem = list.filter(item => item.menuItemId === addCartItemId);

  if(duplicateItem.length) {
    const listWithoutDuplicate = list.filter(item => {
      if(item.menuItemId !== addCartItemId) {
        return item;
      }
    });

    return [...listWithoutDuplicate, {...duplicateItem[0], quantity: duplicateItem[0].quantity + 1 }];
  }

  return [...list, {menuItemId: addCartItemId, quantity: 1 }];
};

export const removeCartItem = (list, removeCartItemId) => {
  return list.filter(item=> item.menuItemId !== removeCartItemId);
};

export const getRestaurantNameFromId = (restaurantList, restaurantId) => {
  return restaurantList.find(item => item.id === restaurantId);
};

export const getMenuItemFromId = (menuId, menu) => {
  return menu.find(item => item.id === menuId);
};