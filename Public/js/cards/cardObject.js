
/*
cid:card[\d]
name
normalAvatar
select_list
charater_main
battleAvatar
atk
hp
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

    CardObject.prototype.setStyle = function() {};

    CardObject.prototype.fight = function() {};

    CardObject.prototype.attack = function(_cardObj) {};

    return CardObject;

  })();

  window.CardObject = CardObject;

}).call(this);
