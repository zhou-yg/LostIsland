(function() {
  var CardList;

  CardList = (function() {
    function CardList() {}

    CardList.prototype.send = function(_param, _cb) {
      return LLApi.request('get', _param, function(_error, _data) {
        return _cb(_error, _data);
      });
    };

    CardList.prototype.saveCards = function(_param, _cb) {
      var param, tnamePre;
      tnamePre = 'deck';
      param = {
        fn: 2002,
        param: {
          uid: _param.uid,
          token: _param.token,
          data: _param.deck,
          name: tnamePre + _param.spot,
          type: 'save_deck'
        }
      };
      this.send(param, _cb);
      return this;
    };

    CardList.prototype.deleteDeck = function(_param, _cb) {
      var param, tnamePre;
      tnamePre = 'deck';
      param = {
        fn: 2002,
        param: {
          uid: _param.uid,
          token: _param.token,
          data: null,
          name: tnamePre + _param.spot,
          type: 'save_deck'
        }
      };
      this.send(param, _cb);
      return this;
    };

    return CardList;

  })();

  LLApi.CardList = new CardList();

}).call(this);
