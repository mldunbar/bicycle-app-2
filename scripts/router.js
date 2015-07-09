import IndexView from './views/indexView';
import BrlView from './views/brlView';
import RentalView from './views/rentalView';
import LawsView from './views/lawsView';

import {Marker} from './models/markers';

import config from './ajax-config';

var Router = Backbone.Router.extend({

  routes: {
    '' : 'index',
    'brl' : 'brl',
    'rental' : 'rental',
    'laws' : 'laws'
  },

  initialize: function(){},

  index: function(){
    console.log("index route has been called");
    this.marker = new Marker();
    this.myLocation = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return position;
    });
    Promise.resolve(this.myLocation).then(function(value) {
      this.IndexView = new IndexView({myLocation: value, model: this.marker});
      $('#app').html(this.IndexView.el);
    }.bind(this));
	},

  brl: function(){
    console.log("BRL route has been called");
    this.marker = new Marker();
    this.myLocation = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return position;
    });
    Promise.resolve(this.myLocation).then(function(value) {
      this.BrlView = new BrlView({myLocation: value, model: this.marker});
      $('#app').prepend(this.BrlView.el);
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
