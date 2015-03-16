ce = React.createElement
cc = React.createClass

chessObjArr = userMsg.chess.map (chessIn)->
  return chessFactory.getChessByCid(chessIn)

cards1List = chessObjArr.slice(0,5)
cards2List = chessObjArr.slice(5)

window.cardsAllArr = [cards1List,cards2List]

HeroPanelClass = cc {
  render:->
    ce 'div',{ className:'hero' },null
}
RecordPanelClass = cc {
  getInitialState:->
    {
      level:{
        name:'等级:'
        num:'1'
      },
      records:[{
        pre:'胜场:'
        value:100
      },{
        pre:'胜率:'
        value:'66.7%'
      }]
    }

  render:->
    ce 'ul',{ className:'record' },
      ce 'li',{ className:'record-one' },
        (ce 'span',{},@state.level.name )
        (ce 'span',{},@state.level.num )
      @state.records.map (record,i)->
        ce 'li',{ className:'record-one',key:'recordLi'+i },
          (ce 'span',{},record.pre )
          (ce 'span',{},record.value )
}
PersonalBoxClass = cc {
  render:->
    ce 'div',{ className:'personal' },
      (ce HeroPanelClass,{},null )
      (ce RecordPanelClass,{},null )
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
              console.log 'change',cardsAllArr
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
            return ce 'li',{
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
            return ce 'li',{
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
BottomOpBarClass = cc {
  getInitialState:->
    {
      bottomList:[]
      normalList:[{
        className:'left'
        name:'list'
        label:'排行榜'
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
  edit:->
    chessListOne.changeState()
    chessListTwo.changeState()

    isEdit = !@state.isEdit
    if !isEdit
      LLApi.Chess.saveChess({
        uid:userMsg.uid
        token:userMsg.token
        chess:cardsAllArr[0].concat(cardsAllArr[1]).map((chessObj)-> return chessObj.cid)
      },(err,data)->
        console.log err,data
      );


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
  headerDom = document.getElementById('header')
  cards1Dom = document.getElementById('cards1')
  cards2Dom = document.getElementById('cards2')
  footerDom = document.getElementById('footer')

  return {
    does:->
      personPanel = React.render(
        ce PersonalBoxClass
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
        ce BottomOpBarClass
        footerDom
      )
  }

#renderInitialObj.does()