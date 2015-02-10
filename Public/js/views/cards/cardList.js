
/*
  global.myCards = {
    deck:[],
    all:[]
  }
 */

(function() {
  var CARD_NUM_MAX, print,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  print = function(arr) {
    var b, d, v, _i, _len, _results;
    b = _.q('body');
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      v = arr[_i];
      d = document.createElement('div');
      d.innerText = v;
      _results.push(b.insertBefore(d, b.childNodes[0]));
    }
    return _results;
  };

  setTimeout(function() {
    print([document.body.clientHeight, document.body.clientWidth]);
    print(['----']);
    return print([window.screen.height]);
  }, 100);

  CARD_NUM_MAX = 10;

  _.on(window, 'load', function() {
    var allCardDom, allCards, allDecks, allDecksDom, allHeroes, allHeroesDom, curDeck, myDeckDom;
    myDeckDom = _.q('.my-deck');
    allDecksDom = _.q('.all-decks');
    allCardDom = _.q('.all-cards-list');
    allHeroesDom = _.q('.all-heroes-list');
    allDecks = global.myCards.deck;
    allDecks = allDecks.filter(function(el, _i) {
      return _i <= 3;
    });
    curDeck = allDecks[0];
    curDeck.cur = true;
    allCards = global.myCards.allCard;
    allHeroes = global.myCards.allHero;
    allCards = allCards.concat();
    allHeroes = allHeroes.concat();
    return (function() {
      var DECKS_ADD_STATE, DECKS_DELETE_STATE, cardOneTmp, currentNum, deckOneTmp, decksEditState, decksStateCache, getCardObjByCache, heroOneTmp, indexPre, pressToDelete;
      if (global.myCards) {
        DECKS_ADD_STATE = 1;
        DECKS_DELETE_STATE = 2;
        indexPre = cardFactory.indexPre;
        deckOneTmp = _.q('#deck-one-tmp');
        cardOneTmp = _.q('#card-one-tmp');
        heroOneTmp = _.q('#hero-one-tmp');
        currentNum = 0;
        decksEditState = DECKS_ADD_STATE;
        getCardObjByCache = (function() {
          var cardObjCache, heroObjCache;
          cardObjCache = {};
          heroObjCache = {};
          return function(_cardIndex, _type) {
            var cache, fn, result;
            cache = {};
            fn = '';
            if (!_cardIndex) {
              return null;
            }
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
        decksStateCache = (function() {
          var children, deckPositionDom, deckSpotAttr, deckSpotDomMap, deckSpotNames, domSpotMap, i, s, set, _i, _len;
          deckSpotAttr = 'spot';
          deckSpotNames = ['a', 'b', 'c', 'd'];
          deckSpotDomMap = {};
          domSpotMap = {};
          children = allDecksDom.children;
          for (i = _i = 0, _len = children.length; _i < _len; i = ++_i) {
            deckPositionDom = children[i];
            s = deckSpotNames[i];
            deckPositionDom.setAttribute(deckSpotAttr, s);
            domSpotMap[s] = deckPositionDom;
          }
          set = function() {
            var deckOne, spotName, _j, _len1, _results;
            _results = [];
            for (i = _j = 0, _len1 = deckSpotNames.length; _j < _len1; i = ++_j) {
              spotName = deckSpotNames[i];
              deckOne = allDecks[i];
              if (deckOne) {
                deckOne.spot = spotName;
              }
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
        pressToDelete = (function() {
          var decksHammer, isShake, spots;
          isShake = false;
          spots = allDecksDom.children;
          decksHammer = new Hammer(allDecksDom);
          decksHammer.on('press', function(_ev) {
            console.log('press on decksDom');
            if (!isShake) {
              isShake = true;
              decksEditState = DECKS_DELETE_STATE;
              return _.addClass(spots, 'deck-one-shake');
            }
          });
          return _.on(window, 'mousedown', function(e) {
            if (isShake) {
              isShake = false;
              decksEditState = DECKS_ADD_STATE;
            }
            return _.removeClass(spots, 'deck-one-shake');
          });
        })();
        return (function() {
          var btnToClick, cardDomIndexName, deckBuilder, displayAllCards, displayAllDecks, displayAllHeroes, displayCurrentDeck, heroDomIndexName;
          cardDomIndexName = 'cardIndex';
          heroDomIndexName = 'heroIndex';
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
                deckBuilder.buildEnd();
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
              return LLApi.CardList.saveCards(param, function(_e, _d) {
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
          deckBuilder = (function() {
            var BUILDER_BEF, BUILDER_END, ON_BUILDING, allHeroUl, allHeroesBg, buildState, deleteUpdateToServer, hideHeroSelect, isSet, removeInDecks, resetDeck, showHeroSelect;
            BUILDER_BEF = 'before';
            ON_BUILDING = 'onBuilding';
            BUILDER_END = 'end';
            buildState = BUILDER_END;
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
            removeInDecks = function(_deck) {
              var deck, i, _i, _len, _results;
              _results = [];
              for (i = _i = 0, _len = allDecks.length; _i < _len; i = ++_i) {
                deck = allDecks[i];
                if (deck === _deck) {
                  allDecks.splice(i, 1);
                  if (allDecks[i]) {
                    curDeck = allDecks[i];
                    curDeck.cur = true;
                  } else if (allDecks[i - 1]) {
                    curDeck = allDecks[i - 1];
                    curDeck.cur = true;
                  } else {
                    curDeck = null;
                  }
                  console.log(allDecks);
                  break;
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            };
            deleteUpdateToServer = function(_spot) {
              var param;
              param = {
                uid: global.user.userId,
                token: global.user.sessionToken,
                spot: _spot
              };
              console.log(param);
              return LLApi.CardList.deleteDeck(param, function(_e, _d) {
                if (typeof _d === 'string') {
                  _d = JSON.parse(_d);
                }
                if (_d.result === 'true' || _d.result === true) {
                  return console.log(_d);
                }
              });
            };
            showHeroSelect = function() {
              _.show(allHeroesBg, allHeroUl);
              if (!isSet) {
                isSet = true;
                _.on(allHeroesBg, 'click', function(_e) {
                  return hideHeroSelect();
                });
                return _.on(allHeroUl, 'click', function(_e) {
                  var heroIndex, tar;
                  tar = _e.target.parentNode;
                  if (tar.nodeName === 'LI') {
                    heroIndex = tar.getAttribute(heroDomIndexName);
                    resetDeck(heroIndex);
                    buildState = ON_BUILDING;
                    return hideHeroSelect();
                  }
                });
              }
            };
            hideHeroSelect = function() {
              return _.hide(allHeroesBg, allHeroUl);
            };
            return {
              build: function(_tar) {
                if (buildState === BUILDER_END) {
                  console.log('start build new');
                  buildState = BUILDER_BEF;
                  return showHeroSelect();
                } else {
                  return console.log('to be building');
                }
              },
              buildEnd: function() {
                return buildState = BUILDER_END;
              },
              remove: function(_target) {
                var deck, spot;
                spot = _target.getAttribute('spot');
                deck = decksStateCache.deckBySpot(spot);
                removeInDecks(deck);
                decksStateCache.refresh();
                deleteUpdateToServer(spot);
                displayCurrentDeck();
                return displayAllDecks();
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
            if (curDeck) {
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
            }
          };
          displayAllDecks = function() {
            var clearSpot, deckCurStyle, deckDom, deckOne, deckSpots, heroObj, i, setHero, _i, _len, _results;
            deckSpots = allDecksDom.children;
            deckCurStyle = 'deck-one-cur';
            clearSpot = function(_deckDom) {
              _.css(_deckDom, 'backgroundImage', '');
              return _.removeClass(_deckDom, deckCurStyle);
            };
            setHero = function(_deckDom, _heroObj, _isCur) {
              var heroImg;
              if (_isCur) {
                _.addClass(_deckDom, deckCurStyle);
              } else {
                _.removeClass(_deckDom, deckCurStyle);
              }
              heroImg = cardFactory.heroAvatarPre + _heroObj.img;
              return _.css(_deckDom, 'backgroundImage', 'url(' + heroImg + ')');
            };
            _results = [];
            for (i = _i = 0, _len = deckSpots.length; _i < _len; i = ++_i) {
              deckDom = deckSpots[i];
              deckOne = allDecks[i] || {};
              heroObj = getCardObjByCache(deckOne.hero, 'hero');
              if (heroObj) {
                _results.push(setHero(deckDom, heroObj, deckOne.cur));
              } else {
                _results.push(clearSpot(deckDom));
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
            return _.on(allDecksDom, 'mousedown', function(_e) {
              var clickedDeck, spot, target;
              target = _e.target;
              spot = target.getAttribute('spot');
              if (!spot) {
                return;
              }
              if (decksEditState === DECKS_ADD_STATE) {
                clickedDeck = decksStateCache.deckBySpot(spot);
                if (clickedDeck) {
                  curDeck.cur = false;
                  clickedDeck.cur = true;
                  curDeck = clickedDeck;
                  displayCurrentDeck();
                  displayAllDecks();
                } else {
                  deckBuilder.build(target);
                }
              } else if (decksEditState === DECKS_DELETE_STATE) {
                deckBuilder.remove(target);
              }
            });
          })();
        })();
      }
    })();
  });

}).call(this);
