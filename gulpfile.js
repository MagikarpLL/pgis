const gulp = require("gulp");
const ts = require("gulp-typescript");
const nodemon = require('gulp-nodemon');
const changed = require('gulp-changed');
const tsProject = ts.createProject("tsconfig.json");

gulp.task("ts", function () {
  return tsProject.src()
    .pipe(changed("dist"))
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("proto", function () {
  return gulp.src(['src/proto/**/*.proto'])
    .pipe(changed("dist/proto"))
    .pipe(gulp.dest("dist/proto"));
});

gulp.task('start', function () {
  return nodemon({
    script: './dist/index.js',
    watch: 'dist'
  })
});

gulp.task('watch', function () {
  let watcher = gulp.watch('src/**/*.ts', ['ts']);
  watcher.on('change', function (event) {
    console.log('JS File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('src/proto/**/*.proto', ['proto']);
  //   gulp.watch('dist/**/*.js', ['start']);
});

gulp.task('build', ['ts', 'proto']);
gulp.task('default', ['build'], () => gulp.start('start'));
