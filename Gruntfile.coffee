module.exports = (_grunt)->
    _grunt.initConfig
      coffee:
        filesOne:
          expand: true,
          cwd: 'Public/coffees/',
          src: ['**/*.coffee'],
          dest: 'Public/js/',
          ext: '.js'

    _grunt.loadNpmTasks('grunt-contrib-coffee')

    _grunt.registerTask('default', ['coffee']);