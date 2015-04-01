do (parent = LLApi,Child = do (className = 'Battle')->
  myClass = ->
    @send = (_param,_cb)->
      @setPort(1337)
      @request 'get',_param,(_error,_data)->
        _cb _error,_data
      return @
    @match = (_param,_cb)->
      param = {}
      param.uid = _param.uid

      @setAddress('player/match')
      @send param,_cb
      return this

    @display = (_param,_cb)->
      param = {
      }
      @setAddress('test/display')
      @send param,_cb
      return this

    return this

  myClass.cn = className

  return myClass
)->
  Child.prototype = parent
  parent[Child.cn] = new Child