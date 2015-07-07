export default Backbone.View.extend({
  template: JST.index,

  events: {
    'click .brl' : 'routeBrl'
  },

  initialize: function(){
    this.render()
  },

  render: function(){
  this.$el.html(this.template(this.collection.toJSON()));
},

  routeBrl: function(){
  console.log('hello');
},

});
