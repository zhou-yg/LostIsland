class WebMsg
  construct:(mode,url)->
    battleServerAd = url
    if mode is 'node'
      @socket = io.socket

  on:(event,fn)->
    @socket.on event,fn

  delete:(url,data,fn)->
    @socket.delete url,data,fn

  get:(url,data,fn)->
    @socket.get url,data,fn

  post:(url,data,fn)->
    @socket.post url,data,fn

  request:(options,fn)->
    @socket.request options,fn




webMsg = new WebMsg('node','http://localhost')