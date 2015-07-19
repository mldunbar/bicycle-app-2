import NotesItemView from './notesItemView';

export default Backbone.View.extend({
  template: JST['notes-list'],

  initialize: function(){
    this.render();
    this.listenTo(this.collection, 'update', this.render);
  },

events: {
  'click .add-notes-button' : 'showAddNotes',
  'submit .notes-add-form': 'saveNote',
},

showAddNotes: function(){
  this.$('.notes-add-form').toggleClass('hidden');
},

saveNote: function(e){
  e.preventDefault();
  var title = this.$('.notes-title').val();
  var content = this.$('.notes-content').val();
  this.collection.create({
    title: title,
    content: content
  });
},

  render: function(){
    this.$el.html(this.template);
    this.renderChildren();
  },

  renderChildren: function(){
    _.invoke(this.children || [], 'remove');

    this.children = this.collection.map(function(child) {
      var view = new NotesItemView({
        model: child
      });
      this.$el.append(view.el);
      return view;
    }.bind(this));
    return this;
  },

  remove: function(){
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }

});
