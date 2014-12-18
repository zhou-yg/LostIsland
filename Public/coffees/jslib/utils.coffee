class Util
  constructor: ->
    #-------------dom-----------
    #获取dom元素
  query: (_selector,_paraent) ->
    parent = _paraent||document
    if _selector[0] is '#'
      _selector = _selector.substring 1,_selector.length
      nodeList = parent.getElementById _selector
    else
      nodeList = parent.querySelectorAll _selector

    if nodeList.length and nodeList.length is 1
      return nodeList[0]
    else
      return nodeList
  find: (_parent,_selector)->
    if _parent instanceof HTMLElement
      node = @query _selector,_parent
      return node
    return _parent

  css: (_dom, _styleName, _value)->
    if _value and typeof _styleName is 'string'
      _dom.style[_styleName] = _value

    else if @.isObject _styleName
      for k,v of _styleName
        _dom.style[k] = v

  cssTrans:(_propertyName)->
    if typeof _propertyName is 'string'
      nameArr = _propertyName.split '-'
      len = nameArr.length
      if len isnt 1
        for i in [1..len-1]
          nameArr[i] = nameArr[i].replace /[\W\w]/,(_s)->
            return _s.toUpperCase()

        _propertyName = nameArr.join('')
    return _propertyName

  addClass:(_dom,_className)->
  removeCLass:(_dom,_className)->

  on: (_dom, _type, _cb)->
    typeArr = _type.split(' ');
    if _dom.addEventListener
      for typeOne in typeArr
        _dom.addEventListener typeOne, _cb
    else
      for typeOne in typeArr
        _dom['on' + typeOne] = _cb

  hide: (_dom) ->
    _dom.style.display = 'none'
  show: (_dom)->
    _dom.style.display = 'block'

  #-------------obj-----------
  isObject: (_obj)->
    return typeof _obj is 'object' && !!_obj;
  isArray: (_obj)->
    return toString.call(_obj) is '[object Array]';
  clone: (_obj)->
    if (!@isObject(_obj))
      return _obj;
    obj = {}
    for k,v of _obj
      obj[k] = v
    return obj
  iterateObj: (_obj, _arr)->
    if @isObject _obj
      properties = if _arr then _arr else []

      for own k,v of _obj
        if @isObject _obj
          @iterateObj v, properties
        else
          properties.push v

      return properties
    else
      return false
  #----------------string------------
  #回调的参数组成,值,下标,整个
  each: (_str, _cb)->
    for v,i in _str
      _cb(v,i,, _str)

window._ = new Util()