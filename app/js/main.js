$(function () {
  $(".slider").slick({
    dots: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../images/src/slide-prev.svg" alt="#"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../images/src/slide-next.svg" alt="#"></button>',
  });

  $(".gallery__slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../images/src/slide-prev.svg" alt="#"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../images/src/slide-next.svg" alt="#"></button>',
  });

  $(".partners__slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    variableWidth: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../images/src/slide-prev.svg" alt="#"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../images/src/slide-next.svg" alt="#"></button>',
  });
});
