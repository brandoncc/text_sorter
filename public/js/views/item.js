var ItemView = Backbone.View.extend({
  events: {
    'mouseover': 'mouseover',
    'mouseout': 'mouseout',
    'click': 'removeItem'
  },
  tagName: 'li',
  className: 'sorted-item',
  template: _.template($('#item-template').html()),
  mouseover: function() {
    this.$el.addClass('hover');
  },
  mouseout: function() {
    this.$el.removeClass('hover');
  },
  removeItem: function() {
   App.sortText.removeText(this.model.get('value'));
    App.items.remove(this.model);
  },
  render: function() {
    if (App.fadeTransition) {
      // We only want to fade in on initial render, not on updates
      if (!this.rendered) { this.$el.css({display: 'none'}); }
    }

    this.$el.html(this.template(this.model.toJSON()));
    this.rendered = true;
    this.$el.fadeIn();
    return this;
  },
  fadeOut: function() {
    this.$el.fadeOut(App.fadeTransition ? 200 : 0, function() {
      this.remove();
    });
  },
  initialize: function() {
    this.render();
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'remove', this.fadeOut);
  }
});
