(function() {
  (function(parent, Child) {
    Child.prototype = parent;
    return parent[Child.cn] = new Child;
  })(LLApi, (function(className) {
    var myClass;
    myClass = function() {
      this.send = function(_param, _cb) {
        this.setPort(1337);
        this.setAddress('test/test');
        this.request('get', _param, function(_error, _data) {
          return _cb(_error, _data);
        });
        return this;
      };
      this.test = function(_param, _cb) {
        var param;
        param = {};
        this.send(param, _cb);
        return this;
      };
      return this;
    };
    myClass.cn = className;
    return myClass;
  })('Battle'));

}).call(this);
