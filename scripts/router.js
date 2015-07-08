import IndexView from './views/indexView';
import BrlView from './views/brlView';
import {MarkerCollection} from './models/markers';
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
    this.markers = new MarkerCollection();
    this.myLocation = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return position;
    });
    Promise.resolve(this.myLocation).then(function(value) {
      this.IndexView = new IndexView({myLocation: value, collection: this.markers});
      $('#app').prepend(this.IndexView.el);
    }.bind(this));
	},

  brl: function(){
    console.log("BRL route has been called");
    this.markers = new MarkerCollection();
    this.myLocation = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return position;
    });
    Promise.resolve(this.myLocation).then(function(value) {
      this.BrlView = new BrlView({myLocation: value, collection: this.markers});
      $('#app').prepend(this.BrlView.el);
    }.bind(this));
  },

  rental: function(){
    console.log("rental route has been called");
  },

  laws: function(){
    console.log("law route has been called");
  },

});

var router = new Router();
export default router;
