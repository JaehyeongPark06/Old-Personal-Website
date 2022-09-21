let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
  if (nav.style.transform != 'translateX(0%)') {
    nav.style.transform = 'translateX(0%)';
    nav.style.transition = 'transform 0.2s ease-out';
  } else {
    nav.style.transform = 'translateX(-100%)';
    nav.style.transition = 'transform 0.2s ease-out';
  }
});


// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

toggleIcon.addEventListener('click', () => {
  if (toggleIcon.className != 'menuIcon toggle') {
    toggleIcon.className += ' toggle';
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  } else {
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
    toggleIcon.className = 'menuIcon';
  }
});

$(window).on('scroll load', function () {

  $('menuIcon').removeClass('fa-times');
  $('header').removeClass('toggle');
  toggleIcon.className = 'menuIcon';

  if ($(window).scrollTop() > 0) {
    $('.top').show();
  }

  else {
    $('.top').hide();
  }

});

// smooth scroll
$('a[href*="#"]').on('click', function (e) {

  e.preventDefault();

  $('html, body').animate({

    scrollTop: $($(this).attr('href')).offset().top,

  },
    600,
    'linear'
  );

});





