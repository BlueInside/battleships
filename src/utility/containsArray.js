const containsArray = (matrix, targetArray) => {
  for (let index = 0; index < matrix.length; index++) {
    if (
      matrix[index][0] === targetArray[0] &&
      matrix[index][1] === targetArray[1]
    )
      return true;
  }
  return false;
};

module.exports = containsArray;
