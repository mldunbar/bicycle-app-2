export default Backbone.View.extend({
  template: JST['brl'],

  initialize: function() {
  this.render();
},

  render: function() {
    this.$el.html(this.template(this.collection.toJSON()));
      new GMaps({
        div: '#app',
        lat: options.myLocation.coords.latitude,
        lng: options.myLocation.coords.longitude,
});

      });
    },
});
