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

