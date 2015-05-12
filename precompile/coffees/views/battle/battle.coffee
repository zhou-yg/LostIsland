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

  #fight
  io.socket.on 'fight',(fightRecordObj)->
    console.log 'fightRecordObj',fightRecordObj
    battleFieldPanel.fight(fightRecordObj.record)
  #结果
  io.socket.on 'fightResult',(fightResult)->
    console.log 'fightResult',fightResult
    battleFieldPanel.fightResult(fightResult.record)

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
    if playerObj.dots < 3
      for i in [playerObj.dots..2]
        dots.push(false)

    console.log(dots)

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

    for chessObj,i in allChess
      if chessObj.isSelected
        isAlreadySelected = true
        selectedI = i
        break

    for chessObj,i in allChess
      if chessObj.key is key and i isnt selectedI and !chessObj.battleResult
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
      if chessOne.battleResult
        tagClass = chessOne.battleResult
      else
        tagClass = ''


      chessList.push(
        ce 'li',propertyObj,(
          ce 'div',{ className:tagClass }
        )
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
      fightResult:@props.battleStateData.fightResult
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
  fight:(recordObj)->
    myChess = @state.myChess
    rivalChess = @state.rivalChess

    myUuid = 'u'+userMsg.uid
    rivalUuid = 'u'+userMsg.rivalMsg.id

    myChessObj = rivalChessObj = null
    for own uuid,chessI of recordObj
      if uuid is myUuid
        myChessObj =  chessFactory.getChessByCid(chessI)
      else if uuid is rivalUuid
        rivalChessObj = chessFactory.getChessByCid(chessI)

    if myChessObj and rivalChessObj

      fightResult = myChessObj.fight(rivalChessObj)
      for chessObj,i in myChess
        if chessObj.cid is myChessObj.cid
          if fightResult is 0
            chessObj.battleResult = 'equal'

          else if fightResult is 1
            chessObj.battleResult = 'win'
            userMsg.dots++

          else if fightResult is -1
            chessObj.battleResult = 'lose'
            userMsg.rivalMsg.dots++

          console.log(fightResult,chessObj)

          rivalChess[i] = rivalChessObj

      rivalPlayerPanel.forceUpdate()
      myPanel.forceUpdate()
      @forceUpdate()

    else
      console.log 'no chessObj or rivalChessObj'

  fightResult:(fightResult)->
    @fight(fightResult)

    result = {}

    if fightResult.win is false
      result.text = 'you doesnt win'
    else if fightResult.win is userMsg.uid
      result.text = 'you win'
    else if fightResult.lose is userMsg.uid
      result.text = 'you lose'

    battleStateData.fightResult.text = result.text

    @forceUpdate()

    bottomOpBar.exit({
      notClicked:true
    })

  turnEnd:->
    for chessObj in @state.myChess
      if chessObj.isSelected and !chessObj.battleResult
        sendChessI = chessObj.cid

    if sendChessI isnt undefined
      LLApi.WS().Battle.fight {
          uid:userMsg.uid
          chessI:sendChessI
      },(err,data)->
        console.log data

      endBtnState = @state.endBtnState
      endBtnState.state = 'disabled'

      @setState {
        endBtnState:endBtnState
      }
    else
      console.log 'NO!!!'
  turnEndOn:->

    endBtnState = @state.endBtnState
    endBtnState.state = 'hover'
    @setState {
      endBtnState:endBtnState
    }
  turnEndOut:->

    endBtnState = @state.endBtnState
    endBtnState.state = false
    @setState {
      endBtnState:endBtnState
    }
  render:->
    myChess = @state.myChess
    rivalChess = @state.rivalChess

    fightResult = @state.fightResult

    ce 'div', { style:{
        position:'relative'
      }},
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
      (ce 'div',{
        className:'battle-end-bg'
        style:{
          display:if fightResult.text then 'block' else 'none'
        }
      })
      (ce 'div',{
        className:'battle-alert'
        style:{
          display:if fightResult.text then 'block' else 'none'
        }
      },fightResult.text)
}
BattleBottomOpBarClass = cc {
  getInitialState:->
    {
      bottomList:[]
      btnList:@props.battleBottomBtnList
      isEdit:false
    }
  #ev = {},notClicked自定义
  exit:(ev)->
    console.log 'battle exit : ',ev
    name = 'exit'
    btnList = @state.btnList
    for btn in btnList
      if btn.name is name
        exitBtn = btn
        states = btn.allStates

    if exitBtn.label is states[0]
      if !ev.notClicked
        LLApi.WS().Battle.giveUp {
          uid:userMsg.uid
        },(err,data)=>
          console.log data
      else
        exitBtn.label = states[1]
        @setState {
          btnList:btnList
        }
    else if exitBtn.label is states[1]
      exitBtn.label = states[0]
      renderInitialObj.does()
      renderBattleObj.hide()


  render:->
    btnList = if !@state.isEdit then @state.btnList else @state.onEditingList
    that = this

    ce 'ul',{ className:'bottom-ops' },
      btnList.map (liOne,i)->
        className = liOne.className
        className = if !className then 'right'
        (ce 'li',{
          className:className
          onClick:that[liOne.name]
          key:'bottomLi'+i
        },liOne.label)
}

rivalPlayerPanel = battleFieldPanel = myPanel = bottomOpBar = null

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
          battleStateData:battleStateData
        })
        battleFieldDom
      )
      myPanel = React.render(
        (ce PlayerBoxClass,{ playerObj:userMsg } )
        myDom
      )
      bottomOpBar = React.render(
        ce BattleBottomOpBarClass,{
          battleBottomBtnList:battleStateData.battleBottomBtnList
        }
        footerDom
      )
      battleUiDom.style.display = 'block'
    hide:->
      battleStateData.fightResult.text = ''
      battleUiDom.style.display = 'none'

  }
#renderBattleObj.does()