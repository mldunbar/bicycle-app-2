export default Backbone.View.extend({
  className: 'map',

  initialize: function(options) {
    this.render(options);
    this.remove(options);
  },

  render: function(options) {
      var map = new GMaps({
        el: this.el,
        lat: options.myLocation.coords.latitude,
        lng: options.myLocation.coords.longitude,
        width: 500,
        height: 500
      });
      map.addLayer('bicycling')
      // map.addMarker({
      //   lat: this.lat,
      //   lng: this.lng,
      //   infoWindow: {
      //     content: ''
      //   },
      // });
    }
});
