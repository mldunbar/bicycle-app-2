export default Backbone.Router.extend({

  initialize: function(){},

  routes: {
    '' : 'index',
    'brl' : 'brl',
    'rental' : 'rental',
    'static' : 'static',
    'laws' : 'laws'
  },

  index: function(){
    console.log('JST.index');
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
