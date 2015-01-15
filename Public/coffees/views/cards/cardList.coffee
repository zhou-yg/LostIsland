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
  allDecksDom = _.query '.all-decks'
  allCardDom = _.query '.all-cards-list'
  allHeroesDom = _.query '.all-heroes-list'

  allDecks = global.myCards.deck
  deck = allDecks[0].deck

  allCards  = global.myCards.allCard
  allHeroes = global.myCards.allHero

  allCards = allCards.concat()
  allHeroes = allHeroes.concat()

  do ->
    if global.myCards
      indexPre = cardFactory.indexPre

      deckOneTmp = _.query '#deck-one-tmp'
      cardOneTmp = _.query '#card-one-tmp'
      heroOneTmp = _.query '#hero-one-tmp'
      currentNum = 0

      #store the different cardObject because of different cardId
      getCardObjByCache = do ->
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

          result = cache[_cardIndex]
          if !result
            result = cardFactory[fn] _cardIndex
          if result
            cache[_cardIndex] = result
          else
            console.error 'can not find the cardObj by the Index'
          return result

      #btn to update
      btnToClick = do ->
        isWaitUpdate = false

        updateBtn = _.query '.list .hr'
        updateBtnDisplayClass = ' hr-to-btn'

        min = (_cid)->
          for v,i in deck
            if v is _cid
              deck.splice i,1
              break;

        add = (_cid)->
          for v,i in deck
            if v is _cid and deck[i+1] isnt _cid
              deck.splice i,0,_cid
              break;

        updateToServer = ->
          param =
            uid:global.user.userId
            sessionToken:global.user.sessionToken
            cards:JSON.stringify deck

          LLApi.CardList.saveDeck param,(_e,_d)->
            console.log 'save deck return',_d
            if typeof _d is 'string'
              _d = JSON.parse _d;
            if _d.result is 'true' or _d.result is true
              updateBtn.className = updateBtn.className.replace updateBtnDisplayClass,''
              isWaitUpdate = false

        return {
          changeDeckDelete : (_cid)->
            min _cid
            if isWaitUpdate
            else
              isWaitUpdate = true
              updateBtn.className = updateBtn.className + updateBtnDisplayClass

              _.on updateBtn,'click',->
                updateToServer()

          changeDeckAdd : (_cid)->
            add _cid
            if isWaitUpdate
            else
              isWaitUpdate = true
              updateBtn.className = updateBtn.className + updateBtnDisplayClass

              _.on updateBtn,'click',->
                updateToServer()
        }
      #fill
      do ->
        cardObjIndexName = 'cardIndex'

        #填充:当前的deck的构成
        displayCurrentDeck = ->
          myDeckDom.innerHTML = ''

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
        #填充:所有的decks
        displayAllDecks = ->
          allDecksDomChildren = allDecksDom.children

          setHero = (_heroObj,_i)->
            deckDom = allDecksDomChildren[_i]
            heroImg = cardFactory.heroAvatarPre + _heroObj.img
            _.css deckDom,'backgroundImage','url('+heroImg+')'

          for deckOne,i in allDecks
            heroObj = getCardObjByCache deckOne.hero,'hero'
            if heroObj
              setHero heroObj,i

        #填充:拥有的所有卡牌
        displayAllCards = ->
          insertIntoAllDiv = (_cardObj,_cardIndex)->
            node = cardOneTmp.cloneNode true
            node.removeAttribute 'id'
            node.className = node.className.replace /hide/,''

            nodeBg = _.find node, '.bg'
            imgUrl = cardFactory.cardAvatarPre + _cardObj.normalAvatar

            _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'
            node.setAttribute cardObjIndexName,_cardIndex

            allCardDom.appendChild node

          for cardIndex in allCards
            cardObj = getCardObjByCache cardIndex
            if cardObj
              insertIntoAllDiv cardObj,cardIndex

        #填充:拥有的所有hero
        displayAllHeroes = ->
          insertIntoAllHero = (_heroObj)->
            node  = heroOneTmp.cloneNode true
            node.removeAttribute 'id'
            node.className = node.className.replace /hide/,''

            avatar = _.find node,'.avatar'
            name  = _.find node,'.name'

            heroImg = cardFactory.heroAvatarPre + _heroObj.img

            _.css avatar,'background-Image','url('+heroImg+')'
            _.text name,_heroObj.name
            console.log node
            allHeroesDom.appendChild node

          for heroI in allHeroes
            heroObj = getCardObjByCache heroI,'hero'
            if heroObj
              insertIntoAllHero heroObj

        displayCurrentDeck()
        displayAllDecks()
        displayAllCards()
        displayAllHeroes()

        do ->
          #增减卡组,上减下增
          _.on myDeckDom,'click',(_e)->
            target = _e.target.parentElement
            if -1 is target.className.indexOf 'card-one'
              return false

            cid = target.getAttribute cardObjIndexName
            target.remove()

            btnToClick.changeDeckDelete(cid)

          allCardsList = allCardDom.children
          for allOne in allCardsList
            do ->
              one = allOne
              _.on one,'click',(_e)->
                if deck.length < CARD_NUM_MAX

                  cardIndex = this.getAttribute cardObjIndexName
                  btnToClick.changeDeckAdd cardIndex

                  displayCurrentDeck()

          _.on allDecksDom,'click',(_e)->