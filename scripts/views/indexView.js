export default Backbone.View.extend({
  template: JST['index'],

  initialize: function() {
    this.render();
  },

  events: {
    'click .logout-button' : 'logout',
  },

  render: function(){
    this.$el.html(this.template());
    console.log(this.username);
  },

  logout: function(){
    Parse.User.logOut();
    console.log('outchea');
  }

});
