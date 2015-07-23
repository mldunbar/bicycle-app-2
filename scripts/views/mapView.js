export default Backbone.View.extend({
  className: 'map',

  initialize: function(options) {
    this.render(options);
    this.listenTo(this.collection, 'update', this.renderChildren);
  },

  events: {
    'click': 'addNewMarker'
  },

  render: function(options) {
      this.map = new GMaps({
        el: this.el,
        lat: options.myLocation.coords.latitude,
        lng: options.myLocation.coords.longitude,
        width: 1000,
        height: 500,
        clickable: true
      });
      this.renderChildren();
      //this.map.set('styles', [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f4f3e1"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#00ff9f"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#2b2a28"},{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#f3f4e6"},{"weight":"5.38"},{"visibility":"on"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#3fa662"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"color":"#2b2a28"},{"gamma":"1"},{"visibility":"on"},{"weight":"0.31"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"gamma":"1.5"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"weight":"0.30"},{"gamma":"2"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"weight":"2"},{"color":"#f3f4e6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#323c39"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"weight":"5"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#f3f4e6"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#2b2a28"},{"visibility":"on"},{"weight":"2.78"}]}]);
      this.map.addLayer('bicycling');
      // this.map.addControl('legend', 'RIGHT_BOTTOM');
    },

renderChildren: function(options) {
  this.map.removeMarkers();
    this.collection.forEach(function(marker) {
        this.map.addMarker(marker.toJSON());
		}.bind(this));
  },

  addNewMarker: function(){
    console.log('MIA');
    // Update form values
    var map;

  // Update position
  $(document).on('submit', '.edit_marker', function(e) {
    e.preventDefault();

    var $index = $(this).data('marker-index');

    $lat = $('#marker_' + $index + '_lat').val();
    $lng = $('#marker_' + $index + '_lng').val();

    var template = $('#edit_marker_template').text();

    // Update form values
    var content = template.replace(/{{index}}/g, $index).replace(/{{lat}}/g, $lat).replace(/{{lng}}/g, $lng);

    map.markers[$index].setPosition(new google.maps.LatLng($lat, $lng));
    map.markers[$index].infoWindow.setContent(content);

    $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
    $marker.data('marker-lat', $lat);
    $marker.data('marker-lng', $lng);
  });

  // Update center
  $(document).on('click', '.pan-to-marker', function(e) {
    e.preventDefault();

    var lat, lng;

    var $index = $(this).data('marker-index');
    var $lat = $(this).data('marker-lat');
    var $lng = $(this).data('marker-lng');

    if ($index != undefined) {
      // using indices
      var position = map.markers[$index].getPosition();
      lat = position.lat();
      lng = position.lng();
    }
    else {
      // using coordinates
      lat = $lat;
      lng = $lng;
    }

    map.setCenter(lat, lng);
  });

    GMaps.on('click', map.map, function(event) {
      var index = map.markers.length;
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      var template = $('#edit_marker_template').text();

      var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);

      map.addMarker({
        lat: lat,
        lng: lng,
        title: 'Marker #' + index,
        infoWindow: {
          content : content
        }
      });
    });
  }

  });
