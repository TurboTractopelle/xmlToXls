const fs = require("fs");
const parseString = require("xml2js").parseString;
const convertData = require("./convertData");

function convertFile(filePath) {
  return new Promise((res, err) => {
    fs.readFile(filePath, "utf-8", (errorRead, raw) => {
      if (errorRead) {
        err(errorRead);
      }
      parseString(raw, (errParse, data) => {
        if (errParse) {
          err(errParse);
        }
        try {
          const converted = convertData(data);
          res(converted);
        } catch (error) {
          err(error);
        }
      });
    });
  });
}

module.exports = convertFile;
