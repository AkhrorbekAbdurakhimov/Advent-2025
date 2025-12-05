const fs = require('fs');

const arr = fs.readFileSync('day2/input.txt', 'utf-8')?.split(',');

const isRepeatedId = (ID) => {

  if (ID.length % 2 === 1)
    return false;

  for (let i = 0; i < ID.length / 2; i++) {
    if (ID[i] !== ID[ID.length / 2 + i])
      return false;
  }

  return true;
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