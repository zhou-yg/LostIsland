class Util
  constructor:->

  isObject:(_obj)->
    type = typeof _obj
    return type is 'object' && !!obj;
  isArray:(_obj)->
    return toString.call(_obj) is '[object Array]';
  clone:(_obj)->
    if (!@isObject(_obj))
      return _obj;
    obj = {}
    for k,v of _obj
      obj[k] = v
    return obj

  on:(_dom,_type,_cb)->
    if _dom.addEventListener
      _dom.addEventListener _type,_cb
    else
      _dom['on'+_type] = _cb

  query:(_class) ->
    nodeList = document.querySelectorAll _class
    if nodeList.length is 1
      return nodeList[0]
    else
      return nodeList

  hide:(_dom) ->
    _dom.style.display = 'none'
  show:(_dom)->
    _dom.style.display = 'block'

window._ = new Util()