import config from './../../ajax-config';
import router from './../../router';

import IndexView from './../indexView';

export default Backbone.View.extend({
  template: JST.login,

  events: {
    'click .login-button' : 'login',
    'click .signup-button' : 'signup'
  },

  initialize: function(){
    Parse.initialize ("CfSNdvfYJdwach6FMkR4Mjks3W5KQVUeyl7QzEJK","vFzGiwk3O85KvA2DTO7i456YKQKHRx2SY7h8esA3");
    this.render();
  },

  render: function(){
    this.$el.html(this.template());
  },

  signup: function() {
    var username = this.$('.signup-username').val();
    var password = this.$('.signup-password').val();
    var email = this.$('.signup-email').val();
    var user = new Parse.User();
    console.log(username, password, sessionToken);
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    console.log('set all');
    user.signUp(null, {
      success: function(user) {
        console.log('success!');
        router.navigate('index', true);
      },
      error: function(user, error) {
        alert("nope");
      }
    });
  },

  login: function(e) {
    event.preventDefault();
    var username = this.$('.login-username').val();
    var password = this.$('.login-password').val();
    console.log(username, password);
    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log(user);
        // Parse.User.become(user.sessionToken).then(function(user) {
        router.navigate('index', true);
        // });
      },
      error: function(user) {
      //   if
      //   },
        alert("Login Failed: Username or Password Incorrect");
      }
    });
  },

  remove: function(){
    Backbone.View.prototype.remove.apply(this);
  }

});
