import IndexView from './views/indexView';
import MyLocation from './models/myLocation';

var Router = Backbone.Router.extend({

  initialize: function(){},

  routes: {
    '' : 'index',
    'brl' : 'brl',
    'rental' : 'rental',
    'static' : 'static',
    'laws' : 'laws'
  },

  index: function(){
    console.log("index route has been called");
    this.markers = new Backbone.Collection();
    this.myLocation = new Promise(function(resolve, reject) {
  			navigator.geolocation.getCurrentPosition(resolve, reject);
		}).then(function(position) {
			return position;
      console.log(position);
		});
		Promise.resolve(this.myLocation).then(function(value) {
			this.LandingView = new IndexView({myLocation: value, collection: this.markers});
			// $('#app').html(this.IndexView.el);
		}.bind(this));
	},

  brl: function(){
    console.log("BRL route has been called");
  },

  rental: function(){
    console.log("rental route has been called");
  },

  static: function(){
    console.log("static route has been called");
  },

  laws: function(){
    console.log("law route has been called");
  },

});

var router = new Router();
export default router;
