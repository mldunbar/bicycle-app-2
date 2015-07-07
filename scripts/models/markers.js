var Marker = Backbone.Model.extend({
  idAttribute: 'id',

  defaults: function(){
    return {
      title: '',
      position: '',
    };
  }
});

var MarkerCollection = Backbone.Collection.extend({
  model: Marker
});

export default {Marker, MarkerCollection};
