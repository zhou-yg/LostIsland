class Player
  constructor:()->
    @characterWindow = _.query '.character .character_general_window'
    @deckList = _.query '.character_army .character_army_one'

  init:(_userMsg)->
    @token = _userMsg.sessionToken
    delete _userMsg.sessionToken

    @userMsg = _userMsg

    @display()

  display:->
    that = this
    #nickname 暂无
    #characImg
    _.css @characterWindow,'backgroundImage','url('+@userMsg.characterImg+')'

    _.each @deckList,(_i,_liOne)->
      cardObj = cardFactory.getCardByCid that.userMsg.myDeckIds[_i]
      _.css _liOne,'backgroundImage','url('+cardObj.cardAvatarPre+cardObj.charater_main+')'


window.Player = new Player();