class CardFactory
  constructor:->
    @cardAvatarPre = cardAvatarPre
    @heroAvatarPre = heroAvatarPre
    @indexPre = 'card'
    @cardMap = {}
    @cardNum = 0
    @heroIndexPre = 'hero'
    @heroMap = {}
    @heroNum = 0

    for k,v of cardConfigObjList
      c = new CardObject(v)
      c.cid = k
      @cardMap[k] = c
      @cardNum++

    for k,v of heroConfigObjList
      h = new CardObject(v)
      h.hid = k
      @heroMap[k] = h
      @heroNum++

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

  getHeroByHid:(_hid)->
    heroOne = null
    for k,v of @heroMap
      if k is _hid or k is (@heroIndexPre+_hid)
        heroOne = v

    if heroOne
      return _.clone heroOne
    else
      return null


window.cardFactory = new CardFactory()