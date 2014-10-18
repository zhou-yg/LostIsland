// Generated by CoffeeScript 1.8.0
(function() {
  var cardObject, iterateObj,
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

  cardObject = (function() {
    function cardObject(_config) {
      if (config) {
        this.necessaryPropertiesObj = {
          name: 'name',
          avatar: {
            normal: 'normalAvatar',
            combat: 'combatAvatar'
          },
          atk: 'atk',
          hp: 'hp'
        };
        this.setConfig(_config);
      } else {
        throw 'no config argument';
      }
    }

    cardObject.prototype.setConfig = function(_config) {
      var isRealConfig, necessaryPropertiesArr, v, _i, _len;
      necessaryPropertiesArr = iterateObj(this.necessaryPropertiesObj);
      isRealConfig = true;
      for (_i = 0, _len = necessaryPropertiesArr.length; _i < _len; _i++) {
        v = necessaryPropertiesArr[_i];
        if (_config[v] === null || _config[v] === void 0) {
          isRealConfig = false;
          break;
        } else {
          this[v] = _config[v];
        }
      }
      if (!isRealConfig) {
        return 'HAS_NOT_PROPERTY';
      } else {
        return true;
      }
    };

    cardObject.prototype.fight = function() {};

    cardObject.prototype.attack = function(_cardObj) {};

    return cardObject;

  })();

}).call(this);

//# sourceMappingURL=cardObject.js.map