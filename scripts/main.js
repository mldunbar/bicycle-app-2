import router from './router';
import {MarkerCollection} from './models/markers';
import './ajax-config';

(function(){
  'use strict';

  $(document).ready(function(){
    Backbone.history.start();
    var markers = new MarkerCollection();
    markers.fetch();
  });
})();
