const browse = require("./src/browse");
const readFile = require("./src/convertFile");
const writeData = require("./src/writeData");

browse().then(data => console.log(data[0]));
//writeData();
