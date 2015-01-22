class CardList
  send:(_param,_cb)->
    LLApi.request 'get',_param,(_error,_data)->
      _cb _error,_data

  saveCards:(_param,_cb)->
    tnamePre = 'deck'
    param =
      fn:2002
      param:
        uid  :_param.uid
        token:_param.token
        data :_param.deck
        #约定
        name:tnamePre + _param.spot
        type:'save_deck'
    @send param,_cb
    return this

  deleteDeck:(_param,_cb)->
    tnamePre = 'deck'
    param =
      fn:2002
      param:
        uid  :_param.uid
        token:_param.token
        data :'null'
        #约定
        name:tnamePre+_param.spot
        type:'save_deck'
    @send param,_cb
    return this

LLApi.CardList = new CardList()