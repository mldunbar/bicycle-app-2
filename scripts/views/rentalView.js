export default Backbone.View.extend({
  template: JST['index'],

  initialize: function(options) {
  this.render(options);
},

  render: function(options) {
    this.$el.html(this.template(this.collection.toJSON()));
  },
});
