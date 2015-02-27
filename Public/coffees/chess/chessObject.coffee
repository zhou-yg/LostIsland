###
cid:chess[\d]
name
img
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

window.ChessObject = ChessObject;