var Marker = Backbone.Model.extend({
  idAttribute: 'objectId',

      defaults: function(){
      return({
        title: item.name,
        lat: item.location.lat,
        lng: item.location.lng,
      });
    },
});

var MarkerCollection = Backbone.Collection.extend({
  model: Marker,
  url: 'https://api.parse.com/apps/bicycle-app/classes/marker',
});

export default {Marker, MarkerCollection};
