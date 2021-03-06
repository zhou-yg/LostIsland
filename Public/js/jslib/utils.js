(function() {
  var Util,
    __hasProp = {}.hasOwnProperty;

  Util = (function() {
    function Util() {
      this.curDom = null;
      this.prototype;
    }

    Util.prototype.q = function(_selector, _paraent) {
      var nodeList, parent;
      parent = _paraent || document;
      if (_selector[0] === '#') {
        _selector = _selector.substring(1, _selector.length);
        nodeList = parent.getElementById(_selector);
      } else {
        nodeList = parent.querySelectorAll(_selector);
      }
      if (nodeList.length && nodeList.length === 1) {
        return nodeList[0];
      } else {
        return nodeList;
      }
    };

    Util.prototype.domHooks = function(_arguments) {
      if (_arguments[0] === void 0) {
        return _arguments[0] = this.curDom;
      } else if (typeof _arguments[0] === 'string') {
        _arguments[0] = this.q(_arguments[0]);
        return this.curDom = _arguments[0];
      }
    };

    Util.prototype.on = function(_dom, _type, _cb) {
      var typeArr, typeOne, _i, _j, _len, _len1, _results, _results1;
      this.domHooks(arguments);
      typeArr = _type.split(' ');
      if (_dom.addEventListener) {
        _results = [];
        for (_i = 0, _len = typeArr.length; _i < _len; _i++) {
          typeOne = typeArr[_i];
          _results.push(_dom.addEventListener(typeOne, _cb));
        }
        return _results;
      } else {
        _results1 = [];
        for (_j = 0, _len1 = typeArr.length; _j < _len1; _j++) {
          typeOne = typeArr[_j];
          _results1.push(_dom['on' + typeOne] = _cb);
        }
        return _results1;
      }
    };

    Util.prototype.find = function(_parent, _selector) {
      var node;
      this.domHooks(arguments);
      if (_parent instanceof HTMLElement) {
        node = this.q(_selector, _parent);
        return node;
      }
      return _parent;
    };

    Util.prototype.css = function(_dom, _styleName, _value) {
      var k, transStr, v;
      this.domHooks(arguments);
      transStr = /-([\w])/;
      _styleName = _styleName.replace(transStr, function(_all, _second) {
        return _second.toUpperCase();
      });
      if (_value === void 0) {
        return _dom.style[_styleName];
      } else if (_value && typeof _styleName === 'string' || _value === '') {
        _dom.style[_styleName] = _value;
      } else if (this.isObject(_styleName)) {
        for (k in _styleName) {
          v = _styleName[k];
          _dom.style[k] = v;
        }
      }
      return this;
    };

    Util.prototype.addClass = function(_dom, _className) {
      var domClass, domOne, _i, _len;
      this.domHooks(arguments);
      if (!_dom.length) {
        _dom = [_dom];
      }
      for (_i = 0, _len = _dom.length; _i < _len; _i++) {
        domOne = _dom[_i];
        domClass = domOne.className;
        if (-1 === domClass.indexOf(_className)) {
          domOne.className += ' ' + _className;
        }
      }
      return this;
    };

    Util.prototype.removeClass = function(_dom, _className) {
      var domOne, _i, _len;
      this.domHooks(arguments);
      if (!_dom.length) {
        _dom = [_dom];
      }
      _className += ' ';
      for (_i = 0, _len = _dom.length; _i < _len; _i++) {
        domOne = _dom[_i];
        domOne.className += ' ';
        domOne.className = domOne.className.replace(_className, '').replace(/\s$/, '');
      }
      return this;
    };

    Util.prototype.hide = function(_dom) {
      var d, _i, _len, _results;
      this.domHooks(arguments);
      _dom = Array.apply(Array, arguments);
      _results = [];
      for (_i = 0, _len = _dom.length; _i < _len; _i++) {
        d = _dom[_i];
        _results.push(d.style.display = 'none');
      }
      return _results;
    };

    Util.prototype.show = function(_dom) {
      var d, _i, _len, _results;
      this.domHooks(arguments);
      _dom = Array.apply(Array, arguments);
      _results = [];
      for (_i = 0, _len = _dom.length; _i < _len; _i++) {
        d = _dom[_i];
        _results.push(d.style.display = 'block');
      }
      return _results;
    };

    Util.prototype.text = function(_dom, _text) {
      this.domHooks(arguments);
      return _dom.innerText = _text;
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
        _results.push(_cb(v, i, _str));
      }
      return _results;
    };

    return Util;

  })();

  window._ = new Util();

}).call(this);
