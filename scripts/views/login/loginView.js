export default Backbone.View.extend({
  template: JST['login'],

   initialize: function(){
     this.render();
     console.log('i did it');
   },

   render: function(){
     this.$el.html(this.template(this.model.toJSON()));
   }

// Parse.User.logIn(username, password, {
//   success: function(user) {
//     new IndexView();
//     self.undelegateEvents();
//     delete self;
//   },
//   error: function(user, error) {
//     self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
//     this.$(".login-form button").removeAttr("disabled");
//   }
// });

});
