
/*
hid:hero[\d]
name
img
 */

(function() {
  var CardObject;

  CardObject = (function() {
    function CardObject(_config) {
      if (_config) {
        this.setConfig(_config);
      } else {
        throw 'no config argument';
      }
    }

    CardObject.prototype.setConfig = function(_config) {
      var k, v, _results;
      _results = [];
      for (k in _config) {
        v = _config[k];
        _results.push(this[k] = v);
      }
      return _results;
    };

    return CardObject;

  })();

  window.CardObject = CardObject;

}).call(this);
