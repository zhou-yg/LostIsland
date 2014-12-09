(function() {
  var CardFactory;

  CardFactory = (function() {
    function CardFactory(_configObjList) {
      var c, k, v;
      this.indexPre = 'card';
      this.cardMap = {};
      this.cardNum = 0;
      for (k in cardConfigObjList) {
        v = cardConfigObjList[k];
        c = new CardObject(v);
        this.cardMap[k] = c;
        this.cardNum++;
      }
    }

    CardFactory.prototype.getCardByName = function(_cname) {
      var cardOne, k, v, _ref;
      cardOne = null;
      _ref = this.cardMap;
      for (k in _ref) {
        v = _ref[k];
        if (v.name === _cname) {
          cardOne = v;
        }
      }
      if (cardOne) {
        return _.clone(cardOne);
      } else {
        return null;
      }
    };

    CardFactory.prototype.getCardByCid = function(_cid) {
      var cardOne, k, v, _ref;
      cardOne = null;
      _ref = this.cardMap;
      for (k in _ref) {
        v = _ref[k];
        if (k === _cid || k === (this.indexPre + _cid)) {
          cardOne = v;
        }
      }
      if (cardOne) {
        return _.clone(cardOne);
      } else {
        return null;
      }
    };

    return CardFactory;

  })();

  window.cardFactory = new CardFactory(cardConfigObjList);

}).call(this);
