var os = require('os'); os.tmpDir = os.tmpdir;

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dev: {
        options: {
          config: 'config.rb'
        }//options
      }//dev
    },//compass    
    watch: {
      sass: {
        files: ['src/scss/*.scss'],
        tasks: ['compass:dev', 'scsslint']
      }//sass
    },//watch
    scsslint: {
      allFiles: [
        'src/scss/*.scss'
      ],
      options: {
        bundleExec: false,
        force: true
      }
    }//scsslint
  });//initConfig
  grunt.registerTask('default', ['watch', 'scsslint']);
};//exports
