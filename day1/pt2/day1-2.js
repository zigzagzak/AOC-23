const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

const number_words = new Map([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9']
]);

const numbers = lines.map((line) => {
    let nums = []
    let str = ''
    console.log('----------------------------')
    console.log(line)
    line.split('').forEach((char, index) => {
        if(parseInt(char)){
            console.log('found number: ' + char)
            nums.push(char)
            str = ''
        }else{
            str += char

            number_words.forEach((value, key) => {
                if(str.includes(key)){
                    console.log('found word: ' + key)
                    nums.push(value)
                    str = char
                }
            })
        }
        
    });
    return parseInt(nums[0] + nums[nums.length - 1])
});

console.log(numbers);

const sum = numbers.reduce((acc, curr) => {
    return acc + curr
}, 0);

console.log(sum);
