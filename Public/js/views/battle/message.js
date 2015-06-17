(function() {
  var MessageBottomOpBarClass, UploadClass, cc, ce, messageBottomOpBar, messageUpload;

  ce = React.createElement;

  cc = React.createClass;

  UploadClass = cc({
    getInitialState: function() {
      return {};
    },
    submit: function() {
      var fd, file, fileInput, param, username, usernameInput, xhr;
      fileInput = this.refs.file.getDOMNode();
      usernameInput = this.refs.username.getDOMNode();
      fd = new FormData;
      file = fileInput.files[0];
      username = usernameInput.value;
      if (!username) {
        alert('用户名不要空');
        return;
      }
      fd.userfile = file;
      param = {
        fn: 1003,
        param: {
          type: 'upload',
          uid: userMsg.uid,
          username: username
        }
      };
      param = JSON.stringify(param);
      param = encodeURIComponent(param);
      xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://lostisland/index.php/apis/route/?parameter=' + param);
      xhr.send(fd);
      return xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            return console.log(xhr.responseText);
          }
        }
      };
    },
    render: function() {
      return ce('div', {}, ce('p', {}, ce('label', {}, '文件选择：'), ce('input', {
        id: 'upImg',
        type: 'file',
        ref: 'file'
      })), ce('p', {}, ce('label', {}, '用户名：'), ce('input', {
        id: 'username',
        text: 'name',
        ref: 'username'
      })), ce('Button', {
        onClick: this.submit
      }, '提交'));
    }
  });

  MessageBottomOpBarClass = cc({
    getInitialState: function() {
      return {
        bottomList: [
          {
            className: 'right',
            name: 'exit',
            label: '返回'
          }
        ]
      };
    },
    exit: function(ev) {
      renderMessageObj.hide();
      return renderInitialObj.does();
    },
    render: function() {
      var btnList, that;
      that = this;
      btnList = this.state.bottomList;
      return ce('ul', {
        className: 'bottom-ops'
      }, btnList.map(function(liOne, i) {
        var className;
        className = liOne.className;
        return ce('li', {
          className: className,
          onClick: that[liOne.name],
          key: 'bottomLi' + i
        }, liOne.label);
      }));
    }
  });

  messageUpload = messageBottomOpBar = null;

  window.renderMessageObj = (function() {
    var messageBottomDom, messageBoxDom, messageDom;
    messageDom = document.getElementById('message');
    messageBoxDom = document.getElementById('message-box');
    messageBottomDom = document.getElementById('message-bottom');
    messageDom.style.height = screen.height + 'px';
    messageBottomOpBar = React.render(ce(MessageBottomOpBarClass), messageBottomDom);
    messageUpload = React.render(ce(UploadClass), messageBoxDom);
    return {
      does: function() {
        return messageDom.style.display = 'block';
      },
      hide: function() {
        return messageDom.style.display = 'none';
      }
    };
  })();

  renderMessageObj.does();

}).call(this);
