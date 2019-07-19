const fs = require("fs");
const read = require("./read");
const path = require("path");

async function browse() {
  const filesPath = path.join(__dirname, "../files");
  const years = await read(filesPath);

  years.forEach(async year => {
    const yearPath = path.join(filesPath, year);
    const issues = await read(yearPath);

    issues.forEach(async issues => {
      const issuePath = path.join(yearPath, issues);
    });
  });
}

module.exports = browse;
