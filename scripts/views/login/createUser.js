// import config from './../ajax-config';
//
// export default Backbone.View.extend({
//   template: JST.login,
//
//   events: {
//     'submit .signup-form' : 'createUser'
//   },
//
//   initialize: function(){
//     console.log(this.model);
//     this.render();
//   },
//
//   render: function(){
//     this.$el.html(this.template());
//   },
//
//   createUser: function() {
//     var username = this.$('.username').val();
//     var password = this.$('.password').val();
//     var email = this.$('.email').val();
//     var user = new Parse.User();
//
//     user.set("username", username);
//     user.set("password", password);
//     user.set("email", email);
//
//     user.signUp(null, {
//       success: function(user) {
//         console.log('wahoo');
//       },
//       error: function(user, error) {
//         alert('you failed');
//       }
//     });
//   }
//
// });
