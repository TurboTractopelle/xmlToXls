const browse = require("./src/browse");
const readFile = require("./src/convertFile");
const writeData = require("./src/writeData");

browse().then(res => console.log(res));
//writeData();
