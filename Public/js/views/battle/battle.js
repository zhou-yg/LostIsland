(function() {
  var BattleBottomOpBarClass, BattleFieldClass, EnemyListClass, PlayerBoxClass, battleFieldPanel, cc, ce, myPanel, rivalPlayerPanel, socketConnected;

  socketConnected = function(url) {
    console.log('socketConnected()');
    io.socket.get(url + '/addPlayer', {
      uid: userMsg.uid
    }, function(data) {
      return console.log(data);
    });
    return io.socket.on('match', function(msg) {
      console.log({
        '对手id': msg.uid
      });
      return LLApi.Client().User.getBasic({
        uid: msg.uid
      }, function(err, data) {
        var k, v, _ref;
        if (err) {
          console.log(err);
        } else {
          if (data.result) {
            _ref = data.data;
            for (k in _ref) {
              v = _ref[k];
              userMsg.rivalMsg[k] = v;
            }
          }
        }
        renderInitialObj.hide();
        return renderBattleObj.does();
      });
    });
  };

  io.socket.on('connect', function() {
    return socketConnected(io.sails.url);
  });

  ce = React.createElement;

  cc = React.createClass;

  PlayerBoxClass = cc({
    getInitialState: function() {
      var playerObj;
      playerObj = this.props.playerObj;
      return {
        playerObj: playerObj
      };
    },
    render: function() {
      var bgImageUrl, className, dots, dotsArr, i, isSelected, playerObj, username, _i, _j, _k, _len, _ref, _ref1;
      playerObj = this.state.playerObj;
      bgImageUrl = playerObj.character ? 'url(' + playerObj.character + ')' : '';
      username = playerObj.username;
      dotsArr = dots = [];
      if (playerObj.dots > 0) {
        for (i = _i = 1, _ref = playerObj.dots; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          dots.push(true);
        }
      }
      for (i = _j = _ref1 = playerObj.dots; _ref1 <= 2 ? _j <= 2 : _j >= 2; i = _ref1 <= 2 ? ++_j : --_j) {
        dots.push(false);
      }
      for (i = _k = 0, _len = dots.length; _k < _len; i = ++_k) {
        isSelected = dots[i];
        className = isSelected ? 'dot-one dot-selected' : 'dot-one';
        dotsArr.push(ce('li', {
          className: className,
          key: 'dot' + i
        }));
      }
      return ce('div', {
        className: 'player-box'
      }, ce('div', {
        className: 'player-img',
        style: {
          backgroundImage: bgImageUrl
        }
      }), ce('div', {
        className: 'player-name'
      }, username), ce('ul', {
        className: 'score-dots'
      }, dotsArr));
    }
  });

  EnemyListClass = cc({
    getInitialState: function() {
      var allChess, startLength;
      startLength = this.props.startLength;
      allChess = this.props.allChess;
      return {
        startLength: startLength,
        allChess: allChess,
        isMy: true
      };
    },
    clickOnChess: function(rev) {
      var allChess, chessObj, i, isAlreadySelected, key, selectedI, t, _i, _j, _len, _len1;
      if (!this.state.isMy) {
        return;
      }
      allChess = this.state.allChess;
      key = rev.dispatchMarker.match(/[\w]*[\d]$/);
      key = key[0];
      isAlreadySelected = selectedI = void 0;
      console.log([allChess[0].isSelected, allChess[1].isSelected, allChess[2].isSelected, allChess[3].isSelected, allChess[4].isSelected, allChess[5].isSelected]);
      for (i = _i = 0, _len = allChess.length; _i < _len; i = ++_i) {
        chessObj = allChess[i];
        if (chessObj.isSelected) {
          isAlreadySelected = true;
          selectedI = i;
          break;
        }
      }
      for (i = _j = 0, _len1 = allChess.length; _j < _len1; i = ++_j) {
        chessObj = allChess[i];
        if (chessObj.key === key && i !== selectedI) {
          if (isAlreadySelected) {
            allChess[selectedI].isSelected = false;
            allChess[i].isSelected = true;
            if (((0 <= selectedI && selectedI < 5) && (0 <= i && i < 5)) || (selectedI >= 5 && i >= 5)) {

            } else {
              t = chessObj;
              allChess[i] = allChess[selectedI];
              allChess[selectedI] = t;
            }
          } else {

          }
        }
      }
      return battleFieldPanel.setState({
        myChess: allChess
      });
    },
    render: function() {
      var chessList, chessOne, i, propertyObj, startLength, _i, _len, _ref;
      startLength = this.state.startLength;
      chessList = [];
      _ref = this.state.allChess.slice(startLength[0], startLength[0] + startLength[1]);
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        chessOne = _ref[i];
        propertyObj = {
          className: 'chess-one',
          key: chessOne.key,
          onClick: this.clickOnChess,
          style: {}
        };
        if (chessOne.img) {
          propertyObj.style.backgroundImage = 'url(' + chessFactory.chessAvatarPre + chessOne.img + ')';
        }
        if (chessOne.isSelected) {
          propertyObj.className += ' selected';
        }
        chessList.push(ce('li', propertyObj));
      }
      return ce('ul', {
        className: 'enemy'
      }, chessList);
    }
  });

  BattleFieldClass = cc({
    getInitialState: function() {
      var arr, chessI, i, myChess, rivalChess, _i, _j, _len, _len1, _ref;
      rivalChess = this.props.rivalChess;
      myChess = this.props.myChess;
      if (!_.isArray(rivalChess)) {
        rivalChess = new Array(5);
      }
      _ref = [rivalChess, myChess];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        arr = _ref[_i];
        for (i = _j = 0, _len1 = arr.length; _j < _len1; i = ++_j) {
          chessI = arr[i];
          arr[i] = chessI ? chessFactory.getChessByCid(chessI) : {};
        }
      }
      rivalChess.forEach(function(chessObj, i) {
        return chessObj.key = 'chessLi' + i;
      });
      myChess.forEach(function(chessObj, i) {
        if (i === 0) {
          chessObj.isSelected = true;
        }
        return chessObj.key = 'chessLi' + i;
      });
      return {
        rivalChess: rivalChess,
        myChess: myChess,
        endBtnState: {
          state: false,
          bgClass: ''
        }
      };
    },
    turnEnd: function() {
      return this.setState({
        endBtnState: {
          bgClass: 'endBtn-disabled'
        }
      });
    },
    turnEndOn: function() {
      return this.setState({
        endBtnState: {
          bgClass: 'endBtn-on'
        }
      });
    },
    turnEndOut: function() {
      return this.setState({
        endBtnState: {
          bgClass: ''
        }
      });
    },
    render: function() {
      var myChess, rivalChess;
      myChess = this.state.myChess;
      rivalChess = this.state.rivalChess;
      return ce('div', {}, ce(EnemyListClass, {
        allChess: rivalChess,
        startLength: [0, 5]
      }), ce('div', {
        className: 'battle-river'
      }, ce('button', {
        className: 'endBtn ' + this.state.endBtnState.bgClass,
        onClick: this.turnEnd,
        onTouchStart: this.turnEndOn,
        onMouseOver: this.turnEndOn,
        onTouchEnd: this.turnEndOut,
        onMouseOut: this.turnEndOut
      }, 'end')), ce(EnemyListClass, {
        isMy: true,
        allChess: myChess,
        startLength: [0, 5]
      }), ce(EnemyListClass, {
        isMy: true,
        allChess: myChess,
        startLength: [5, 5]
      }));
    }
  });

  BattleBottomOpBarClass = cc({
    getInitialState: function() {
      return {
        bottomList: [],
        normalList: [
          {
            name: 'exit',
            label: '退出'
          }
        ],
        isEdit: false
      };
    },
    exit: function() {
      return console.log('battle exit');
    },
    render: function() {
      var currentList, that;
      currentList = !this.state.isEdit ? this.state.normalList : this.state.onEditingList;
      that = this;
      return ce('ul', {
        className: 'bottom-ops'
      }, currentList.map(function(liOne, i) {
        var className;
        className = liOne.className;
        className = !className ? 'right' : void 0;
        return ce('li', {
          className: className,
          onClick: that[liOne.name],
          key: 'bottomLi' + i
        }, liOne.label);
      }));
    }
  });

  rivalPlayerPanel = battleFieldPanel = myPanel = null;

  window.renderBattleObj = (function() {
    var battleFieldDom, battleUiDom, footerDom, myDom, rivalPlayerDom;
    battleUiDom = document.getElementById('battle');
    rivalPlayerDom = document.getElementById('rival-box');
    battleFieldDom = document.getElementById('battle-field');
    myDom = document.getElementById('my-box');
    footerDom = document.getElementById('game-bottom');
    battleUiDom.style.height = screen.height + 'px';
    return {
      does: function() {
        rivalPlayerPanel = React.render(ce(PlayerBoxClass, {
          playerObj: userMsg.rivalMsg
        }), rivalPlayerDom);
        battleFieldPanel = React.render(ce(BattleFieldClass, {
          rivalChess: userMsg.rivalMsg.chess,
          myChess: userMsg.chess
        }), battleFieldDom);
        myPanel = React.render(ce(PlayerBoxClass, {
          playerObj: userMsg
        }), myDom);
        React.render(ce(BattleBottomOpBarClass, {}), footerDom);
        return battleUiDom.style.display = 'block';
      },
      hide: function() {
        return battleUiDom.style.display = 'none';
      }
    };
  })();

}).call(this);
