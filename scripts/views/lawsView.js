import router from './../router';

import MapView from './mapView';

export default Backbone.View.extend({
  template: JST['laws'],

  initialize: function(options) {
  this.render(options);
},

events: {
  'click .logout-button' : 'logout',
},

  render: function(options) {
    this.$el.html(this.template(this.model));
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
