#connect to battle server
do ->
  actualSocket = io.connect battleServerAd
  io.socket = io.socket.become actualSocket

  io.socket.on 'connect',->
    console.log 'connect to battle server success'

    if !io.socket.$events.disconnect
      io.socket.on 'disconnect',->
        console.log('====================================');
        console.log('io.socket was disconnected from Sails.');
        console.log('Usually, this is due to one of the following reasons:' + '\n' +
          ' -> the server ' + (io.sails.url ? io.sails.url + ' ' : '') + 'was taken down' + '\n' +
          ' -> your browser lost internet connectivity');
        console.log('====================================');

    if !io.socket.$events.reconnect
      io.socket.on 'reconnect',->
        numSecsOffline = io.socket.msSinceConnectionLost / 1000;
        console.log(
          'io.socket reconnected successfully after being offline ' +
            'for ' + numSecsOffline + ' seconds.')

    if !io.socket.$events.reconnecting
      io.socket.on 'reconnecting',(msSinceConnectionLost, numAttempts)->
        io.socket.msSinceConnectionLost = msSinceConnectionLost
        console.log(
          'io.socket is trying to reconnect to Sails...' +
            '(attempt #' + numAttempts + ')')

    if !io.socket.$events.error
      io.socket.on 'error',(_err)->
        console.log(
          'Failed to connect socket (probably due to failed authorization on server)',
          'Error:', _err
        )
