const fs = require('fs');

const arr = fs.readFileSync('day7/input.txt', 'utf-8')?.split('\r\n').map((line) => line.split(''));

const labaratories = (arr) => {

  let rLen = arr.length;
  let cLen = arr[0].length;
  
  let count = 0;
  for (let i = 1; i < rLen; i++) {
    
    for (let j = 0; j < cLen; j++) {
      if (arr[i - 1][j] === 'S') {
        arr[i][j] = '|'
      }
      if (arr[i][j] === '^' && arr[i - 1][j] === '|') {
        arr[i][j - 1] = '|';
        arr[i][j + 1] = '|';
        count++;
      }
      if (arr[i][j] !== '^' && arr[i - 1][j] === '|') {
        arr[i][j] = '|'
      }
    }
    
  }
  
  return count;
};

console.log(labaratories(arr));