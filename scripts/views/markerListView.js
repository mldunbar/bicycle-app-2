export default Backbone.View.extend({
  template: JST.markers,

  initialize: function(){
    this.render()
  },

  render: function(){
    console.log(this);
  },

})
