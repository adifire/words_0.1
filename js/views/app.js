define([
  'jquery',
  'underscore', 
  'backbone',
  'collections/words',
  'views/words'
  ], function($,_, Backbone, WordsCollection, WordView) {
  	var AppView = Backbone.View.extend({
  		el : $("#wordapp"),
  		
  		events : {
  			'click #add-word' : 'createWord'
  		},
  		
  		initialize : function () {
  			_.bindAll(this,'addOne','addAll');
  			
  			this.collection = new WordsCollection();
  			this.collection.bind('reset', this.addAll);
  			this.collection.bind('add', this.addOne);
  			this.collection.fetch();
  		},
  		
  		addOne: function (word) {
  			var view = new WordView({ model : word });
  			this.$("#words-list").append(view.render().el);
  			$("[rel=tooltip]").tooltip();
  		},
  		
  		addAll: function () {
  			this.collection.each(this.addOne);
  		},
  		
  		createWord : function (e) {
  			try{
  			this.collection.create({
  				'word_name' : this.$('#new-word-name').val(),
  				'definition' : this.$('#new-word-def').val()
  			});
  			this.$('#new-word-name').val('');
  			this.$('#new-word-def').val('');
  			this.reset();
  			}catch (e) {
  				alert(e.message);
  			}
  		}
  	});
  	return AppView;
  });
  