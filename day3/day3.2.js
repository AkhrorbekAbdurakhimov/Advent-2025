const fs = require('fs');

const arr = fs.readFileSync('day3/input.txt', 'utf-8')?.split('\r\n');

const largestPossiblePair = (input) => {
  const n = input.length;
  const maxLen = 12;

  let start = 0;
  let end = n - maxLen;

  let max = '';

  for (let i = 1; i <= maxLen; i++) {

    let current = input[start];
    let maxIndex = start;

    for (let j = start; j <= end; j++) {
      if (input[j] > current) {
        current = input[j];
        maxIndex = j;
      }
    }

    max += current;

    start = maxIndex + 1;
    end++
  }

  return max;
} 

const addBigNumbers = (a, b) => {
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

const lobby = (arr) => {
  let totalJoltage = '0';

  for (let bank of arr) {
    const maxJoltage = largestPossiblePair(bank);
    totalJoltage = addBigNumbers(totalJoltage, maxJoltage);
  }

  return totalJoltage;
};

console.log(lobby(arr));