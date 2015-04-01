do (parent = LLApi,Child = do (className = 'Chess')->
  myClass = ->
    @send = (_param,_cb)->
      @request 'get',_param,(_error,_data)->
        _cb _error,_data
      return @
    @saveChess = (_param,_cb)->
      param =
        fn:3002
        param:
          type:'save'
          uid  :_param.uid
          token:_param.token
        #约定
          chess :_param.chess
      @send param,_cb
      return this

    return this

  myClass.cn = className

  return myClass
)->
  Child.prototype = parent
  parent[Child.cn] = new Child