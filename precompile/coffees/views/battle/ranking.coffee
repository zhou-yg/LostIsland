ce = React.createElement
cc = React.createClass

MyRecordClass = cc {
  getInitialState:->
    {
      userMsg:{
        avatar:userMsg.character
        name:userMsg.username
        win:userMsg.win
      }
    }
  render:->
    userMsg = @state.userMsg

    ce 'header',{ className:'my-record' },
      (ce 'div',{ className:'my-avatar',style:{
        backgroundImage:'url('+userMsg.avatar+')'
      }})
      (ce 'div',{ className:'ranking-msg' },
        (ce 'header',{ className:'my-name' },userMsg.name)
        (ce 'div',{ className:'my-scores' },
          (ce 'span',{ className:'scores-pre' },'分数:')
          (ce 'span',{ className:'scores-value' },userMsg.win)
        )
      )
      (ce 'div',{ className:'ranking-index' },userMsg.win)
}
AllRankingListLiClass = cc {
  getInitialState:->
    {
      rankingObj:@props.rankingObj
    }

  render:->
    state = @state

    ce 'li',{ className:'ranking-one' },
      (ce 'dl',{},
        (ce 'dd',{ className:'avatar',style:{
          backgroundImage:'url('+baseUrl+state.rankingObj.avatar+')'
        }})
        (ce 'dd',{ className:'name' },state.rankingObj.username)
        (ce 'dd',{ className:'index' },state.rankingObj.win)
      )
}
AllRankingListClass = cc {
  getInitialState:->
    rankingList = @props.rankingList
    {
      rankingList:rankingList
    }
  render:->
    rankingList = @state.rankingList

    rankingListArr = rankingList.map (rankingObj,i)->
      rankingObj.index = i
      ce AllRankingListLiClass,{ rankingObj:rankingObj,key:'rankingLi'+i }

    ce 'div',{},
      ce MyRecordClass,{ }
      ce 'div',{ className:'all-list' },
        (ce 'ol',{},
          rankingListArr
        )
}

RankingBottomOpBarClass = cc {
  getInitialState:->
    {
      bottomList:[{
        className:'right'
        name:'exit'
        label:'返回'
      }]
    }
  #ev = {},notClicked自定义
  exit:(ev)->
    renderRankingListObj.hide()
    renderInitialObj.does()

  render:->
    that = this
    btnList = @state.bottomList

    ce 'ul',{ className:'bottom-ops' },
      btnList.map (liOne,i)->
        className = liOne.className
        (ce 'li',{
          className:className
          onClick:that[liOne.name]
          key:'bottomLi'+i
        },liOne.label)
}

AllRankingList = RankingBottomOpBar = null

window.renderRankingListObj = do ->
  rankingDom = document.getElementById('ranking')
  rankingListDom = document.getElementById('ranking-list')
  rankingBottomDom = document.getElementById('ranking-bottom')

  rankingDom.style.height = screen.height+'px';

  return {
    does:->
      LLApi.Client().Ranking.rankingByScores {
        type:'all'
      },(err,data)->
        console.log err,data
        if data.result
          AllRankingList = React.render(
            ce AllRankingListClass,{ rankingList:data.data }
            rankingListDom
          )
          RankingBottomOpBar = React.render(
            ce RankingBottomOpBarClass,{ }
            rankingBottomDom
          )
          rankingDom.style.display = 'block'
    hide:->
      rankingDom.style.display = 'none'
  }
