
const path          = require('path'),
      fs            = require('fs'),
      child_process = require('child_process'),

      express       = require('express'),

      del           = require('del'),
      colors        = require('colors/safe'),

      browserify    = require('browserify'),
      source        = require('vinyl-source-stream'),

      gulp          = require('gulp'),
      less          = require('gulp-less'),
      ava           = require('gulp-ava'),
      eslint        = require('gulp-eslint'),
//    esdoc         = require('gulp-esdoc'),
      rename        = require('gulp-rename'),
      babel         = require('gulp-babel'),
      uglify        = require('gulp-uglify');





const production   = false,
      cmd          = child_process.execSync,
      app          = express(),
      errorHandler = err => { console.log(err.toString()); /* this.emit('end'); */ };

const eslint_rules  = require('./config/eslint_rules.json');

const dirs          = { dist: './dist', build: './build', doc: './doc' },
      babel_cfg     = { presets: [ 'es2015', 'react' ], sourceMaps: false },
      eslint_cfg    = { rules: eslint_rules, extends: 'eslint:recommended', parser: 'babel-eslint', env: { node: true, commonjs: true }, plugins: ['react'], parserOptions: { ecmaFeatures: { jsx: true } } },
      aws_config    = { cache_control_max_age: 300 };





gulp.task('clean', () => del(Object.keys(dirs).map(key => dirs[key])));





gulp.task('make-dirs', ['clean'], done_cb => {

    Object
      .keys(dirs)
      .forEach(key => {
        try       { fs.mkdirSync('.' + path.sep + path.normalize(dirs[key])); }
        catch (e) { if (e.code !== 'EEXIST') { console.log('caught ' + JSON.stringify(e) + ' while making dirs'); } }
      }
    );

    done_cb();

});





gulp.task('static-copy', ['make-dirs'], () =>

    gulp.src(['src/assets/static/**/*'])
        .pipe(gulp.dest('./build/'))
        .pipe(gulp.dest('./dist/'))

);





gulp.task('babel', ['setup'], () =>

    gulp.src(['src/js/**/*.js', 'src/js/**/*.jsx', 'src/test_js/**/*.js'])
        .pipe(babel(babel_cfg))
        .pipe(gulp.dest('./build'))

);





gulp.task('es6-copy', ['setup', 'babel'], () =>

    gulp.src(['build/*.js'])
        .pipe(gulp.dest('./dist'))

);





gulp.task('html-copy', ['setup'], () =>

    gulp.src(['src/html/*'])
        .pipe(gulp.dest('./dist'))

);





gulp.task('extlib-copy', ['setup'], () => {

// currently a no-op.  hooray!

// this is a last resort.  use of this is cowardly and wrong.
/*
    return gulp.src(["node_modules/whatever"])
        .pipe(gulp.dest("./build"))
        .pipe(gulp.dest("./dist"))
*/

});





gulp.task('browserify', ['setup', 'babel', 'es6-copy', 'extlib-copy'], () => {

    var browserifyConfig = {},
        bpack            = browserify(browserifyConfig, { 'debug' : !production });

    return bpack
//      .require('./node_modules/react/dist/react.min.js',         { 'expose' : 'react' })
//      .require('./node_modules/react-dom/dist/react-dom.min.js', { 'expose' : 'react-dom' })

        .require('./build/nnm-ui.js',                              { 'expose' : 'nnm-ui' })

//      .external('react')
//      .external('react-dom')
//      .external('d3')

        .bundle()
        .on('error', errorHandler)
        .pipe(source('nnm.es5.browserified.js'))
        .pipe(gulp.dest('./build'))
        .pipe(gulp.dest('./dist'));

});





gulp.task('less', ['setup'], () =>

  gulp.src('./src/less/nnm.less')
    .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ] }))
    .pipe(gulp.dest('./build/static'))
    .pipe(gulp.dest('./dist/static'))

);





gulp.task('uglify', ['setup', 'browserify'], () =>

  gulp.src('./build/nnm.es5.browserified.js')
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./build'))
    .pipe(gulp.dest('./dist'))

);





gulp.task('clone-static', ['setup'], () =>

    gulp.src(['src/assets/**/*'])
        .pipe(gulp.dest('./build/assets'))
        .pipe(gulp.dest('./dist/assets'))

);






gulp.task('doc', ['build'], () => {
/*
    return gulp.src(['./src/js'])
        .pipe(whicheverdoc({ destination: './doc' }));
*/
  console.log(colors.red('  todo: set up jsdoc'));
});





gulp.task('ava', ['build-fast'], () =>

//    gulp.src('./build/nnm_tests.js', {read: false})
//        .pipe(mocha({reporter: 'mocha-silent-reporter'}))

  console.log(colors.red('  todo: set up mocha or ava')) // whargarbl
);





gulp.task('eslint', () =>

    gulp.src(['./gulpfile.babel.js', './src/js/*.js'])
        .pipe(eslint(eslint_cfg))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())

);





gulp.task('setup',       ['clean', 'make-dirs', 'static-copy']);

gulp.task('build-fast',  ['setup', 'clone-static', 'es6-copy', 'html-copy', 'extlib-copy', 'browserify', 'less', 'eslint']);
gulp.task('build-slow',  ['build-fast', 'test', 'uglify']);
gulp.task('build-full',  ['build-slow', 'doc']);
gulp.task('test',        ['build-fast', 'ava', 'eslint']);

gulp.task('build',       ['build-slow']);
gulp.task('full',        ['build-full']);

gulp.task('default',     ['build']);





gulp.task('local', ['build-fast'], () => {

//  app.get('/', function(req, res) {
//    res.send('Hello World!');
//  });

  const port = 20210; // todo whargarbl

  app.use( (req,res,next) => {
    res.header('Access-Control-Allow-Origin',  '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  } );

  express.static.mime.default_type = "application/json";
  express.static.mime.define({'application/json': ['']});

  app.use(express.static(process.cwd() + '/dist/'));

  app.listen(port, function () {
      console.log(` - listening on port ${port}`);
  });

});

