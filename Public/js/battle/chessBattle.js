(function() {
  var ChessBattle;

  ChessBattle = (function() {
    function ChessBattle() {}

    ChessBattle.prototype.fight = function(myChessI, rivalChessI) {
      var args;
      args = Array.prototype.slice.call(arguments);
      args = args.map(function(chessI) {
        return ChessFactory.getChessByCid(chessI);
      });
      return args[0].fight(args[1]);
    };

    return ChessBattle;

  })();

}).call(this);
