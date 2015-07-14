import config from './../../ajax-config';
import router from './../../router';

export default Backbone.View.extend({
  template: JST.login,

  events: {
    'submit .signup-form' : 'signup',
    'submit .login-form' : 'login'
  },

  initialize: function(){
    Parse.initialize("CfSNdvfYJdwach6FMkR4Mjks3W5KQVUeyl7QzEJK","gXDnw6tCnkjNJtW4rkP57Z0K8wzgN9zMV2ETl7wf");
    this.render();
  },

  render: function(){
    this.$el.html(this.template());
  },

  login: function() {
    var username = this.$('.login-username').val();
    var password = this.$('.login-password').val();
    console.log(username, password);

    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log(user);

        Parse.User.become(user.sessionToken).then(function(user) {
          router.navigate('brl');
        });
      },
      error: function(user) {
        alert("Login Failed: Username or Password Incorrect");
      }
    });
  },

  signup: function() {
    var username = this.$('.signup-username').val();
    var password = this.$('.signup-password').val();
    var email = this.$('.signup-email').val();
    var user = new Parse.User();
    console.log(username, password);
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.signUp(null, {
      success: function(user) {
        console.log('wahoo');
      },
      error: function(user, error) {
        alert("nope");
      }
    });
  }

});
