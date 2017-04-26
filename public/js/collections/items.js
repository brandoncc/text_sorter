var Items;

(function() {
  var alphabeticalComparator = function(a, b) {
    var aValue = a.get('value');
    var bValue = b.get('value');

    // Characters are the same, compare case
    if (aValue.toLowerCase() === bValue.toLowerCase()) {
      if (aValue > bValue) { return 1; }
      if (aValue < bValue) { return -1; }
    }

    // Characters are different, compare in lowercase
    if (aValue.toLowerCase() > bValue.toLowerCase()) { return 1; }
    if (aValue.toLowerCase() < bValue.toLowerCase()) { return -1; }

    // Characters must be the same
    return 0;
  };

  var countComparator = function(a, b) {
    var aCount = a.get('count');
    var bCount = b.get('count');

    if (aCount === bCount) {
      // Counts are the same, fall back to alphabetical for this comparison
      return alphabeticalComparator(a, b);
    } else {
     return bCount - aCount;
    }
  };

  Items = Backbone.Collection.extend({
    model: Item,
    updateItems: function() {
      var itemData = [];
      var counts = App.sortText.getPartsToSort();

      if (_.contains(Object.keys(counts), ' ')) {
        counts['[SPACE]'] = counts[' '];
        delete counts[' '];
      }

      Object.keys(counts).forEach(function(key) {
        itemData.push({ value: key, count: counts[key] });
      });

      this.set(itemData);
    },
    comparator: function(a, b) {
      var activeComparator = App.sortBy;

      if (activeComparator === 'alphabetical') {
        return alphabeticalComparator(a, b);
      } else if (activeComparator === 'count') {
        return countComparator(a, b);
      }
    },
    initialize: function() {
      this.listenTo(App.sortText, 'change', this.updateItems);
      this.listenTo(this, 'update_items', this.updateItems);
    }
  });
})();
