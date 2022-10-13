'use strict';

function validateCC(num) {
  let numString = num.toString();
  if (
    numString.length !== 13 &&
    numString.length !== 15 &&
    numString.length !== 16
  )
    return 'INVALID';
  else if (!validateNum(numString)) return 'INVALID';
  else {
    const firstDigit = numString.charAt(0);
    const firstTwoDigits = numString.charAt(0) + numString.charAt(1);
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

console.log(validateCC(401288881881));

function validateNum(string) {
  const arr = string.split('');
  //   console.log(arr);
  const operatorArr = [];
  const sumArr = [];

  for (let i = string.length - 2; i >= 0; i -= 2) {
    operatorArr.push(arr[i]);
  }

  for (let i = string.length - 1; i >= 0; i -= 2) {
    sumArr.push(arr[i]);
  }
  //   console.log(operatorArr);
  //   console.log(sumArr);

  const doubledArr = Array.from(operatorArr, (x) => x * 2);
  //   console.log(doubledArr);

  const stringArr = doubledArr.map((num) => {
    return String(num);
  });

  //   console.log(stringArr);

  const splitArr = stringArr
    .map((element) => {
      return element.split('');
    })
    .flat();

  //   console.log(splitArr);

  const sum1 = splitArr.reduce((accumulator, value) => {
    return Number(accumulator) + Number(value);
  }, 0);

  //   console.log(sum1);

  const sum2 = sumArr.reduce((accumulator, value) => {
    return Number(accumulator) + Number(value);
  }, 0);

  //   console.log(sum2);

  const finalSum = sum1 + sum2;

  if (finalSum % 10 !== 0) return 'INVALID';
  else return true;
}

// console.log(validateNum('4003600000000014'));
