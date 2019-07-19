const fs = require("fs");

function read(path) {
  return new Promise((res, err) => {
    fs.readdir(path, (error, data) => {
      if (error) {
        err(error);
      }
      res(data);
    });
  });
}

module.exports = read;
