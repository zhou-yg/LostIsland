socketConnected = (url)->
  console.log 'socketConnected()'

  #添加在线
  io.socket.get(url+'/addPlayer',{
    uid:userMsg.uid
  },(data)->
    console.log data
  )

  #匹配成功
  io.socket.on 'match',(msg)->
    #{ uid:/[\d]*/ }
    console.log msg
    LLApi.Client().User.getBasic {
      uid:msg.uid
    },(err,data)->
      if err
        console.log err
      else
        if data.result
          for k,v of data.data
            userMsg.rivalMsg[k] = v

      renderInitialObj.hide()
      renderBattleObj.does()

io.socket.on 'connect',->
  socketConnected(io.sails.url)

ce = React.createElement
cc = React.createClass

PlayerBoxClass = cc {
  getInitialState:->
    playerObj = @props.playerObj
    {
      playerObj:playerObj
    }
  render:->
    playerObj = @state.playerObj

    dotsArr = dots = []

    if playerObj.dots > 0
      for i in [1..playerObj.dots]
        dots.push(true)
    for i in [playerObj.dots..2]
      dots.push(false)

    for isSelected,i in dots
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
    #[5]个chessObj 或 [5]个{}
    chessObjArr = @props.chessObjArr
    {
      chessObjArr:chessObjArr
    }
  render:->
    chessList =  []
    for chessOne,i in @state.chessObjArr
      styleObj = {
        className:'chess-one'
        key:'chessLi'+i
        style:{}
      }
      if chessOne.img
        styleObj.style.backgroundImage = 'url('+chessFactory.chessAvatarPre+chessOne.img+')'

      chessList.push(
        ce 'li',styleObj
      )

    ce 'ul',{ className:'enemy' },
      chessList


}
BattleFieldClass = cc {
  getInitialState:->
    rivalChess = @props.rivalChess
    myChess = @props.myChess

    if !_.isArray(rivalChess)
      rivalChess = new Array(5)

    for arr in [rivalChess,myChess]
      for chessI,i in arr
          arr[i] = if chessI then chessFactory.getChessByCid(chessI) else {}

    {
      rivalChess:rivalChess
      myChess:myChess
    }
  render:->
    ce 'div', {},
      (ce EnemyListClass,{ chessObjArr:@state.rivalChess } )
      (ce 'div',{ className:'battle-river' },
        ce 'button',{ className:'endBtn','end' }
      )
      (ce EnemyListClass,{ chessObjArr:@state.myChess.slice(0,5) } )
      (ce EnemyListClass,{ chessObjArr:@state.myChess.slice(5) })
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

rivalPlayerPanel = battleFieldPanel = myPanel = null

window.renderBattleObj = do ->
  battleUiDom    = document.getElementById('battle')
  rivalPlayerDom = document.getElementById('rival-box')
  battleFieldDom = document.getElementById('battle-field')
  myDom          = document.getElementById('my-box')
  footerDom      = document.getElementById('game-bottom')

  return {
    does:->
      rivalPlayerPanel = React.render(
        (ce PlayerBoxClass,{ playerObj:userMsg.rivalMsg })
        rivalPlayerDom
      )
      battleFieldPanel = React.render(
        (ce BattleFieldClass,{
          rivalChess:userMsg.rivalMsg.chess
          myChess:userMsg.chess
        })
        battleFieldDom
      )
      myPanel = React.render(
        (ce PlayerBoxClass,{ playerObj:userMsg } )
        myDom
      )
      React.render(
        ce BattleBottomOpBarClass,{ }
        footerDom
      )
      battleUiDom.style.display = 'block'
    hide:->
      battleUiDom.style.display = 'none'

  }
#renderBattleObj.does()