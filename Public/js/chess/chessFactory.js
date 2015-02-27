(function() {
  var ChessFactory;

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
