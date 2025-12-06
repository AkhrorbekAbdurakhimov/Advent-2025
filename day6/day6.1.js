const fs = require('fs');

const arr = fs.readFileSync('day6/input.txt', 'utf-8')?.split('\r\n');

const addStringNumbers = (a, b) => {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? Number(a[i]) : 0;
    const digitB = j >= 0 ? Number(b[j]) : 0;

    const sum = digitA + digitB + carry;
    const newDigit = sum % 10;
    carry = Math.floor(sum / 10);

    result = newDigit + result;

    i--;
    j--;
  }

  return result;
}

function multiplyStringNumbers(a, b) {
  a = a.replace(/^0+/, "") || "0";
  b = b.replace(/^0+/, "") || "0";

  if (a === "0" || b === "0") return "0";

  let m = a.length;
  let n = b.length;

  let result = new Array(m + n).fill(0);

  a = a.split("").reverse();
  b = b.split("").reverse();

  for (let i = 0; i < m; i++) {
    let carry = 0;
    let digitA = parseInt(a[i]);

    for (let j = 0; j < n; j++) {
      let digitB = parseInt(b[j]);
      let sum = result[i + j] + digitA * digitB + carry;

      result[i + j] = sum % 10;
      carry = Math.floor(sum / 10);
    }

    if (carry > 0) {
      result[i + n] += carry;
    }
  }

  while (result.length > 1 && result[result.length - 1] === 0) {
    result.pop();
  }

  return result.reverse().join("");
}

const trashCompacter = (arr) => {

  let problems = arr.slice(0, arr.length - 1)?.map((problem) => problem.trim().split(' ').filter((el) => el));
  let operations = arr.slice(arr.length - 1, arr.length)?.[0]?.split(' ')?.filter(operation => operation);

  let total = '0';

  for (let c = 0; c < problems[0].length; c++) {

    let sum = '0';
    let product = '1';
    for (let r = 0; r < problems.length; r++) {
      if (operations[c] === '+') sum = addStringNumbers(sum, problems[r][c])
      if (operations[c] === '*') product = multiplyStringNumbers(product, problems[r][c])
    }

    if (operations[c] === '+') total = addStringNumbers(total, sum);
    if (operations[c] === '*') total = addStringNumbers(total, product);

  }

  console.log(total)

  
  return total;
};

console.log(trashCompacter(arr));