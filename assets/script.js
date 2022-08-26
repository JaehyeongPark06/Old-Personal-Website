// menu for mobile or smaller screens
$(document).ready(function(){

  $('#menu').click(function(){
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  });

  $(window).on('scroll load',function(){

    $('#menu').removeClass('fa-times');
    $('header').removeClass('toggle');

    if($(window).scrollTop() > 0){
      $('.top').show();
    }

    else{
      $('.top').hide();
    }

  });
});

// Light and dark mode
var icon = document.getElementById("icon");

icon.onclick = function(){
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")){
    icon.src = "images/light&dark/moon.png";
  } else{
    icon.src = "images/light&dark/sun.png";
  }
}

// smooth scroll
$('a[href*="#"]').on('click',function(e){

  e.preventDefault();

  $('html, body').animate({

    scrollTop : $($(this).attr('href')).offset().top,

  },
    575, 
    'linear'
  );

});





