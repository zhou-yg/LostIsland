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
_.on window,'load',->
  myDeck = _.query '.my-deck'
  cardUl = _.query '.my-card-list'

  actionOn = ->
    deckList    = myDeck.children
    cardImgList = cardUl.children

    for cardImg in cardImgList
      do ->
        type = if envObj.devEnv then 'touch' else 'click'
        #click to add  into or remove from deck-list
        #post add

        #post delete

        #remove a card
        liDisplay = (_decLi,_li)->
          _.on _decLi,type,(_e)->
            _e.target.remove()
            _.show _li
        #push a card
        _.on cardImg,type,(_e)->
          li = _e.target
          deckLi = li.cloneNode()

          if myDeck.children.length < 10
            _.hide li
            myDeck.appendChild deckLi

            liDisplay deckLi,li
        #add animation effect
        _.on cardImg,type,(_e)->

  do ->
    if global.myCards and global.myCards.deck and global.myCards.all
      deck = global.myCards.deck
      all  = global.myCards.all
      #store the different cardObject because of different cardId
      deckCache = []

      checkCache = (_arr,_ele)->
        result = -1
        for ele,i in _arr
          if _ele is ele
            result = i
            break
        return result

      insertIntoMyDeck = (_cardObj)->



      for cardId in deck
        cardObj = checkCache deckCache,cardId
        if cardObj
          insertIntoMyDeck(cardObj)

