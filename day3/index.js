const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const nums = [];
input.forEach((line, index) => {
    console.log(line)
    line.split('').forEach((char, charIndex) => {
        //check if char is a number
        if (isNaN(char) && char !== '.') {
            console.log('found symbol', char, charIndex)
            let indexsOfNum = []
            if(index > 0) {
                input[index - 1].substring(charIndex - 1, charIndex + 2).split('').forEach((char, i) => {
                    if(!isNaN(char)){
                        console.log(i)
                        if(i === 1 && indexsOfNum.length > 0) {
                            //indexsOfNum.push(i)
                            console.log('not pushing')
                        }else if(i === 2 && !isNaN(input[index - 1].substring(charIndex - 1, charIndex + 2)[1])){
                            console.log('not pushing')
                        }else{
                            indexsOfNum.push(i)
                        }                       
                    }
                });
                if(indexsOfNum.length > 0) {
                    indexsOfNum.forEach((ind) => {
                        let lineIndex = charIndex - 1 + ind;
                        console.log('found num above', lineIndex)
                        nums.push(getWholeNum(input[index - 1], lineIndex))
                    })
                }
            }

            indexsOfNum = []
            input[index].substring(charIndex - 1, charIndex + 2).split('').forEach((char, i) => {
                if(!isNaN(char)){
                    indexsOfNum.push(i)
                }
            });
            if(indexsOfNum.length > 0) {
                indexsOfNum.forEach((ind) => {
                    let lineIndex = charIndex - 1 + ind;
                    console.log('found num', lineIndex)
                    nums.push(getWholeNum(input[index], lineIndex))
                })
            }

            if(index < input.length - 1) {
                indexsOfNum = []
                input[index + 1].substring(charIndex - 1, charIndex + 2).split('').forEach((char, i) => {
                    if(!isNaN(char)){
                        console.log(i)
                        if(i === 1 && indexsOfNum.length > 0) {
                            //indexsOfNum.push(i)
                            console.log('not pushing')
                        }else if(i === 2 && !isNaN(input[index + 1].substring(charIndex - 1, charIndex + 2)[1])){
                            console.log('not pushing')
                        }else{
                            indexsOfNum.push(i)
                        }   
                    }
                });
                if(indexsOfNum.length > 0) {
                    indexsOfNum.forEach((ind) => {
                        let lineIndex = charIndex - 1 + ind;
                        console.log('found num below', lineIndex)
                        nums.push(getWholeNum(input[index + 1], lineIndex))
                    })
                }
            }
        }
    });
});

console.log(nums.reduce((a, b) => a + b, 0));

function getWholeNum(line, index) {
    console.log('getWholeNum', line, index)
    const chars = line.split('');
    let num = [];
    let i = index;
    //forwards
    while(!isNaN(chars[i])) {
        console.log(i, chars[i])
        num.push(chars[i]);
        i++;
    }
    i = index
    //backwards
    if(index > 0) {
        i -= 1
        while(!isNaN(chars[i]) && i >= 0) {
            console.log(i, chars[i])
            num.unshift(chars[i]);
            i--;
        }
    }
    console.log(Number(num.join('')))
    return Number(num.join(''));
}