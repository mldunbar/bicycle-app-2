var User = Backbone.Model.extend({

  idAttribute: 'objectId',
  urlRoot: 'https://api.parse.com/1/classes/users',

  defaults: {
    username: '',
    password: '',
    email: ''
  }
});

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: 'https://api.parse.com/1/classes/users',
});

export default {User};
export default {UserCollection};
