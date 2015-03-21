socketConnected = (url)->
  console.log 'socketConnected()'
  io.socket.get(url+'/addPlayer',{
    uid:userMsg.uid
  },(data)->
    console.log data
  )

io.socket.on 'connect',->
  socketConnected(io.sails.url)

ce = React.createElement
cc = React.createClass

PlayerBoxClass = cc {
  getInitialState:->
    playerObj = @props.playerObj
    if !playerObj.dots then playerObj.dots = new Array(3)
    {
      playerObj:playerObj
    }
  render:->
    playerObj = @state.playerObj

    dotsArr = []
    for isSelected,i in playerObj.dots
      className = if isSelected then 'dot-one dot-selected' else 'dot-one'
      dotsArr.push(
        ce 'li',{ className:className,key:'dot'+i }
      )

    ce 'div',{ className:'player-box' },
      (ce 'div',{ className:'player-img' })
      (ce 'div',{ className:'player-name' },playerObj.name )
      (ce 'ul', { className:'score-dots' },
        dotsArr
      )
}

EnemyListClass = cc {
  getInitialState:->
    chessList = @props.chessList
    if !chessList then chessList = new Array(5)
    {
      chessList:chessList
    }
  render:->
    chessList =  []
    for chessOne,i in @state.chessList
      chessList.push(
        ce 'li',{ className:'chess-one',key:'chessLi'+i}
      )
    ce 'ul',{ className:'enemy' },
      chessList


}
BattleFieldClass = cc {
  getInitialState:->
    {}
  render:->
    ce 'div', {},
      (ce EnemyListClass )
      (ce 'div',{ className:'battle-river' },
        ce 'button',{ className:'endBtn','end' }
      )
      (ce EnemyListClass )
      (ce EnemyListClass )
}
BattleBottomOpBarClass = cc {
  getInitialState:->
    {
      bottomList:[]
      normalList:[{
        name:'exit'
        label:'退出'
      }]
      isEdit:false
    }
  exit:->
    console.log 'battle exit'
  render:->
    currentList = if !@state.isEdit then @state.normalList else @state.onEditingList
    that = this

    ce 'ul',{ className:'bottom-ops' },
      currentList.map (liOne,i)->
        className = liOne.className
        className = if !className then 'right'
        (ce 'li',{
          className:className
          onClick:that[liOne.name]
          key:'bottomLi'+i
        },liOne.label)
}
window.renderBattleObj = do ->
  rivalPlayerDom = document.getElementById('rival-box')
  battleFieldDom = document.getElementById('battle-field')
  myDom          = document.getElementById('my-box')
  footerDom      = document.getElementById('game-bottom')

  return {
    does:->
      rivalPlayerPanel = React.render(
        (ce PlayerBoxClass,{ playerObj:{} })
        rivalPlayerDom
      )
      battleFieldPanel = React.render(
        (ce BattleFieldClass,{ } )
        battleFieldDom
      )
      myPanel = React.render(
        (ce PlayerBoxClass,{ playerObj:{} } )
        myDom
      )
      React.render(
        ce BattleBottomOpBarClass,{ }
        footerDom
      )
  }
#renderBattleObj.does()