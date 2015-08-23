module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Sass to CSS
    sass: {
      app: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'public_html/dist/css',
          ext: '.css'
        }]
      },
      options: {
        sourceMap: true,
        outputStyle: 'nested',
        imagePath: "../public_html/images",
      }
    },

    coffee: {
      compile: {
        files: {
          'public_html/dist/js/main.js': 'coffee/main.coffee'
        }
      }
    },   

    // Concat
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: ['bower_components/jquery/dist/jquery.min.js'],
        dest: 'public_html/dist/js/libs.js'
      }
    },

    // Uglify
    uglify: {
      dist: {
        files: {
          'public_html/dist/js/main.min.js': 'public_html/dist/js/main.js',
          'public_html/dist/js/libs.min.js': 'public_html/dist/js/libs.js'
        }
      }
    },
  
    watch: {
      sass: {
        files: ['scss/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
      coffee: {
        files: ['coffee/*.coffee'],
        tasks: ['coffee', 'uglify']
      },
      options: {
        livereload: true,
        spawn: false
      }
    },
  });


  // Loads Grunt Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'coffee', 'concat', 'uglify', 'watch']);
};