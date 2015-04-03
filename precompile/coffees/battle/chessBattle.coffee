class ChessBattle
  constructor:->

  fight:(myChessI,rivalChessI)->
    args = Array.prototype.slice.call(arguments)
    args = args.map (chessI)->
      return ChessFactory.getChessByCid(chessI)

    return args[0].fight(args[1])