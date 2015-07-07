import {Marker, MarkerCollection} from './models/markers';
import MarkerListView from './views/markerListView';
import BikeRouter from './router';

(function(){
  'use strict';

  $(document).ready(function(){
    new BikeRouter;
    Backbone.history.start();
  });
})();
