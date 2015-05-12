(function() {
  (function(parent, Child) {
    Child.prototype = parent;
    return parent[Child.cn] = new Child;
  })(LLApi, (function(className) {
    var myClass;
    myClass = function() {
      this.send = function(_param, cb) {
        this.setPort(1337);
        this.request('get', _param, function(_error, _data) {
          return cb(_error, _data);
        });
        return this;
      };
      this.match = function(_param, cb) {
        var param;
        param = {};
        param.uid = _param.uid;
        this.setAddress('player/match');
        this.send(param, cb);
        return this;
      };
      this.fight = function(_param, cb) {
        var param;
        param = {};
        param.uid = _param.uid;
        param.chessI = _param.chessI;
        this.setAddress('battle/fight');
        this.send(param, cb);
        return this;
      };
      this.giveUp = function(_param, cb) {
        var param;
        param = {};
        param.uid = _param.uid;
        this.setAddress('battle/giveUp');
        this.send(param, cb);
        return this;
      };
      this.display = function(_param, cb) {
        var param;
        param = {};
        this.setAddress('test/display');
        this.send(param, cb);
        return this;
      };
      return this;
    };
    myClass.cn = className;
    return myClass;
  })('Battle'));

}).call(this);
