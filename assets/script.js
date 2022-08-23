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

// animate scroll
window.addEventListener('scroll', reveal);

function reveal(){
  var reveals = document.querySelectorAll('.reveal'); 

  for (var i = 0; i < reveals.length; i++){

    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 30;

    if (revealtop < windowheight - revealpoint){
      reveals[i].classList.add('active');
    }
    else{
      return
    }
}
}

// smooth scroll
$('a[href*="#"]').on('click',function(e){

  e.preventDefault();

  $('html, body').animate({

    scrollTop : $($(this).attr('href')).offset().top,

  },
    500, 
    'linear'
  );

});





