(function() {
  (function(parent, Child) {
    Child.prototype = parent;
    return parent[Child.cn] = new Child;
  })(LLApi, (function(className) {
    var myClass;
    myClass = function() {
      this.send = function(_param, _cb) {
        this.request('get', _param, function(_error, _data) {
          return _cb(_error, _data);
        });
        return this;
      };
      this.saveChess = function(_param, _cb) {
        var param;
        param = {
          fn: 3002,
          param: {
            type: 'save',
            uid: _param.uid,
            token: _param.token,
            chess: _param.chess
          }
        };
        this.send(param, _cb);
        return this;
      };
      return this;
    };
    myClass.cn = className;
    return myClass;
  })('Chess'));

}).call(this);
