class CardFactory
  constructor:(_configObjList)->
    @indexPre = 'card'
    @cardMap = {}
    @cardNum = 0;

    for k,v of cardConfigObjList
      c = new CardObject(v)
      @cardMap[k] = c
      @cardNum++

  getCardByName:(_cname)->
    cardOne = null
    for k,v of @cardMap
      if v.name is _cname
        cardOne = v

    if cardOne
      return _.clone cardOne
    else
      return null

  getCardByCid:(_cid)->
    cardOne = null
    for k,v of @cardMap
      if k is _cid or k is (@indexPre+_cid)
        cardOne = v

    if cardOne
      return _.clone cardOne
    else
      return null

window.cardFactory = new CardFactory(cardConfigObjList)