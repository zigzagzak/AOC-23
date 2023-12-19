const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map((line) => line.split(':')[1].trim().split(' ').filter((num) => num != '').join(''));
console.log(input)
const time = [input[0]]
const distance = [input[1]]
console.log(time, distance)

let results = []
time.forEach((t, index) => {
    // console.log('time: ' + t, 'distance: ' + distance[index])
    let temp = []
    for(let i = 1; i < t; i++) {
        // console.log('time: ' + i, 'distance: ' + distance[index])
        // console.log('i: ' + i, 't-i: ' + (t-i), 'holding: ' + (i * (t-i)))
        const holding = i * (t-i)
        if(holding > distance[index]) {
            temp.push(distance[index])
        }
    }
    results.push(temp)
})
console.log(results.reduce((acc, cur) => acc * cur.length, 1))