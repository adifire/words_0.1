define([
  'underscore', 
  'backbone', 
  'models/word'
  ], function(_, Backbone, Word){
  	
  	var WordCollection = Backbone.Collection.extend({
  	// Reference to this collection's model.
    model: Word,
    url: '/words',

  	});
  	
  	return WordCollection;
  	
});