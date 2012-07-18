// Author: Aditya Rao <adicoolrao@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    bootstrap : 'libs/bootstrap/bootstrap',
    text: 'libs/require/text'
  }

});

require(['jquery','views/app','bootstrap'], function($, AppView){
$("[rel=tooltip]").tooltip();
  var app_view = new AppView();
});
