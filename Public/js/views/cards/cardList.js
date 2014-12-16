(function() {
  var CARD_NUM_MAX, currentNum;

  console.log(global.myCards);

  CARD_NUM_MAX = 10;

  currentNum = 0;

  _.on(window, 'load', function() {
    var cardImg, cardImgList, cardUl, deckList, myDeck, _i, _len, _results;
    myDeck = _.query('.my-deck');
    cardUl = _.query('.my-card-list');
    deckList = myDeck.children;
    cardImgList = cardUl.children;
    _results = [];
    for (_i = 0, _len = cardImgList.length; _i < _len; _i++) {
      cardImg = cardImgList[_i];
      _results.push((function() {
        var liDisplay, type;
        type = envObj.devEnv ? 'touch' : 'click';
        liDisplay = function(_decLi, _li) {
          return _.on(_decLi, type, function(_e) {
            _e.target.remove();
            return _.show(_li);
          });
        };
        _.on(cardImg, type, function(_e) {
          var deckLi, li;
          li = _e.target;
          deckLi = li.cloneNode();
          if (myDeck.children.length < 10) {
            _.hide(li);
            myDeck.appendChild(deckLi);
            return liDisplay(deckLi, li);
          }
        });
        return _.on(cardImg, type, function(_e) {});
      })());
    }
    return _results;
  });

}).call(this);
