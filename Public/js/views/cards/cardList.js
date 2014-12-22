
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
    var allCard, myDeck;
    myDeck = _.query('.my-deck');
    allCard = _.query('.all-cards-list');
    return (function() {
      var all, cardObjCache, cardOneTmp, checkCache, deck, deckOneTmp, indexPre;
      if (global.myCards && global.myCards.deck && global.myCards.all) {
        deck = global.myCards.deck;
        all = global.myCards.all;
        indexPre = cardFactory.indexPre;
        deckOneTmp = _.query('#deck-one-tmp');
        cardOneTmp = _.query('#card-one-tmp');
        cardObjCache = [];
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
          var cardId, cardObj, insertIntoMyDeckDiv, _i, _len, _results;
          insertIntoMyDeckDiv = function(_cardObj) {
            var imgUrl, node, nodeBg;
            node = deckOneTmp.cloneNode(true);
            node.removeAttribute('id');
            node.className = node.className.replace(/hide/, '');
            nodeBg = _.find(node, '.bg');
            imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list;
            _.css(nodeBg, 'backgroundImage', 'url(' + imgUrl + ')');
            return myDeck.appendChild(node);
          };
          _results = [];
          for (_i = 0, _len = deck.length; _i < _len; _i++) {
            cardId = deck[_i];
            cardObj = checkCache(cardObjCache, cardId);
            if (cardObj) {
              _results.push(insertIntoMyDeckDiv(cardObj));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        })();
        (function() {
          var cardId, cardObj, insertIntoAllDiv, _i, _len, _results;
          insertIntoAllDiv = function(_cardObj) {
            var imgUrl, node, nodeBg;
            node = cardOneTmp.cloneNode(true);
            node.removeAttribute('id');
            node.className = node.className.replace(/hide/, '');
            nodeBg = _.find(node, '.bg');
            imgUrl = cardFactory.cardAvatarPre + _cardObj.normalAvatar;
            _.css(nodeBg, 'backgroundImage', 'url(' + imgUrl + ')');
            return allCard.appendChild(node);
          };
          _results = [];
          for (_i = 0, _len = all.length; _i < _len; _i++) {
            cardId = all[_i];
            cardObj = checkCache(cardObjCache, cardId);
            if (cardObj) {
              _results.push(insertIntoAllDiv(cardObj));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        })();
        return (function() {
          var deckList, liOne, _i, _len, _results;
          deckList = myDeck.children;
          console.log(deckList);
          _results = [];
          for (_i = 0, _len = deckList.length; _i < _len; _i++) {
            liOne = deckList[_i];
            _results.push((function() {
              var li;
              li = liOne;
              return _.on(li, 'click', function(_e) {
                return this.remove();
              });
            })());
          }
          return _results;
        })();
      }
    })();
  });

}).call(this);
