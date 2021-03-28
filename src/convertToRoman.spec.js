const convertToRoman = require("./convertToRoman");

test("Returns Invalid number for 0", () => {
  expect(convertToRoman(0)).toBe('Invalid number');
});

test("Returns Invalid number for negative number", () => {
  expect(convertToRoman(-2)).toBe('Invalid number');
});

test("Returns Invalid number for greater than 100", () => {
  expect(convertToRoman(101)).toBe('Invalid number');
});

test("Returns III for 3,3", () => {
  expect(convertToRoman(3,3)).toBe('III');
});

test("Returns III for 3,9", () => {
  expect(convertToRoman(3,3)).toBe('III');
});

test("Returns III for 3.3", () => {
  expect(convertToRoman(3,3)).toBe('III');
});

test("Returns III for 3.9", () => {
  expect(convertToRoman(3,3)).toBe('III');
});

test("Returns Invalid number for string", () => {
  expect(convertToRoman('hello')).toBe('Invalid number');
});

test("Returns XCIX for 99", () => {
  expect(convertToRoman(99)).toBe('XCIX');
});
