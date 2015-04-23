
/*
cid:chess[\d]
name
img
level
 */

(function() {
  var ChessFactory, ChessObject,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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

    ChessObject.prototype.fight = function(chessObj) {
      var result, specialArr, _ref, _ref1;
      if (this.level === chessObj.level) {
        return 0;
      }
      specialArr = [1, 100];
      result = this.level < chessObj.level;
      if ((_ref = this.level, __indexOf.call(specialArr, _ref) >= 0) && (_ref1 = chessObj.level, __indexOf.call(specialArr, _ref1) >= 0)) {
        if (result) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (result) {
          return 1;
        } else {
          return -1;
        }
      }
    };

    return ChessObject;

  })();

  ChessFactory = (function() {
    function ChessFactory() {
      var c, k, v;
      this.chessAvatarPre = chessImgPre;
      this.indexPre = 'chess';
      this.chessMap = {};
      this.chessNum = 0;
      for (k in chessConfigObjList) {
        v = chessConfigObjList[k];
        c = new ChessObject(v);
        c.cid = k;
        this.chessMap[k] = c;
        this.chessNum++;
      }
    }

    ChessFactory.prototype.check = function(obj) {
      if (!_.isArray(obj)) {
        obj = [obj];
      }
      return obj.every(function(o) {
        return o instanceof ChessObject;
      });
    };

    ChessFactory.prototype.getChessByName = function(_cname) {
      var chessOne, k, v, _ref;
      chessOne = null;
      _ref = this.chessMap;
      for (k in _ref) {
        v = _ref[k];
        if (v.name === _cname) {
          chessOne = v;
        }
      }
      if (chessOne) {
        return _.clone(chessOne);
      } else {
        return null;
      }
    };

    ChessFactory.prototype.getChessByCid = function(_cid) {
      var chessOne, k, v, _ref;
      chessOne = null;
      _ref = this.chessMap;
      for (k in _ref) {
        v = _ref[k];
        if (k === _cid || k === (this.indexPre + _cid)) {
          chessOne = v;
        }
      }
      if (chessOne) {
        return _.clone(chessOne);
      } else {
        return null;
      }
    };

    return ChessFactory;

  })();

  window.chessFactory = new ChessFactory();

}).call(this);
