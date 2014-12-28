http = require 'http'
fs = require 'fs'

serverConfig =
  melot:
    serverAd:'http://localhost:9000/lostisland/'
    battleServerAd:''
    baseUrl:'http://localhost:9000/lostisland/index.php/'
  mac:
    serverAd:'http://192.168.2.1/'
    battleServerAd:'http://192.168.2.1:1337/'
    baseUrl:'http://192.168.2.1/index.php/'
  hp:''

server = serverConfig.mac
#---------------------------------------------------
cardConfigUrl = 'apis/cards/card_config_factory/getList/'

LLApiConfigFilePath = 'Public/js/apis/serverConfig.js'
LLApiConfigData = 'LLApi.setServerPre("'+server.baseUrl+'");'

phpConfigFilePath = 'application/config/config.php'

battleServerFilePath = 'Public/js/battle/battleServerConfig.js'
battleServerConfigData = 'var battleServerAd = "'+server.battleServerAd+'";'
#-------------------init cardConfigList------------------------------
http.get server.baseUrl+cardConfigUrl,(_res)->
  responseStr = ''
  _res.on 'data',(_chunk)->
    responseStr += _chunk

  _res.on 'end',->
    console.log 'end'

#-------------------- init api server ---------------------------
fs.writeFile LLApiConfigFilePath,LLApiConfigData,(_err)->
  if _err
    console.log _err
  else
    console.log 'set LLApi config success'

#-------------------- init php base_url -----------------------
fs.readFile phpConfigFilePath,(_err,_data)->
    if _err then console.log _err
    content = _data.toString()

    content = content.replace /\$config\['base_url'\]([\s\S]{0,25});/,"$config['base_url']='"+server.serverAd+"';"

    fs.writeFile phpConfigFilePath,content,(_err)->
      if _err
        console.log _err
      else
        console.log 'set base_url success'

#---------------------init battleServer ----------------------
fs.writeFile battleServerFilePath,battleServerConfigData,(_err)->
  if _err
    console.log _err
  else
    console.log 'set battleServerAd success'