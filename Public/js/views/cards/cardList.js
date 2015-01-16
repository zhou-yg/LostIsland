
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
    var allCardDom, allCards, allDecks, allDecksDom, allHeroes, allHeroesDom, deck, myDeckDom;
    myDeckDom = _.query('.my-deck');
    allDecksDom = _.query('.all-decks');
    allCardDom = _.query('.all-cards-list');
    allHeroesDom = _.query('.all-heroes-list');
    allDecks = global.myCards.deck;
    deck = allDecks[0].deck;
    allCards = global.myCards.allCard;
    allHeroes = global.myCards.allHero;
    allCards = allCards.concat();
    allHeroes = allHeroes.concat();
    return (function() {
      var btnToClick, cardOneTmp, currentNum, deckOneTmp, getCardObjByCache, heroOneTmp, indexPre;
      if (global.myCards) {
        indexPre = cardFactory.indexPre;
        deckOneTmp = _.query('#deck-one-tmp');
        cardOneTmp = _.query('#card-one-tmp');
        heroOneTmp = _.query('#hero-one-tmp');
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
          var cardObjIndexName, displayAllCards, displayAllDecks, displayAllHeroes, displayCurrentDeck;
          cardObjIndexName = 'cardIndex';
          displayCurrentDeck = function() {
            var cardIndex, cardObj, insertIntoMyDeckDiv, _i, _len, _results;
            myDeckDom.innerHTML = '';
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
            _results = [];
            for (_i = 0, _len = deck.length; _i < _len; _i++) {
              cardIndex = deck[_i];
              cardObj = getCardObjByCache(cardIndex);
              if (cardObj) {
                _results.push(insertIntoMyDeckDiv(cardObj));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          displayAllDecks = function() {
            var allDecksDomChildren, deckOne, heroObj, i, setHero, _i, _len, _results;
            allDecksDomChildren = allDecksDom.children;
            setHero = function(_heroObj, _i) {
              var deckDom, heroImg;
              deckDom = allDecksDomChildren[_i];
              heroImg = cardFactory.heroAvatarPre + _heroObj.img;
              return _.css(deckDom, 'backgroundImage', 'url(' + heroImg + ')');
            };
            _results = [];
            for (i = _i = 0, _len = allDecks.length; _i < _len; i = ++_i) {
              deckOne = allDecks[i];
              heroObj = getCardObjByCache(deckOne.hero, 'hero');
              if (heroObj) {
                _results.push(setHero(heroObj, i));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          displayAllCards = function() {
            var cardIndex, cardObj, insertIntoAllDiv, _i, _len, _results;
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
            _results = [];
            for (_i = 0, _len = allCards.length; _i < _len; _i++) {
              cardIndex = allCards[_i];
              cardObj = getCardObjByCache(cardIndex);
              if (cardObj) {
                _results.push(insertIntoAllDiv(cardObj, cardIndex));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          displayAllHeroes = function() {
            var heroI, heroObj, insertIntoAllHero, _i, _len, _results;
            insertIntoAllHero = function(_heroObj) {
              var avatar, heroImg, name, node;
              node = heroOneTmp.cloneNode(true);
              node.removeAttribute('id');
              node.className = node.className.replace(/hide/, '');
              avatar = _.find(node, '.avatar');
              name = _.find(node, '.name');
              heroImg = cardFactory.heroAvatarPre + _heroObj.img;
              _.css(avatar, 'background-Image', 'url(' + heroImg + ')');
              _.text(name, _heroObj.name);
              console.log(node);
              return allHeroesDom.appendChild(node);
            };
            _results = [];
            for (_i = 0, _len = allHeroes.length; _i < _len; _i++) {
              heroI = allHeroes[_i];
              heroObj = getCardObjByCache(heroI, 'hero');
              if (heroObj) {
                _results.push(insertIntoAllHero(heroObj));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          displayCurrentDeck();
          displayAllDecks();
          displayAllCards();
          displayAllHeroes();
          return (function() {
            var allCardsList, allOne, _fn, _i, _len;
            _.on(myDeckDom, 'click', function(_e) {
              var cid, target;
              target = _e.target.parentElement;
              if (-1 === target.className.indexOf('card-one')) {
                return false;
              }
              cid = target.getAttribute(cardObjIndexName);
              target.remove();
              return btnToClick.changeDeckDelete(cid);
            });
            allCardsList = allCardDom.children;
            _fn = function() {
              var one;
              one = allOne;
              return _.on(one, 'click', function(_e) {
                var cardIndex;
                if (deck.length < CARD_NUM_MAX) {
                  cardIndex = this.getAttribute(cardObjIndexName);
                  btnToClick.changeDeckAdd(cardIndex);
                  return displayCurrentDeck();
                }
              });
            };
            for (_i = 0, _len = allCardsList.length; _i < _len; _i++) {
              allOne = allCardsList[_i];
              _fn();
            }
            return _.on(allDecksDom, 'click', function(_e) {
              return console.log(_e.target);
            });
          })();
        })();
      }
    })();
  });

}).call(this);
