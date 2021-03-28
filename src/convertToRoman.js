const convertToRoman = (number) => {
  number = parseInt(number);
  if (!number || number < 1 || number > 100){
    return 'Invalid number'
  }
  let answer = '';
  let num = [1, 4, 5, 9, 10, 40, 50, 90, 100];
  let sym = ["I","IV","V","IX","X","XL","L","XC","C"];
  let i = num.length - 1;
  while (number > 0) {
    let div = Math.floor(number / num[i]);
    number = number % num[i];
    while (div > 0) {
      answer = answer.concat('', sym[i]);
      div = div - 1;
    }
    i = i - 1;
  }
  return answer;
}
module.exports = convertToRoman;

// https://www.geeksforgeeks.org/converting-decimal-number-lying-between-1-to-3999-to-roman-numerals/
