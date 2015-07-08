import ajaxConfig from './ajax-config';
import IndexView from './views/indexView';
import BrlView from './views/brlView';
import router from './router';

(function(){
  'use strict';

  $(document).ready(function(){
    Backbone.history.start();
  });
})();
