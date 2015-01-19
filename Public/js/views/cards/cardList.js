
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
    var allCardDom, allCards, allDecks, allDecksDom, allHeroes, allHeroesDom, curDeck, myDeckDom;
    myDeckDom = _.q('.my-deck');
    allDecksDom = _.q('.all-decks');
    allCardDom = _.q('.all-cards-list');
    allHeroesDom = _.q('.all-heroes-list');
    allDecks = global.myCards.deck;
    curDeck = allDecks[0];
    curDeck.cur = true;
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
          var add, afterUpdate, isWaitUpdate, min, updateBtn, updateBtnDisplayClass, updateToServer, waitToUpdate;
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
            var i, v, _i, _len, _ref;
            _ref = curDeck.deck;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              v = _ref[i];
              if (v === _cid && curDeck.deck[i + 1] !== _cid) {
                curDeck.deck.splice(i, 0, _cid);
                return;
              }
            }
            return curDeck.deck.push(_cid);
          };
          waitToUpdate = function() {
            if (isWaitUpdate) {

            } else {
              isWaitUpdate = true;
              return updateBtn.className = updateBtn.className + updateBtnDisplayClass;
            }
          };
          afterUpdate = function() {
            if (isWaitUpdate) {
              isWaitUpdate = false;
              return updateBtn.className = updateBtn.className.replace(updateBtnDisplayClass, '');
            }
          };
          updateToServer = function() {
            var param;
            param = {
              uid: global.user.userId,
              token: global.user.sessionToken,
              deck: {
                hero: curDeck.hero,
                deck: curDeck.deck
              },
              spot: curDeck.spot
            };
            console.log(param);
            return LLApi.CardList.saveDeck(param, function(_e, _d) {
              console.log('save deck return', _d);
              if (typeof _d === 'string') {
                _d = JSON.parse(_d);
              }
              if (_d.result === 'true' || _d.result === true) {
                return afterUpdate();
              }
            });
          };
          _.on(updateBtn, 'click', function() {
            return updateToServer();
          });
          return {
            deleteCard: function(_cid) {
              min(_cid);
              return waitToUpdate();
            },
            addToCard: function(_cid) {
              add(_cid);
              return waitToUpdate();
            },
            addToDeck: function(_deck) {}
          };
        })();
        return (function() {
          var buildNewDeck, cardDomIndexName, decksStateCache, displayAllCards, displayAllDecks, displayAllHeroes, displayCurrentDeck, heroDomIndexName;
          cardDomIndexName = 'cardIndex';
          heroDomIndexName = 'heroIndex';
          decksStateCache = (function() {
            var children, deckP, deckSpotAttr, deckSpotDomMap, deckSpotNames, domSpotMap, i, s, set, _i, _len;
            deckSpotAttr = 'spot';
            deckSpotNames = ['a', 'b', 'c', 'd'];
            deckSpotDomMap = {};
            domSpotMap = {};
            children = allDecksDom.children;
            for (i = _i = 0, _len = children.length; _i < _len; i = ++_i) {
              deckP = children[i];
              s = deckSpotNames[i];
              deckP.setAttribute(deckSpotAttr, s);
              domSpotMap[s] = deckP;
            }
            set = function() {
              var deckOne, spotName, _j, _len1, _results;
              _results = [];
              for (i = _j = 0, _len1 = allDecks.length; _j < _len1; i = ++_j) {
                deckOne = allDecks[i];
                spotName = deckSpotNames[i];
                deckOne.spot = spotName;
                _results.push(deckSpotDomMap[spotName] = deckOne);
              }
              return _results;
            };
            set();
            return {
              deckBySpot: function(_deckSpot) {
                return deckSpotDomMap[_deckSpot];
              },
              undefSpot: function() {
                var curSpots, spot, _j, _len1;
                curSpots = [];
                for (s in deckSpotDomMap) {
                  curSpots.push(s);
                }
                for (_j = 0, _len1 = deckSpotNames.length; _j < _len1; _j++) {
                  spot = deckSpotNames[_j];
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
            var deckCurStyle, deckOne, deckSpots, heroObj, i, setHero, _i, _len, _results;
            deckSpots = allDecksDom.children;
            deckCurStyle = 'deck-one-cur';
            setHero = function(_heroObj, _isCur, _i) {
              var deckDom, heroImg;
              deckDom = deckSpots[_i];
              if (_isCur) {
                _.addClass(deckDom, deckCurStyle);
              } else {
                _.removeClass(deckDom, deckCurStyle);
              }
              heroImg = cardFactory.heroAvatarPre + _heroObj.img;
              return _.css(deckDom, 'backgroundImage', 'url(' + heroImg + ')');
            };
            _results = [];
            for (i = _i = 0, _len = allDecks.length; _i < _len; i = ++_i) {
              deckOne = allDecks[i];
              heroObj = getCardObjByCache(deckOne.hero, 'hero');
              if (heroObj) {
                _results.push(setHero(heroObj, deckOne.cur, i));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          displayAllCards = function() {
            var cardIndex, cardObj, insertIntoAllDiv, _i, _len, _results;
            allCardDom.innerHTML = '';
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
              curDeck.cur = false;
              curDeck = {
                hero: _heroIndex,
                deck: [],
                cur: true
              };
              allDecks.push(curDeck);
              decksStateCache.refresh();
              displayCurrentDeck();
              return displayAllDecks();
            };
            show = function() {
              _.show(allHeroesBg, allHeroUl);
              if (!isSet) {
                isSet = true;
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
              return btnToClick.deleteCard(cid);
            });
            _.on(allCardDom, 'click', function(_e) {
              var cardIndex, tar;
              tar = _e.target.parentNode;
              if (tar.nodeName === 'LI' && curDeck.deck.length < CARD_NUM_MAX) {
                cardIndex = tar.getAttribute(cardDomIndexName);
                btnToClick.addToCard(cardIndex);
                return displayCurrentDeck();
              }
            });
            _.on(allDecksDom, 'click', function(_e) {
              var clickedDeck, spot, tar;
              tar = _e.target;
              spot = tar.getAttribute('spot');
              if (!spot) {
                return;
              }
              clickedDeck = decksStateCache.deckBySpot(spot);
              if (clickedDeck) {
                curDeck.cur = false;
                clickedDeck.cur = true;
                curDeck = clickedDeck;
                displayCurrentDeck();
                return displayAllDecks();
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
