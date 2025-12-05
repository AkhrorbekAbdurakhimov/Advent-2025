const fs = require('fs');

const arr = fs.readFileSync('day3/example.txt', 'utf-8')?.split('\r\n');

const largestPossiblePair = (input) => {
  const n = input.length;
  const maxLRSuffix = new Array(n);
  const maxRLSuffix = new Array(n);

  maxLRSuffix[0] = input[0];
  for (let i = 1; i < n; i++) {
    maxLRSuffix[i] = input[i] > maxLRSuffix[i - 1] ? input[i] : maxLRSuffix[i - 1];
  }

  maxRLSuffix[n - 1] = input[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    maxRLSuffix[i] = input[i] > maxRLSuffix[i + 1] ? input[i] : maxRLSuffix[i + 1];
  }

  let maxJoltage = 0;
  for (let i = 0; i < n - 1; i++) {
    maxJoltage = Math.max(maxJoltage, Number(`${maxLRSuffix[i]}${maxRLSuffix[i + 1]}`))
  }

  return maxJoltage;
} 

const lobby = (arr) => {
  let totalJoltage = 0;

  for (let bank of arr) {
    const maxJoltage = largestPossiblePair(bank);
    totalJoltage += maxJoltage;
  }

  return totalJoltage;
};

console.log(lobby(arr));