###
cid:card[\d]
name
normalAvatar
select_list
charater_main
battleAvatar
atk
hp
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