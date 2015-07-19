import router from './../router';

export default Backbone.View.extend({
  template: JST['index'],

  initialize: function() {
    this.render();
  },

  events: {
    'click .logout-button' : 'logout',
    'click .add-notes-button' : 'showAddNotes',
    'submit form' : 'addNotes'
  },

  render: function(){
    this.$el.html(this.template);
  },

  logout: function(){
    Parse.User.logOut().then(function() {
      if (!Parse.User.current()) {
        router.navigate('', true);
      }
    }, function(){
      if(!Parse.User.current()){
        router.navigate('', true);
    }
  })
},

showAddNotes: function(){
  $('.add-notes-here').toggleClass('hidden');
},

addNotes: function(e){
    e.preventDefault();
    var text = this.$('.add-notes').val();
    this.model.create();
  },

});
