###
  global.myCards = {
    deck:[],
    all:[]
  }
###
CARD_NUM_MAX = 10
#set click event
_.on window, 'load', ->
  myDeckDom = _.q '.my-deck'
  allDecksDom = _.q '.all-decks'
  allCardDom = _.q '.all-cards-list'
  allHeroesDom = _.q '.all-heroes-list'

  allDecks = global.myCards.deck
  window.curDeck = allDecks[0]

  allCards  = global.myCards.allCard
  allHeroes = global.myCards.allHero

  allCards = allCards.concat()
  allHeroes = allHeroes.concat()

  do ->
    if global.myCards
      indexPre = cardFactory.indexPre

      deckOneTmp = _.q '#deck-one-tmp'
      cardOneTmp = _.q '#card-one-tmp'
      heroOneTmp = _.q '#hero-one-tmp'
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

        updateBtn = _.q '.list .hr'
        updateBtnDisplayClass = ' hr-to-btn'

        min = (_cid)->
          for v,i in curDeck.deck
            if v is _cid
              curDeck.deck.splice i,1
              break;

        add = (_cid)->
          for v,i in curDeck.deck
            if v is _cid and curDeck.deck[i+1] isnt _cid
              curDeck.deck.splice i,0,_cid
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
        cardDomIndexName = 'cardIndex'
        heroDomIndexName = 'heroIndex'

        decksStateCache =  do ->
          deckSpotAttr = 'spot'
          deckSpotNames = ['a','b','c','d']

          deckSpotMap = {}
          domSpotMap = {}

          children = allDecksDom.children
          for deckP,i in children
            s = deckSpotNames[i]
            deckP.setAttribute deckSpotAttr,s
            domSpotMap[s] = deckP

          set = ->
            for deckOne,i in allDecks
              deckSpotMap[deckSpotNames[i]] = deckOne
          set()
          return {
            #如果传入了插槽值，返回对应的
            deckBySpot:(_deckSpot)->
                return deckSpotMap[_deckSpot]
            #如果没有参数，则返回最近最空的插槽
            undefSpot:->
              curSpots = []
              for s in deckSpotMap
                curSpots.push s
              for spot in deckSpotNames
                if !(spot in curSpots)
                  return domSpotMap[spot]
            refresh:->
              set()
          }
        #填充:当前的deck的构成
        displayCurrentDeck = ->
          myDeckDom.innerHTML = ''

          insertIntoMyDeckDiv = (_cardObj)->
            node = deckOneTmp.cloneNode true
            node.removeAttribute 'id'
            node.setAttribute cardDomIndexName,_cardObj.cid
            node.className = node.className.replace /hide/,''

            nodeBg = _.find node, '.bg'
            imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list
            _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'

            myDeckDom.appendChild node

          for cardIndex in curDeck.deck
            cardObj = getCardObjByCache cardIndex
            if cardObj
              insertIntoMyDeckDiv cardObj
        #填充:所有的decks,添加一个
        displayAllDecks = ->
          allDecksDomChildren = allDecksDom.children

          setHero = (_heroObj,_i)->
            deckDom = decksStateCache.undefSpot()
            heroImg = cardFactory.heroAvatarPre + _heroObj.img
            _.css deckDom,'backgroundImage','url('+heroImg+')'

          for deckOne,i in allDecks
            heroObj = getCardObjByCache deckOne.hero,'hero'
            if heroObj
              setHero heroObj

        #填充:拥有的所有卡牌
        displayAllCards = ->
          insertIntoAllDiv = (_cardObj,_cardIndex)->
            node = cardOneTmp.cloneNode true
            node.removeAttribute 'id'
            node.className = node.className.replace /hide/,''

            nodeBg = _.find node, '.bg'
            imgUrl = cardFactory.cardAvatarPre + _cardObj.normalAvatar

            _.css nodeBg, 'backgroundImage', 'url(' + imgUrl + ')'
            node.setAttribute cardDomIndexName,_cardIndex

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
            node.setAttribute heroDomIndexName,_heroObj.hid
            node.className = node.className.replace /hide/,''

            avatar = _.find node,'.avatar'
            name  = _.find node,'.name'

            heroImg = cardFactory.heroAvatarPre + _heroObj.img

            _.css avatar,'background-Image','url('+heroImg+')'
            _.text name,_heroObj.name
            
            allHeroesDom.appendChild node

          for heroI in allHeroes
            heroObj = getCardObjByCache heroI,'hero'
            if heroObj
              insertIntoAllHero heroObj

        buildNewDeck = do ->
          BUILDER_BEF = 'before'
          ON_BUILDING = 'onBuilding'
          BUILDER_END = 'end'

          buildState = null
          isSet = false

          allHeroesBg = _.q '.all-heroes-bg'
          allHeroUl = _.q '.all-heroes-list'

          resetDeck = (_heroIndex)->
            window.curDeck =
              hero:_heroIndex
              deck:[]

          show = ->
            _.show allHeroesBg,allHeroUl
            if !isSet
              _.on allHeroesBg,'click',(_e)->
                hide()
              _.on allHeroUl,'click',(_e)->
                tar = _e.target.parentNode
                if tar.nodeName is 'LI'
                  heroIndex = tar.getAttribute heroDomIndexName
                  resetDeck(heroIndex)

                  buildState = ON_BUILDING
                  hide()

          hide = ->
            _.hide allHeroesBg,allHeroUl

          return {
            build:(_tar)->
              console.log 'start build new'
              buildState = BUILDER_BEF

              show()
            end:->

          }

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

            cid = target.getAttribute cardDomIndexName
            target.remove()

            btnToClick.changeDeckDelete(cid)

          _.on allCardDom,'click',(_e)->
            tar = _e.target.parentNode
            if tar.nodeName is 'LI' and curDeck.deck.length < CARD_NUM_MAX
                cardIndex = tar.getAttribute cardDomIndexName
                btnToClick.changeDeckAdd cardIndex

                displayCurrentDeck()

          _.on allDecksDom,'click',(_e)->
            tar = _e.target
            spot = tar.getAttribute 'spot'
            if !spot
              return

            clickedDeck = decksStateCache.deckBySpot spot
            #已经存在?则展示:构建
            if clickedDeck
              curDeck.deck = clickedDeck
              displayAllCards()
            else
              buildNewDeck.build(tar)