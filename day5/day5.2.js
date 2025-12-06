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

function subtractStringNumbers(a, b) {
  a = a.replace(/^0+/, "") || "0";
  b = b.replace(/^0+/, "") || "0";

  if (compareStringNumbers(a, b, "<")) {
    return "-" + subtractStringNumbers(b, a);
  }

  let res = "";
  let carry = 0;

  a = a.split("").reverse();
  b = b.split("").reverse();

  for (let i = 0; i < a.length; i++) {
    let digitA = parseInt(a[i]);
    let digitB = i < b.length ? parseInt(b[i]) : 0;

    digitA -= carry;

    if (digitA < digitB) {
      digitA += 10;
      carry = 1;
    } else {
      carry = 0;
    }

    res += (digitA - digitB);
  }

  // Reverse back
  res = res.split("").reverse().join("");

  // Remove leading zeros again
  res = res.replace(/^0+/, "") || "0";

  return res;
}

const cafeteria = (arr) => {

  let intervals = arr.filter(line => line.includes('-')).map(line => line.split('-'));

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
  for (let [start, end] of merged) {
    count += Number(subtractStringNumbers(end, start)) + 1;
  }

  return count;
};

console.log(cafeteria(arr));