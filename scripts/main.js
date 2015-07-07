(function(){
  'use strict';

  $(document).ready(function(){
    var markers = new Backbone.Collection([
      {title: 'TIY', position: '(34.851832,-82.399967)'},
      {title: 'merp', position: '(35,-82.399967)'},
      {title: 'rerp', position: '(34.851832,-81)'}
    ]);

    $('body').prepend(JST.index(markers.toJSON()));


    // var AppRouter = Backbone.Router.extend({
    //   routes: {
    //     '': 'index',
    //     'brl':'brl',
    //     'rental-bikes':'rental-bikes',
    //     'static-map': 'static-map',
    //     'laws':'laws'
    //   }
    // });
    //
    // index = function(){
    //   $('body').prepend(JST.index(markers.toJSON()));
    // },


  });
})();
