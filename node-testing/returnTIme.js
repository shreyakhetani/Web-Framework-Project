
returnTime = () => {

const time = new Date();
const d = `${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()} \n`;
return d;

}

module.exports = "returnTime()";