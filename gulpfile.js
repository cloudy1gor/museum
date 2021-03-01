// Определение констант Gulp
const { src, dest, parallel, series, watch } = require("gulp");

const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const size = require("gulp-size");
const imagemin = require("gulp-imagemin");
const recompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const del = require("del");
const gcmq = require("gulp-group-css-media-queries");
const fileinclude = require("gulp-file-include");
const rename = require("gulp-rename");
const svgmin = require("gulp-svgmin");
const svgsprite = require("gulp-svg-sprite");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./app",
      index: "index.html",
    }, // Папка сервера (Исходные файлы)
    notify: false,
    online: true,
    open: false,
  });
}

function html() {
  return src(["app/html/pages/*.html", "!app/html/components/_*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "app/",
      })
    )
    .pipe(
      size({
        gzip: true,
        pretty: true,
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest("app/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "!app/js/main.min.js",
    "app/js/main.js",
  ])
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(
      size({
        gzip: true,
        pretty: true,
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
}

function styles() {
  return src([
    "node_modules/normalize.css/normalize.css",
    "!app/scss/_*.scss",
    "app/scss/style.scss",
  ])
    .pipe(
      sass({
        outputStyle: "expanded", // "compressed"
      }).on("error", sass.logError)
    )
    .pipe(concat("style.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
        cascade: true,
        browsers: [
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 11",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6",
        ],
      })
    ) // Добавляет вендорные префиксы
    .pipe(gcmq()) //Группирует медиа
    .pipe(
      size({
        gzip: true,
        pretty: true,
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest("app/css/"))
    .pipe(
      rename(function (path) {
        path.basename += ".min";
      })
    )
    .pipe(
      cleancss({
        level: {
          2: {
            specialComments: 0,
          },
        },
      })
    ) // format: "beautify",
    .pipe(
      size({
        gzip: true,
        pretty: true,
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
}

function images() {
  return src("app/images/src/**/*")
    .pipe(
      imagemin(
        {
          interlaced: true,
          progressive: true,
          optimizationLevel: 5,
        },
        [
          recompress({
            loops: 6,
            min: 50,
            max: 90,
            quality: "high",
            use: [
              pngquant({
                quality: [0.7, 0.9],
                strip: true,
                speed: 1,
              }),
            ],
          }),
          imagemin.gifsicle(),
          imagemin.optipng(),
          imagemin.svgo(),
        ]
      )
    )
    .pipe(
      size({
        gzip: true,
        pretty: true,
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest("app/images/dest"));
}

function svg2sprite() {
  return src("app/images/src/icons/*.svg")
    .pipe(
      svgmin({
        plugins: [
          {
            removeComments: true,
          },
          {
            removeEmptyContainers: true,
          },
        ],
      })
    )
    .pipe(
      svgsprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(
      size({
        gzip: true,
        pretty: true,
        showFiles: true,
        showTotal: true,
      })
    )
    .pipe(dest("app/images/src"));
}

function cleanimg() {
  return del("app/images/dest/**/*", {
    force: true,
  }); // Удаляем всё содержимое папки "app/images/#dest/"
}

function cleandist() {
  return del("dist/**/*", {
    force: true,
  }); // Удаляем всё содержимое папки "dist"
}

function buildcopy() {
  return src(
    [
      "app/css/**/*.min.css",
      "app/js/**/main.min.js",
      "app/images/dest/**/*",
      "app/*.html",
    ],
    {
      base: "app",
    }
  ) // Сохраняем структуру app при копировании
    .pipe(dest("dist")); // Выгружаем финальную сборку в папку dist
}

function startwatch() {
  watch("app/html/**/*", html);

  watch("app/scss/**/*", styles);

  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);

  watch("app/images/src/**/*", images);

  watch("app/images/src/icons/*.svg", svg2sprite);
}

exports.browsersync = browsersync;

exports.html = html;

exports.scripts = scripts;

exports.styles = styles;

exports.images = images;

exports.svg2sprite = svg2sprite;

exports.cleandist = cleandist;

exports.cleanimg = cleanimg;

exports.build = series(cleandist, styles, scripts, images, buildcopy);

exports.default = parallel(
  html,
  svg2sprite,
  styles,
  scripts,
  browsersync,
  startwatch
);
