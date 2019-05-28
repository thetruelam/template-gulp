var gulp = require('gulp-v4'),
	sass = require('gulp-sass'),
	util = require('gulp-util'),
	log = util.log,
	postcss = require('gulp-postcss'),
	cssnano = require('cssnano'),
	autoprefixer = require('autoprefixer'),
	simplegrid = require('postcss-simple-grid');
	pug = require('gulp-pug');

var paths = {
	styles: {
		src: 'src/assets/scss/**/*.scss',
		dest: 'dist/assets/css'
	},
	pug: {
		src: 'src/views/**/*.pug',
		dest: 'dist'
	}
}

function styles() {
	log("Compiled CSS file" + (new Date()).toString());
	var plugins = [
		cssnano,
		simplegrid(
			{
				separator: '--'
			}
		),
		autoprefixer(
			{
				browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'],
			}
		)
	];
	return (
		gulp.src(paths.styles.src)
			.pipe(sass())
			.on('error', sass.logError)
			.pipe(postcss(plugins))
			.pipe(gulp.dest(paths.styles.dest))
	)
}

function pugs() {
	log("Compled Pug file" + (new Date()).toString());

	return (
		gulp.src(paths.pug.src)
			.pipe(pug({ pretty: true }))
			.pipe(gulp.dest(paths.pug.dest))
	)
}

function watch() {
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.pug.src, pugs);
}

exports.styles = styles;
exports.pugs = pugs;
exports.watch = watch;

var build = gulp.series(gulp.parallel(styles));

gulp.task('build', build);
gulp.task('default', build);
