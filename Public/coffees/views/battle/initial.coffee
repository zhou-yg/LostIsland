ce = React.createElement
cc = React.createClass

screenWidth = window.screen.width

HeroPanelClass = cc {
  render:->
    ce 'div',{ className:'hero' },null
}
RecordPanelClass = cc {
  getInitialState:->
    {
      level:{
        name:'等级:'
        num:'青铜1'
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
    sWidth = screenWidth*0.96
    perLeft = sWidth * 0.2
    chessMap = @props.chessMap
    chessMap.chessList = chessMap.chessList.map (chessOne,i)->
      if typeof chessOne isnt 'object'
        chessOne = {}
      chessOne.key = 'chessLi'+i
      chessOne.ox = perLeft*i
      chessOne.oy = 10
      chessOne.x = chessOne.ox + 'px'
      chessOne.y = chessOne.oy + 'px'
      return chessOne
    {
      chessMap:chessMap
      touchesXY:{
        x:0
        y:0
      }
    }
  touchOnChess:(ev)->
    firstTouch = ev.nativeEvent.touches[0]
    ev.target.style.zIndex = 10

    @setState {
      touchesXY:
        x:firstTouch.clientX
        y:firstTouch.clientY
    }
  moveOnChess:(ev)->
    target = ev.target
    key    = ev.dispatchMarker.match /[\w]*$/
    key    = key[0]

    chessMap = @state.chessMap

    startXY = @state.touchesXY

    firstTouch = ev.nativeEvent.touches[0]
    firstTouch = {
      x:firstTouch.clientX
      y:firstTouch.clientY
    }
    for chessOne,i in chessMap.chessList
      if chessOne.key is key
        current = chessOne
        break

    current.x = current.ox + (firstTouch.x - startXY.x ) + 'px'
    current.y = current.oy + (firstTouch.y - startXY.y ) + 'px'

    target.style.left = current.x
    target.style.top  = current.y

  leaveChess:->
    console.log 'touchend'

  render:->
    chessMap = @props.chessMap
    that = this
    ce 'section',{ className:'behind-cards' },
      (ce 'h3',{}, chessMap.name )
      (ce 'hr',{ className:'h-line'},null )
      (ce 'ul',{ className:'cards' },
        chessMap.chessList.map (chess,i)->
          bgImg = chess.img
          if bgImg
            bgImg = chessFactory.chessAvatarPre + bgImg
            return ce 'li',{
              onTouchStart:that.touchOnChess
              onTouchMove:that.moveOnChess
              onTouchEnd:that.leaveChess
              style:{
                backgroundImage:bgImg
                top:chess.y
                left:chess.x
              }
              key:chess.key
            }
          else
            return ce 'li',{
              onTouchStart:that.touchOnChess
              onTouchMove:that.moveOnChess
              onTouchEnd:that.leaveChess
              style:{
                top:chess.y
                left:chess.x
              }
              key:chess.key
            },null
      )
}

BottomOpBarClass = cc {
  getInitialState:->
    {}
  render:->
    ce 'ul',{ className:'start-battle' },
      (ce 'li',{ className:'left' },
        (ce 'a',{href:'#list'},'排行榜')
      )
      (ce 'li',{ className:'left' },
        (ce 'a',{href:'#'},'无')
      )
      (ce 'li',{ className:'center' },
        (ce 'a',{href:'#match'},'匹配')
      )
      (ce 'li',{ className:'right' },
        (ce 'a',{href:'#edit'},'编辑')
      )
      (ce 'li',{ className:'right' },
        (ce 'a',{href:'#setting'},'设置')
      )
}

PrepareUiClass = cc {
  render:->
    ce 'div',{},
      (ce PersonalBoxClass )
      (ce ChessListClass,{ chessMap:{ name:'表1',chessList:[1,2,3] } } )
      (ce ChessListClass,{ chessMap:{ name:'表2',chessList:[1,2,3] } } )
      (ce BottomOpBarClass,{} )
}

BottomOpRoute = Backbone.Route.extend {
  routes:{
    'list':'list'
    'match':'match'
    'edit':'edit'
    'setting':'setting'
  }
  list:->
  match:->
  edit:->
  setting:->
}

prepareUiDom = document.querySelector '.prepare-ui'
React.render(
  ce PrepareUiClass
  prepareUiDom
)