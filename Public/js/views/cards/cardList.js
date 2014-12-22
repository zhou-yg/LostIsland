
/*
  global.myCards = {
    deck:[],
    all:[]
  }
 */

(function() {
  var CARD_NUM_MAX, currentNum;

  console.log(global.myCards);

  CARD_NUM_MAX = 10;

  currentNum = 0;

  _.on(window, 'load', function() {
    var cardUl, myDeck;
    myDeck = _.query('.my-deck');
    cardUl = _.query('.my-card-list');
    return (function() {
      var all, checkCache, deck, deckCache, deckOneTmp, indexPre;
      if (global.myCards && global.myCards.deck && global.myCards.all) {
        deck = global.myCards.deck;
        all = global.myCards.all;
        indexPre = cardFactory.indexPre;
        deckOneTmp = _.query('#deck-one-tmp');
        deckCache = [];
        checkCache = function(_arr, _cardIndex) {
          var ele, result, _i, _len;
          result = null;
          for (_i = 0, _len = _arr.length; _i < _len; _i++) {
            ele = _arr[_i];
            if (indexPre + _cardIndex === ele.cardId) {
              result = ele;
              break;
            }
          }
          if (!result) {
            result = cardFactory.getCardByCid(_cardIndex);
            if (result) {
              _arr.push(result);
            } else {
              console.log('can not find the cardObj by the Index');
            }
          }
          return result;
        };
        (function() {
          var cardId, cardObj, insertIntoMyDeck, _i, _len, _results;
          insertIntoMyDeck = function(_cardObj) {
            var imgUrl, node, nodeBg;
            node = deckOneTmp.cloneNode(true);
            node.setAttribute('id', '');
            node.className = node.className.replace(/hide/, '');
            nodeBg = _.find(node, '.bg');
            imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list;
            _.css(nodeBg, 'backgroundImage', 'url(' + imgUrl + ')');
            return myDeck.appendChild(node);
          };
          _results = [];
          for (_i = 0, _len = deck.length; _i < _len; _i++) {
            cardId = deck[_i];
            cardObj = checkCache(deckCache, cardId);
            if (cardObj) {
              _results.push(insertIntoMyDeck(cardObj));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        })();
        return (function() {})();
      }
    })();
  });

}).call(this);
