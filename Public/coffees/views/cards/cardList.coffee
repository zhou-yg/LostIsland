###
  global.myCards = {
    deck:[],
    all:[]
  }
###
CARD_NUM_MAX = 10
#set click event
_.on window, 'load', ->
  myDeckDom = _.query '.my-deck'
  allCardDom = _.query '.all-cards-list'

  deck = global.myCards.deck
  all = global.myCards.all
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

      #btn to update
      btnToClick = do ->
        isWaitUpdate = false

        updateBtn = _.query '.list .hr'

        min = (_cid)->
          for v,i in deck
            if v is _cid
              deck.splice i,1
              break;
          console.log deck

        add = (_cid)->
          for v,i in deck
            if v is _cid and deck[i+1] isnt _cid
              deck.splice i,0,_cid
              break;
          console.log deck

        updateToServer = ->
          param =
            uid:global.user.userId
            sessionToken:global.user.sessionToken

        return {
          changeDeckDelete : (_cid)->
            min _cid
            if isWaitUpdate
            else
              isWaitUpdate = true
              updateBtn.className = updateBtn.className + ' hr-to-btn'

              _.on updateBtn,'click',->
                updateToServer()

          changeDeckAdd : (_cid)->
            add _cid
            if isWaitUpdate
            else
              isWaitUpdate = true
              updateBtn.className = updateBtn.className + ' hr-to-btn'

              _.on updateBtn,'click',->
                updateToServer()
        }
      #fill
      do ->
        deckIndexName = 'i';
        cardObjIndexName = 'cardIndex'
        #填充头部栏:当前的构成
        insertIntoMyDeckDiv = (_cardObj)->
          node = deckOneTmp.cloneNode true
          node.removeAttribute 'id'
          node.setAttribute cardObjIndexName,_cardObj.cid
          node.className = node.className.replace /hide/,''

          nodeBg = _.find node, '.bg'
          imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list
          _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'

          myDeckDom.appendChild node

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
          node.setAttribute cardObjIndexName,_cardIndex

          allCardDom.appendChild node

        for cardIndex in all
          cardObj = getCardObjByCache cardIndex
          if cardObj
            insertIntoAllDiv cardObj,cardIndex

        #增减卡组,上减下增
        deckList = myDeckDom.children
        for liOne in deckList
          do ->
            li = liOne
            _.on li,'click',(_e)->
              cid = this.getAttribute cardObjIndexName
              this.remove()

              btnToClick.changeDeckDelete(cid)

        allCardsList = allCardDom.children
        for allOne in allCardsList
          do ->
            one = allOne
            _.on one,'click',(_e)->
              if deck.length < CARD_NUM_MAX

                cardIndex = this.getAttribute cardObjIndexName

                cardObj = getCardObjByCache cardIndex
                insertIntoMyDeckDiv cardObj

                btnToClick.changeDeckAdd cardIndex