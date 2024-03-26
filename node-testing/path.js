const fs = require('fs');
const path = require('path');
const url = require('url');

let filename = "style.css";

console.log(path.extname(filename));

console.log(path.basename(filename , '.css'));
console.log(path.basename(filename, path.basename(filename)))


console.log(path.join(`${__dirname}`,'public','image'));


let urlAddress = 'https://www.hamk.fi/studying?lang=en';
let parseUrl = url.parse(urlAddress,true);
console.log(parseUrl.protocol);
console.log(parseUrl.host);


