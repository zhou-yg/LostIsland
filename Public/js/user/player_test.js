// Generated by CoffeeScript 1.8.0
(function() {
  var PlayerTester, cardArr1, cardArr2, cardArrLen, cardOne, i, j;

  PlayerTester = (function() {
    function PlayerTester(name, cardArr) {
      this.name = name;
      this.cardArr = cardArr;
      if (!this.name) {
        throw 'player tester has no name';
      }
      if (!this.cardArr) {
        throw 'player tester has no cardArr';
      }
    }

    PlayerTester.prototype.getCardArr = function() {
      return this.getCardArr;
    };

    return PlayerTester;

  })();

  i = 0;

  j = 5;

  cardArrLen = 3;

  cardArr1 = [];

  cardArr2 = [];

  while (i++ < cardArrLen) {
    cardOne = cardFactory.getCardByCid(i);
    cardArr1.push(cardOne);
    cardOne = cardFactory.getCardByCid(j--);
    cardArr2.push(cardOne);
  }

  window.playerTest1 = new PlayerTester('红方', cardArr1);

  window.playerTest2 = new PlayerTester('蓝方', cardArr2);

  console.log(playerTest1);

  console.log(playerTest2);

}).call(this);

//# sourceMappingURL=player_test.js.map
