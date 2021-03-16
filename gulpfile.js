const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const packageInfo = require('./package.json');

//clean
gulp.task('clean', function(done){
    return gulp.src('dist/*')
        .pipe(clean());
});

//css
gulp.task('minCss', function(done){
    return gulp.src('src/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

//js
gulp.task('minJs', function(done){
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env', {
                "sourceType": "script"
            }]
        }))
        .pipe(uglify({
            output: {
                preamble: "/* version:" + packageInfo.version + " */"
            }
        }))
        .pipe(gulp.dest('dist/js'));
});

//default
gulp.task('default', gulp.series('clean', gulp.parallel('minCss', 'minJs')));