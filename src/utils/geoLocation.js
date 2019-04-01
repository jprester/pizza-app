export const getLocation = (callback) => {
  if (navigator.geolocation) {

    return navigator.geolocation.getCurrentPosition(callback);
  } else {
    console.log("Geo Location not supported by browser");
  }
};
