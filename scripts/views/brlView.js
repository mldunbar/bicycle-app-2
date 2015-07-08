export default Backbone.View.extend({
  template: JST['brl'],

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
      lat: 34.8515234,
      lng: -82.3978678,
      infoWindow: {
        content: 'yolo'
      },
    });
  },
});
