var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  browserify = require('browserify'),
  es = require('event-stream'),
  source = require('vinyl-source-stream'),
  watchify = require('watchify'),
  buffer = require('vinyl-buffer'),
  streamify = require('gulp-streamify'),
  notify = require("gulp-notify"),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  assign = require('lodash.assign'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
  filesize = require('gulp-filesize'),
  spritesmith = require('gulp.spritesmith'),
  svgstore = require('gulp-svgstore');
plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  bump = require('gulp-bump'),
  sassLint = require('gulp-sass-lint');


gulp.task('browser-sync', function() {
  browserSync({
    proxy: "http://localhost/user/goldsboroughcricketclub.github.io/"
  });
});

gulp.task('markup', function() {
  return gulp.src('application/views/scripts/templates/**/*.phtml')
    .pipe(browserSync.reload({
      stream: true
    }));
});

/**
 * Gulp Sprite
 * run -> 'gulp sprite'
 *
 */

gulp.task('sprite', function() {
  var spriteData = gulp.src('httpdocs/assets-dev/images/icons/*.png').pipe(spritesmith({
    imgName: 'icons.png',
    cssName: '_sprite-icons.scss',
    padding: 20,
    imgPath: 'httpdocs/assets-dev/images/sprites/icons.png'
  }));

  spriteData.img
    .pipe(gulp.dest('assets/images/sprites/'));
  spriteData.css
    .pipe(gulp.dest('httpdocs/assets-dev/sass/sprites/'));
});


/**
 * Gulp SVG Sprite
 * run -> 'gulp svgstore'
 * <svg role="img" title="xxxx">
 *   <use xlink:href="<?= $this->getRequest()->getRequestUri() ?>#logo-stacked" />
 * </svg>
 */

gulp.task('svgstore', function() {
  return gulp
    .src('httpdocs/assets-dev/svg-icons/*.svg')
    // .pipe(svgmin()) // (needs testing)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(gulp.dest('assets/svg-icons/'));
});


gulp.task('libscripts', function() {
  // set up the browserify instance on a task basis
  var a = browserify({
    entries: 'httpdocs/assets-dev/js/libraries.js',
    debug: true
  });

  return a.bundle()
    .pipe(source('libraries.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js/'));
});


gulp.task('js', function() {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'httpdocs/assets-dev/js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    //.on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js/'));
});



/**
 * Gulp Styles
 * run -> 'gulp styles'
 *
 */

gulp.task('styles', function() {
  gulp.src('httpdocs/assets-dev/sass/main.scss') // removing return enables the sass to restart after error fix

  // Initialise sourcemaps prior to compiling SASS.
  .pipe(sourcemaps.init())

  .pipe(sourcemaps.write({
    includeContent: false,
    sourceRoot: './'
  }))

  // Compile SASS.
  .pipe(plumber())

  .pipe(sass({
    errLogToConsole: true
  }))

  // .on('error', gutil.log) // (log better errors ??)

  // Run compiled CSS through autoprefixer.
  .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))

  // Write sourcemap to a separate file.
  .pipe(sourcemaps.write('.', {
    includeContent: false,
    sourceRoot: 'assets/css'
  }))

  // Write CSS file to desitination path.
  .pipe(gulp.dest('assets/css'))

  .pipe(reload({
    stream: true
  }))

  // rename and minify css
  .pipe(rename({
    suffix: '.min'
  }))

  .pipe(minifycss())

  // Write CSS file to desitination path.
  .pipe(gulp.dest('assets/css'));

});

gulp.task('default', ['browser-sync', 'watch', 'styles', 'libscripts', 'js']);


gulp.task('watch', function() {
  gulp.watch('assets-dev/sass/**/*.scss', ['styles']);
  gulp.watch('assets-dev/js/**/*.js', ['js', browserSync.reload]);
  gulp.watch('/**/*.html', ['markup']);
});
