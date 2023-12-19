const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

// console.log(input)

const seeds_input = input[0].split('seeds: ')[1].split(' ').map((num) => parseInt(num))

let maps = []
let cats = []
input.slice(2).forEach((line, index) => {
    if(line[line.length - 1] === ':') {
        const cat = line.split(' map:')[0]
        cats.push(cat)
        maps[cat] = []
    } else if(line[line.length - 1] !== ':' && line.length > 0) {
        const nums = line.split(' ').map((num) => parseInt(num))
        maps[cats[cats.length - 1]].push({'dest' : nums[0], 'source' : nums[1], 'range' : nums[2]})
    }
})

console.log('maps: ', maps)

let locs = Number.MAX_SAFE_INTEGER
for(let i = 0; i < seeds_input.length; i += 2) {
    console.log(seeds_input[i], seeds_input[i + 1])
    for(let j = seeds_input[i]; j <= seeds_input[i] + seeds_input[i+1]; j++) {
        const loc = findLocation(j)
        // console.log('final location: ' + loc)
        if(loc < locs) {
            locs = loc
        }
    }
}

function findLocation(pos, index = 0) {
    if(index == cats.length) {
        return pos
    }

    // console.log('finding location for ' + pos + ' in ' + cats[index])
    const valid_maps = maps[cats[index]].filter((map) => pos >= map.source && pos < map.source + map.range)
    // console.log('valid maps: ', valid_maps)
    if(valid_maps.length > 0) {
        return findLocation((pos - valid_maps[0].source) + valid_maps[0].dest, index + 1)
    }else{
        return findLocation(pos, index + 1)
    }
}

console.log(locs)