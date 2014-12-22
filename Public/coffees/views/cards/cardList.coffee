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
  allCard = _.query '.all-cards-list'

  do ->
    if global.myCards and global.myCards.deck and global.myCards.all
      deck = global.myCards.deck
      all = global.myCards.all
      indexPre = cardFactory.indexPre
      deckOneTmp = _.query '#deck-one-tmp'
      cardOneTmp = _.query '#card-one-tmp'
      #store the different cardObject because of different cardId
      cardObjCache = []

      checkCache = (_arr, _cardIndex)->
        result = null
        for ele in _arr
          if indexPre + _cardIndex is ele.cardId
            result = ele
            break
        if !result
          result = cardFactory.getCardByCid _cardIndex
          if result
            _arr.push result
          else
            console.log 'can not find the cardObj by the Index'
        return result

      #填充头部栏
      do ->
        insertIntoMyDeckDiv = (_cardObj)->
          node = deckOneTmp.cloneNode true
          node.removeAttribute 'id'
          node.className = node.className.replace /hide/,''

          nodeBg = _.find node, '.bg'
          imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list
          _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'

          myDeck.appendChild node

        for cardId in deck
          cardObj = checkCache cardObjCache, cardId
          if cardObj
            insertIntoMyDeckDiv cardObj

      #填充中间栏
      do ->
        insertIntoAllDiv = (_cardObj)->
          node = cardOneTmp.cloneNode true
          node.removeAttribute 'id'
          node.className = node.className.replace /hide/,''

          nodeBg = _.find node, '.bg'
          imgUrl = cardFactory.cardAvatarPre + _cardObj.normalAvatar
          _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'

          allCard.appendChild node

        for cardId in all
          cardObj = checkCache cardObjCache,cardId
          if cardObj
            insertIntoAllDiv cardObj

      #增减卡组,上减下增
      do ->
        deckList = myDeck.children
        console.log deckList

        for liOne in deckList
          do ->
            li = liOne
            _.on li,'click',(_e)->
              this.remove()