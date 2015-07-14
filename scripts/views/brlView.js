import {Marker} from '.././models/markers';
import {MarkerCollection} from '.././models/markers';
import MapView from './mapView';

export default Backbone.View.extend({
  template: JST['brl'],

events: {
  'click .show-add-brl' : 'showAddBrl',
  'submit .add-brl-form' : 'addBrl',
  'click .remove-form' : 'removeForm',
  'click .rental-bikes .laws' : 'remove',
  'click map' : 'showInfo'
},

initialize: function(options) {
  // TODO: move this to router to ensure it's only created once. Pass it as an
  // argument to this view so it can be rendered.
  this.mapView = new MapView(options);
  this.render();
},

render: function() {
  this.$el.html(this.template(this.collection.toJSON()));
  this.$el.append(this.mapView.el);
},

remove: function(){
  this.mapView && this.mapView.remove();
  Backbone.View.prototype.remove.apply(this);
},

showInfo: function(){
  console.log('infoWindow');
},

//this function doesn't work because toggleClass...
showAddBrl: function(){
  this.$('.add-brl-form').toggleClass('hidden');
  console.log('merp');
},

addBrl: function(e){
  e.preventDefault();
  var title = this.$('.title').val();
  var lat = +this.$('.lat').val();
  var lng = +this.$('.lng').val();
  var infoWindow = this.$('.infoWindow').val();
  console.log(this);
  this.collection.create({
    title: title,
    lat: lat,
    lng: lng,
    infoWindow: {content: infoWindow}
  });
},

removeForm: function(){
  var title = this.$('.title').val('');
  var lat = this.$('.lat').val('');
  var lng = this.$('.lng').val('');
  var infoWindow = this.$('.infoWindow').val('');
}

});
