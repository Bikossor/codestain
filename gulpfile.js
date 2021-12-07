const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("clean-up", function () {
    return del("dist/**", { force: true });
});

gulp.task("build-typescript", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("clean-up", "build-typescript"));
