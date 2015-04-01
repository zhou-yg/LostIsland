(function() {
  var ChessListClass, HeroPanelClass, InitBottomOpBarClass, PersonalBoxClass, RecordPanelClass, cardsAllArr, cc, ce, chessListOne, chessListTwo, personPanel;

  cardsAllArr = userMsg.cardsAllArr;

  ce = React.createElement;

  cc = React.createClass;

  HeroPanelClass = cc({
    render: function() {
      return ce('div', {
        className: 'hero',
        style: {
          backgroundImage: 'url(' + this.props.avatar + ')'
        }
      }, null);
    }
  });

  RecordPanelClass = cc({
    getInitialState: function() {
      return {};
    },
    render: function() {
      var records;
      records = this.props.records;
      records = [
        {
          pre: '',
          value: records.userName
        }, {
          pre: '等级:',
          value: records.level
        }, {
          pre: '胜场:',
          value: records.win
        }, {
          pre: '胜率:',
          value: records.winRate
        }
      ];
      return ce('ul', {
        className: 'record'
      }, records.map(function(record, i) {
        return ce('li', {
          className: 'record-one',
          key: 'recordLi' + i
        }, ce('span', {}, record.pre), ce('span', {}, record.value));
      }));
    }
  });

  PersonalBoxClass = cc({
    getInitialState: function() {
      var msg, that;
      that = this;
      msg = this.props.userMsg;
      msg.winRate = msg.win ? msg.win / (msg.win + msg.lose) : 0;
      return {
        msg: msg
      };
    },
    render: function() {
      var msg;
      msg = this.state.msg;
      return ce('div', {
        className: 'personal'
      }, ce(HeroPanelClass, {
        avatar: msg.character
      }, null), ce(RecordPanelClass, {
        records: {
          userName: msg.username,
          level: msg.level,
          win: msg.win,
          winRate: msg.winRate
        }
      }, null));
    }
  });

  ChessListClass = cc({
    getInitialState: function() {
      var chessList, chessListIn, perLeft, sWidth;
      sWidth = window.screen.width * 0.96;
      perLeft = sWidth * 0.2;
      chessListIn = this.props.chessMap.chessListIn;
      chessList = cardsAllArr[chessListIn];
      chessList.forEach(function(chessOne, i) {
        if (typeof chessOne !== 'object') {
          chessOne = {};
        }
        chessOne.key = 'chessLi' + chessListIn + i;
        return chessOne;
      });
      return {
        name: this.props.chessMap.name,
        chessList: chessList,
        perLeft: perLeft,
        top: 10,
        isEdit: false,
        ulClass: ['cards', 'cards-edit']
      };
    },
    changeState: function() {
      return this.setState({
        isEdit: !this.state.isEdit
      });
    },
    touchOnChess: function(rev) {
      var cards, chessList, chessOne, chessOne2, i, isChange, isEdit, j, key, _i, _j, _k, _len, _len1, _len2;
      isEdit = this.state.isEdit;
      if (!isEdit) {
        return;
      }
      key = rev.dispatchMarker.match(/[\w]*[\d]$/);
      key = key[0];
      chessList = this.state.chessList;
      for (i = _i = 0, _len = chessList.length; _i < _len; i = ++_i) {
        chessOne = chessList[i];
        if (chessOne.key === key) {
          isChange = false;
          for (_j = 0, _len1 = cardsAllArr.length; _j < _len1; _j++) {
            cards = cardsAllArr[_j];
            for (j = _k = 0, _len2 = cards.length; _k < _len2; j = ++_k) {
              chessOne2 = cards[j];
              if (chessOne2.isSelected && chessOne2.key !== key) {
                chessOne2.isSelected = false;
                cards[j] = chessOne;
                chessList[i] = chessOne2;
                isChange = true;
                break;
              }
            }
          }
          if (!isChange) {
            chessOne.isSelected = !chessOne.isSelected;
            console.log('mark', cardsAllArr);
          }
          break;
        }
      }
      chessListOne.forceUpdate();
      return chessListTwo.forceUpdate();
    },
    moveOnChess: function(rev) {},
    leaveChess: function(rev) {},
    render: function() {
      var chessList, perLeft, that, top, ulClass;
      chessList = this.state.chessList;
      that = this;
      ulClass = this.state.ulClass[+this.state.isEdit];
      perLeft = this.state.perLeft;
      top = this.state.top;
      return ce('section', {
        className: 'behind-cards'
      }, ce('h3', {}, this.state.name), ce('hr', {
        className: 'h-line'
      }, null), ce('ul', {
        className: ulClass
      }, chessList.map(function(chess, i) {
        var bgImg;
        bgImg = chess.img;
        if (bgImg) {
          bgImg = chessFactory.chessAvatarPre + bgImg;
          return ce('li', {
            onTouchStart: that.touchOnChess,
            onTouchMove: that.moveOnChess,
            onTouchEnd: that.leaveChess,
            style: {
              backgroundImage: 'url(' + bgImg + ')',
              top: top,
              left: perLeft * i + 'px'
            },
            key: chess.key
          }, ce('div', {
            className: 'selected',
            style: {
              display: chess.isSelected ? 'block' : 'none'
            }
          }));
        } else {
          return ce('li', {
            onTouchStart: that.touchOnChess,
            onTouchMove: that.moveOnChess,
            onTouchEnd: that.leaveChess,
            style: {
              top: top,
              left: perLeft * i + 'px'
            },
            key: chess.key
          }, ce('div', {
            className: 'selected',
            style: {
              display: chess.isSelected ? 'block' : 'none'
            }
          }, i));
        }
      })));
    }
  });

  InitBottomOpBarClass = cc({
    getInitialState: function() {
      return {
        bottomList: [],
        normalList: [
          {
            className: 'left',
            name: 'list',
            label: '排行'
          }, {
            className: 'left',
            name: 'none',
            label: '无'
          }, {
            className: 'center',
            name: 'match',
            label: '匹配'
          }, {
            className: 'right',
            name: 'setting',
            label: '设置'
          }, {
            className: 'right',
            name: 'edit',
            label: '编辑'
          }
        ],
        onEditingList: [
          {
            className: 'right',
            name: 'submit',
            label: '确定'
          }
        ],
        isEdit: false
      };
    },
    list: function() {
      return LLApi.WS().Battle.display({}, function(err, data) {
        return console.log(err, data);
      });
    },
    match: function() {
      return LLApi.WS().Battle.match({
        uid: userMsg.uid
      }, function(err, data) {
        return console.log(err, data);
      });
    },
    edit: function() {
      var isEdit;
      chessListOne.changeState();
      chessListTwo.changeState();
      isEdit = !this.state.isEdit;
      if (!isEdit) {
        LLApi.Client().Chess.saveChess({
          uid: userMsg.uid,
          token: userMsg.token,
          chess: cardsAllArr[0].concat(cardsAllArr[1]).map(function(chessObj) {
            return chessObj.cid;
          })
        }, function(err, data) {
          return console.log(err, data);
        });
      }
      cardsAllArr.forEach(function(arr) {
        return arr.forEach(function(obj) {
          return delete obj.isSelected;
        });
      });
      return this.setState({
        isEdit: !this.state.isEdit
      });
    },
    cancel: function() {
      return this.edit();
    },
    submit: function() {
      return this.edit();
    },
    render: function() {
      var currentList, that;
      currentList = !this.state.isEdit ? this.state.normalList : this.state.onEditingList;
      that = this;
      return ce('ul', {
        className: 'bottom-ops'
      }, currentList.map(function(liOne, i) {
        return ce('li', {
          className: liOne.className,
          onClick: that[liOne.name],
          key: 'bottomLi' + i
        }, liOne.label);
      }));
    }
  });

  personPanel = chessListOne = chessListTwo = null;

  window.renderInitialObj = (function() {
    var cards1Dom, cards2Dom, footerDom, headerDom, initUiDom;
    initUiDom = document.getElementById('prepare-ui');
    headerDom = document.getElementById('header');
    cards1Dom = document.getElementById('cards1');
    cards2Dom = document.getElementById('cards2');
    footerDom = document.getElementById('footer');
    initUiDom.style.height = screen.height + 'px';
    return {
      does: function() {
        personPanel = React.render(ce(PersonalBoxClass, {
          userMsg: Object.create(userMsg)
        }), headerDom);
        chessListOne = React.render(ce(ChessListClass, {
          chessMap: {
            name: '表1',
            chessListIn: 0
          }
        }), cards1Dom);
        chessListTwo = React.render(ce(ChessListClass, {
          chessMap: {
            name: '表2',
            chessListIn: 1
          }
        }), cards2Dom);
        React.render(ce(InitBottomOpBarClass, {}), footerDom);
        return initUiDom.style.display = 'block';
      },
      hide: function() {
        return initUiDom.style.display = 'none';
      }
    };
  })();

  renderInitialObj.does();

}).call(this);
