// Generated by CoffeeScript 1.8.0
(function() {
  var Util,
    __hasProp = {}.hasOwnProperty;

  Util = (function() {
    function Util() {}

    Util.prototype.query = function(_selector) {
      var nodeList;
      if (_selector[0] === '#') {
        nodeList = document.getElementById(_selector);
      } else {
        nodeList = document.querySelectorAll(_selector);
      }
      if (nodeList.length === 1) {
        return nodeList[0];
      } else {
        return nodeList;
      }
    };

    Util.prototype.css = function(_dom, _styleName, _value) {
      var k, v, _results;
      if (_value && typeof _styleName === 'string') {
        return _dom.style[_styleName] = _value;
      } else if (this.isObject(_styleName)) {
        _results = [];
        for (k in _styleName) {
          v = _styleName[k];
          _results.push(_dom.style[k] = v);
        }
        return _results;
      }
    };

    Util.prototype.on = function(_dom, _type, _cb) {
      if (_dom.addEventListener) {
        return _dom.addEventListener(_type, _cb);
      } else {
        return _dom['on' + _type] = _cb;
      }
    };

    Util.prototype.hide = function(_dom) {
      return _dom.style.display = 'none';
    };

    Util.prototype.show = function(_dom) {
      return _dom.style.display = 'block';
    };

    Util.prototype.isObject = function(_obj) {
      return typeof _obj === 'object' && !!_obj;
    };

    Util.prototype.isArray = function(_obj) {
      return toString.call(_obj) === '[object Array]';
    };

    Util.prototype.clone = function(_obj) {
      var k, obj, v;
      if (!this.isObject(_obj)) {
        return _obj;
      }
      obj = {};
      for (k in _obj) {
        v = _obj[k];
        obj[k] = v;
      }
      return obj;
    };

    Util.prototype.iterateObj = function(_obj, _arr) {
      var k, properties, v;
      if (this.isObject(_obj)) {
        properties = _arr ? _arr : [];
        for (k in _obj) {
          if (!__hasProp.call(_obj, k)) continue;
          v = _obj[k];
          if (this.isObject(_obj)) {
            this.iterateObj(v, properties);
          } else {
            properties.push(v);
          }
        }
        return properties;
      } else {
        return false;
      }
    };

    Util.prototype.each = function(_str, _cb) {
      var i, v, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = _str.length; _i < _len; i = ++_i) {
        v = _str[i];
        _results.push(_cb(i, v, _str));
      }
      return _results;
    };

    return Util;

  })();

  window._ = new Util();

}).call(this);

//# sourceMappingURL=utils.js.map