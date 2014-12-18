###
  global.myCards = {
    deck:[],
    all:[]
  }
###
console.log global.myCards

CARD_NUM_MAX = 10
currentNum = 0
#set click event
_.on window, 'load', ->
  myDeck = _.query '.my-deck'
  cardUl = _.query '.my-card-list'

  do ->
    if global.myCards and global.myCards.deck and global.myCards.all
      deck = global.myCards.deck
      all = global.myCards.all
      indexPre = cardFactory.indexPre
      deckOneTmp = _.query('#deck-one-tmp')
      #store the different cardObject because of different cardId
      deckCache = []

      checkCache = (_arr, _cardIndex)->
        result = null
        for ele in _arr
          if indexPre + _cardIndex is ele.cardId
            result = ele
            break
        if !result
          result = cardFactory.getCardByCid(_cardIndex)
          if result
            _arr.push result
          else
            console.log 'can not find the cardObj by the Index'
        return result

      #填充头部栏
      do ->
        insertIntoMyDeck = (_cardObj)->
          node = deckOneTmp.cloneNode(true)
          node.setAttribute('id', '')
          node.className = node.className.replace /hide/,''

          nodeBg = _.find node, '.bg'
          imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list
          _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'

          myDeck.appendChild node

        for cardId in deck
          cardObj = checkCache deckCache, cardId
          if cardObj
            insertIntoMyDeck(cardObj)

      #填充中间栏
      do ->
