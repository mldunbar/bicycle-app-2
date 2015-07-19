var RentalMarker = Backbone.Model.extend({
  idAttribute: 'objectId',

  defaults : {
    title: '',
    lat: 0,
    lng: 0,
    infoWindow: ''
  },

  url: 'https://api.parse.com/1/classes/rentalMarker',

});

var RentalMarkerCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/rentalMarker',
  model: RentalMarker,

parse: function(response){
  return response.results;
},
});
export default {RentalMarker, RentalMarkerCollection};
