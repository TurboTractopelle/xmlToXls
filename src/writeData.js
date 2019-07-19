const json2xls = require("json2xls");
const fs = require("fs");

function writeData() {
  var jsonArr = [
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
  ];
  var xls = json2xls(jsonArr);
  fs.writeFileSync("data.xlsx", xls, "binary");
}

module.exports = writeData;
