// gulpプラグインの読み込み
const gulp = require("gulp");

const sass = require("gulp-sass");
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require("browser-sync");
const postcss = require("gulp-postcss");
const cssImport = require("postcss-import");

// webpackの設定ファイルの読み込み
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

// Sass
gulp.task("sass", function () {
  const plugins = [
    cssImport({
      path: [ 'node_modules' ]
    })
  ];
  return gulp.src('./src/css/*.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./asset/css'));
});

// .min.cssを生成する
gulp.task("mincss", function () {
  return gulp.src('./asset/css/index.css')//上のタスクで出力したcssファイル
          .pipe(cleanCSS()) // cssを圧縮
          .pipe(gulp.dest('./asset/css'));
});


// js
gulp.task("bundle", function () {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("asset/js"));
});

gulp.task("build", function (done) {
  gulp.watch('./src/css/*.scss', gulp.series('sass', 'mincss'));
  gulp.watch('./src/js/*.js', gulp.series('bundle'));
  done();
});

// ブラウザシンク
gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./**", function(done) {
    browserSync.reload();
    done();
  });
});

// html, css, jsを生成
gulp.task('default', gulp.series(gulp.parallel('build', 'browserSync')));
