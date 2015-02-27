(function() {
  var ChessListClass, HeroPanelClass, PersonalBoxClass, PrepareUiClass, RecordPanelClass, cc, ce, prepareUiDom;

  ce = React.createElement;

  cc = React.createClass;

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
    render: function() {
      var listMap;
      listMap = this.props.listMap;
      return ce('section', {
        className: 'behind-cards'
      }, ce('h3', {}, listMap.name), ce('hr', {
        className: 'h-line'
      }, null), ce('ul', {
        className: 'cards'
      }, listMap.chessList.map(function(chess, i) {
        var bgImg;
        bgImg = chess.img;
        if (bgImg) {
          bgImg = chessFactory.chessAvatarPre + bgImg;
          return ce('li', {
            style: {
              backgroundImage: bgImg
            },
            key: 'chessLi' + i
          });
        } else {
          return ce('li', {
            key: 'chessLi' + i
          }, null);
        }
      })));
    }
  });

  PrepareUiClass = cc({
    render: function() {
      return ce('div', {}, ce(PersonalBoxClass), ce(ChessListClass, {
        listMap: {
          name: '表1',
          chessList: [1, 2, 3]
        }
      }), ce(ChessListClass, {
        listMap: {
          name: '表2',
          chessList: [1, 2, 3]
        }
      }));
    }
  });

  prepareUiDom = document.querySelector('.prepare-ui');

  React.render(ce(PrepareUiClass), prepareUiDom);

}).call(this);
