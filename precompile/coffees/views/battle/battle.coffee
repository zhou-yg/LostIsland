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
    console.log '对手id':msg.uid
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

    bgImageUrl = if playerObj.character then 'url('+playerObj.character+')' else ''

    username = playerObj.username

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
      (ce 'div',{
        className:'player-img'
        style:
          backgroundImage:bgImageUrl
      })
      (ce 'div',{ className:'player-name' },username )
      (ce 'ul', { className:'score-dots' },
        dotsArr
      )
}

EnemyListClass = cc {
  getInitialState:->
    #从start开始，length个数
    startLength = @props.startLength
    allChess = @props.allChess

    {
      startLength:startLength
      allChess:allChess
      isMy:true
    }

  clickOnChess:(rev)->
    if !@state.isMy
      return

    allChess = @state.allChess

    key = rev.dispatchMarker.match /[\w]*[\d]$/
    key = key[0]

    isAlreadySelected = selectedI = undefined
    console.log [
      allChess[0].isSelected
      allChess[1].isSelected
      allChess[2].isSelected
      allChess[3].isSelected
      allChess[4].isSelected
      allChess[5].isSelected
    ]
    for chessObj,i in allChess
      if chessObj.isSelected
        isAlreadySelected = true
        selectedI = i
        break

    for chessObj,i in allChess
      if chessObj.key is key and i isnt selectedI
        if isAlreadySelected
          #同层切换 else 不同层调换
          allChess[selectedI].isSelected = false
          allChess[i].isSelected = true
          if (0<=selectedI < 5 and 0<=i<5) or (selectedI>=5 and i>=5)
          else
            t = chessObj
            allChess[i] = allChess[selectedI]
            allChess[selectedI] = t

        else
          #error

    battleFieldPanel.setState {
      myChess:allChess
    }

  render:->
    startLength = @state.startLength
    chessList = []
    for chessOne,i in @state.allChess.slice(startLength[0],startLength[0]+startLength[1])
      propertyObj = {
        className:'chess-one'
        key:chessOne.key
        onClick:@clickOnChess
        style:{}
      }
      if chessOne.img
        propertyObj.style.backgroundImage = 'url('+chessFactory.chessAvatarPre+chessOne.img+')'
      if chessOne.isSelected
        propertyObj.className += ' selected'

      chessList.push(
        ce 'li',propertyObj
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

    rivalChess.forEach (chessObj,i)->
      chessObj.key = 'chessLi'+i

    myChess.forEach (chessObj,i)->
      if i is 0
        chessObj.isSelected = true
      chessObj.key = 'chessLi'+i

    {
      rivalChess:rivalChess
      myChess:myChess
      endBtnState:{
        state:false
        getBgClass:->
          if @state is 'hover'
            return 'endBtn-on'
          if @state is 'disabled'
            return 'endBtn-disabled'
          return ''
      }
    }
  turnEnd:->
    @setState {
      endBtnState:{
        state:'disabled'
      }
    }
  turnEndOn:->
    @setState {
      endBtnState:{
        state:'hover'
      }
    }
  turnEndOut:->
    @setState {
      endBtnState:{
        state:false
      }
    }

  render:->
    myChess = @state.myChess
    rivalChess = @state.rivalChess

    ce 'div', {},
      (ce EnemyListClass,{ allChess:rivalChess,startLength:[0,5] })
      (ce 'div',{ className:'battle-river' },
        ce 'button',{
          className:'endBtn '+@state.endBtnState.getBgClass()
          onClick:@turnEnd
          onTouchStart:@turnEndOn
          onMouseOver:@turnEndOn
          onTouchEnd:@turnEndOut
          onMouseOut:@turnEndOut
        },'end'
      )
      (ce EnemyListClass,{ isMy:true,allChess:myChess,startLength:[0,5]})
      (ce EnemyListClass,{ isMy:true,allChess:myChess,startLength:[5,5]} )
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

  battleUiDom.style.height = screen.height+'px';

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
        ce BattleBottomOpBarClass,{}
        footerDom
      )
      battleUiDom.style.display = 'block'
    hide:->
      battleUiDom.style.display = 'none'

  }
#renderBattleObj.does()