const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const cubes = {
    red: 12,
    green: 13,
    blue: 14
}

const games = input.map((line) => {
    // console.log(line)
    let game = line.split(':')[0]
    let gameId = parseInt(game.substring('Game '.length))
    // console.log('Game ID: ', gameId)

    let rounds = line.split(':')[1].trim().split(';').map((round) => {

        let r = round.split(', ').reduce((a, cube) => {
            // console.log(cube.trim())
            let colour = cube.trim().split(' ')[1]
            let number = parseInt(cube.trim().split(' ')[0])
            a[colour] = number
            return a
        }, {})
        return r 
    })
    // console.log('Game ID: ', gameId)
    // console.log(rounds)
    return {
        gameId,
        rounds
    }
});
// console.log(games)

const validGames = games.filter((game) => {
    // console.log(game)
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0
    game.rounds.forEach((round) => {
        if (round.red > maxRed) {
            maxRed = round.red
        }
        if (round.green > maxGreen) {
            maxGreen = round.green
        }
        if (round.blue > maxBlue) {
            maxBlue = round.blue
        }
    })
    // console.log(maxRed, maxGreen, maxBlue)

    return maxRed <= cubes.red && maxGreen <= cubes.green && maxBlue <= cubes.blue
})
// console.log(validGames);
// console.log(validGames.reduce((a, b) => a + b.gameId, 0))

const powers = games.reduce((a, game) => {
    // console.log(a)
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0
    game.rounds.forEach((round) => {
        if (round.red > maxRed) {
            maxRed = round.red
        }
        if (round.green > maxGreen) {
            maxGreen = round.green
        }
        if (round.blue > maxBlue) {
            maxBlue = round.blue
        }
    })
    // console.log(maxRed, maxGreen, maxBlue)
    return a += (maxRed * maxGreen * maxBlue)
}, 0)

console.log(powers)