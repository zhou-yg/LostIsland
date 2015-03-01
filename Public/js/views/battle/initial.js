(function() {
  var BottomOpBarClass, ChessListClass, HeroPanelClass, PersonalBoxClass, PrepareUiClass, RecordPanelClass, cc, ce, prepareUiDom, screenWidth;

  ce = React.createElement;

  cc = React.createClass;

  screenWidth = window.screen.width;

  HeroPanelClass = cc({
    render: function() {
      return ce('div', {
        className: 'hero'
      }, null);
    }
  });

  RecordPanelClass = cc({
    getInitialState: function() {
      return {
        level: {
          name: '等级:',
          num: '青铜1'
        },
        records: [
          {
            pre: '胜场:',
            value: 100
          }, {
            pre: '胜率:',
            value: '66.7%'
          }
        ]
      };
    },
    render: function() {
      return ce('ul', {
        className: 'record'
      }, ce('li', {
        className: 'record-one'
      }, ce('span', {}, this.state.level.name), ce('span', {}, this.state.level.num)), this.state.records.map(function(record, i) {
        return ce('li', {
          className: 'record-one',
          key: 'recordLi' + i
        }, ce('span', {}, record.pre), ce('span', {}, record.value));
      }));
    }
  });

  PersonalBoxClass = cc({
    render: function() {
      return ce('div', {
        className: 'personal'
      }, ce(HeroPanelClass, {}, null), ce(RecordPanelClass, {}, null));
    }
  });

  ChessListClass = cc({
    getInitialState: function() {
      var chessMap, perLeft, sWidth;
      sWidth = screenWidth * 0.96;
      perLeft = sWidth * 0.2;
      chessMap = this.props.chessMap;
      chessMap.chessList = chessMap.chessList.map(function(chessOne, i) {
        if (typeof chessOne !== 'object') {
          chessOne = {};
        }
        chessOne.key = 'chessLi' + i;
        chessOne.ox = perLeft * i;
        chessOne.oy = 10;
        chessOne.x = chessOne.ox + 'px';
        chessOne.y = chessOne.oy + 'px';
        return chessOne;
      });
      return {
        chessMap: chessMap,
        touchesXY: {
          x: 0,
          y: 0
        }
      };
    },
    touchOnChess: function(ev) {
      var firstTouch;
      firstTouch = ev.nativeEvent.touches[0];
      ev.target.style.zIndex = 10;
      return this.setState({
        touchesXY: {
          x: firstTouch.clientX,
          y: firstTouch.clientY
        }
      });
    },
    moveOnChess: function(ev) {
      var chessMap, chessOne, current, firstTouch, i, key, startXY, target, _i, _len, _ref;
      target = ev.target;
      key = ev.dispatchMarker.match(/[\w]*$/);
      key = key[0];
      chessMap = this.state.chessMap;
      startXY = this.state.touchesXY;
      firstTouch = ev.nativeEvent.touches[0];
      firstTouch = {
        x: firstTouch.clientX,
        y: firstTouch.clientY
      };
      _ref = chessMap.chessList;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        chessOne = _ref[i];
        if (chessOne.key === key) {
          current = chessOne;
          break;
        }
      }
      current.x = current.ox + (firstTouch.x - startXY.x) + 'px';
      current.y = current.oy + (firstTouch.y - startXY.y) + 'px';
      target.style.left = current.x;
      return target.style.top = current.y;
    },
    leaveChess: function() {
      return console.log('touchend');
    },
    render: function() {
      var chessMap, that;
      chessMap = this.props.chessMap;
      that = this;
      return ce('section', {
        className: 'behind-cards'
      }, ce('h3', {}, chessMap.name), ce('hr', {
        className: 'h-line'
      }, null), ce('ul', {
        className: 'cards'
      }, chessMap.chessList.map(function(chess, i) {
        var bgImg;
        bgImg = chess.img;
        if (bgImg) {
          bgImg = chessFactory.chessAvatarPre + bgImg;
          return ce('li', {
            onTouchStart: that.touchOnChess,
            onTouchMove: that.moveOnChess,
            onTouchEnd: that.leaveChess,
            style: {
              backgroundImage: bgImg,
              top: chess.y,
              left: chess.x
            },
            key: chess.key
          });
        } else {
          return ce('li', {
            onTouchStart: that.touchOnChess,
            onTouchMove: that.moveOnChess,
            onTouchEnd: that.leaveChess,
            style: {
              top: chess.y,
              left: chess.x
            },
            key: chess.key
          }, null);
        }
      })));
    }
  });

  BottomOpBarClass = cc({
    getInitialState: function() {
      return {};
    },
    render: function() {
      return ce('ul', {
        className: 'start-battle'
      }, ce('li', {
        className: 'left'
      }, ce('a', {
        href: '#'
      }, '排行榜')), ce('li', {
        className: 'left'
      }, ce('a', {
        href: '#'
      }, '无')), ce('li', {
        className: 'center'
      }, ce('a', {
        href: '#'
      }, '匹配')), ce('li', {
        className: 'right'
      }, ce('a', {
        href: '#'
      }, '编辑')), ce('li', {
        className: 'right'
      }, ce('a', {
        href: '#'
      }, '设置')));
    }
  });

  PrepareUiClass = cc({
    render: function() {
      return ce('div', {}, ce(PersonalBoxClass), ce(ChessListClass, {
        chessMap: {
          name: '表1',
          chessList: [1, 2, 3]
        }
      }), ce(ChessListClass, {
        chessMap: {
          name: '表2',
          chessList: [1, 2, 3]
        }
      }), ce(BottomOpBarClass, {}));
    }
  });

  prepareUiDom = document.querySelector('.prepare-ui');

  React.render(ce(PrepareUiClass), prepareUiDom);

}).call(this);
