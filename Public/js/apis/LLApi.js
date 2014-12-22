(function() {
  var LLApi;

  LLApi = (function() {
    function LLApi() {
      this.timeotMax = 20 * 1000;
    }

    LLApi.prototype.init = function() {
      this.timeotMax = 20 * 1000;
      return this;
    };

    LLApi.prototype.setServerPre = function(_serverPre) {
      return this.serverPre = _serverPre;
    };

    LLApi.prototype.setAddress = function(_address) {
      return this.apiAddress = _address;
    };

    LLApi.prototype.onReadyStateChange = function(_xhr, _callback) {
      return _xhr.onreadystatechange = function() {
        if (_xhr.readyState === 4) {
          if (_xhr.status === 200) {
            return _callback(null, _xhr.responseText);
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
      return xhr.sned(_data);
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
        url = this.serverPre + this.apiAddress + '?' + data;
        this.get(url, _callback);
      }
      if (_method === 'post') {
        url = this.serverPre + this.apiAddress;
        return this.post(url, data, _callback);
      }
    };

    return LLApi;

  })();

  window.LLApi = new LLApi();

}).call(this);
