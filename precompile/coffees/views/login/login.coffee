cc = React.createClass
ce = React.createElement

formDataValidations = {
  
  emailRegExp:/^[.\w]*@[a-zA-Z0-9]+(?:.[a-zA-Z]+)+$/
  phoneNumberRegExp:/^[\d]{11}$/
  psRegExp:/^[\S]{6,}$/

  validateUsername:(name)->
    return !!name;

  validateEmail:(email)->
    return @emailRegExp.test(email)

  validatePhone:(number)->
    return @phoneNumberRegExp.test(number)

  validateEorP:(numberOrEmail)->
    return @validateEmail(numberOrEmail) or @validatePhone(numberOrEmail)

  validatePassword:(ps)->
    return @psRegExp.test(ps)

  validatePasswordRepeat:(ps)->
    return @psRegExp.test(ps)

}

#type
#placeholder
InputControlComponent = cc {
  mixins:[formDataValidations]
  getInitialState:->
    props = @props
    inputType = props.type or 'text'
    placeholder = props.placeholder

    typeMap = {
      username:{
        type:'text'
        name:'username'
        validate:{
          name:'validateUsername'
          error:'名字不能为空'
        }
      }
      token:{
        type:'text'
        name:'token'
        validate:{
          name:'validateUsername'
          error:'token不能为空'
        }
      }
      email:{
        type:'text'
        name:'email'
        validate:{
          name:'validateEorP'
          error:'邮箱或手机号格式不正确'
        }
      }
      password:{
        type:'password'
        name:'password'
        validate:{
          name:'validatePassword'
          error:'密码不合法'
        }
      }
      passwordRepeat:{
        type:'password'
        name:'passwordRepeat'
        validate:{
          name:'validatePasswordRepeat'
          error:'密码不一致'
        }
      }
    }

    {
      errorMsg:null
      placeholder:placeholder
      inputPropertyObj:typeMap[inputType]
    }
  validateInput:->
    formData = @props.formState.formData

    inputDom = @refs.input.getDOMNode()
    inputValue = inputDom.value

    inputPropertyObj = @state.inputPropertyObj

    validateName = inputPropertyObj.validate.name

    console.log validateName
    if validateName is 'validatePasswordRepeat'
      validateResult = formData.password is inputValue
    else
      validateResult = @[validateName](inputValue)

    errorMsg = ''
    if validateResult
      formData[inputPropertyObj.name] = inputValue
    else
      errorMsg = inputPropertyObj.validate.error

    @setState({
        errorMsg:errorMsg
      })
  componentWillReceiveProps:(nextProps)->
    formState = nextProps.formState
    if formState.action is '#login' or formState.action is '#register'
      @validateInput()

    console.log(formState.formData)

  render:->
    state = @state

    errorMsg = state.errorMsg
    placeholder = state.placeholder
    inputPropertyObj = state.inputPropertyObj

    ce 'div',{ className:'form-field' },
      (ce 'div',{ className:'validation',style:{
          display:if errorMsg then 'block' else 'none'
        }},
        (ce 'p',{ style:{textAlign:'center'} },
          errorMsg
        )
      )
      (ce 'input',{
        ref:'input'
        placeholder:placeholder
        type:inputPropertyObj.type
        name:inputPropertyObj.name
        className:'form-control'
        required:true
      })
}
#action
#type
#text
ButtonComponent = cc {
  getInitialState:->
    props = @props
    buttonType = props.type

    buttonMap = {
      select:{
        type:'button'
        className:'btn btn-primary anim-blue-all'
      }
      highlight:{
        type:'button'
        className:'btn anim-blue'
      }
      other: {
        type: 'button'
        className: 'btn anim-grey'
      }
    }
    typePropertyObj = buttonMap[buttonType] or buttonMap.other
    {
      action:'#'+(props.action or '')
      text:props.text
      typePropertyObj:typePropertyObj
    }
  clicked:->
    @props.formState.action = @state.action
    formComponent.forceUpdate()

  render:->
    state = @state
    action = state.action
    text = state.text
    typePropertyObj = state.typePropertyObj

    ce 'button',{
      type:typePropertyObj.type
      className:typePropertyObj.className
      onClick:@clicked
    },(ce 'a',{ href:action },text)
}
#登录板
LoginFormClass = cc {
  getInitialState:->
    {
      formState:{
        formData:{
        }
      }
    }
  login:->
    username = @state.formState.formData.username
    token    = @state.formState.formData.token

    if username and token
      location.href = location.href.replace(/#[\w]*/,'')+'?uid='+username + '&token=' + token


  render:->
    state = @state
    formState = state.formState

    ce 'form',{ method:'post',action:'' },
      (ce InputControlComponent,{ formState:formState,type:'username',placeholder:'名字' })
      (ce InputControlComponent,{ formState:formState,type:'token',placeholder:'token' })
      (ce ButtonComponent,{ formState:formState,action:'login',type:'select',text:'登录' })
      (ce 'div',{ className:'horizontal-line' })
      (ce 'div',{},
        (ce ButtonComponent,{ formState:formState,action:'signup',type:'highlight',text:'还没有账号？免费注册' })
      )
}
#注册板
RegisterFormClass = cc {
  getInitialState:->
    {
    formState:{
      formData:{
      }
    }
    }
  register:->
    username = @state.formState.formData.username

    if !username
      return

    blackBg = document.querySelector('.black-bg')
    blackBg.style.display = 'block'

    LLApi.Client().Encry.getToken null,(err,data)->
      token = data.result

      if token
        p1 = document.createElement('p')
        p1.innerText = '服务端注册token成功,token:'+token
        blackBg.appendChild(p1)

        LLApi.Client().User.newUser {
          username:username
          clientToken:token
        },(err,data)->
          console.log(data)
          if data.result
            p2 = document.createElement('p')
            p2.innerText = '服务端注册username成功,username:'+data.data.username
            blackBg.appendChild(p2)

            setTimeout ->
              p3 = document.createElement('p')
              p3.innerText = '正在跳转...'
              blackBg.appendChild(p3)

              setTimeout ->
                location.href = location.href.replace(/#[\w]*/,'')+'?uid='+data.data.username + '&token=' + data.data.clientToken
              ,2000
            ,1000

          else
            p2 = document.createElement('p')
            p2.innerText = '服务端注册username失败'
            blackBg.appendChild(p2)

            a = document.createElement('a');
            a.href = location.href.replace(/#[\w]*/,'')
            a.innerText = 'click here to retry'
            blackBg.appendChild(a)
      else
        p1 = document.createElement('p')
        p1.innerText = '服务端注册token失败,token:'+token

        a = document.createElement('a');
        a.href = location.href.replace(/#[\w]*/,'')
        a.innerText = 'click here to retry'

        blackBg.appendChild(p1)
        blackBg.appendChild(a)



  render:->
    state = @state
    formState = state.formState

    ce 'form',{ method:'post',action:'' },
      (ce InputControlComponent,{ formState:formState,type:'username',placeholder:'名字' })
      (ce ButtonComponent,{ formState:formState,action:'register',type:'select',text:'注册' })
      (ce 'div',{ className:'horizontal-line' })
      (ce 'div',{},
        (ce ButtonComponent,{ formState:formState,action:'signin',type:'highlight',text:'已有账号？登录' })
      )
}

formComponent = React.render(
  ce RegisterFormClass
  document.querySelector('.form-unit')
)

Route = Backbone.Router.extend {
  routes:{
    'signin':'singin'
    'signup':'signup'
    'register':'register'
    'login':'login'
  }
  singin:->
    formComponent = React.render(
      ce LoginFormClass
    document.querySelector('.form-unit')
    )
  signup:->
    formComponent = React.render(
      ce RegisterFormClass
      document.querySelector('.form-unit')
    )
  register:->
    formComponent.register();
  login:->
    formComponent.login();
}
route = new Route
Backbone.history.start()