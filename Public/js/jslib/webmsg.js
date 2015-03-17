(function() {
  var WebMsg, webMsg;

  WebMsg = (function() {
    function WebMsg() {}

    WebMsg.prototype.construct = function(mode, url) {
      var battleServerAd;
      battleServerAd = url;
      if (mode === 'node') {
        return this.socket = io.socket;
      }
    };

    WebMsg.prototype.on = function(event, fn) {
      return this.socket.on(event, fn);
    };

    WebMsg.prototype["delete"] = function(url, data, fn) {
      return this.socket["delete"](url, data, fn);
    };

    WebMsg.prototype.get = function(url, data, fn) {
      return this.socket.get(url, data, fn);
    };

    WebMsg.prototype.post = function(url, data, fn) {
      return this.socket.post(url, data, fn);
    };

    WebMsg.prototype.request = function(options, fn) {
      return this.socket.request(options, fn);
    };

    return WebMsg;

  })();

  webMsg = new WebMsg('node', 'http://localhost');

}).call(this);
