const fs = require('fs');

const arr = fs.readFileSync('day2/input.txt', 'utf-8')?.split(',');

const isRepeatedId = (ID) => {
  for (let patternLength = 1; patternLength <= ID.length / 2; patternLength++) {
    if (ID.length % patternLength === 0) {
      const pattern = ID.substring(0, patternLength);
      const repetitions = ID.length / patternLength;

      if (pattern.repeat(repetitions) === ID && repetitions >= 2) {
        return true;
      }
    }
  }

  return false;
}

const giftShop = (arr) => {

  let sum = 0;

  for (let IDS of arr) {
    const [a, b] = IDS.split('-').map((ID) => Number(ID))
    for (let i = a; i <= b; i++) {
      if (isRepeatedId(String(i))) {
        sum += i;
      }
    }
  }

  console.log(sum)

};

console.log(giftShop(arr));