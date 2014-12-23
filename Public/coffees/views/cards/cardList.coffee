###
  global.myCards = {
    deck:[],
    all:[]
  }
###
CARD_NUM_MAX = 10
#set click event
_.on window, 'load', ->
  myDeck = _.query '.my-deck'
  allCard = _.query '.all-cards-list'

  do ->
    if global.myCards and global.myCards.deck and global.myCards.all
      indexPre = cardFactory.indexPre

      deckOneTmp = _.query '#deck-one-tmp'
      cardOneTmp = _.query '#card-one-tmp'

      currentNum = 0

      getCardObjByCache = do ->
        #store the different cardObject because of different cardId
        cardObjCache = []
        return (_cardIndex)->
          result = cardObjCache[_cardIndex]
          if !result
            result = cardFactory.getCardByCid _cardIndex
            if result
              cardObjCache[_cardIndex] = result
            else
              console.log 'can not find the cardObj by the Index'
          return result

      do ->
        deck = global.myCards.deck
        all = global.myCards.all

        currentNum  = deck.length
        #填充头部栏:当前的构成
        insertIntoMyDeckDiv = (_cardObj)->
          node = deckOneTmp.cloneNode true
          node.removeAttribute 'id'
          node.className = node.className.replace /hide/,''

          nodeBg = _.find node, '.bg'
          imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list
          _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'

          myDeck.appendChild node

        for cardIndex in deck
          cardObj = getCardObjByCache cardIndex
          if cardObj
            insertIntoMyDeckDiv cardObj
        #填充中间栏:拥有的所有卡牌
        insertIntoAllDiv = (_cardObj,_cardIndex)->
          node = cardOneTmp.cloneNode true
          node.removeAttribute 'id'
          node.className = node.className.replace /hide/,''

          nodeBg = _.find node, '.bg'
          imgUrl = cardFactory.cardAvatarPre + _cardObj.normalAvatar

          _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'
          node.setAttribute 'cardIndex',_cardIndex

          allCard.appendChild node

        for cardIndex in all
          cardObj = getCardObjByCache cardIndex
          if cardObj
            insertIntoAllDiv cardObj,cardIndex

        #增减卡组,上减下增
        deckList = myDeck.children
        for liOne in deckList
          do ->
            li = liOne
            _.on li,'click',(_e)->
              this.remove()
              currentNum--

        allCardsList = allCard.children
        for allOne in allCardsList
          do ->
            one = allOne
            _.on one,'click',(_e)->
              if currentNum < CARD_NUM_MAX

                cardIndex = this.getAttribute 'cardIndex'
                cardObj = getCardObjByCache cardIndex
                insertIntoMyDeckDiv cardObj

                currentNum++
