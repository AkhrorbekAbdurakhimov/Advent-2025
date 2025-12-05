const fs = require('fs');

const arr = fs.readFileSync('day4/input.txt', 'utf-8')?.split('\r\n');

function addBorderToCharMatrix(matrix, char = ".") {
  const cols = matrix[0].length;
  const border = char.repeat(cols + 2);

  const padded = matrix.map(row => char + row + char);
  return [border, ...padded, border];
}


const printingDepartment = (matrix) => {

  let borderedMatrix = addBorderToCharMatrix(matrix, '.');

  borderedMatrix = borderedMatrix.map(row => row.split(''))
  
  let rLen = borderedMatrix.length;
  let cLen = borderedMatrix[0].length;

  let rolls = 0;

  for (let r = 1; r < rLen - 1; r++) {
    for (let c = 1; c < cLen - 1; c++) {

      if (borderedMatrix[r][c] === '.')
        continue;

      let count = 0;
      if (borderedMatrix[r - 1][c - 1] === '@') count++
      if (borderedMatrix[r - 1][c] === '@') count++
      if (borderedMatrix[r - 1][c + 1] === '@') count++
      if (borderedMatrix[r][c - 1] === '@') count++
      if (borderedMatrix[r][c + 1] === '@') count++
      if (borderedMatrix[r + 1][c - 1] === '@') count++
      if (borderedMatrix[r + 1][c] === '@') count++
      if (borderedMatrix[r + 1][c + 1] === '@') count++

      if (count <= 3)
        rolls++
    }
  }

  return rolls;

};

console.log(printingDepartment(arr));