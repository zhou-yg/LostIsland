class  LLApi
  constructor:->
    @timeotMax = 20*1000
    @apiAddress = 'apis/route/'

  init:->
    @timeotMax = 20*1000
    return this

  setServerPre : (_serverPre)->
    @serverPre = _serverPre
  setAddress : (_address)->
    @apiAddress = _address

  onReadyStateChange : (_xhr,_callback)->
    _xhr.onreadystatechange = ->
      if _xhr.readyState == 4
        if _xhr.status == 200
          _callback null,_xhr.responseText

  get:(_url,_callback)->
    xhr = if window.XMLHttpRequest then new XMLHttpRequest() else new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open 'get',_url
    @onReadyStateChange xhr,_callback
    xhr.send null

  post:(_url,_data,_callback)->
    xhr = if window.XMLHttpRequest then new XMLHttpRequest() else new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open 'post',_url
    xhr.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded'
    @onReadyStateChange xhr,_callback
    xhr.send _data

  request : (_method,_param,_callback)->
    if _param
      _param = JSON.stringify _param
      data = 'parameter='+_param
    else
      data = '#'

    if _method is 'get'
      url = @serverPre+@apiAddress+'?'+data
      @get url,_callback
    if _method is 'post'
      url = @serverPre+@apiAddress
      @post url,data,_callback

#LLApi.prototype.init.prototype = LLApi.prototype

window.LLApi = new LLApi()