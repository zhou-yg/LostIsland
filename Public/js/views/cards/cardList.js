
/*
  global.myCards = {
    deck:[],
    all:[]
  }
 */

(function() {
  var CARD_NUM_MAX,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CARD_NUM_MAX = 10;

  _.on(window, 'load', function() {
    var allCardDom, allCards, allDecks, allDecksDom, allHeroes, allHeroesDom, myDeckDom;
    myDeckDom = _.q('.my-deck');
    allDecksDom = _.q('.all-decks');
    allCardDom = _.q('.all-cards-list');
    allHeroesDom = _.q('.all-heroes-list');
    allDecks = global.myCards.deck;
    window.curDeck = allDecks[0];
    allCards = global.myCards.allCard;
    allHeroes = global.myCards.allHero;
    allCards = allCards.concat();
    allHeroes = allHeroes.concat();
    return (function() {
      var btnToClick, cardOneTmp, currentNum, deckOneTmp, getCardObjByCache, heroOneTmp, indexPre;
      if (global.myCards) {
        indexPre = cardFactory.indexPre;
        deckOneTmp = _.q('#deck-one-tmp');
        cardOneTmp = _.q('#card-one-tmp');
        heroOneTmp = _.q('#hero-one-tmp');
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
          updateBtn = _.q('.list .hr');
          updateBtnDisplayClass = ' hr-to-btn';
          min = function(_cid) {
            var i, v, _i, _len, _ref, _results;
            _ref = curDeck.deck;
            _results = [];
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              v = _ref[i];
              if (v === _cid) {
                curDeck.deck.splice(i, 1);
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          add = function(_cid) {
            var i, v, _i, _len, _ref, _results;
            _ref = curDeck.deck;
            _results = [];
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              v = _ref[i];
              if (v === _cid && curDeck.deck[i + 1] !== _cid) {
                curDeck.deck.splice(i, 0, _cid);
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
          var buildNewDeck, cardDomIndexName, decksStateCache, displayAllCards, displayAllDecks, displayAllHeroes, displayCurrentDeck, heroDomIndexName;
          cardDomIndexName = 'cardIndex';
          heroDomIndexName = 'heroIndex';
          decksStateCache = (function() {
            var children, deckP, deckSpotAttr, deckSpotMap, deckSpotNames, domSpotMap, i, s, set, _i, _len;
            deckSpotAttr = 'spot';
            deckSpotNames = ['a', 'b', 'c', 'd'];
            deckSpotMap = {};
            domSpotMap = {};
            children = allDecksDom.children;
            for (i = _i = 0, _len = children.length; _i < _len; i = ++_i) {
              deckP = children[i];
              s = deckSpotNames[i];
              deckP.setAttribute(deckSpotAttr, s);
              domSpotMap[s] = deckP;
            }
            set = function() {
              var deckOne, _j, _len1, _results;
              _results = [];
              for (i = _j = 0, _len1 = allDecks.length; _j < _len1; i = ++_j) {
                deckOne = allDecks[i];
                _results.push(deckSpotMap[deckSpotNames[i]] = deckOne);
              }
              return _results;
            };
            set();
            return {
              deckBySpot: function(_deckSpot) {
                return deckSpotMap[_deckSpot];
              },
              undefSpot: function() {
                var curSpots, spot, _j, _k, _len1, _len2;
                curSpots = [];
                for (_j = 0, _len1 = deckSpotMap.length; _j < _len1; _j++) {
                  s = deckSpotMap[_j];
                  curSpots.push(s);
                }
                for (_k = 0, _len2 = deckSpotNames.length; _k < _len2; _k++) {
                  spot = deckSpotNames[_k];
                  if (!(__indexOf.call(curSpots, spot) >= 0)) {
                    return domSpotMap[spot];
                  }
                }
              },
              refresh: function() {
                return set();
              }
            };
          })();
          displayCurrentDeck = function() {
            var cardIndex, cardObj, insertIntoMyDeckDiv, _i, _len, _ref, _results;
            myDeckDom.innerHTML = '';
            insertIntoMyDeckDiv = function(_cardObj) {
              var imgUrl, node, nodeBg;
              node = deckOneTmp.cloneNode(true);
              node.removeAttribute('id');
              node.setAttribute(cardDomIndexName, _cardObj.cid);
              node.className = node.className.replace(/hide/, '');
              nodeBg = _.find(node, '.bg');
              imgUrl = cardFactory.cardAvatarPre + _cardObj.select_list;
              _.css(nodeBg, 'backgroundImage', 'url(' + imgUrl + ')');
              return myDeckDom.appendChild(node);
            };
            _ref = curDeck.deck;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              cardIndex = _ref[_i];
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
              deckDom = decksStateCache.undefSpot();
              heroImg = cardFactory.heroAvatarPre + _heroObj.img;
              return _.css(deckDom, 'backgroundImage', 'url(' + heroImg + ')');
            };
            _results = [];
            for (i = _i = 0, _len = allDecks.length; _i < _len; i = ++_i) {
              deckOne = allDecks[i];
              heroObj = getCardObjByCache(deckOne.hero, 'hero');
              if (heroObj) {
                _results.push(setHero(heroObj));
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
              node.setAttribute(cardDomIndexName, _cardIndex);
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
              node.setAttribute(heroDomIndexName, _heroObj.hid);
              node.className = node.className.replace(/hide/, '');
              avatar = _.find(node, '.avatar');
              name = _.find(node, '.name');
              heroImg = cardFactory.heroAvatarPre + _heroObj.img;
              _.css(avatar, 'background-Image', 'url(' + heroImg + ')');
              _.text(name, _heroObj.name);
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
          buildNewDeck = (function() {
            var BUILDER_BEF, BUILDER_END, ON_BUILDING, allHeroUl, allHeroesBg, buildState, hide, isSet, resetDeck, show;
            BUILDER_BEF = 'before';
            ON_BUILDING = 'onBuilding';
            BUILDER_END = 'end';
            buildState = null;
            isSet = false;
            allHeroesBg = _.q('.all-heroes-bg');
            allHeroUl = _.q('.all-heroes-list');
            resetDeck = function(_heroIndex) {
              return window.curDeck = {
                hero: _heroIndex,
                deck: []
              };
            };
            show = function() {
              _.show(allHeroesBg, allHeroUl);
              if (!isSet) {
                _.on(allHeroesBg, 'click', function(_e) {
                  return hide();
                });
                return _.on(allHeroUl, 'click', function(_e) {
                  var heroIndex, tar;
                  tar = _e.target.parentNode;
                  if (tar.nodeName === 'LI') {
                    heroIndex = tar.getAttribute(heroDomIndexName);
                    resetDeck(heroIndex);
                    buildState = ON_BUILDING;
                    return hide();
                  }
                });
              }
            };
            hide = function() {
              return _.hide(allHeroesBg, allHeroUl);
            };
            return {
              build: function(_tar) {
                console.log('start build new');
                buildState = BUILDER_BEF;
                return show();
              },
              end: function() {}
            };
          })();
          displayCurrentDeck();
          displayAllDecks();
          displayAllCards();
          displayAllHeroes();
          return (function() {
            _.on(myDeckDom, 'click', function(_e) {
              var cid, target;
              target = _e.target.parentElement;
              if (-1 === target.className.indexOf('card-one')) {
                return false;
              }
              cid = target.getAttribute(cardDomIndexName);
              target.remove();
              return btnToClick.changeDeckDelete(cid);
            });
            _.on(allCardDom, 'click', function(_e) {
              var cardIndex, tar;
              tar = _e.target.parentNode;
              if (tar.nodeName === 'LI' && curDeck.deck.length < CARD_NUM_MAX) {
                cardIndex = tar.getAttribute(cardDomIndexName);
                btnToClick.changeDeckAdd(cardIndex);
                return displayCurrentDeck();
              }
            });
            return _.on(allDecksDom, 'click', function(_e) {
              var clickedDeck, spot, tar;
              tar = _e.target;
              spot = tar.getAttribute('spot');
              if (!spot) {
                return;
              }
              clickedDeck = decksStateCache.deckBySpot(spot);
              if (clickedDeck) {
                curDeck.deck = clickedDeck;
                return displayAllCards();
              } else {
                return buildNewDeck.build(tar);
              }
            });
          })();
        })();
      }
    })();
  });

}).call(this);
