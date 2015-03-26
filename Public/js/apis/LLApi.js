(function() {
  var LLApi;

  LLApi = (function() {
    function LLApi() {
      this.timeotMax = 20 * 1000;
    }

    LLApi.prototype.Client = function() {
      this.apiAddress = 'index.php/apis/route/';
      return this;
    };

    LLApi.prototype.WS = function() {
      this.apiAddress = '';
      return this;
    };

    LLApi.prototype.setServerPre = function(serverHost) {
      return this.serverHost = serverHost;
    };

    LLApi.prototype.setAddress = function(address) {
      return this.apiAddress = address;
    };

    LLApi.prototype.setPort = function(port) {
      var urlArr;
      if (this.serverHost && port && typeof port === 'number') {
        urlArr = this.serverHost.split('/');
        if (urlArr[2].indexOf(':') !== -1) {
          urlArr[2] = urlArr[2].replace(/:[\d]*/, ':' + port);
        } else {
          urlArr[2] += ':' + port;
        }
        this.serverHost = urlArr.join('/');
      }
      return this;
    };

    LLApi.prototype.onReadyStateChange = function(_xhr, _callback) {
      return _xhr.onreadystatechange = function() {
        var resObj;
        if (_xhr.readyState === 4) {
          if (_xhr.status === 200) {
            resObj = JSON.parse(_xhr.responseText);
            return _callback(null, resObj);
          }
        }
      };
    };

    LLApi.prototype.get = function(_url, _callback) {
      var xhr;
      xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('get', _url);
      this.onReadyStateChange(xhr, _callback);
      return xhr.send(null);
    };

    LLApi.prototype.post = function(_url, _data, _callback) {
      var xhr;
      xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('post', _url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      this.onReadyStateChange(xhr, _callback);
      return xhr.send(_data);
    };

    LLApi.prototype.request = function(_method, _param, _callback) {
      var data, url;
      if (_param) {
        _param = JSON.stringify(_param);
        data = 'parameter=' + _param;
      } else {
        data = '#';
      }
      if (_method === 'get') {
        url = this.serverHost + this.apiAddress + '?' + data;
        this.get(url, _callback);
      }
      if (_method === 'post') {
        url = this.serverHost + this.apiAddress;
        this.post(url, data, _callback);
      }
      return this.setPort(80);
    };

    return LLApi;

  })();

  window.LLApi = new LLApi();

}).call(this);
