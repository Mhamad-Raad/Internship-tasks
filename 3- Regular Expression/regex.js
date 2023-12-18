// write the string samples.

const sampleDigit = '123';
const sampleLetter = 'abc';
const sampleCapitalLetter = 'ABC';
const sampleSmallLetter = 'xyz';
const sampleDollarSign = '$';
const sampleSpecialCharacter = '!@#$';
const sampleWord = 'example';
const sampleEmail = 'test@example.com';
const sampleURL = 'http://www.example.com';
const samplePhoneNumber = '123-456-7890';
const sampleDate = '2023-01-01';
const sampleIPAddress = '192.168.0.1';
const sampleHTMLTag = '<div>Hello</div>';
const sampleWhiteSpace = ' ';
const samplePrice = '$19.99';
const sampleWeight = '2.5 kg';
const sampleDimension = '10.5 inches';

// write the regex patterns

const digitRegex = /\d/;
const letterRegex = /[a-zA-Z]/;
const capitalLetterRegex = /[A-Z]/;
const smallLetterRegex = /[a-z]/;
const dollarSignRegex = /\$/;
const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
const wordRegex = /\b\w+\b/;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
const phoneNumberRegex = /\d{3}-\d{3}-\d{4}/;
const dateRegex = /\d{4}-\d{2}-\d{2}/;
const ipAddressRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
const htmlTagRegex = /<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/;
const whiteSpaceRegex = /\s/;
const priceRegex = /^\$\d+(\.\d{1,2})?$/;
const weightRegex = /\d+(\.\d+)?\s*(kg|g|lbs)/;
const dimensionRegex = /\d+(\.\d+)?\s*(cm|mm|inches)/;

// function to test the regexes

function testRegex(regex, input) {
  return regex.test(input);
}

// test the regexes for trues

console.log(testRegex(digitRegex, sampleDigit));
console.log(testRegex(letterRegex, sampleLetter));
console.log(testRegex(capitalLetterRegex, sampleCapitalLetter));
console.log(testRegex(smallLetterRegex, sampleSmallLetter));
console.log(testRegex(dollarSignRegex, sampleDollarSign));
console.log(testRegex(specialCharacterRegex, sampleSpecialCharacter));
console.log(testRegex(wordRegex, sampleWord));
console.log(testRegex(emailRegex, sampleEmail));
console.log(testRegex(urlRegex, sampleURL));
console.log(testRegex(phoneNumberRegex, samplePhoneNumber));
console.log(testRegex(dateRegex, sampleDate));
console.log(testRegex(ipAddressRegex, sampleIPAddress));
console.log(testRegex(htmlTagRegex, sampleHTMLTag));
console.log(testRegex(whiteSpaceRegex, sampleWhiteSpace));
console.log(testRegex(priceRegex, samplePrice));
console.log(testRegex(weightRegex, sampleWeight));
console.log(testRegex(dimensionRegex, sampleDimension));

console.log(
  '\n\n-------------------------------------------------------------------------'
);

// test the regexes for falses

console.log(testRegex(digitRegex, sampleLetter));
console.log(testRegex(letterRegex, sampleDigit));
console.log(testRegex(capitalLetterRegex, sampleSmallLetter));
console.log(testRegex(smallLetterRegex, sampleCapitalLetter));
console.log(testRegex(dollarSignRegex, sampleLetter));
console.log(testRegex(specialCharacterRegex, sampleLetter));
console.log(testRegex(wordRegex, sampleWhiteSpace));
console.log(testRegex(emailRegex, sampleWord));
console.log(testRegex(urlRegex, sampleWord));
console.log(testRegex(phoneNumberRegex, sampleWord));
console.log(testRegex(dateRegex, sampleWord));
console.log(testRegex(ipAddressRegex, sampleWord));
console.log(testRegex(htmlTagRegex, sampleWord));
console.log(testRegex(whiteSpaceRegex, sampleWord));
console.log(testRegex(priceRegex, sampleWord));
console.log(testRegex(weightRegex, sampleWord));
console.log(testRegex(dimensionRegex, sampleWord));
