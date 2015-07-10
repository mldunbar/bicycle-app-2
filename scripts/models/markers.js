var Marker = Backbone.Model.extend({
  idAttribute: 'objectId',

  // defaults : {
  //   'title': 'title',
  //   'lat': 'lat',
  //   'lng': 'lng',
  //   'infoWindow': 'infoWindow'
  // }

});

var MarkerCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/Marker',
  model: Marker,

parse: function(response){
  return response.results;
},
});
export default {Marker, MarkerCollection};
