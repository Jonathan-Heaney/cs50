'use strict';

function validateCC(num) {
  let numString = num.toString();
  // Validate the number is the right length
  if (
    numString.length !== 13 &&
    numString.length !== 15 &&
    numString.length !== 16
  )
    return 'INVALID';
  // Validate the number passes the Luhn algorithm
  else if (!validateNum(numString)) return 'INVALID';
  else {
    const firstDigit = numString.charAt(0);
    const firstTwoDigits = numString.charAt(0) + numString.charAt(1);
    // Check to see which brand of card it is
    if (firstTwoDigits === '34' || firstTwoDigits === '37') {
      return 'AMEX';
    } else if (
      firstTwoDigits === '51' ||
      firstTwoDigits === '52' ||
      firstTwoDigits === '53' ||
      firstTwoDigits === '54' ||
      firstTwoDigits === '55'
    ) {
      return 'MASTERCARD';
    } else if (firstDigit === '4') {
      return 'VISA';
    } else return 'INVALID';
  }
}

console.log(validateCC(4003600000000014));

// Check to see if the number is a valid CC number
function validateNum(string) {
  const arr = string.split('');
  const operatorArr = [];
  const sumArr = [];

  // Add every other digit to a different array
  for (let i = string.length; i >= 0; i -= 2) {
    if (arr[i]) {
      operatorArr.push(`${arr[i]}`);
      sumArr.push(`${arr[i + 1]}`);
    }
  }

  // Double each value in the operator array
  const doubledArr = getDoubledArr(operatorArr);

  // Turn the doubled array into a string so it can be split
  const stringArr = getStringArr(doubledArr);

  // Split the string array into an array of individual digits (formatted as strings)
  const splitArr = getSplitArr(stringArr);

  // Get the sum of the split array
  const sum1 = getArraySum(splitArr);

  // Get the sum of all the unused digits
  const sum2 = getArraySum(sumArr);

  // Get the sum of both sets of digits
  const finalSum = sum1 + sum2;

  //Check to see if the final sum ends in a 0; if so, it could be a valid CC number
  if (finalSum % 10 !== 0) return 'INVALID';
  else return true;
}

// Helper functions, used inside validateNum function
function getDoubledArr(array) {
  return Array.from(array, (x) => x * 2);
}

function getStringArr(array) {
  const newArr = array.map((num) => {
    return String(num);
  });
  return newArr;
}

function getSplitArr(array) {
  const newArr = array
    .map((element) => {
      return element.split('');
    })
    .flat();

  return newArr;
}

function getArraySum(array) {
  const sum = array.reduce((accumulator, value) => {
    return Number(accumulator) + Number(value);
  }, 0);
  return sum;
}
