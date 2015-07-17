var User = Backbone.Model.extend({

  idAttribute: 'objectId',
  urlRoot: 'https://api.parse.com/1/classes/User',

  defaults: {
    username: '',
    password: '',
    email: '',
    notes: []
  }
});

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: 'https://api.parse.com/1/classes/User',
});

export default {User, UserCollection};
