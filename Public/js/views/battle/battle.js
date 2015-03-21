(function() {
  var BattleBottomOpBarClass, BattleFieldClass, EnemyListClass, PlayerBoxClass, cc, ce, socketConnected;

  socketConnected = function(url) {
    console.log('socketConnected()');
    return io.socket.get(url + '/addPlayer', {
      uid: userMsg.uid
    }, function(data) {
      return console.log(data);
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
      if (!playerObj.dots) {
        playerObj.dots = new Array(3);
      }
      return {
        playerObj: playerObj
      };
    },
    render: function() {
      var className, dotsArr, i, isSelected, playerObj, _i, _len, _ref;
      playerObj = this.state.playerObj;
      dotsArr = [];
      _ref = playerObj.dots;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        isSelected = _ref[i];
        className = isSelected ? 'dot-one dot-selected' : 'dot-one';
        dotsArr.push(ce('li', {
          className: className,
          key: 'dot' + i
        }));
      }
      return ce('div', {
        className: 'player-box'
      }, ce('div', {
        className: 'player-img'
      }), ce('div', {
        className: 'player-name'
      }, playerObj.name), ce('ul', {
        className: 'score-dots'
      }, dotsArr));
    }
  });

  EnemyListClass = cc({
    getInitialState: function() {
      var chessList;
      chessList = this.props.chessList;
      if (!chessList) {
        chessList = new Array(5);
      }
      return {
        chessList: chessList
      };
    },
    render: function() {
      var chessList, chessOne, i, _i, _len, _ref;
      chessList = [];
      _ref = this.state.chessList;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        chessOne = _ref[i];
        chessList.push(ce('li', {
          className: 'chess-one',
          key: 'chessLi' + i
        }));
      }
      return ce('ul', {
        className: 'enemy'
      }, chessList);
    }
  });

  BattleFieldClass = cc({
    getInitialState: function() {
      return {};
    },
    render: function() {
      return ce('div', {}, ce(EnemyListClass), ce('div', {
        className: 'battle-river'
      }, ce('button', {
        className: 'endBtn',
        'end': 'end'
      })), ce(EnemyListClass), ce(EnemyListClass));
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

  window.renderBattleObj = (function() {
    var battleFieldDom, footerDom, myDom, rivalPlayerDom;
    rivalPlayerDom = document.getElementById('rival-box');
    battleFieldDom = document.getElementById('battle-field');
    myDom = document.getElementById('my-box');
    footerDom = document.getElementById('game-bottom');
    return {
      does: function() {
        var battleFieldPanel, myPanel, rivalPlayerPanel;
        rivalPlayerPanel = React.render(ce(PlayerBoxClass, {
          playerObj: {}
        }), rivalPlayerDom);
        battleFieldPanel = React.render(ce(BattleFieldClass, {}), battleFieldDom);
        myPanel = React.render(ce(PlayerBoxClass, {
          playerObj: {}
        }), myDom);
        return React.render(ce(BattleBottomOpBarClass, {}), footerDom);
      }
    };
  })();

}).call(this);
