(function() {
  var Player;

  Player = (function() {
    function Player() {
      this.characterWindow = _.query('.character .character_general_window');
      this.deckList = _.query('.character_army .character_army_one');
    }

    Player.prototype.init = function(_userMsg) {
      console.log(_userMsg.sessionToken);
      this.token = _userMsg.sessionToken;
      delete _userMsg.sessionToken;
      this.userMsg = _userMsg;
      return this.display();
    };

    Player.prototype.display = function() {
      var that;
      that = this;
      _.css(this.characterWindow, 'backgroundImage', 'url(' + this.userMsg.characterImg + ')');
      return _.each(this.deckList, function(_liOne, _i) {
        var cardObj;
        cardObj = cardFactory.getCardByCid(that.userMsg.myDeckIds[_i]);
        return _.css(_liOne, 'backgroundImage', 'url(' + cardFactory.cardAvatarPre + cardObj.charater_main + ')');
      });
    };

    return Player;

  })();

  window.Player = new Player();

}).call(this);
