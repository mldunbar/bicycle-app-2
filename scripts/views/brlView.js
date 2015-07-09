export default Backbone.View.extend({
  template: JST['brl'],

  events: {
    'click .show-add-brl' : 'showAddBrl',
    'click .add-brl' : 'addBrl'
  },

  initialize: function(options) {
  this.render(options);
},

render: function(options) {
  this.$el.html(this.template(this.model.toJSON()));
    var map = new GMaps({
      div: '#app',
      lat: options.myLocation.coords.latitude,
      lng: options.myLocation.coords.longitude,
    });
    map.addMarker({
      lat: 34.8515234,
      lng: -82.3978678,
      infoWindow: {
        content: 'Two bike racks, accessible for employees via parking garage'
      },
    });
  },

showAddBrl: function(e){
  e.preventDefault();
  this.$('.add-brl-form').toggleClass('hidden');
},

  addBrl: function(e){
    e.preventDefault();
    var title = this.$('.marker-title').val();
    var lat = this.$('latitude').val();
    var lng = this.$('longitude').val();
    var infoWindow = this.$('info').val();
    this.model.create({
      title: title,
      lat: lat,
      lng: lng,
      infoWindow: infoWindow
    });
  }

});
