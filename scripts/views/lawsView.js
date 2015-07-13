import MapView from './mapView';

export default Backbone.View.extend({
  template: JST['laws'],

  initialize: function(options) {
  this.render(options);
},

events: {
  'click' : 'remove'
},

  render: function(options) {
    this.$el.html(this.template(this.model));
  },

  remove: function(){
    // this.mapView && this.mapView.remove();
    Backbone.View.prototype.remove.apply(this);
  }

});
