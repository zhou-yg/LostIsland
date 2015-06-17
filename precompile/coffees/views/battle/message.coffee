ce = React.createElement
cc = React.createClass

UploadClass = cc {
  getInitialState:->
    {
    }
  submit:->
    fileInput = @refs.file.getDOMNode()
    usernameInput = @refs.username.getDOMNode()

    fd = new FormData
    file = fileInput.files[0]
    username = usernameInput.value

    if !username
      alert '用户名不要空'
      return

    fd.userfile = file

    param = {
      fn:1003
      param:
        type:'upload'
        uid:userMsg.uid
        username:username
    }
    param = JSON.stringify(param)
    param = encodeURIComponent(param)

    xhr = new XMLHttpRequest()
    xhr.open 'POST','http://lostisland/index.php/apis/route/?parameter='+param
    xhr.send fd

    xhr.onreadystatechange = ->
      if xhr.readyState is 4
        if xhr.status is 200
          console.log xhr.responseText

  render:->
    ce 'div',{ },
      ce 'p',{},
        ce 'label',{ },'文件选择：'
        ce 'input',{ id:'upImg',type:'file',ref:'file' },
      ce 'p',{},
        ce 'label',{ },'用户名：'
        ce 'input',{ id:'username',text:'name' ,ref:'username'}

      ce 'Button',{ onClick:@submit },'提交'
}

MessageBottomOpBarClass = cc {
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
    renderMessageObj.hide()
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

messageUpload = messageBottomOpBar = null

window.renderMessageObj = do ->
  messageDom = document.getElementById('message')
  messageBoxDom = document.getElementById('message-box')
  messageBottomDom = document.getElementById('message-bottom')

  messageDom.style.height = screen.height+'px';

  messageBottomOpBar = React.render(
    ce MessageBottomOpBarClass
    messageBottomDom
  )
  messageUpload = React.render(
    ce UploadClass
    messageBoxDom
  )

  return {
    does:->
      messageDom.style.display = 'block'
    hide:->
      messageDom.style.display = 'none'
  }

renderMessageObj.does()