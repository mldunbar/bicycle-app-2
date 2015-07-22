import NotesListView from './views/notesListView';
import NotesItemView from './views/notesItemView';
import BrlView from './views/brlView';
import RentalView from './views/rentalView';
import LawsView from './views/lawsView';
import LoginView from './views/login/loginView';
import LoadingView from './views/loadingView';

import {Marker, MarkerCollection} from './models/markers';
import {RentalMarker, RentalMarkerCollection} from './models/rentalMarkers';
import {Note, NoteCollection} from './models/notes';

import {UserCollection} from './models/users';

import config from './ajax-config';

var Router = Backbone.Router.extend({

  routes: {
    '' : 'login',
    'brl' : 'brl',
    'rental' : 'rental',
    'laws' : 'laws',
    'notes': 'notes'
  },

  initialize: function(){
    Parse.initialize("CfSNdvfYJdwach6FMkR4Mjks3W5KQVUeyl7QzEJK","vFzGiwk3O85KvA2DTO7i456YKQKHRx2SY7h8esA3");
  },

  login: function(){
    if (Parse.User.current()) {
      this.brl();
    } else {
      var users = new UserCollection();
      var view = new LoginView({collection: users});
      $('#app').html(view.el)
  }
},

  brl: function(){
    var loadingView = new LoadingView();
    $('#app').html(loadingView.el);
    this.Marker = new MarkerCollection();
    new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      this.Marker.fetch().then(function(data){
        this.BrlView = new BrlView({collection: this.Marker, myLocation: position});
        $('#app').html(this.BrlView.el);
      }.bind(this));
    }.bind(this));
  },

  rental: function(){
    var loadingView = new LoadingView();
    $('#app').html(loadingView.el);
    this.rentalMarker = new RentalMarkerCollection();
    new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
    this.rentalMarker.fetch().then(function(data) {
      console.log(this.rentalMarker, position);
      this.RentalView = new RentalView({collection: this.rentalMarker, myLocation: position});
      $('#app').html(this.RentalView.el);
      }.bind(this));
    }.bind(this));
  },

  laws: function(){
    var loadingView = new LoadingView();
    $('#app').html(loadingView.el);
    var users = new UserCollection();
    var view = new LawsView({collection: users});
    $('#app').html(view.el);
  },

  notes: function(){
    var loadingView = new LoadingView();
    $('#app').html(loadingView.el);
    var users = new UserCollection();
    var notes = new NoteCollection();
    notes.fetch();
    var view = new NotesListView({collection: notes});
    $('#app').html(view.el);
  }

});

var router = new Router();
export default router;
