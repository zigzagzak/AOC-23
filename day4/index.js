const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

// pt1
// const cards = input.map((line) => line.split(': ')[1])
//                     .map((card) => card.split(' | '))
//                     .map((card) => {
//                         return card.map((line) => {
//                             return line.split(' ').filter((num) => num !== '')
//                         })
//                     }).reduce((acc, card) => {
//                         console.log(card)
//                         const matches = card[1].filter((num) => card[0].includes(num))
//                         console.log(matches, matches.length, Math.pow(1,matches.length))
//                         if(matches.length === 0) {
//                             return acc
//                         }
//                         return acc + matches.reduce((acc, num, i) => i > 0 ? acc * 2 : 1, 1)
//                     }, 0)
// console.log(cards)

let copies = []
const cards = input.map((line) => line.split(': ')[1])
                    .map((card) => card.split(' | '))
                    .map((card) => {
                        return card.map((line) => {
                            return line.split(' ').filter((num) => num !== '')
                        })
                    })

const numCards = cards.reduce((acc, card, index) => {
                    const num = getWins(index, card)
                    console.log(card, index + 1, num)
                    return acc + num
                }, 0)

function getWins(index, line) {
    let wins = line[1].filter((num) => line[0].includes(num)).length
    let copies = (wins + index) <= cards.length ? wins : cards.length - index
    // console.log('Index: ' + (index + 1) + '   Wins: ' + wins + '   Copies: ' + copies)
    let subCopies = 0
    for(let i = index + 1; i <= index + copies; i++) {
        // console.log('checking', i + 1)
        subCopies += getWins(i, cards[i])
    }
    return copies + subCopies
}

console.log(numCards + cards.length)