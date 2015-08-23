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
          dest: 'public_html/css',
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
          'public_html/js/main.js': 'coffee/main.coffee'
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
        tasks: ['coffee']
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

  // Default task(s).
  grunt.registerTask('default', ['sass', 'coffee', 'watch']);
};