module.exports = (_grunt)->
    _grunt.initConfig
      coffee:
        files:
          expand: true,
          cwd: 'precompile/coffees/',
          src: ['**/*.coffee'],
          dest: 'Public/js/',
          ext: '.js'

    _grunt.loadNpmTasks('grunt-contrib-coffee')

    _grunt.registerTask('default', ['coffee']);