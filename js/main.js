// Author: Aditya Rao <adicoolrao@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    bootstrap : 'libs/bootstrap/bootstrap.min',
    text: 'libs/require/text'
  }

});

require(['jquery','views/app','bootstrap'], function($, AppView){
  var app_view = new AppView();
  $("[rel=tooltip]").tooltip();
  var $win = $(".content")
        , $nav = $('#check')
        , navTop = $('#check').length && $('#check').offset().top - 80
        , isFixed = 0
  $win.on('scroll', processScroll)
  
      function processScroll() {
        var i, scrollTop = $win.scrollTop()
        if (scrollTop >= navTop && !isFixed) {
          isFixed = 1
          $nav.addClass('subnav-fixed')
          //alert('yes');
        } else if (scrollTop <= navTop && isFixed) {
          isFixed = 0
          $nav.removeClass('subnav-fixed')
        }
      }
      
      var h=$(window).height() - 140;
      $(".content").height(h)
  
});
