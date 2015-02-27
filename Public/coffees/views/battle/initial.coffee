ce = React.createElement
cc = React.createClass

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
  render:->
    listMap = @props.listMap
    ce 'section',{ className:'behind-cards' },
      (ce 'h3',{}, listMap.name )
      (ce 'hr',{ className:'h-line'},null )
      (ce 'ul',{ className:'cards' },
        listMap.chessList.map (chess,i)->
          bgImg = chess.img
          if bgImg
            bgImg = chessFactory.chessAvatarPre + bgImg
            return ce 'li',{
              style:{
                backgroundImage:bgImg
              }
              key:'chessLi'+i
            }
          else
            return ce 'li',{key:'chessLi'+i},null
      )
}

PrepareUiClass = cc {
  render:->
    ce 'div',{},
      (  ce PersonalBoxClass )
      (ce ChessListClass,{ listMap:{ name:'表1',chessList:[1,2,3] } } )
      (ce ChessListClass,{ listMap:{ name:'表2',chessList:[1,2,3] } } )
}

prepareUiDom = document.querySelector '.prepare-ui'

React.render(
  ce PrepareUiClass
  prepareUiDom
)