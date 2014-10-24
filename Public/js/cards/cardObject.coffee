iterateObj = (_obj,_arr)->
  if typeof _obj is 'object'
    properties = if _arr then _arr else []

    for own k,v of _obj
      if typeof v is 'object'
        iterateObj v,properties
      else
        properties.push v

    return properties
  else
    return 'NOT_OBJECT'

class cardObject
  constructor:(_config)->
    if _config
      @necessaryPropertiesObj =
        name:'name'
        avatar:
          normal: 'normalAvatar'
          combat: 'combatAvatar'
        atk:'atk'
        hp:'hp'

      @necessaryPropertiesArr = iterateObj @necessaryPropertiesObj

      @setConfig _config
    else
      throw 'no config argument'

  setConfig:(_config)->
    necessaryPropertiesArr = do @getConfigArr
    isRealConfig = true

    for v in necessaryPropertiesArr
      if _config[v] is null or _config[v] is undefined
        isRealConfig = false
        break
      else
        @[v] = _config[v];

    if !isRealConfig
      return 'HAS_NOT_PROPERTY'
    else
      return true

  fight:->
  attack:(_cardObj)->