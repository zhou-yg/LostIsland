
/*
cid:chess[\d]
name
img
 */

(function() {
  var ChessObject;

  ChessObject = (function() {
    function ChessObject(_config) {
      if (_config) {
        this.setConfig(_config);
      } else {
        throw 'no config argument';
      }
    }

    ChessObject.prototype.setConfig = function(_config) {
      var k, v, _results;
      _results = [];
      for (k in _config) {
        v = _config[k];
        _results.push(this[k] = v);
      }
      return _results;
    };

    return ChessObject;

  })();

  window.ChessObject = ChessObject;

}).call(this);
