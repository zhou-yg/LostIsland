(function() {
  var CardFactory;

  CardFactory = (function() {
    function CardFactory() {
      var c, h, k, v;
      this.cardAvatarPre = cardAvatarPre;
      this.heroAvatarPre = heroAvatarPre;
      this.indexPre = 'card';
      this.cardMap = {};
      this.cardNum = 0;
      this.heroIndexPre = 'hero';
      this.heroMap = {};
      this.heroNum = 0;
      for (k in cardConfigObjList) {
        v = cardConfigObjList[k];
        c = new CardObject(v);
        c.cid = k;
        this.cardMap[k] = c;
        this.cardNum++;
      }
      for (k in heroConfigObjList) {
        v = heroConfigObjList[k];
        h = new CardObject(v);
        h.hid = k;
        this.heroMap[k] = h;
        this.heroNum++;
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

    CardFactory.prototype.getHeroByHid = function(_hid) {
      var heroOne, k, v, _ref;
      heroOne = null;
      _ref = this.heroMap;
      for (k in _ref) {
        v = _ref[k];
        if (k === _hid || k === (this.heroIndexPre + _hid)) {
          heroOne = v;
        }
      }
      if (heroOne) {
        return _.clone(heroOne);
      } else {
        return null;
      }
    };

    return CardFactory;

  })();

  window.cardFactory = new CardFactory();

}).call(this);
