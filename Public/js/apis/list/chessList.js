(function() {
  var Chess;

  Chess = (function() {
    function Chess() {}

    Chess.prototype.send = function(_param, _cb) {
      return LLApi.request('get', _param, function(_error, _data) {
        return _cb(_error, _data);
      });
    };

    Chess.prototype.saveChess = function(_param, _cb) {
      var param, tnamePre;
      tnamePre = 'deck';
      param = {
        fn: 3002,
        param: {
          type: 'save',
          uid: _param.uid,
          token: _param.token,
          chess: _param.chess
        }
      };
      this.send(param, _cb);
      return this;
    };

    return Chess;

  })();

  LLApi.Chess = new Chess();

}).call(this);
