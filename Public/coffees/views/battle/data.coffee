#my
chessObjArr = userMsg.chess.map (chessIn)->
  return chessFactory.getChessByCid(chessIn)

cards1List = chessObjArr.slice(0,5)
cards2List = chessObjArr.slice(5)

userMsg.cardsAllArr = [cards1List,cards2List]
userMsg.dots = 0
#rival
userMsg.rivalMsg = {
  dots:0
}