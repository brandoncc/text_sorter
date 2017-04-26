var SortText = Backbone.Model.extend({
  defaults: {
    text: ''
  },
  getPartsToSort: function() {
    if (App.sortType === 'characters') {
      return this.getCharacterCounts();
    } else if (App.sortType === 'words') {
      return this.getWordCounts();
    }
  },
  getCharacterCounts: function() {
    var text = this.get('text');

    if (App.ignoreCase) { text = text.toLowerCase(); }

    return _.countBy(text);
  },
  getWordCounts: function() {
    var text = this.get('text');

    if (App.ignoreCase) { text = text.toLowerCase(); }

    return _.countBy(text.match(/([^\s.,!?;/]+)/g));
  }
});
