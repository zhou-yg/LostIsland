do (parent = LLApi,Child = do (className = 'Battle')->
  myClass = ->
    @send = (_param,_cb)->
      @setPort(1337)
      @setAddress('test/test')
      @request 'get',_param,(_error,_data)->
        _cb _error,_data
      return @
    @test = (_param,_cb)->
      param = {

      }
      @send param,_cb
      return this

    return this

  myClass.cn = className

  return myClass
)->
  Child.prototype = parent
  parent[Child.cn] = new Child