do (parent = LLApi, Child = do (className = 'Ranking' )->
  myClass = ->
    @send = (_param,_cb)->
      @request 'get',_param,(_error,_data)->
        _cb _error,_data
      return this

    @rankingByScores = (_param,_cb)->
      param =
        fn:5001
        param:
          type:_param.type

      @send param,_cb
      return this

    return this
  myClass.cn = className
  return myClass
)->
  Child.prototype = parent
  parent[Child.cn] = new Child