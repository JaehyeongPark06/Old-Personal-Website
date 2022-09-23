const slide = document.querySelector('.slider-wrapper');

// TINY SLIDER
let projects_slider = tns({
    container: ".my-slider",
    animateIn: "jello",
    animateOut: "rollOut",
    slideBy: 1,
    speed: 400,
    nav: false,
    swipeAngle: false,
    autoplay: true,
    autoplayButtonOutput: false,
    controlsContainer: "#project-controls",
    prevButton: ".previous",
    nextButton: ".next",
    responsive: {
        1280: {
            items: 3,
            gutter: 20
        },
        1024: {
            items: 2,
            gutter: 20
        },
        810: {
            items: 2,
        },
        768: {
            items: 2
        },
        480: {
            items: 1
        }
    }
});
