$(function () {
  $(".banner").slick({
    dots: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="images/dest/slide-prev.svg" alt="#"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="images/dest/slide-next.svg" alt="#"></button>',
    // responsive: [
    //   {
    //     breakpoint: 1300,
    //     settings: {
    //       arrows: false,
    //     },
    //   },
    // ],
  });

  $(".gallery__slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="images/dest/slide-prev.svg" alt="#"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="images/dest/slide-next.svg" alt="#"></button>',
  });

  $(".partners__slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    variableWidth: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="images/dest/slide-prev.svg" alt="#"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="images/dest/slide-next.svg" alt="#"></button>',
  });

  $(".menu a, .footer__link").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $("body,html").animate({ scrollTop: top }, 1500);
  });

  $(".menu__btn, .menu a").on("click", function () {
    $(".menu__list").toggleClass("menu__list--active");
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".menu").addClass("sticky");
    } else {
      $(".menu").removeClass("sticky");
    }
  });
});
