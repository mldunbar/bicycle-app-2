export default Backbone.View.extend({
  template: JST['rental'],

  initialize: function(options) {
  this.render(options);
},

render: function(options) {
  this.$el.html(this.template(this.collection.toJSON()));
    var map = new GMaps({
      div: '#app',
      lat: options.myLocation.coords.latitude,
      lng: options.myLocation.coords.longitude,
    });
    map.addMarker({
      lat: 34.8499076,
      lng: -82.3998955,
      infoWindow: {
        content: 'website: http://www.reedyrides.com/'
      },
    });
  },
});
