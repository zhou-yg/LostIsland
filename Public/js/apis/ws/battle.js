(function() {
  (function(parent, Child) {
    Child.prototype = parent;
    return parent[Child.cn] = new Child;
  })(LLApi, (function(className) {
    var myClass;
    myClass = function() {
      this.send = function(_param, _cb) {
        this.setPort(1337);
        this.request('get', _param, function(_error, _data) {
          return _cb(_error, _data);
        });
        return this;
      };
      this.match = function(_param, _cb) {
        var param;
        param = {};
        param.uid = _param.uid;
        this.setAddress('player/match');
        this.send(param, _cb);
        return this;
      };
      this.display = function(_param, _cb) {
        var param;
        param = {};
        this.setAddress('test/display');
        this.send(param, _cb);
        return this;
      };
      return this;
    };
    myClass.cn = className;
    return myClass;
  })('Battle'));

}).call(this);
