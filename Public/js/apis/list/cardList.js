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
      var address;
      address = 'apis/cards/user_cards/save_deck';
      LLApi.setAddress(address);
      return LLApi.request('post', _param, function(_e, _d) {
        return _cb(_e, _d);
      });
    };

    return CardList;

  })();

  LLApi.CardList = new CardList();

}).call(this);
