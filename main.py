#!/usr/bin/env python
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util
import time
import simplejson as json
import logging
import urllib


def convert_date(value):
	ms = time.mktime(value.utctimetuple())
	ms += getattr(value, 'microseconds', 0) / 1000
	return int(ms)
	

class Word(db.Model):
	
	word_name = db.StringProperty(required=True)
	
	definition = db.StringProperty(required=True)
	
	date_created = db.DateTimeProperty(auto_now=True)
	
	#owner = db.ReferenceProperty(User, collection_name="words_owned")
	
	def toDict(self):
		word = {}
		word["id"] = self.key().id()
		word["word_name"] = self.word_name
		word["definition"] = self.definition
		word["date_created"] = convert_date(self.date_created)
		return word
		
	"""
	def delete(self):
		for d in self.definitions:
			d.delete()
		Super(Word,self).delete()
		return


class Definition(db.Model):
	
	word = db.ReferenceProperty(Word,required=True,collection_name="definitions")
	
	definition_name = db.StringProperty(required=True)
	
	date_created = db.DateTimeProperty(auto_now=True)
	
	#created_by = db.ReferenceProperty(User,collection_name="definitions_added")
	"""

class WordListHandler(webapp.RequestHandler):
	def get(self):
		words = []
		q = Word.all()
		q.order("-date_created")
		for word in q:
			words.append(word.toDict())
		return self.response.out.write(json.dumps(words))
	
	def post(self):
		#logging.info(self.request.body)
		try: 
			data = json.loads(self.request.body)
			logging.info("done")
		except:
			request = self.request
			data = {}
			data["word_name"] = request.get("word_name")
			data["definition"] = request.get("definition")
		logging.info(data)
		if type(data) is dict:
			logging.info("dict")
			word = Word.all().filter("word_name",data["word_name"]).filter("definition",data["definition"]).get()
			logging.info(data['definition'])
			if (word == None):
				word = Word(
					word_name=data["word_name"],
					definition=data["definition"]
				)
				word.put()
			return self.response.out.write(json.dumps(word.toDict()))
		if type(data) is list:
			logging.info("list")
			words = []
			logging.info(data)
			for w in data:
				#logging(w)
				word = Word.all().filter("word_name",w["word_name"]).filter("definition",w["definition"]).get()
				logging.info(w['definition'])
				if (word == None):
					word = Word(
						word_name=w["word_name"],
						definition=w["definition"]
					)
					word.put()
				words.append(word.toDict())
			logging.info(words)
			return self.response.out.write(json.dumps(words))

class WordHandler(webapp.RequestHandler):
	def put(self, id):
		data = json.loads(self.request.body)
		word = Word.get_by_id(int(id))
		word.word_name = data["word_name"]
		word.definition = data["definition"]
		word.put()
		return self.response.out.write(json.dumps(word.toDict()))
	
	def delete(self, id):
		word = Word.get_by_id(int(id))
		word.delete()
		#pass
	
	def get(self,id):
		word = Word.get_by_id(int(id))
		if word:
			return self.response.out.write(json.dumps(word.toDict()))
		return self.response.out.write("")
	
		
class MainHandler(webapp.RequestHandler):
	def get(self):
		return self.response.out.write(template.render("index.html",{}))

class TestHandler(webapp.RequestHandler):
	def get(self):
		words = Word.all()
		l = []
		for word in words:
			l.append(word.toDict())
		return self.response.out.write(template.render("test2.html",{'words':l}))

def main():
    application = webapp.WSGIApplication([
        ('/', MainHandler),
        ('/test', TestHandler),

        # REST API requires two handlers - one with an ID and one without.
        ('/words', WordListHandler),
        ('/words/(\d+)', WordHandler),
    ], debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
