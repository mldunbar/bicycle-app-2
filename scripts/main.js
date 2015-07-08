import ajaxConfig from './ajax-config';
import IndexView from './views/indexView';
import router from './router';

(function(){
  'use strict';

  $(document).ready(function(){
    Backbone.history.start();
  });
})();
