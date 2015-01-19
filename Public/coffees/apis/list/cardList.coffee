class CardList
  cardConfigFactory:(_cb)->
    address =  'apis/cards/card_config_factory/getList'
    LLApi.setAddress address

    LLApi.request 'get',null,(_e,_d)->
      _cb _e,_d

  saveDeck:(_param,_cb)->
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

    LLApi.request 'get',param,(_error,_data)->
      _cb _error,_data


LLApi.CardList = new CardList()