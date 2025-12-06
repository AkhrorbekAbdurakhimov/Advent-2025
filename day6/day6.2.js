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

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const trashCompacter = (arr) => {

  let original = arr.slice(0, arr.length - 1);
  let problems = arr.slice(0, arr.length - 1)?.map((problem) => problem.trim().split(' ').filter((el) => el));
  let operations = arr.slice(arr.length - 1, arr.length)?.[0]?.split(' ')?.filter(operation => operation);

  let index = 0;
  for (let c = 0; c < problems[0].length; c++) {

    let maxLen = 0;
    for (let r = 0; r < problems.length; r++) {
      maxLen = Math.max(maxLen, problems[r][c].length)
    }

    index = index + maxLen;

    for (let r = 0; r < problems.length; r++) {
      original[r] = setCharAt(original[r], index, '#');
    }

    index++;
  }


  original = original.map((el) => el.replaceAll(' ', '0'));
  original = original.map(el => el.split('#'));

  console.log(original)

  let total = '0';

  for (let c = 0; c < problems[0].length; c++) {

    let maxLen = 0;
    for (let r = 0; r < problems.length; r++) {
      maxLen = Math.max(maxLen, problems[r][c].length)
    }

    let vNumbers = new Array(maxLen).fill('');

    for (let i = 0; i < vNumbers.length; i++) {
      for (let r = 0; r < original.length; r++) {
        if (original[r][c].split('')[original[r][c].length - i - 1] !== '0') {
          vNumbers[i] = vNumbers[i] += original[r][c].split('')[original[r][c].length - i - 1];
        }
      }
    }

    let sum = '0';
    let product = '1';
    for (let r = 0; r < vNumbers.length; r++) {
      if (operations[c] === '+') sum = addStringNumbers(sum, vNumbers[r])
      if (operations[c] === '*') product = multiplyStringNumbers(product, vNumbers[r])
    }

    if (operations[c] === '+') total = addStringNumbers(total, sum);
    if (operations[c] === '*') total = addStringNumbers(total, product);
  }
  
  return total;
};

console.log(trashCompacter(arr));