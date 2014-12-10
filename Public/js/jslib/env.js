(function() {
  var DEBUG_ENV, PROD_ENV;

  PROD_ENV = true;

  DEBUG_ENV = false;

  window.envObj = {
    devEnv: DEBUG_ENV
  };

}).call(this);
