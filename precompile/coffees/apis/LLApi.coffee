class  LLApi
  constructor:->
    @timeotMax = 20*1000

  Client:->
    @apiAddress = 'index.php/apis/route/'
    return this
  WS:->
    @apiAddress = ''
    return this

  setServerPre : (serverHost)->
    @serverHost = serverHost
  setAddress : (address)->
    @apiAddress = address
  setPort:(port)->
    if @serverHost and port and typeof port is 'number'
      urlArr = @serverHost.split('/')
      #['http','','192.168.2.1','']
      if urlArr[2].indexOf(':') isnt -1
        urlArr[2] = urlArr[2].replace(/:[\d]*/,':'+port)
      else
        urlArr[2] += ':'+port

      @serverHost = urlArr.join('/')

    return this

  onReadyStateChange : (_xhr,_callback)->
    _xhr.onreadystatechange = ->
      if _xhr.readyState == 4
        if _xhr.status == 200
          resObj = JSON.parse(_xhr.responseText)
          _callback null,resObj

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
      url = @serverHost+@apiAddress+'?'+data
      @get url,_callback
    if _method is 'post'
      url = @serverHost+@apiAddress
      @post url,data,_callback

    @setPort(80)


window.LLApi = new LLApi()