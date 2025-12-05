const fs = require('fs');

const arr = fs.readFileSync('day1/input.txt', 'utf-8')?.split('\r\n');

const secretEnterance = (arr) => {

  let start = 50;
  let max = 100;

  let password = 0;

  for (let rotation of arr) {
    const direction = rotation.slice(0, 1);
    distance = Number(rotation.slice(1, rotation.length));

    if (direction === 'L') {
      start = (start - distance + max) % max;
    }

    if (direction === 'R') {
      start = (start + distance + max) % max;
    }

    if (start === 0)
        password++

  }

  return password;

};

console.log(secretEnterance(arr));