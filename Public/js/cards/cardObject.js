(function() {
  var CardObject, iterateObj,
    __hasProp = {}.hasOwnProperty;

  iterateObj = function(_obj, _arr) {
    var k, properties, v;
    if (typeof _obj === 'object') {
      properties = _arr ? _arr : [];
      for (k in _obj) {
        if (!__hasProp.call(_obj, k)) continue;
        v = _obj[k];
        if (typeof v === 'object') {
          iterateObj(v, properties);
        } else {
          properties.push(v);
        }
      }
      return properties;
    } else {
      return 'NOT_OBJECT';
    }
  };

  CardObject = (function() {
    function CardObject(_config) {
      var necessaryPropertiesObj;
      if (_config) {
        necessaryPropertiesObj = {
          name: 'name',
          avatar: {
            normal: 'normalAvatar',
            combat: 'battleAvatar'
          },
          atk: 'atk',
          hp: 'hp'
        };
        this.necessaryPropertiesArr = iterateObj(necessaryPropertiesObj);
        this.setConfig(_config);
      } else {
        throw 'no config argument';
      }
    }

    CardObject.prototype.setConfig = function(_config) {
      var isRealConfig, v, _i, _len, _ref;
      isRealConfig = true;
      _ref = this.necessaryPropertiesArr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        if (_config[v] === null || _config[v] === void 0) {
          isRealConfig = false;
          break;
        } else {
          this[v] = _config[v];
        }
      }
      if (!isRealConfig) {
        throw 'HAS_NOT_PROPERTY';
      } else {
        return delete this.necessaryPropertiesArr;
      }
    };

    CardObject.prototype.setStyle = function() {};

    CardObject.prototype.fight = function() {};

    CardObject.prototype.attack = function(_cardObj) {};

    return CardObject;

  })();

  window.CardObject = CardObject;

}).call(this);
