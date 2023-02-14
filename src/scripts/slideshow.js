(function ($) {
  new Swiper("#slideshow .swiper", {
    speed: 1000,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: "#slideshow .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: "#slideshow .swiper-button-next",
      prevEl: "#slideshow .swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
})(jQuery);
