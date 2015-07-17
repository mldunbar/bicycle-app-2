var Note = Backbone.Model.extend({
  idAttribute: 'objectId',

  defaults: {
    title: '',
    url: ''
  },

});

var BookmarkCollection = Backbone.Collection.extend({
  url: "https://api.parse.com/1/classes/note",
  model: Note,

  parse: function(response) {
      return response.results;
    }
});

export default {Note, NoteCollection};
