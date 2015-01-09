
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
    var all, allCardDom, deck, hero, myDeckDom;
    myDeckDom = _.query('.my-deck');
    allCardDom = _.query('.all-cards-list');
    hero = global.myCards.deck.hero;
    window.decks = global.myCards.deck;
    deck = decks[0].deck;
    all = global.myCards.all;
    return (function() {
      var btnToClick, cardOneTmp, currentNum, deckOneTmp, getCardObjByCache, indexPre;
      if (global.myCards && global.myCards.deck && global.myCards.all) {
        indexPre = cardFactory.indexPre;
        deckOneTmp = _.query('#deck-one-tmp');
        cardOneTmp = _.query('#card-one-tmp');
        currentNum = 0;
        getCardObjByCache = (function() {
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
            result = cache[_cardIndex];
            if (!result) {
              result = cardFactory[fn](_cardIndex);
            }
            if (result) {
              cache[_cardIndex] = result;
            } else {
              console.error('can not find the cardObj by the Index');
            }
            return result;
          };
        })();
        btnToClick = (function() {
          var add, isWaitUpdate, min, updateBtn, updateBtnDisplayClass, updateToServer;
          isWaitUpdate = false;
          updateBtn = _.query('.list .hr');
          updateBtnDisplayClass = ' hr-to-btn';
          min = function(_cid) {
            var i, v, _i, _len, _results;
            _results = [];
            for (i = _i = 0, _len = deck.length; _i < _len; i = ++_i) {
              v = deck[i];
              if (v === _cid) {
                deck.splice(i, 1);
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          add = function(_cid) {
            var i, v, _i, _len, _results;
            _results = [];
            for (i = _i = 0, _len = deck.length; _i < _len; i = ++_i) {
              v = deck[i];
              if (v === _cid && deck[i + 1] !== _cid) {
                deck.splice(i, 0, _cid);
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          updateToServer = function() {
            var param;
            param = {
              uid: global.user.userId,
              sessionToken: global.user.sessionToken,
              cards: JSON.stringify(deck)
            };
            return LLApi.CardList.saveDeck(param, function(_e, _d) {
              console.log('save deck return', _d);
              if (typeof _d === 'string') {
                _d = JSON.parse(_d);
              }
              if (_d.result === 'true' || _d.result === true) {
                updateBtn.className = updateBtn.className.replace(updateBtnDisplayClass, '');
                return isWaitUpdate = false;
              }
            });
          };
          return {
            changeDeckDelete: function(_cid) {
              min(_cid);
              if (isWaitUpdate) {

              } else {
                isWaitUpdate = true;
                updateBtn.className = updateBtn.className + updateBtnDisplayClass;
                return _.on(updateBtn, 'click', function() {
                  return updateToServer();
                });
              }
            },
            changeDeckAdd: function(_cid) {
              add(_cid);
              if (isWaitUpdate) {

              } else {
                isWaitUpdate = true;
                updateBtn.className = updateBtn.className + updateBtnDisplayClass;
                return _.on(updateBtn, 'click', function() {
                  return updateToServer();
                });
              }
            }
          };
        })();
        return (function() {
          var allCardsList, allOne, cardIndex, cardObj, cardObjIndexName, deckList, insertIntoAllDiv, insertIntoMyDeckDiv, liOne, _fn, _i, _j, _k, _l, _len, _len1, _len2, _len3, _results;
          cardObjIndexName = 'cardIndex';
          insertIntoMyDeckDiv = function(_cardObj) {
            var imgUrl, node, nodeBg;
            node = deckOneTmp.cloneNode(true);
            node.removeAttribute('id');
            node.setAttribute(cardObjIndexName, _cardObj.cid);
            node.className = node.className.replace(/hide/, '');
            nodeBg = _.find(node, '.bg');
            imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list;
            _.css(nodeBg, 'backgroundImage', 'url(' + imgUrl + ')');
            return myDeckDom.appendChild(node);
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
            node.setAttribute(cardObjIndexName, _cardIndex);
            return allCardDom.appendChild(node);
          };
          for (_j = 0, _len1 = all.length; _j < _len1; _j++) {
            cardIndex = all[_j];
            cardObj = getCardObjByCache(cardIndex);
            if (cardObj) {
              insertIntoAllDiv(cardObj, cardIndex);
            }
          }
          deckList = myDeckDom.children;
          _fn = function() {
            var li;
            li = liOne;
            return _.on(li, 'click', function(_e) {
              var cid;
              cid = this.getAttribute(cardObjIndexName);
              this.remove();
              return btnToClick.changeDeckDelete(cid);
            });
          };
          for (_k = 0, _len2 = deckList.length; _k < _len2; _k++) {
            liOne = deckList[_k];
            _fn();
          }
          allCardsList = allCardDom.children;
          _results = [];
          for (_l = 0, _len3 = allCardsList.length; _l < _len3; _l++) {
            allOne = allCardsList[_l];
            _results.push((function() {
              var one;
              one = allOne;
              return _.on(one, 'click', function(_e) {
                if (deck.length < CARD_NUM_MAX) {
                  cardIndex = this.getAttribute(cardObjIndexName);
                  cardObj = getCardObjByCache(cardIndex);
                  insertIntoMyDeckDiv(cardObj);
                  return btnToClick.changeDeckAdd(cardIndex);
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
