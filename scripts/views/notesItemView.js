export default Backbone.View.extend({
  template: JST['notes-list-item'],

  tagName: 'li',

  events: {
    'click .note-edit-button': 'editNote',
    'submit .note-edit-form': 'saveNote',
    'click .note-reset': 'resetNote',
    'click .note-delete': 'deleteNote'
  },

  initialize: function(){
    this.render();
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  },

  editNote: function(e){
    this.$('.note-edit-form').toggleClass('hidden');
  },

  saveNote: function(e){
    e.preventDefault();
    var title = this.$('.note-title').val();
    var content = this.$('.note-content').val();
    this.model.save({
      title: title,
      content: content
    });
  },

  resetNote: function(){
    var title = this.$('.note-title').val();
    var content = this.$('.note-content').val();
  },

  deleteNote: function(e){
    e.preventDefault();
    this.model.destroy();
  }

});
