(function() {
  var serverConfig;

  serverConfig = {
    melot: 'http://localhost:9000/lostisland/index.php/',
    mac: 'http://192.168.2.1/index.php/',
    hp: ''
  };

  LLApi.setServerPre(serverConfig.mac);

}).call(this);
