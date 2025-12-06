const fs = require('fs');

const arr = fs.readFileSync('day5/input.txt', 'utf-8')?.split('\r\n');

function compareStringNumbers(a, b, sign) {

  a = a.replace(/^0+/, '') || '0';
  b = b.replace(/^0+/, '') || '0';

  if (a.length !== b.length) {
    return sign === '>' ? a.length > b.length : a.length < b.length;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return sign === '>' ? a[i] > b[i] : a[i] < b[i];
    }
  }

  return false;
}

function sortWithCompareStringNumbers(arr) {
  return arr.sort((a, b) => {
    if (compareStringNumbers(a[0], b[0], "<")) return -1;
    if (compareStringNumbers(a[0], b[0], ">")) return 1;
    return 1;
  });
}

const cafeteria = (arr) => {

  let intervals = arr.filter(line => line.includes('-')).map(line => line.split('-'));
  let list = arr.filter(line => line && !line.includes('-'));

  intervals = sortWithCompareStringNumbers(intervals);

  let merged = [];

  for (let i = 0; i < intervals.length; i++) {
    let [start, end] = intervals[i];

    if (merged.length === 0 || compareStringNumbers(merged[merged.length - 1][1], start, '<')) {
      merged.push([start, end]);
    } else {
      if (compareStringNumbers(end, merged[merged.length - 1][1], '>')) {
        merged[merged.length - 1][1] = end;
      }
    }

  }

  let count = 0;
  for (let num of list) {
    let isFresh = false;
    for (let [start, end] of merged) {
      if (start === num || end === num || (compareStringNumbers(num, start, '>') && compareStringNumbers(end, num, '>'))) {
        isFresh = true;
        break;
      }
    }

    if (isFresh) {
      count++;
    }

  }

  return count;
};

console.log(cafeteria(arr));