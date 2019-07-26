const json2xls = require("json2xls");
const fs = require("fs");
const path = require("path");

function writeData(data) {
	/*var jsonArr = [
    {
      foo: "bar",
      qux: "moo",
      poo: 123,
      stux: new Date()
    },
    {
      foo: "bar",
      qux: "moo",
      poo: 345,
      stux: new Date()
    }
  ];*/
	var xls = json2xls(data);
	const filePath = path.join(__dirname, "../output");
	fs.writeFileSync(`${filePath}\\data.xlsx`, xls, "binary");
}

module.exports = writeData;
