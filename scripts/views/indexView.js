import router from './../router';

export default Backbone.View.extend({
  template: JST['index'],

  initialize: function() {
    this.render();
  },

  events: {
    'click .logout-button' : 'logout',
  },

  render: function(){
    this.$el.html(this.template);
    console.log(this.objectId);
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
