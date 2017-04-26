var App = {
  sortBy: 'alphabetical',
  sortType: 'characters',
  ignoreCase: false,
  fadeTransition: false,
  init: function() {
    this.sortText = new SortText();
    this.items = new Items();
    this.itemsView = new SortedItemsView();
    this.formView = new FormView();
  }
};

App.init();
