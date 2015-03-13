class Chess
  send:(_param,_cb)->
    LLApi.request 'get',_param,(_error,_data)->
      _cb _error,_data

  saveChess:(_param,_cb)->
    tnamePre = 'deck'
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

LLApi.Chess = new Chess()