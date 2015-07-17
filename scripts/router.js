import IndexView from './views/indexView';
import BrlView from './views/brlView';
import RentalView from './views/rentalView';
import LawsView from './views/lawsView';
import LoginView from './views/login/loginView';

import {MarkerCollection} from './models/markers';
import {RentalMarkerCollection} from './models/rentalMarkers';

import {UserCollection} from './models/users';

import config from './ajax-config';

var Router = Backbone.Router.extend({

  routes: {
    '' : 'login',
    'index' : 'index',
    'brl' : 'brl',
    'rental' : 'rental',
    'laws' : 'laws'
  },

  initialize: function(){
    Parse.initialize ("CfSNdvfYJdwach6FMkR4Mjks3W5KQVUeyl7QzEJK","vFzGiwk3O85KvA2DTO7i456YKQKHRx2SY7h8esA3")
  },

  login: function(){
    console.log("login route has been called");
    if (Parse.User.current()) {
      this.index();
    } else {
      var users = new UserCollection();
      var view = new LoginView({collection: users});
      $('#app').html(view.el)
  }
},

  index: function(){
    console.log("index route has been called");
    console.log(Parse.User.current);
    var markers = new MarkerCollection();
    var view = new IndexView({collection: markers});
    $('#app').html(view.el);
	},

  brl: function(){
    console.log("BRL route has been called");
    this.Marker = new MarkerCollection();
    new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      this.Marker.fetch().then(function(data){
        this.BrlView = new BrlView({collection: this.Marker, myLocation: position});
        $('#app').html(this.BrlView.el);
      }.bind(this));
    }.bind(this));
  },

  rental: function(){
    console.log("rental route has been called");
    this.rentalMarker = new RentalMarkerCollection();
    new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
    this.rentalMarker.fetch().then(function(data) {
      console.log(this.rentalMarker, position);
      this.RentalView = new RentalView({collection: this.rentalMarker, myLocation: position});
      $('#app').html(this.RentalView.el);
      }.bind(this));
    }.bind(this));
  },

  laws: function(){
    var users = new UserCollection();
    var view = new LawsView({collection: users});
    $('#app').html(view.el);
    console.log("law route has been called");
  },

});

var router = new Router();
export default router;
