var SortText;

(function() {
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  SortText = Backbone.Model.extend({
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

      return _.countBy(text.match(new RegExp('([^' + App.wordBoundaries.source + ']+)', 'g')));
    },
    removeText: function(text) {
      if (App.sortType === 'characters') {
        this.removeCharacter(text);

      } else if (App.sortType === 'words') {
        this.removeWord(text);
      }
    },
    removeCharacter: function(character) {
      var currentText   = this.get('text');
      var regexFlags    = App.ignoreCase ? 'gi': 'g';
      var regexMatcher  = character === Item.spaceText ? ' ' : escapeRegExp(character);
      var newText       = currentText.replace(new RegExp(regexMatcher, regexFlags), '');

      this.set('text', newText);
      this.trigger('updated_manually');

    },
    removeWord: function(word) {
      var currentText   = this.get('text');
      var regexFlags    = App.ignoreCase ? 'gi': 'g';
      var regexMatcher  = '(^|[' + App.wordBoundaries.source + '])';
          regexMatcher += escapeRegExp(word);
          regexMatcher += '($|[' + App.wordBoundaries.source + '])';
      var newText       = currentText.replace(new RegExp(regexMatcher, regexFlags), '$1$2');

      if (newText.match(/^\s+$/)) { newText = ''; }

      this.set('text', newText);
      this.trigger('updated_manually');
    }
  });
})();
