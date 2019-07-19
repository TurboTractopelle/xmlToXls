const fs = require("fs");
const read = require("./read");
const path = require("path");

async function browse() {
  const filesPath = path.join(__dirname, "../files");
  const years = await read(filesPath);

  years.forEach(async year => {
    const yearPath = path.join(filesPath, year);
    const issues = await read(yearPath);

    issues.forEach(async issue => {
      const issuePath = path.join(yearPath, issue);
      const files = await read(issuePath);

      files.forEach(async file => {
        const filePath = path.join(issuePath, file);
        const articlePath = path.join(filePath, `${file}.xml`);
      });
    });
  });
}

module.exports = browse;
