import IndexView from './views/indexView';
import BrlView from './views/brlView';
import RentalView from './views/rentalView';
import LawsView from './views/lawsView';
import LoginView from './views/login/loginView';

import {MarkerCollection} from './models/markers';

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
    this.myLocation = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return position;
    });
    Promise.resolve(this.myLocation).then(function(value) {
        this.Marker.fetch().then(function(data){
        this.markerCollection = new MarkerCollection(data);
        this.BrlView = new BrlView({collection: this.markerCollection, myLocation: value});
        $('#app').html(this.BrlView.el);
      });
    }.bind(this));
  },

  rental: function(){
    console.log("rental route has been called");
    this.marker = new Marker();
    this.myLocation = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return position;
    });
    Promise.resolve(this.myLocation).then(function(value) {
      this.RentalView = new RentalView({myLocation: value, model: this.marker});
      $('#app').prepend(this.RentalView.el);
    }.bind(this));
  },

  laws: function(){
    console.log("law route has been called");
  },

});

var router = new Router();
export default router;
