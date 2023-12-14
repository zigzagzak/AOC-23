const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf8').split('\n');


const numbers = lines.map((line) => {
    let nums = []
    line.split('').forEach((char, index) => {
        if(parseInt(char)){
            nums.push(char)
        }
    });
    return parseInt(nums[0] + nums[nums.length - 1])
});

console.log(numbers);

const sum = numbers.reduce((acc, curr) => {
    return acc + curr
}, 0);

console.log(sum);
