import MarkerListView from './views/markerListView';

(function(){
  'use strict';

  $(document).ready(function(){
    var markers = new Backbone.Collection([
      {title: 'TIY', position: '(34.851832,-82.399967)'},
      {title: 'merp', position: '(35,-82.399967)'},
      {title: 'rerp', position: '(34.851832,-81)'}
    ]);

    var listView = new MarkerListView({collection: markers});
    $('body').prepend(listView.el);
  });
})();
