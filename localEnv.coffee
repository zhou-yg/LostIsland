http = require 'http'
fs = require 'fs'

serverConfig =
  melot:
    serverAd:'http://localhost:9000/lostisland/'
    baseUrl:'http://localhost:9000/lostisland/index.php/'
  mac:
    serverAd:'http://192.168.2.1/'
    baseUrl:'http://192.168.2.1/index.php/'
  hp:''

server = serverConfig.mac
#---------------------------------------------------
phpConfigFilePath = 'application/config/config.php'

LLApiConfigFilePath = 'Public/js/apis/serverConfig.js'
LLApiConfigData = 'LLApi.setServerPre("'+server.baseUrl+'");'

cardConfigUrl = 'apis/cards/card_config_factory/getList/'
#--------------------------------------------------------
http.get server.baseUrl+cardConfigUrl,(_res)->
  responseStr = ''
  _res.on 'data',(_chunk)->
    responseStr += _chunk

  _res.on 'end',->
    console.log 'end => ',responseStr

#------------------------------------------------------
fs.writeFile LLApiConfigFilePath,LLApiConfigData,(_err)->
  if _err
    console.log _err
  else
    console.log 'set LLApi config success'

#------------------------------------------------------
fs.readFile phpConfigFilePath,(_err,_data)->
    if _err then console.log _err
    content = _data.toString()
    console.log content.match /\$config\['base_url'\]([\s\S]{0,25})(;){1}/
    content = content.replace /\$config\['base_url'\]([\s\S]{0,25});/,"$config['base_url']='"+server.serverAd+"';"
    fs.writeFile phpConfigFilePath,content,(_err)->
      if _err
        console.log _err
      else
        console.log 'set base_url success'