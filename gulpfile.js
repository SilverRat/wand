const gulp = require("gulp");
const eslint = require("gulp-eslint");

gulp.task("eslint", function() {
    return gulp.src(["index.js", "gulpfile.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Static server
gulp.task("default", ["eslint"]);
