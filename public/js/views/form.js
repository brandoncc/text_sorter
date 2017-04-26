var FormView = Backbone.View.extend({
  events: {
    'keyup [type="text"]': 'textChanged',
    'change [name="sort-by"]': 'changeSortBy',
    'change [name="sort-type"]': 'changeSortType',
    'change #ignore-case': 'changeIgnoreCase',
    'change #fade-transition': 'changeFadeTransition'
  },
  el: 'form',
  textChanged: function(e) {
    App.sortText.set('text', e.target.value);
  },
  changeSortBy: function(e) {
    App.sortBy = e.target.value;
    App.items.trigger('resort');
  },
  changeSortType: function(e) {
    App.sortType = e.target.value;
    App.items.trigger('update_items');
  },
  changeIgnoreCase: function(e) {
    App.ignoreCase = e.target.checked;
    App.items.trigger('update_items');
  },
  changeFadeTransition: function(e) {
    App.fadeTransition = e.target.checked;
  }
});
