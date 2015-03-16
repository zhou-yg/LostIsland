(function() {
  var BottomOpBarClass, ChessListClass, HeroPanelClass, PersonalBoxClass, RecordPanelClass, cards1List, cards2List, cc, ce, chessListOne, chessListTwo, chessObjArr, personPanel;

  ce = React.createElement;

  cc = React.createClass;

  chessObjArr = userMsg.chess.map(function(chessIn) {
    return chessFactory.getChessByCid(chessIn);
  });

  cards1List = chessObjArr.slice(0, 5);

  cards2List = chessObjArr.slice(5);

  window.cardsAllArr = [cards1List, cards2List];

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
          num: '1'
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
                console.log('change', cardsAllArr);
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

  BottomOpBarClass = cc({
    getInitialState: function() {
      return {
        bottomList: [],
        normalList: [
          {
            className: 'left',
            name: 'list',
            label: '排行榜'
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
    edit: function() {
      var isEdit;
      chessListOne.changeState();
      chessListTwo.changeState();
      isEdit = !this.state.isEdit;
      if (!isEdit) {
        LLApi.Chess.saveChess({
          uid: userMsg.uid,
          token: userMsg.token,
          chess: cardsAllArr[0].concat(cardsAllArr[1]).map(function(chessObj) {
            return chessObj.cid;
          })
        }, function(err, data) {
          return console.log(err, data);
        });
      }
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
    var cards1Dom, cards2Dom, footerDom, headerDom;
    headerDom = document.getElementById('header');
    cards1Dom = document.getElementById('cards1');
    cards2Dom = document.getElementById('cards2');
    footerDom = document.getElementById('footer');
    return {
      does: function() {
        personPanel = React.render(ce(PersonalBoxClass), headerDom);
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
        return React.render(ce(BottomOpBarClass), footerDom);
      }
    };
  })();

}).call(this);
