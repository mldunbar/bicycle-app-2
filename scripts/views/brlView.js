import MapView from './mapView';
import {Marker, MarkerCollection} from '.././models/markers';

export default Backbone.View.extend({
  template: JST['brl'],

events: {
  'click .show-add-brl' : 'showAddBrl',
  'click .add-brl' : 'addBrl'
},

initialize: function(options) {
  this.render(options);
  this.listenTo(this.collection, 'update', this.render);
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

//this function doesn't work...
showAddBrl: function(){
  this.$('.add-brl-form').toggleClass('hidden');
  console.log('merp');
},

addBrl: function(e){
  e.preventDefault();
  var title = this.$('.title').val();
  var lat = this.$('.lat').val();
  var lng = this.$('.lng').val();
  var infoWindow = this.$('.infoWindow').val();
  this.model.save({
    title: title,
    lat: lat,
    lng: lng,
    infoWindow: infoWindow
  });
}

});
