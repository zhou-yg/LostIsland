#test
class PlayerTester
  constructor:(@name,@cardArr)->
      if !@name
        throw 'player tester has no name'

      if !@cardArr
        throw 'player tester has no cardArr'

  getCardArr:->
    return @getCardArr

i=0
j=5
cardArrLen = 3

cardArr1 = []
cardArr2 = []

while i++ < cardArrLen
  cardOne = cardFactory.getCardByCid i
  cardArr1.push cardOne
  cardOne = cardFactory.getCardByCid j--
  cardArr2.push cardOne

window.playerTest1 = new PlayerTester('红方',cardArr1)
window.playerTest2 = new PlayerTester('蓝方',cardArr2)

console.log playerTest1
console.log playerTest2