class ChessFactory
  constructor:->
    @chessAvatarPre = chessImgPre
    @indexPre = 'chess'
    @chessMap = {}
    @chessNum = 0

    for k,v of chessConfigObjList
      c = new ChessObject(v)
      c.cid = k
      @chessMap[k] = c
      @chessNum++

  getChessByName:(_cname)->
    chessOne = null
    for k,v of @chessMap
      if v.name is _cname
        chessOne = v

    if chessOne
      return _.clone chessOne
    else
      return null

  getChessByCid:(_cid)->
    chessOne = null
    for k,v of @chessMap
      if k is _cid or k is (@indexPre+_cid)
        chessOne = v

    if chessOne
      return _.clone chessOne
    else
      return null

window.chessFactory = new ChessFactory()