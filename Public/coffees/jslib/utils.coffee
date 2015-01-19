class Util
  constructor: ->
    @curDom = null
    #-------------dom-----------
    #获取dom元素
  q: (_selector,_paraent) ->
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
      node = @q _selector,_parent
      return node
    return _parent

  css: (_dom, _styleName, _value)->
    transStr = /-([\w])/

    _styleName = _styleName.replace transStr,(_all,_second)->
      return _second.toUpperCase()

    if _value is undefined
      return _dom.style[_styleName]

    else if _value and typeof _styleName is 'string'
      _dom.style[_styleName] = _value

    else if @.isObject _styleName
      for k,v of _styleName
        _dom.style[k] = v

  addClass:(_dom,_className)->
    domClass = _dom.className
    if -1 is domClass.indexOf _className
      _dom.className += ' ' + _className
    return this

  removeClass:(_dom,_className)->
    _dom.className += ' '
    _className += ' '
    _dom.className = _dom.className.replace _className,''
    return this

  on: (_dom, _type, _cb)->
    typeArr = _type.split(' ');
    if _dom.addEventListener
      for typeOne in typeArr
        _dom.addEventListener typeOne, _cb
    else
      for typeOne in typeArr
        _dom['on' + typeOne] = _cb

  hide: (_dom) ->
    _dom = Array.apply Array,arguments
    for d in _dom
      d.style.display = 'none'
  show: (_dom)->
    _dom = Array.apply Array,arguments
    for d in _dom
      d.style.display = 'block'

  #----------------------------
  text:(_dom,_text)->
    _dom.innerText = _text
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
      _cb(v,i,_str)

window._ = new Util()