(function() {
  var AllRankingList, AllRankingListClass, AllRankingListLiClass, MyRecordClass, RankingBottomOpBar, RankingBottomOpBarClass, cc, ce;

  ce = React.createElement;

  cc = React.createClass;

  MyRecordClass = cc({
    getInitialState: function() {
      return {
        userMsg: {
          avatar: userMsg.character,
          name: userMsg.username,
          win: userMsg.win
        }
      };
    },
    render: function() {
      var userMsg;
      userMsg = this.state.userMsg;
      return ce('header', {
        className: 'my-record'
      }, ce('div', {
        className: 'my-avatar',
        style: {
          backgroundImage: 'url(' + userMsg.avatar + ')'
        }
      }), ce('div', {
        className: 'ranking-msg'
      }, ce('header', {
        className: 'my-name'
      }, userMsg.name), ce('div', {
        className: 'my-scores'
      }, ce('span', {
        className: 'scores-pre'
      }, '分数:'), ce('span', {
        className: 'scores-value'
      }, userMsg.win))), ce('div', {
        className: 'ranking-index'
      }, userMsg.win));
    }
  });

  AllRankingListLiClass = cc({
    getInitialState: function() {
      return {
        rankingObj: this.props.rankingObj
      };
    },
    render: function() {
      var state;
      state = this.state;
      return ce('li', {
        className: 'ranking-one'
      }, ce('dl', {}, ce('dd', {
        className: 'avatar',
        style: {
          backgroundImage: 'url(' + baseUrl + state.rankingObj.avatar + ')'
        }
      }), ce('dd', {
        className: 'name'
      }, state.rankingObj.username), ce('dd', {
        className: 'index'
      }, state.rankingObj.win)));
    }
  });

  AllRankingListClass = cc({
    getInitialState: function() {
      var rankingList;
      rankingList = this.props.rankingList;
      return {
        rankingList: rankingList
      };
    },
    render: function() {
      var rankingList, rankingListArr;
      rankingList = this.state.rankingList;
      rankingListArr = rankingList.map(function(rankingObj, i) {
        rankingObj.index = i;
        return ce(AllRankingListLiClass, {
          rankingObj: rankingObj,
          key: 'rankingLi' + i
        });
      });
      return ce('div', {}, ce(MyRecordClass, {}), ce('div', {
        className: 'all-list'
      }, ce('ol', {}, rankingListArr)));
    }
  });

  RankingBottomOpBarClass = cc({
    getInitialState: function() {
      return {
        bottomList: [
          {
            className: 'right',
            name: 'exit',
            label: '返回'
          }
        ]
      };
    },
    exit: function(ev) {
      renderRankingListObj.hide();
      return renderInitialObj.does();
    },
    render: function() {
      var btnList, that;
      that = this;
      btnList = this.state.bottomList;
      return ce('ul', {
        className: 'bottom-ops'
      }, btnList.map(function(liOne, i) {
        var className;
        className = liOne.className;
        return ce('li', {
          className: className,
          onClick: that[liOne.name],
          key: 'bottomLi' + i
        }, liOne.label);
      }));
    }
  });

  AllRankingList = RankingBottomOpBar = null;

  window.renderRankingListObj = (function() {
    var rankingBottomDom, rankingDom, rankingListDom;
    rankingDom = document.getElementById('ranking');
    rankingListDom = document.getElementById('ranking-list');
    rankingBottomDom = document.getElementById('ranking-bottom');
    rankingDom.style.height = screen.height + 'px';
    return {
      does: function() {
        return LLApi.Client().Ranking.rankingByScores({
          type: 'all'
        }, function(err, data) {
          console.log(err, data);
          if (data.result) {
            AllRankingList = React.render(ce(AllRankingListClass, {
              rankingList: data.data
            }), rankingListDom);
            RankingBottomOpBar = React.render(ce(RankingBottomOpBarClass, {}), rankingBottomDom);
            return rankingDom.style.display = 'block';
          }
        });
      },
      hide: function() {
        return rankingDom.style.display = 'none';
      }
    };
  })();

}).call(this);
