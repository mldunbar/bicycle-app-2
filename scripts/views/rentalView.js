import MapView from './mapView';

export default Backbone.View.extend({
  template: JST['rental'],

initialize: function(options) {
  this.render(options);
},

render: function(options) {
  this.$el.html(this.template(this.model.toJSON()));
  this.mapView = new MapView(options);
  this.$el.append(this.mapView.el);
},

remove: function(){
  this.mapView && this.mapView.remove();
  Backbone.View.prototype.remove.apply(this);
},

    // map.addMarker({
    //   lat: 34.8499076,
    //   lng: -82.3998955,
    //   infoWindow: {
    //     content: 'website: http://www.reedyrides.com/'
    //   },
    // });
});
