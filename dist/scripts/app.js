require.register("ajax-config", function(exports, require, module){
  'use strict';

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  if (options.url.match(/api.parse.com/)) {
    options.headers = options.headers || {};
    options.headers['X-Parse-Application-Id'] = 'CfSNdvfYJdwach6FMkR4Mjks3W5KQVUeyl7QzEJK';
    options.headers['X-Parse-REST-API-Key'] = 'gXDnw6tCnkjNJtW4rkP57Z0K8wzgN9zMV2ETl7wf';
  }
});
  
});

require.register("main", function(exports, require, module){
  'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _modelsMarkers = require('./models/markers');

require('./ajax-config');

(function () {
  'use strict';

  $(document).ready(function () {
    Backbone.history.start();
    var markers = new _modelsMarkers.MarkerCollection();
    markers.fetch();
  });
})();
  
});

require.register("router", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewsNotesListView = require('./views/notesListView');

var _viewsNotesListView2 = _interopRequireDefault(_viewsNotesListView);

var _viewsNotesItemView = require('./views/notesItemView');

var _viewsNotesItemView2 = _interopRequireDefault(_viewsNotesItemView);

var _viewsBrlView = require('./views/brlView');

var _viewsBrlView2 = _interopRequireDefault(_viewsBrlView);

var _viewsRentalView = require('./views/rentalView');

var _viewsRentalView2 = _interopRequireDefault(_viewsRentalView);

var _viewsLawsView = require('./views/lawsView');

var _viewsLawsView2 = _interopRequireDefault(_viewsLawsView);

var _viewsLoginLoginView = require('./views/login/loginView');

var _viewsLoginLoginView2 = _interopRequireDefault(_viewsLoginLoginView);

var _viewsLoadingView = require('./views/loadingView');

var _viewsLoadingView2 = _interopRequireDefault(_viewsLoadingView);

var _modelsMarkers = require('./models/markers');

var _modelsRentalMarkers = require('./models/rentalMarkers');

var _modelsNotes = require('./models/notes');

var _modelsUsers = require('./models/users');

var _ajaxConfig = require('./ajax-config');

var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);

var Router = Backbone.Router.extend({

  routes: {
    '': 'login',
    'brl': 'brl',
    'rental': 'rental',
    'laws': 'laws',
    'notes': 'notes'
  },

  initialize: function initialize() {
    Parse.initialize("CfSNdvfYJdwach6FMkR4Mjks3W5KQVUeyl7QzEJK", "vFzGiwk3O85KvA2DTO7i456YKQKHRx2SY7h8esA3");
  },

  login: function login() {
    if (Parse.User.current()) {
      this.brl();
    } else {
      var users = new _modelsUsers.UserCollection();
      var view = new _viewsLoginLoginView2['default']({ collection: users });
      $('#app').html(view.el);
    }
  },

  brl: function brl() {
    var loadingView = new _viewsLoadingView2['default']();
    $('#app').html(loadingView.el);
    this.Marker = new _modelsMarkers.MarkerCollection();
    new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then((function (position) {
      this.Marker.fetch().then((function (data) {
        this.BrlView = new _viewsBrlView2['default']({ collection: this.Marker, myLocation: position });
        $('#app').html(this.BrlView.el);
      }).bind(this));
    }).bind(this));
  },

  rental: function rental() {
    var loadingView = new _viewsLoadingView2['default']();
    $('#app').html(loadingView.el);
    this.rentalMarker = new _modelsRentalMarkers.RentalMarkerCollection();
    new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then((function (position) {
      this.rentalMarker.fetch().then((function (data) {
        console.log(this.rentalMarker, position);
        this.RentalView = new _viewsRentalView2['default']({ collection: this.rentalMarker, myLocation: position });
        $('#app').html(this.RentalView.el);
      }).bind(this));
    }).bind(this));
  },

  laws: function laws() {
    var loadingView = new _viewsLoadingView2['default']();
    $('#app').html(loadingView.el);
    var users = new _modelsUsers.UserCollection();
    var view = new _viewsLawsView2['default']({ collection: users });
    $('#app').html(view.el);
  },

  notes: function notes() {
    var loadingView = new _viewsLoadingView2['default']();
    $('#app').html(loadingView.el);
    var users = new _modelsUsers.UserCollection();
    var notes = new _modelsNotes.NoteCollection();
    notes.fetch();
    var view = new _viewsNotesListView2['default']({ collection: notes });
    $('#app').html(view.el);
  }

});

var router = new Router();
exports['default'] = router;
module.exports = exports['default'];
  
});

require.register("models/markers", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Marker = Backbone.Model.extend({
  idAttribute: 'objectId',

  defaults: {
    title: '',
    lat: 0,
    lng: 0,
    infoWindow: ''
  }
});

var MarkerCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/Marker',
  model: Marker,

  parse: function parse(response) {
    return response.results;
  }

});

exports['default'] = { Marker: Marker };
exports['default'] = { MarkerCollection: MarkerCollection };
module.exports = exports['default'];
  
});

require.register("models/myLocation", function(exports, require, module){
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MyLocation = Backbone.Model.extend({});

exports["default"] = { MyLocation: MyLocation };
module.exports = exports["default"];
  
});

require.register("models/notes", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Note = Backbone.Model.extend({
  idAttribute: 'objectId',

  defaults: {
    title: '',
    content: ''
  }

});

var NoteCollection = Backbone.Collection.extend({
  url: "https://api.parse.com/1/classes/note",
  model: Note,

  parse: function parse(response) {
    return response.results;
  }
});

exports['default'] = { Note: Note, NoteCollection: NoteCollection };
module.exports = exports['default'];
  
});

require.register("models/rentalMarkers", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var RentalMarker = Backbone.Model.extend({
  idAttribute: 'objectId',

  defaults: {
    title: '',
    lat: 0,
    lng: 0,
    infoWindow: ''
  },

  url: 'https://api.parse.com/1/classes/rentalMarker'

});

var RentalMarkerCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/rentalMarker',
  model: RentalMarker,

  parse: function parse(response) {
    return response.results;
  }
});
exports['default'] = { RentalMarker: RentalMarker, RentalMarkerCollection: RentalMarkerCollection };
module.exports = exports['default'];
  
});

require.register("models/users", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
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
  url: 'https://api.parse.com/1/classes/User'
});

exports['default'] = { User: User, UserCollection: UserCollection };
module.exports = exports['default'];
  
});

require.register("views/brlView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./../router');

var _router2 = _interopRequireDefault(_router);

var _modelsMarkers = require('.././models/markers');

var _mapView = require('./mapView');

var _mapView2 = _interopRequireDefault(_mapView);

exports['default'] = Backbone.View.extend({
  template: JST['brl'],

  events: {
    'click .show-add-brl': 'showAddBrl',
    'submit .add-brl-form': 'addBrl',
    'click .remove-form': 'removeForm',
    'click .rental-bikes .laws': 'remove',
    'click Marker': 'showComments',
    'click .logout-button': 'logout'
  },

  initialize: function initialize(options) {
    // TODO: move this to router to ensure it's only created once. Pass it as an
    // argument to this view so it can be rendered.
    this.mapView = new _mapView2['default'](options);
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.collection.toJSON()));
    this.$el.append(this.mapView.el);
  },

  remove: function remove() {
    this.mapView && this.mapView.remove();
    Backbone.View.prototype.remove.apply(this);
  },

  showComments: function showComments() {
    console.log('infoWindow');
  },

  showAddBrl: function showAddBrl() {
    $('.add-brl-form').toggleClass('hidden');
  },

  addBrl: function addBrl(e) {
    e.preventDefault();
    var title = this.$('.title').val();
    var lat = +this.$('.lat').val();
    var lng = +this.$('.lng').val();
    var infoWindow = this.$('.infoWindow').val();
    console.log(this);
    this.collection.create({
      title: title,
      lat: lat,
      lng: lng,
      infoWindow: { content: infoWindow
      }
    });
  },

  removeForm: function removeForm() {
    var title = this.$('.title').val('');
    var lat = this.$('.lat').val('');
    var lng = this.$('.lng').val('');
    var infoWindow = this.$('.infoWindow').val('');
  },

  logout: function logout() {
    Parse.User.logOut().then(function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    }, function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    });
  }

});
module.exports = exports['default'];
  
});

require.register("views/indexView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./../router');

var _router2 = _interopRequireDefault(_router);

exports['default'] = Backbone.View.extend({
  template: JST['index'],

  initialize: function initialize() {
    this.render();
  },

  events: {
    'click .logout-button': 'logout',
    'click .add-notes-button': 'showAddNotes',
    'submit form': 'addNotes'
  },

  render: function render() {
    this.$el.html(this.template);
  },

  logout: function logout() {
    Parse.User.logOut().then(function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    }, function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    });
  },

  showAddNotes: function showAddNotes() {
    $('.add-notes-here').toggleClass('hidden');
  },

  addNotes: function addNotes(e) {
    e.preventDefault();
    var text = this.$('.add-notes').val();
    this.model.create();
  }

});
module.exports = exports['default'];
  
});

require.register("views/lawsView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./../router');

var _router2 = _interopRequireDefault(_router);

var _mapView = require('./mapView');

var _mapView2 = _interopRequireDefault(_mapView);

exports['default'] = Backbone.View.extend({
  template: JST['laws'],

  initialize: function initialize(options) {
    this.render(options);
  },

  events: {
    'click .logout-button': 'logout'
  },

  render: function render(options) {
    this.$el.html(this.template(this.model));
  },

  logout: function logout() {
    Parse.User.logOut().then(function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    }, function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    });
  }

});
module.exports = exports['default'];
  
});

require.register("views/loadingView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Backbone.View.extend({

  template: JST['loading'],
  tagName: 'div',

  initialize: function initialize() {
    this.render();
  },

  render: function render() {
    this.$el.html(this.template);
  }

});
module.exports = exports['default'];
  
});

require.register("views/mapView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Backbone.View.extend({
  className: 'map',

  initialize: function initialize(options) {
    this.render(options);
    this.listenTo(this.collection, 'update', this.renderChildren);
  },

  render: function render(options) {
    this.map = new GMaps({
      el: this.el,
      lat: options.myLocation.coords.latitude,
      lng: options.myLocation.coords.longitude,
      width: 1000,
      height: 500
    });
    this.renderChildren();
    //this.map.set('styles', [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f4f3e1"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#00ff9f"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#2b2a28"},{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#f3f4e6"},{"weight":"5.38"},{"visibility":"on"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#3fa662"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"color":"#2b2a28"},{"gamma":"1"},{"visibility":"on"},{"weight":"0.31"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"gamma":"1.5"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"weight":"0.30"},{"gamma":"2"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"weight":"2"},{"color":"#f3f4e6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#323c39"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"weight":"5"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#f3f4e6"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#2b2a28"},{"visibility":"on"},{"weight":"2.78"}]}]);
    this.map.addLayer('bicycling');
    // this.map.addControl('legend', 'RIGHT_BOTTOM');
  },

  renderChildren: function renderChildren(options) {
    this.map.removeMarkers();
    this.collection.forEach((function (marker) {
      this.map.addMarker(marker.toJSON());
    }).bind(this));
  }

});
module.exports = exports['default'];
  
});

require.register("views/notesItemView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Backbone.View.extend({
  template: JST['notes-list-item'],

  tagName: 'li',

  events: {
    'click .note-edit-button': 'editNote',
    'submit .note-edit-form': 'resaveNote',
    'click .note-reset': 'resetNote',
    'click .note-delete': 'deleteNote'
  },

  initialize: function initialize() {
    this.render();
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function render() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  editNote: function editNote(e) {
    this.$('.note-edit-form').toggleClass('hidden');
  },

  resaveNote: function resaveNote(e) {
    e.preventDefault();
    var title = this.$('.note-title-edit').val();
    var content = this.$('.note-content-edit').val();
    this.model.save({
      title: title,
      content: content
    });
  },

  resetNote: function resetNote() {
    var title = this.$('.note-title').val();
    var content = this.$('.note-content').val();
  },

  deleteNote: function deleteNote(e) {
    e.preventDefault();
    this.model.destroy();
  }

});
module.exports = exports['default'];
  
});

require.register("views/notesListView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _notesItemView = require('./notesItemView');

var _notesItemView2 = _interopRequireDefault(_notesItemView);

exports['default'] = Backbone.View.extend({
  template: JST['notes-list'],

  initialize: function initialize() {
    this.render();
    this.listenTo(this.collection, 'update', this.render);
  },

  events: {
    'click .add-notes-button': 'showAddNotes',
    'submit .notes-add-form': 'saveNote',
    'click .logout-button': 'logout'
  },

  showAddNotes: function showAddNotes() {
    this.$('.notes-add-form').toggleClass('hidden');
  },

  saveNote: function saveNote(e) {
    e.preventDefault();
    var title = this.$('.notes-title-add').val();
    var content = this.$('.notes-content-add').val();
    this.collection.create({
      title: title,
      content: content
    });
  },

  render: function render() {
    this.$el.html(this.template);
    this.renderChildren();
  },

  renderChildren: function renderChildren() {
    _.invoke(this.children || [], 'remove');

    this.children = this.collection.map((function (child) {
      var view = new _notesItemView2['default']({
        model: child
      });
      this.$el.append(view.el);
      return view;
    }).bind(this));
    return this;
  },

  remove: function remove() {
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  },

  logout: function logout() {
    Parse.User.logOut().then(function () {
      if (!Parse.User.current()) {
        router.navigate('', true);
      }
    }, function () {
      if (!Parse.User.current()) {
        router.navigate('', true);
      }
    });
  }

});
module.exports = exports['default'];
  
});

require.register("views/rentalView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./../router');

var _router2 = _interopRequireDefault(_router);

var _mapView = require('./mapView');

var _mapView2 = _interopRequireDefault(_mapView);

var _modelsRentalMarkers = require('.././models/rentalMarkers');

exports['default'] = Backbone.View.extend({
  template: JST['rental'],

  events: {
    'click .logout-button': 'logout',
    'click .bcycle .brl .laws': 'remove'
  },

  initialize: function initialize(options) {
    this.render(options);
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function render(options) {
    this.$el.html(this.template(this.collection.toJSON()));
    this.mapView = new _mapView2['default'](options);
    this.$el.append(this.mapView.el);
  },

  remove: function remove() {
    this.mapView && this.mapView.remove();
    Backbone.View.prototype.remove.apply(this);
  },

  logout: function logout() {
    Parse.User.logOut().then(function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    }, function () {
      if (!Parse.User.current()) {
        _router2['default'].navigate('', true);
      }
    });
  }

});
module.exports = exports['default'];
  
});

require.register("views/login/createUser", function(exports, require, module){
  "use strict";

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
  
});

require.register("views/login/loginView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ajaxConfig = require('./../../ajax-config');

var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);

var _router = require('./../../router');

var _router2 = _interopRequireDefault(_router);

var _indexView = require('./../indexView');

var _indexView2 = _interopRequireDefault(_indexView);

exports['default'] = Backbone.View.extend({
  template: JST.login,

  events: {
    'click .login-button': 'login',
    'click .signup-button': 'signup',
    'click .signup-heading': 'showSignup'
  },

  initialize: function initialize() {
    this.render();
  },

  render: function render() {
    this.$el.html(this.template());
  },

  signup: function signup() {
    var username = this.$('.signup-username').val();
    var password = this.$('.signup-password').val();
    var email = this.$('.signup-email').val();
    var user = new Parse.User();
    console.log(username, password);
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    user.signUp(null, {
      success: function success(user) {
        _router2['default'].navigate('brl', true);
      },
      error: function error(user, _error) {
        alert("nope");
      }
    });
  },

  login: function login(e) {
    event.preventDefault();
    var username = this.$('.login-username').val();
    var password = this.$('.login-password').val();
    console.log(username, password);
    Parse.User.logIn(username, password, {
      success: function success(user) {
        console.log(user);
        _router2['default'].navigate('brl', true);
      },
      error: function error(user) {
        alert("Login Failed: Username or Password Incorrect");
      }
    });
  },

  showSignup: function showSignup(e) {
    e.preventDefault();
    $('.signup-username').toggleClass('hidden');
    $('.signup-password').toggleClass('hidden');
    $('.signup-email').toggleClass('hidden');
    $('.signup-button').toggleClass('hidden');
  },

  remove: function remove() {
    Backbone.View.prototype.remove.apply(this);
  }

});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map