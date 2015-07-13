export default Backbone.View.extend({
  className: 'map',

  initialize: function(options) {
    this.render(options);
    this.remove(options);
  },

  render: function(options) {
      this.map = new GMaps({
        el: this.el,
        lat: options.myLocation.coords.latitude,
        lng: options.myLocation.coords.longitude,
        width: 500,
        height: 500
      });
      this.map.addLayer('bicycling');
      this.renderChildren();
    },

renderChildren: function(options) {
  console.log(this.collection.models[0].attributes.results);
  
		 this.collection.models[0].attributes.results = this.collection.map(function(child) {
				var lat = child.attributes.lat;
				var lng = child.attributes.lng;

        this.map.addMarker ({
          title: [0].title,
          lat: this.collection.models[0].attributes.results[1].lat,
          lng: this.collection.models[0].attributes.results[1].lng,
          infoWindow: this.collection.models[0].attributes.results.infoWindow
        });

		}.bind(this));
  },

  });
