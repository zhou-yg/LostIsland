#ui init
do ->
  #store the different cardObject because of different cardId
  getObjByCache = do ->
    cardObjCache = {}
    heroObjCache = {}

    return (_cardIndex,_type)->
      cache = {}
      fn = ''
      if _type is 'card' or !_type
        cache = cardObjCache
        fn = 'getCardByCid'
      else if _type is 'hero'
        cache = heroObjCache
        fn = 'getHeroByHid'

      console.log _cardIndex
      result = cache[_cardIndex]
      if !result
        result = cardFactory[fn] _cardIndex
        if result
          cache[_cardIndex] = result
        else
          console.error 'can not find the cardObj by the Index'
      return result

  _.on window,'load',->
    selectedHeroWindow = _.query '.personal .hero'

    personalDeck = _.query '.personal-deck'
    personalDeckList = personalDeck.children

    for deckOne,i in userMsg.myDeckIds
      console.log deckOne,i
      do ->
        heroObj = getObjByCache deckOne.hero,'hero'
        liOne = personalDeckList[0]

        _.css liOne,'backgroundImage','url('+cardFactory.heroAvatarPre+heroObj.img+')'
        _.on liOne,'touchstart click',(e)->
          _.css selectedHeroWindow,'backgroundImage',_.css this,'backgroundImage'

#connect to battle server
do ->
  whileConnectSuccess = ->
    io.socket.post battleServerAd+'/UidInsert/sendUid',{
      uid:userMsg.uid
    },(_a)->
      console.log.apply console,arguments

  io.socket.on 'connect', ->
    console.log 'connect to battle server success'
    whileConnectSuccess()