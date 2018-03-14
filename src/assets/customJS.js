import jquery from 'jquery';

// Animate banner fadeout when scrolling
jquery(window).scroll(function(){
    jquery(".banner").css("opacity", 1 - jquery(window).scrollTop() / 250);
    jquery(".minimized-banner").css("opacity", 0 + jquery(window).scrollTop() / 250);
    jquery(".homepage-title").css("font-size", 80 - (0.5 + (40 * jquery(window).scrollTop() / 250)));
});