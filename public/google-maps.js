// Google Maps initialization
window.initMap = function() {
  console.log('Google Maps API loaded');
  // Trigger re-render of components that use Google Maps
  window.googleMapsLoaded = true;
  
  // Dispatch custom event to notify React components
  window.dispatchEvent(new Event('google-maps-loaded'));
};
