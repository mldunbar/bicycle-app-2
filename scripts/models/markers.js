var Marker = Backbone.Model.extend({
  idAttribute: 'objectId',

  defaults : {
    title: '',
    lat: 0,
    lng: 0,
    infoWindow: ''
  },

});

var MarkerCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/Marker',
  model: Marker,

parse: function(response){
  return response.results;
}

});

export default {Marker};
export default {MarkerCollection}
