import IndexView from './views/indexView';
import BrlView from './views/brlView';
import RentalView from './views/rentalView';
import LawsView from './views/lawsView';
import LoginView from './views/login/loginView';

import {MarkerCollection} from './models/markers';
import {RentalMarkerCollection} from './models/rentalMarkers';

import config from './ajax-config';

var Router = Backbone.Router.extend({

  routes: {
    'login' : 'login',
    'index' : 'index',
    'brl' : 'brl',
    'rental' : 'rental',
    'laws' : 'laws'
  },

  initialize: function(){

  },

  login: function(){
    console.log("login route has been called");
  },

  index: function(){
    console.log("index route has been called");
    console.log(this);
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
    console.log("law route has been called");
  },

});

var router = new Router();
export default router;
