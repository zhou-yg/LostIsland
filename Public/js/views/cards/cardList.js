
/*
  global.myCards = {
    deck:[],
    all:[]
  }
 */

(function() {
  var CARD_NUM_MAX;

  CARD_NUM_MAX = 10;

  _.on(window, 'load', function() {
    var allCard, myDeck;
    myDeck = _.query('.my-deck');
    allCard = _.query('.all-cards-list');
    return (function() {
      var cardOneTmp, currentNum, deckOneTmp, getCardObjByCache, indexPre;
      if (global.myCards && global.myCards.deck && global.myCards.all) {
        indexPre = cardFactory.indexPre;
        deckOneTmp = _.query('#deck-one-tmp');
        cardOneTmp = _.query('#card-one-tmp');
        currentNum = 0;
        getCardObjByCache = (function() {
          var cardObjCache;
          cardObjCache = [];
          return function(_cardIndex) {
            var result;
            result = cardObjCache[_cardIndex];
            if (!result) {
              result = cardFactory.getCardByCid(_cardIndex);
              if (result) {
                cardObjCache[_cardIndex] = result;
              } else {
                console.log('can not find the cardObj by the Index');
              }
            }
            return result;
          };
        })();
        return (function() {
          var all, allCardsList, allOne, cardIndex, cardObj, deck, deckList, insertIntoAllDiv, insertIntoMyDeckDiv, liOne, _fn, _i, _j, _k, _l, _len, _len1, _len2, _len3, _results;
          deck = global.myCards.deck;
          all = global.myCards.all;
          currentNum = deck.length;
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
          for (_i = 0, _len = deck.length; _i < _len; _i++) {
            cardIndex = deck[_i];
            cardObj = getCardObjByCache(cardIndex);
            if (cardObj) {
              insertIntoMyDeckDiv(cardObj);
            }
          }
          insertIntoAllDiv = function(_cardObj, _cardIndex) {
            var imgUrl, node, nodeBg;
            node = cardOneTmp.cloneNode(true);
            node.removeAttribute('id');
            node.className = node.className.replace(/hide/, '');
            nodeBg = _.find(node, '.bg');
            imgUrl = cardFactory.cardAvatarPre + _cardObj.normalAvatar;
            _.css(nodeBg, 'backgroundImage', 'url(' + imgUrl + ')');
            node.setAttribute('cardIndex', _cardIndex);
            return allCard.appendChild(node);
          };
          for (_j = 0, _len1 = all.length; _j < _len1; _j++) {
            cardIndex = all[_j];
            cardObj = getCardObjByCache(cardIndex);
            if (cardObj) {
              insertIntoAllDiv(cardObj, cardIndex);
            }
          }
          deckList = myDeck.children;
          _fn = function() {
            var li;
            li = liOne;
            return _.on(li, 'click', function(_e) {
              this.remove();
              return currentNum--;
            });
          };
          for (_k = 0, _len2 = deckList.length; _k < _len2; _k++) {
            liOne = deckList[_k];
            _fn();
          }
          allCardsList = allCard.children;
          _results = [];
          for (_l = 0, _len3 = allCardsList.length; _l < _len3; _l++) {
            allOne = allCardsList[_l];
            _results.push((function() {
              var one;
              one = allOne;
              return _.on(one, 'click', function(_e) {
                if (currentNum < CARD_NUM_MAX) {
                  cardIndex = this.getAttribute('cardIndex');
                  cardObj = getCardObjByCache(cardIndex);
                  insertIntoMyDeckDiv(cardObj);
                  return currentNum++;
                }
              });
            })());
          }
          return _results;
        })();
      }
    })();
  });

}).call(this);
