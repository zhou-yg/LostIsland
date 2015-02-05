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
  allDecks = allDecks.filter (el,_i)->
    return _i<=3

  curDeck = allDecks[0]
  curDeck.cur = true


  allCards  = global.myCards.allCard
  allHeroes = global.myCards.allHero

  allCards = allCards.concat()
  allHeroes = allHeroes.concat()

  do ->
    if global.myCards
      DECKS_ADD_STATE = 1
      DECKS_DELETE_STATE = 2

      indexPre = cardFactory.indexPre

      deckOneTmp = _.q '#deck-one-tmp'
      cardOneTmp = _.q '#card-one-tmp'
      heroOneTmp = _.q '#hero-one-tmp'
      currentNum = 0

      #记录当前的decks栏的状态
      #添加 或 删除
      decksEditState = DECKS_ADD_STATE

      #store the different cardObject because of different cardId
      getCardObjByCache = do ->
        cardObjCache = {}
        heroObjCache = {}

        return (_cardIndex,_type)->
          cache = {}
          fn = ''

          if !_cardIndex
            return null

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
        #---------------------decksStateCache---------------------
      decksStateCache =  do ->
        deckSpotAttr = 'spot'
        deckSpotNames = ['a','b','c','d']

        deckSpotDomMap = {}
        domSpotMap = {}

        children = allDecksDom.children
        for deckPositionDom,i in children
          s = deckSpotNames[i]
          deckPositionDom.setAttribute deckSpotAttr,s
          domSpotMap[s] = deckPositionDom

        set = ->
          for spotName,i in deckSpotNames
            deckOne = allDecks[i]
            if deckOne
              deckOne.spot = spotName
            deckSpotDomMap[spotName] = deckOne
        set()
        return {
        #返回对应的dom
        deckBySpot:(_deckSpot)->
          return deckSpotDomMap[_deckSpot]
        #则返回最近最空的插槽
        undefSpot:->
          curSpots = []
          for s of deckSpotDomMap
            curSpots.push s
          for spot in deckSpotNames
            if !(spot in curSpots)
              return domSpotMap[spot]
        refresh:->
          set()
        }
      #---------------------pressToDelete---------------------
      pressToDelete = do ->
        isShake = false
        spots = allDecksDom.children
        decksHammer = new Hammer(allDecksDom)

        decksHammer.on 'press',(_ev)->
          console.log 'press on decksDom'
          if !isShake
            isShake = true
            decksEditState = DECKS_DELETE_STATE
            _.addClass spots,'deck-one-shake'

        #点击其他地方，取消抖动
        _.on window,'mousedown',(e)->
          if isShake
            isShake = false
            decksEditState = DECKS_ADD_STATE
          _.removeClass spots,'deck-one-shake'

      ###########################################################
      #fill
      do ->
        cardDomIndexName = 'cardIndex'
        heroDomIndexName = 'heroIndex'
        #btn to update
        #---------------------btnToClick---------------------
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
                return;
            curDeck.deck.push _cid

          waitToUpdate = ->
            if isWaitUpdate
            else
              isWaitUpdate = true
              updateBtn.className = updateBtn.className + updateBtnDisplayClass

          afterUpdate = ->
            if isWaitUpdate
              isWaitUpdate = false
              deckBuilder.buildEnd()
              updateBtn.className = updateBtn.className.replace updateBtnDisplayClass,''

          updateToServer = ->
            param =
              uid:global.user.userId
              token:global.user.sessionToken
              deck:
                hero:curDeck.hero
                deck:curDeck.deck
              spot:curDeck.spot

            console.log param
            LLApi.CardList.saveCards param,(_e,_d)->
              console.log 'save deck return',_d
              if typeof _d is 'string'
                _d = JSON.parse _d;
              if _d.result is 'true' or _d.result is true
                afterUpdate()

          _.on updateBtn,'click',->
            updateToServer()

          return {
          deleteCard : (_cid)->
            min _cid
            waitToUpdate();
          addToCard : (_cid)->
            add _cid
            waitToUpdate();
          addToDeck:(_deck)->

          }
        #---------------------deckBuilder---------------------
        deckBuilder = do ->
          BUILDER_BEF = 'before'
          ON_BUILDING = 'onBuilding'
          BUILDER_END = 'end'

          buildState = BUILDER_END
          isSet = false

          allHeroesBg = _.q '.all-heroes-bg'
          allHeroUl = _.q '.all-heroes-list'

          resetDeck = (_heroIndex)->
            curDeck.cur = false
            curDeck =
              hero:_heroIndex
              deck:[]
              cur:true
            allDecks.push curDeck

            decksStateCache.refresh()
            displayCurrentDeck()
            displayAllDecks()

          removeInDecks = (_deck)->
            for deck,i in allDecks
              if deck is _deck
                allDecks.splice i,1
                if allDecks[i]
                  curDeck = allDecks[i]
                  curDeck.cur = true
                else if allDecks[i-1]
                  curDeck = allDecks[i-1]
                  curDeck.cur = true
                else
                  curDeck = null

                console.log allDecks
                break;


          deleteUpdateToServer = (_spot)->
            param =
              uid:global.user.userId
              token:global.user.sessionToken
              spot:_spot

            console.log param
            LLApi.CardList.deleteDeck param,(_e,_d)->
              if typeof _d is 'string'
                _d = JSON.parse _d;
              if _d.result is 'true' or _d.result is true
                console.log _d


          showHeroSelect = ->
            _.show allHeroesBg,allHeroUl
            if !isSet
              isSet = true
              _.on allHeroesBg,'click',(_e)->
                hideHeroSelect()
              _.on allHeroUl,'click',(_e)->
                tar = _e.target.parentNode

                if tar.nodeName is 'LI'
                  heroIndex = tar.getAttribute heroDomIndexName
                  resetDeck(heroIndex)

                  buildState = ON_BUILDING
                  hideHeroSelect()

          hideHeroSelect = ->
            _.hide allHeroesBg,allHeroUl

          return {
            build:(_tar)->
              if buildState is BUILDER_END
                console.log 'start build new'
                buildState = BUILDER_BEF
                showHeroSelect()
              else
                console.log 'to be building'
            buildEnd:()->
              buildState = BUILDER_END
            remove:(_target)->
              spot = _target.getAttribute 'spot'
              deck = decksStateCache.deckBySpot spot
              #从所有中移除
              removeInDecks deck
              decksStateCache.refresh()
              #从数据库清除
              deleteUpdateToServer spot
              #render
              displayCurrentDeck()
              displayAllDecks()
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

          if curDeck
            for cardIndex in curDeck.deck
              cardObj = getCardObjByCache cardIndex
              if cardObj
                insertIntoMyDeckDiv cardObj
        #填充:所有的deck
        displayAllDecks = ->
          deckSpots = allDecksDom.children
          deckCurStyle = 'deck-one-cur'

          clearSpot = (_deckDom)->
            _.css _deckDom,'backgroundImage',''
            _.removeClass _deckDom,deckCurStyle

          setHero = (_deckDom,_heroObj,_isCur)->
            if _isCur
              _.addClass _deckDom,deckCurStyle
            else
              _.removeClass _deckDom,deckCurStyle

            heroImg = cardFactory.heroAvatarPre + _heroObj.img
            _.css _deckDom,'backgroundImage','url('+heroImg+')'

          for deckDom,i in deckSpots
            deckOne = allDecks[i] || {}
            heroObj = getCardObjByCache deckOne.hero,'hero'
            if heroObj
              setHero deckDom,heroObj,deckOne.cur
            else
              clearSpot deckDom

        #填充:拥有的all cards
        displayAllCards = ->
          allCardDom.innerHTML = ''
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

        displayCurrentDeck()
        displayAllDecks()
        displayAllCards()
        displayAllHeroes()

        do ->
          #点,上减下增
          _.on myDeckDom,'click',(_e)->
            target = _e.target.parentElement
            if -1 is target.className.indexOf 'card-one'
              return false

            cid = target.getAttribute cardDomIndexName
            target.remove()

            btnToClick.deleteCard(cid)

          _.on allCardDom,'click',(_e)->
            tar = _e.target.parentNode
            if tar.nodeName is 'LI' and curDeck.deck.length < CARD_NUM_MAX
                cardIndex = tar.getAttribute cardDomIndexName
                btnToClick.addToCard cardIndex

                displayCurrentDeck()

          _.on allDecksDom,'mousedown',(_e)->
            target = _e.target
            spot = target.getAttribute 'spot'
            if !spot
              return

            #当前状态
            #已经存在?展示:构建
            if decksEditState is DECKS_ADD_STATE
              clickedDeck = decksStateCache.deckBySpot spot
              if clickedDeck
                curDeck.cur = false;
                clickedDeck.cur = true
                curDeck = clickedDeck

                displayCurrentDeck()
                displayAllDecks()
              else
                deckBuilder.build target
            else if decksEditState is DECKS_DELETE_STATE
              deckBuilder.remove target
            return