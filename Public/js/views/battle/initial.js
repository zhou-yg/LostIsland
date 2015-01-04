(function() {
  (function() {
    var getObjByCache;
    getObjByCache = (function() {
      var cardObjCache, heroObjCache;
      cardObjCache = {};
      heroObjCache = {};
      return function(_cardIndex, _type) {
        var cache, fn, result;
        cache = {};
        fn = '';
        if (_type === 'card' || !_type) {
          cache = cardObjCache;
          fn = 'getCardByCid';
        } else if (_type === 'hero') {
          cache = heroObjCache;
          fn = 'getHeroByHid';
        }
        console.log(_cardIndex);
        result = cache[_cardIndex];
        if (!result) {
          result = cardFactory[fn](_cardIndex);
          if (result) {
            cache[_cardIndex] = result;
          } else {
            console.error('can not find the cardObj by the Index');
          }
        }
        return result;
      };
    })();
    return _.on(window, 'load', function() {
      var deckOne, i, personalDeck, personalDeckList, selectedHeroWindow, _i, _len, _ref, _results;
      selectedHeroWindow = _.query('.personal .hero');
      personalDeck = _.query('.personal-deck');
      personalDeckList = personalDeck.children;
      _ref = userMsg.myDeckIds;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        deckOne = _ref[i];
        console.log(deckOne, i);
        _results.push((function() {
          var heroObj, liOne;
          heroObj = getObjByCache(deckOne.hero, 'hero');
          liOne = personalDeckList[0];
          _.css(liOne, 'backgroundImage', 'url(' + cardFactory.heroAvatarPre + heroObj.img + ')');
          return _.on(liOne, 'touchstart click', function(e) {
            return _.css(selectedHeroWindow, 'backgroundImage', _.css(this, 'backgroundImage'));
          });
        })());
      }
      return _results;
    });
  })();

  (function() {
    var startStauts, whileConnectSuccess;
    startStauts = false;
    whileConnectSuccess = function() {
      return io.socket.post(battleServerAd + '/UidInsert/sendUid', {
        uid: userMsg.uid
      }, function(_a) {
        return console.log.apply(console, arguments);
      });
    };
    return io.socket.on('connect', function() {
      console.log('connect to battle server success');
      return whileConnectSuccess();
    });
  })();

}).call(this);
