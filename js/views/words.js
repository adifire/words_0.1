define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/word',
  'text!templates/word.html'
 ], function($, _, Backbone, Word, wordsTemplate){
  var WordView = Backbone.View.extend({
  	model : Word,
  	
  	tagName : 'div',
  	
  	className : 'span3 well',
  	
  	template : _.template(wordsTemplate),
  	
  	events: {
  		"click span.word-destroy"   : "clear",
  	},
  	
  	initialize: function () {
  		_.bindAll(this, 'render');
  		
  		this.model.bind('change',this.render);
  		this.model.bind('destroy', this.remove);
  		this.model.view = this;
  	},
  	
  	render : function () {
  		$(this.el).html(this.template(this.model.toJSON()));
  		return this;
  	},
  	
    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
      this.remove();
    }

  });
	
	return WordView;

});