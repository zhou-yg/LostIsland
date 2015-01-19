(function() {
  var CardList;

  CardList = (function() {
    function CardList() {}

    CardList.prototype.cardConfigFactory = function(_cb) {
      var address;
      address = 'apis/cards/card_config_factory/getList';
      LLApi.setAddress(address);
      return LLApi.request('get', null, function(_e, _d) {
        return _cb(_e, _d);
      });
    };

    CardList.prototype.saveDeck = function(_param, _cb) {
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
      return LLApi.request('get', param, function(_error, _data) {
        return _cb(_error, _data);
      });
    };

    return CardList;

  })();

  LLApi.CardList = new CardList();

}).call(this);
