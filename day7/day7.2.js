const fs = require('fs');

const arr = fs.readFileSync('day7/example.txt', 'utf-8')
  .trimEnd()
  .split(/\r?\n/)
  .map(line => line.split(''));

function quantumTimelines(grid) {
  const rLen = grid.length;
  const cLen = grid[0].length;

  let sRow = -1, sCol = -1;
  for (let i = 0; i < rLen; i++) {
    const idx = grid[i].indexOf('S');
    if (idx !== -1) { 
      sRow = i; 
      sCol = idx; 
      break; 
    }
  }

  if (sRow === -1) 
    return;

  let counts = Array(cLen).fill(0n);
  if (sRow + 1 < rLen) counts[sCol] = 1n;

  let total = 0n;

  for (let r = sRow + 1; r < rLen; r++) {
    const next = Array(cLen).fill(0n);
    for (let j = 0; j < cLen; j++) {
      const c = counts[j];
      if (c === 0n) continue;

      if (grid[r][j] === '^') {
        if (r === rLen - 1) {
          if (j - 1 >= 0) total += c;
          if (j + 1 < cLen) total += c;
        } else {
          if (j - 1 >= 0) next[j - 1] += c;
          if (j + 1 < cLen) next[j + 1] += c;
        }
      } else {
        if (r === rLen - 1) {
          total += c;
        } else {
          next[j] += c;
        }
      }
    }
    counts = next;
  }
  
  return total;
}

console.log(quantumTimelines(arr).toString());
