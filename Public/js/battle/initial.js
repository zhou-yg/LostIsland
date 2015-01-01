(function() {
  (function() {
    var goAheadAndActuallyConnect;
    goAheadAndActuallyConnect = function() {
      io.sails.url = battleServerAd;
      return io.socket.on('connect', function() {
        return console.log('connect to battle server success');
      });
    };
    return goAheadAndActuallyConnect();
  })();

}).call(this);
