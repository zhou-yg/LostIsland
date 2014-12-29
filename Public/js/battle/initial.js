(function() {
  (function() {
    var goAheadAndActuallyConnect;
    goAheadAndActuallyConnect = function() {
      var actualSocket;
      actualSocket = io.connect(battleServerAd);
      io.socket = io.socket.become(actualSocket);
      return io.socket.on('connect', function() {
        console.log('connect to battle server success');
        if (!io.socket.$events.disconnect) {
          io.socket.on('disconnect', function() {
            var _ref;
            console.log('====================================');
            console.log('io.socket was disconnected from Sails.');
            console.log('Usually, this is due to one of the following reasons:' + '\n' + ' -> the server ' + ((_ref = io.sails.url) != null ? _ref : io.sails.url + {
              ' ': ''
            }) + 'was taken down' + '\n' + ' -> your browser lost internet connectivity');
            return console.log('====================================');
          });
        }
        if (!io.socket.$events.reconnect) {
          io.socket.on('reconnect', function() {
            var numSecsOffline;
            numSecsOffline = io.socket.msSinceConnectionLost / 1000;
            return console.log('io.socket reconnected successfully after being offline ' + 'for ' + numSecsOffline + ' seconds.');
          });
        }
        if (!io.socket.$events.reconnecting) {
          io.socket.on('reconnecting', function(msSinceConnectionLost, numAttempts) {
            io.socket.msSinceConnectionLost = msSinceConnectionLost;
            return console.log('io.socket is trying to reconnect to Sails...' + '(attempt #' + numAttempts + ')');
          });
        }
        if (!io.socket.$events.error) {
          return io.socket.on('error', function(_err) {
            return console.log('Failed to connect socket (probably due to failed authorization on server)', 'Error:', _err);
          });
        }
      });
    };
    return goAheadAndActuallyConnect();
  })();

}).call(this);
