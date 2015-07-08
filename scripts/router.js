import IndexView from './views/indexView';
import {MarkerCollection} from './models/markers';
import config from './ajax-config';

var Router = Backbone.Router.extend({

  routes: {
    '' : 'index',
    'brl' : 'brl',
    'rental' : 'rental',
    'static' : 'static',
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
