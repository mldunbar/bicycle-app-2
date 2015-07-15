import MapView from './mapView';
import {RentalMarkerCollection} from '.././models/rentalMarkers';

export default Backbone.View.extend({
  template: JST['rental'],

events: {
  'click .logout-button' : 'logout',
  'click .bcycle .brl .laws' : 'remove'
},

initialize: function(options) {
  this.render(options);
  this.listenTo(this.collection, 'update', this.render);
},

render: function(options) {
  this.$el.html(this.template(this.collection.toJSON()));
  this.mapView = new MapView(options);
  this.$el.append(this.mapView.el);
},

remove: function(){
  this.mapView && this.mapView.remove();
  Backbone.View.prototype.remove.apply(this);
},

logout: function(){
  Parse.User.logOut();
}

});
