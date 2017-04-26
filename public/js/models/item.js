var app = app || {};

var Item = Backbone.Model.extend({
  defaults: {
    value: '',
    count: 1
  },
  idAttribute: 'value',
  initialize: function() {
    this.view = new ItemView({ model: this });
  }
});

Item.spaceText ='[SPACE]';
