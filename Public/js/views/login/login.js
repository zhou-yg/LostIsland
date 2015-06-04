(function() {
  var ButtonComponent, InputControlComponent, LoginFormClass, RegisterFormClass, Route, cc, ce, formComponent, formDataValidations, route;

  cc = React.createClass;

  ce = React.createElement;

  formDataValidations = {
    emailRegExp: /^[.\w]*@[a-zA-Z0-9]+(?:.[a-zA-Z]+)+$/,
    phoneNumberRegExp: /^[\d]{11}$/,
    psRegExp: /^[\S]{6,}$/,
    validateUsername: function(name) {
      return !!name;
    },
    validateEmail: function(email) {
      return this.emailRegExp.test(email);
    },
    validatePhone: function(number) {
      return this.phoneNumberRegExp.test(number);
    },
    validateEorP: function(numberOrEmail) {
      return this.validateEmail(numberOrEmail) || this.validatePhone(numberOrEmail);
    },
    validatePassword: function(ps) {
      return this.psRegExp.test(ps);
    },
    validatePasswordRepeat: function(ps) {
      return this.psRegExp.test(ps);
    }
  };

  InputControlComponent = cc({
    mixins: [formDataValidations],
    getInitialState: function() {
      var inputType, placeholder, props, typeMap;
      props = this.props;
      inputType = props.type || 'text';
      placeholder = props.placeholder;
      typeMap = {
        username: {
          type: 'text',
          name: 'username',
          validate: {
            name: 'validateUsername',
            error: '名字不能为空'
          }
        },
        token: {
          type: 'text',
          name: 'token',
          validate: {
            name: 'validateUsername',
            error: 'token不能为空'
          }
        },
        email: {
          type: 'text',
          name: 'email',
          validate: {
            name: 'validateEorP',
            error: '邮箱或手机号格式不正确'
          }
        },
        password: {
          type: 'password',
          name: 'password',
          validate: {
            name: 'validatePassword',
            error: '密码不合法'
          }
        },
        passwordRepeat: {
          type: 'password',
          name: 'passwordRepeat',
          validate: {
            name: 'validatePasswordRepeat',
            error: '密码不一致'
          }
        }
      };
      return {
        errorMsg: null,
        placeholder: placeholder,
        inputPropertyObj: typeMap[inputType]
      };
    },
    validateInput: function() {
      var errorMsg, formData, inputDom, inputPropertyObj, inputValue, validateName, validateResult;
      formData = this.props.formState.formData;
      inputDom = this.refs.input.getDOMNode();
      inputValue = inputDom.value;
      inputPropertyObj = this.state.inputPropertyObj;
      validateName = inputPropertyObj.validate.name;
      console.log(validateName);
      if (validateName === 'validatePasswordRepeat') {
        validateResult = formData.password === inputValue;
      } else {
        validateResult = this[validateName](inputValue);
      }
      errorMsg = '';
      if (validateResult) {
        formData[inputPropertyObj.name] = inputValue;
      } else {
        errorMsg = inputPropertyObj.validate.error;
      }
      return this.setState({
        errorMsg: errorMsg
      });
    },
    componentWillReceiveProps: function(nextProps) {
      var formState;
      formState = nextProps.formState;
      if (formState.action === '#login' || formState.action === '#register') {
        this.validateInput();
      }
      return console.log(formState.formData);
    },
    render: function() {
      var errorMsg, inputPropertyObj, placeholder, state;
      state = this.state;
      errorMsg = state.errorMsg;
      placeholder = state.placeholder;
      inputPropertyObj = state.inputPropertyObj;
      return ce('div', {
        className: 'form-field'
      }, ce('div', {
        className: 'validation',
        style: {
          display: errorMsg ? 'block' : 'none'
        }
      }, ce('p', {
        style: {
          textAlign: 'center'
        }
      }, errorMsg)), ce('input', {
        ref: 'input',
        placeholder: placeholder,
        type: inputPropertyObj.type,
        name: inputPropertyObj.name,
        className: 'form-control',
        required: true
      }));
    }
  });

  ButtonComponent = cc({
    getInitialState: function() {
      var buttonMap, buttonType, props, typePropertyObj;
      props = this.props;
      buttonType = props.type;
      buttonMap = {
        select: {
          type: 'button',
          className: 'btn btn-primary anim-blue-all'
        },
        highlight: {
          type: 'button',
          className: 'btn anim-blue'
        },
        other: {
          type: 'button',
          className: 'btn anim-grey'
        }
      };
      typePropertyObj = buttonMap[buttonType] || buttonMap.other;
      return {
        action: '#' + (props.action || ''),
        text: props.text,
        typePropertyObj: typePropertyObj
      };
    },
    clicked: function() {
      this.props.formState.action = this.state.action;
      return formComponent.forceUpdate();
    },
    render: function() {
      var action, state, text, typePropertyObj;
      state = this.state;
      action = state.action;
      text = state.text;
      typePropertyObj = state.typePropertyObj;
      return ce('button', {
        type: typePropertyObj.type,
        className: typePropertyObj.className,
        onClick: this.clicked
      }, ce('a', {
        href: action
      }, text));
    }
  });

  LoginFormClass = cc({
    getInitialState: function() {
      return {
        formState: {
          formData: {}
        }
      };
    },
    login: function() {
      var token, username;
      username = this.state.formState.formData.username;
      token = this.state.formState.formData.token;
      if (username && token) {
        return location.href = location.href.replace(/#[\w]*/, '') + '?uid=' + username + '&token=' + token;
      }
    },
    render: function() {
      var formState, state;
      state = this.state;
      formState = state.formState;
      return ce('form', {
        method: 'post',
        action: ''
      }, ce(InputControlComponent, {
        formState: formState,
        type: 'username',
        placeholder: '名字'
      }), ce(InputControlComponent, {
        formState: formState,
        type: 'token',
        placeholder: 'token'
      }), ce(ButtonComponent, {
        formState: formState,
        action: 'login',
        type: 'select',
        text: '登录'
      }), ce('div', {
        className: 'horizontal-line'
      }), ce('div', {}, ce(ButtonComponent, {
        formState: formState,
        action: 'signup',
        type: 'highlight',
        text: '还没有账号？免费注册'
      })));
    }
  });

  RegisterFormClass = cc({
    getInitialState: function() {
      return {
        formState: {
          formData: {}
        }
      };
    },
    register: function() {
      var blackBg, username;
      username = this.state.formState.formData.username;
      if (!username) {
        return;
      }
      blackBg = document.querySelector('.black-bg');
      blackBg.style.display = 'block';
      return LLApi.Client().Encry.getToken(null, function(err, data) {
        var a, p1, token;
        token = data.result;
        if (token) {
          p1 = document.createElement('p');
          p1.innerText = '服务端注册token成功,token:' + token;
          blackBg.appendChild(p1);
          return LLApi.Client().User.newUser({
            username: username,
            clientToken: token
          }, function(err, data) {
            var a, p2;
            console.log(data);
            if (data.result) {
              p2 = document.createElement('p');
              p2.innerText = '服务端注册username成功,username:' + data.data.username;
              blackBg.appendChild(p2);
              return setTimeout(function() {
                var p3;
                p3 = document.createElement('p');
                p3.innerText = '正在跳转...';
                blackBg.appendChild(p3);
                return setTimeout(function() {
                  return location.href = location.href.replace(/#[\w]*/, '') + '?uid=' + data.data.username + '&token=' + data.data.clientToken;
                }, 2000);
              }, 1000);
            } else {
              p2 = document.createElement('p');
              p2.innerText = '服务端注册username失败';
              blackBg.appendChild(p2);
              a = document.createElement('a');
              a.href = location.href.replace(/#[\w]*/, '');
              a.innerText = 'click here to retry';
              return blackBg.appendChild(a);
            }
          });
        } else {
          p1 = document.createElement('p');
          p1.innerText = '服务端注册token失败,token:' + token;
          a = document.createElement('a');
          a.href = location.href.replace(/#[\w]*/, '');
          a.innerText = 'click here to retry';
          blackBg.appendChild(p1);
          return blackBg.appendChild(a);
        }
      });
    },
    render: function() {
      var formState, state;
      state = this.state;
      formState = state.formState;
      return ce('form', {
        method: 'post',
        action: ''
      }, ce(InputControlComponent, {
        formState: formState,
        type: 'username',
        placeholder: '名字'
      }), ce(ButtonComponent, {
        formState: formState,
        action: 'register',
        type: 'select',
        text: '注册'
      }), ce('div', {
        className: 'horizontal-line'
      }), ce('div', {}, ce(ButtonComponent, {
        formState: formState,
        action: 'signin',
        type: 'highlight',
        text: '已有账号？登录'
      })));
    }
  });

  formComponent = React.render(ce(RegisterFormClass), document.querySelector('.form-unit'));

  Route = Backbone.Router.extend({
    routes: {
      'signin': 'singin',
      'signup': 'signup',
      'register': 'register',
      'login': 'login'
    },
    singin: function() {
      return formComponent = React.render(ce(LoginFormClass), document.querySelector('.form-unit'));
    },
    signup: function() {
      return formComponent = React.render(ce(RegisterFormClass), document.querySelector('.form-unit'));
    },
    register: function() {
      return formComponent.register();
    },
    login: function() {
      return formComponent.login();
    }
  });

  route = new Route;

  Backbone.history.start();

}).call(this);
