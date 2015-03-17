#my
chessObjArr = userMsg.chess.map (chessIn)->
  return chessFactory.getChessByCid(chessIn)

cards1List = chessObjArr.slice(0,5)
cards2List = chessObjArr.slice(5)

userMsg.cardsAllArr = [cards1List,cards2List]

#rival
userMsg.rivalMsg = {
  avatar:''
  name:''
  winDots:0
}