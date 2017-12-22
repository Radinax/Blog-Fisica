const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
/*
    --TOP LEVEL FUNCTIONS--
    gulp.task - Define tasks
    gulp.src -Point to files to use
    gulp.dest -Points to the folder for output
    gulp.watch - Watch files and folders for changes.
*/

// Copy All HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});

// Optimize Images
gulp.task('imageMin', function() {
    return gulp.src('src/images/*.+(png|jpg|gif)')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
    }
);

// Compile Sass
gulp.task('sass', function(){
gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

// Concat and Uglify ES6 JS Files
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});
gulp.task('default', ['copyHtml', 'imageMin', 'sass', 'scripts']);

gulp.task('watch', function(){
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/*.html', ['copyHtml']);
});