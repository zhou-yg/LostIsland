do (parent = LLApi,Child = do (className = 'Battle')->
  myClass = ->
    @send = (_param,cb)->
      @setPort(1337)
      @request 'get',_param,(_error,_data)->
        cb _error,_data
      return @
    @match = (_param,cb)->
      param = {}
      param.uid = _param.uid

      @setAddress('player/match')
      @send param,cb
      return this

    @fight = (_param,cb)->
      param = {}
      param.uid = _param.uid
      param.chessI = _param.chessI

      @setAddress('battle/fight')
      @send param,cb
      return this

    @giveUp = (_param,cb)->
      param = {}
      param.uid = _param.uid
      @setAddress('battle/giveUp')
      @send param,cb
      return this
      
    @display = (_param,cb)->
      param = {
      }
      @setAddress('test/display')
      @send param,cb
      return this

    return this

  myClass.cn = className

  return myClass
)->
  Child.prototype = parent
  parent[Child.cn] = new Child