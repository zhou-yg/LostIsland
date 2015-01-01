###
hid:hero[\d]
name
img
###
class CardObject
  constructor:(_config)->
    if _config
      @setConfig _config
    else
      throw 'no config argument'

  setConfig:(_config)->
    for k,v of _config
      @[k] = v;

window.CardObject = CardObject;