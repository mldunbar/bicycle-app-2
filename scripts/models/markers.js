var Marker = Backbone.Model.extend({
  idAttribute: 'objectId',

      defaults: {
        title: 'pls',
        lat: 0.000000,
        lng: 0.000000,
        infoWindow: ''
      },
});

var MarkerCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/apps/classes/marker',
  model: Marker
});

export default {Marker};
