var gulp = require('gulp');
var replace = require('gulp-replace');
var deploy = require('usc-deploy');

var config = require('./userconfig.ignore');

gulp.task('parm', function() { 
   console.log('parm');
   return gulp.src('parm/*')
      .pipe(replace(/^[\s\S]*?\r?\n/mg, function(string) {
            string = string.replace(/ *\r?\n/, '');
            var l = string.length
            var out = '';
            
            if (l > 80) {
               out = string.substr(0,80);
            } else {
               out = string + new Array(81 - l).join(' '); // + '\n';
            }
            return out;
         })
      )
      .pipe(gulp.dest('out'));
});

gulp.task('deploy', ['parm'], function() {
   deploy({parm_path: {local: './out/'}, parm_extension: '', connect: {password: config.password}}).push_parm();
});

gulp.task('default', ['parm'], function() { console.log('end'); });
