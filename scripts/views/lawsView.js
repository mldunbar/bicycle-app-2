import router from './../router';

import MapView from './mapView';

export default Backbone.View.extend({
  template: JST['laws'],

  initialize: function(options) {
  this.render(options);
},

events: {
  'click .logout-button' : 'logout',
  'click' : 'remove'
},

  render: function(options) {
    this.$el.html(this.template(this.model));
  },

  remove: function(){
    // this.mapView && this.mapView.remove();
    Backbone.View.prototype.remove.apply(this);
  },

  logout: function(){
    Parse.User.logOut().then(function() {
      if (!Parse.User.current()) {
        router.navigate('', true);
      }
    }, function(){
      if(!Parse.User.current()){
        router.navigate('', true);
    }
  })
  }

});
