do (parent = LLApi, Child = do (className = 'Encry' )->
  myClass = ->
    @send = (_param,_cb)->
      @request 'get',_param,(_error,_data)->
        _cb _error,_data
      return @
    @getToken = (_param,_cb)->
      param =
        fn:1000
        param:
          type:'create'

      @send param,_cb
      return this

    return this

  myClass.cn = className

  return myClass
)->
  Child.prototype = parent
  parent[Child.cn] = new Child