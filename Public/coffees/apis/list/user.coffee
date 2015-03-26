do (parent = LLApi, Child = do (className = 'User' )->
  myClass = ->
    @send = (_param,_cb)->
      @request 'get',_param,(_error,_data)->
        _cb _error,_data
      return @
    @getBasic = (_param,_cb)->
      param =
        fn:1003
        param:
          uid:_param.uid
      param.uid = _param.uid

      @send param,_cb
      return this

    return this

  myClass.cn = className

  return myClass
)->
  Child.prototype = parent
  parent[Child.cn] = new Child