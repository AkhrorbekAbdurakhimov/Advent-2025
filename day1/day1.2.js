const fs = require('fs');

const arr = fs.readFileSync('./day1/input.txt', 'utf-8')?.split('\r\n');

const secretEnterance = (arr) => {

  let position = 50;
  let max = 100;

  let password = 0;

  for (let rotation of arr) {
    const direction = rotation.slice(0, 1);
    const distance = Number(rotation.slice(1, rotation.length));

    password += Math.floor(distance / max);

    const partialDistance = distance % max;
    const oldPosition = position;
    let crossedZero = false;

    if (direction === 'L') {
      position = (position - partialDistance + max) % max;
      if (oldPosition > 0 && oldPosition < partialDistance) {
        password++;
        crossedZero = true;
      }
    }

    if (direction === 'R') {
      position = (position + partialDistance) % max;
      if (oldPosition + partialDistance >= max && partialDistance > 0) {
        password++;
        crossedZero = true;
      }
    }

    if (position === 0 && !crossedZero) {
      password++;
    }

  }

  return password;

};

console.log(secretEnterance(arr));