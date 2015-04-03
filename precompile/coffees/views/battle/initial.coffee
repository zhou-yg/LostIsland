cardsAllArr = userMsg.cardsAllArr

ce = React.createElement
cc = React.createClass

HeroPanelClass = cc {
  render:->
    ce 'div',{
      className:'hero'
      style:{
        backgroundImage:'url('+@props.avatar+')'
      }
    },null
}
RecordPanelClass = cc {
  getInitialState:->
    {}
  render:->
    records = @props.records
    records = [{
        pre:''
        value:records.userName
      },{
        pre:'等级:'
        value:records.level
      },{
        pre:'胜场:'
        value:records.win
      },{
        pre:'胜率:'
        value:records.winRate
      }]

    ce 'ul',{ className:'record' },
      records.map (record,i)->
        ce 'li',{ className:'record-one',key:'recordLi'+i },
          (ce 'span',{},record.pre )
          (ce 'span',{},record.value )
}
PersonalBoxClass = cc {
  getInitialState:->
    that = this
    msg = @props.userMsg
    msg.winRate = if msg.win then msg.win/(msg.win+msg.lose) else 0
    {
      msg:msg
    }
  render:->
    msg = @state.msg
    ce 'div',{ className:'personal' },
      (ce HeroPanelClass,{ avatar:msg.character },null )
      (ce RecordPanelClass,{ records:{
        userName:msg.username
        level:msg.level
        win:msg.win
        winRate:msg.winRate
      }},null)
}

ChessListClass = cc {
  getInitialState:->
    sWidth = window.screen.width*0.96
    perLeft = sWidth * 0.2
    chessListIn = @props.chessMap.chessListIn
    chessList = cardsAllArr[chessListIn]
    chessList.forEach (chessOne,i)->
      if typeof chessOne isnt 'object'
        chessOne = {}
      chessOne.key = 'chessLi'+chessListIn+i
      return chessOne
    {
      name:@props.chessMap.name
      chessList:chessList
      perLeft:perLeft
      top:10
      isEdit:false
      ulClass:['cards','cards-edit']
    }
  changeState:->
    @setState {
      isEdit:!@state.isEdit
    }
  touchOnChess:(rev)->
    isEdit = @state.isEdit
    if !isEdit
      return

    key = rev.dispatchMarker.match /[\w]*[\d]$/
    key = key[0]
    chessList = @state.chessList

    for chessOne,i in chessList
      if chessOne.key is key
        #标记 或者 调换
        isChange = false
        for cards in cardsAllArr
          for chessOne2,j in cards
            if chessOne2.isSelected and chessOne2.key isnt key
              chessOne2.isSelected = false
              cards[j] = chessOne
              chessList[i] = chessOne2
              isChange = true

              break
        if !isChange
          chessOne.isSelected = !chessOne.isSelected
          console.log 'mark',cardsAllArr
        break

    chessListOne.forceUpdate()
    chessListTwo.forceUpdate()

  moveOnChess:(rev)->
  leaveChess:(rev)->

  render:->
    chessList = @state.chessList
    that = this
    ulClass = @state.ulClass[+@state.isEdit]
    perLeft = @state.perLeft
    top     = @state.top

    ce 'section',{ className:'behind-cards' },
      (ce 'h3',{}, @state.name )
      (ce 'hr',{ className:'h-line'},null )
      (ce 'ul',{ className:ulClass },
        chessList.map (chess,i)->
          bgImg = chess.img
          if bgImg
            bgImg = chessFactory.chessAvatarPre + bgImg
            ce 'li',{
                onTouchStart:that.touchOnChess
                onTouchMove:that.moveOnChess
                onTouchEnd:that.leaveChess
                style:{
                  backgroundImage:'url('+bgImg+')'
                  top:top
                  left:perLeft*i + 'px'
              }
              key:chess.key
            },(ce 'div',{
              className:'selected'
              style:{
                display:if chess.isSelected then 'block' else 'none'
              }
            })
          else
            ce 'li',{
                onTouchStart:that.touchOnChess
                onTouchMove:that.moveOnChess
                onTouchEnd:that.leaveChess
                style:{
                  top:top
                  left:perLeft*i + 'px'
              }
              key:chess.key
            },(ce 'div',{
              className:'selected'
              style:{
                display:if chess.isSelected then 'block' else 'none'
              }
            },i)
      )
}
InitBottomOpBarClass = cc {
  getInitialState:->
    {
      bottomList:[]
      normalList:[{
        className:'left'
        name:'list'
        label:'排行'
      },{
        className:'left'
        name:'none'
        label:'无'
      },{
        className:'center'
        name:'match'
        label:'匹配'
      },{
        className:'right'
        name:'setting'
        label:'设置'
      },{
        className:'right'
        name:'edit'
        label:'编辑'
      }]
      onEditingList:[{
        className:'right'
        name:'submit'
        label:'确定'
      }]
      isEdit:false
    }
  list:->
    LLApi.WS().Battle.display {

    },(err,data)->
      console.log(err,data);

  match:->
    LLApi.WS().Battle.match {
      uid:userMsg.uid
    },(err,data)->
      console.log(err,data);

  edit:->
    chessListOne.changeState()
    chessListTwo.changeState()

    isEdit = !@state.isEdit
    if !isEdit
      LLApi.Client().Chess.saveChess({
        uid:userMsg.uid
        token:userMsg.token
        chess:cardsAllArr[0].concat(cardsAllArr[1]).map((chessObj)-> return chessObj.cid)
      },(err,data)->
        console.log err,data
      );

    cardsAllArr.forEach (arr)->
      arr.forEach (obj)->
        delete obj.isSelected

    @setState {
      isEdit:!@state.isEdit
    }
  cancel:->
    @edit()
  submit:->
    @edit()

  render:->
    currentList = if !@state.isEdit then @state.normalList else @state.onEditingList
    that = this

    ce 'ul',{ className:'bottom-ops' },
      currentList.map (liOne,i)->
        (ce 'li',{
          className:liOne.className
          onClick:that[liOne.name]
          key:'bottomLi'+i
        },liOne.label)
}

personPanel = chessListOne = chessListTwo = null;

window.renderInitialObj = do ->
  initUiDom = document.getElementById('prepare-ui')
  headerDom = document.getElementById('header')
  cards1Dom = document.getElementById('cards1')
  cards2Dom = document.getElementById('cards2')
  footerDom = document.getElementById('footer')

  initUiDom.style.height = screen.height+'px';

  return {
    does:->
      personPanel = React.render(
        ce PersonalBoxClass,{
          userMsg:Object.create(userMsg)
        }
        headerDom
      )
      chessListOne = React.render(
        (ce ChessListClass,{ chessMap:{ name:'表1',chessListIn:0 } } )
        cards1Dom
      )
      chessListTwo = React.render(
        (ce ChessListClass,{ chessMap:{ name:'表2',chessListIn:1 } } )
        cards2Dom
      )
      React.render(
        ce InitBottomOpBarClass,{  }
        footerDom
      )
      initUiDom.style.display = 'block'
    hide:->
      initUiDom.style.display = 'none'
  }

renderInitialObj.does()