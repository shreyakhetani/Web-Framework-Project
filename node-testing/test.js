const os = require('os');
const fs = require('fs');

console.log(os.version());

const textfile = fs.readFileSync('D://Hamk//BWD(2024)//Web Framework Project//node-testing//test.txt', 'utf-8');

console.log(textfile);
const number =10;
const text =  `my stuff ${Date.now()}. And the number is ${number}`;

fs.writeFileSync('test.txt', text);