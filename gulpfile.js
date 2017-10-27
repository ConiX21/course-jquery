var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('copy-css', function(){
    console.log("execute")
    return gulp.src(['node_modules/animate.css/animate.min.css'
        , 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest('content/'));  
})

gulp.task('copy-js', function(){
    console.log("execute")
    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/mustache/mustache.min.js',
            'node_modules/jquery/dist/jquery.min.js'
        ])
        .pipe(gulp.dest('lib/'));
})

gulp.task('copy-font', function(){
    return gulp.src([
            'node_modules/bootstrap/dist/fonts/*.*'
        ])
        .pipe(gulp.dest('fonts/'));
})

gulp.task('compress', function (cb) {
  pump([
        gulp.src('lib/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task("gc", ["copy-css", "copy-js", "copy-font"]);
gulp.task("dist", ["compress"]);
