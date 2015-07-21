export default Backbone.View.extend({

  template: JST['loading'],
  tagName: 'div',

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.template);
  }

})
