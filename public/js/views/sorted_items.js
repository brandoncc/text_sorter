var SortedItemsView = Backbone.View.extend({
  el: 'main ul',
  renderItem: function(model) {
    this.$el.append(model.view.el);
    this.sortItems();
  },
  sortItems: function() {
    var items = App.items.sort().models;
    var $prevEl;
    var $el;

    for(var index = 0, length = items.length; index < length; index++) {
      if (index > 0) { $prevEl = items[index - 1].view.$el; }
      $el = items[index].view.$el;

      if ($prevEl) { $el.insertAfter($prevEl); }
      else { this.$el.prepend($el); }
    }
  },
  initialize: function() {
    this.listenTo(App.items, 'add', this.renderItem);
    this.listenTo(App.items, 'change:count resort', this.sortItems);
  }
});
