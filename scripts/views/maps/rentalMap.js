export default Backbone.View.extend({
  className: 'map',

  initialize: function(options) {
    this.render(options);
    this.remove(options);
  },

  render: function(options) {
      this.map = new GMaps({
        el: this.el,
        lat: options.myLocation.coords.latitude,
        lng: options.myLocation.coords.longitude,
        width: 500,
        height: 500
      });
      this.map.addLayer('bicycling');
      this.renderChildren();
    },

renderChildren: function(options) {
    this.collection.forEach(function(marker) {
        this.map.addMarker(marker.toJSON());
		}.bind(this));
  },

  });