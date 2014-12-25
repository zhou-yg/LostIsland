class CardList
  cardConfigFactory:(_cb)->
    address =  'apis/cards/card_config_factory/getList'
    LLApi.setAddress address

    LLApi.request 'get',null,(_e,_d)->
      _cb _e,_d

  saveDeck:(_param,_cb)->
    address =  'apis/user/user_cards/save_deck'
    LLApi.setAddress address

    LLApi.request 'post',_param,(_e,_d)->
      _cb _e,_d



LLApi.CardList = new CardList()