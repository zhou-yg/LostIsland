###
cid:chess[\d]
name
img
level
###
class ChessObject
  constructor:(_config)->
    if _config
      @setConfig _config
    else
      throw 'no config argument'

  setConfig:(_config)->
    for k,v of _config
      @[k] = v;

  fight:(chessObj)->
    if @level is chessObj.level
      return 0

    specialArr = [1,100]
    result = @level < chessObj.level
    if @level in specialArr and chessObj.level in specialArr
      return if result then -1 else 1
    else
      return if result then 1 else -1

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

  check:(obj)->
    if !_.isArray(obj)
      obj = [obj]
    return obj.every (o)->
      return o instanceof ChessObject

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