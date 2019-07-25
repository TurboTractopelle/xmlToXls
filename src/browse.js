const fs = require("fs");
const read = require("./read");
const path = require("path");
const convertFile = require("./convertFile");

async function browse() {
  const articlePath =
    "C:\\Users\\neroptik\\Desktop\\var\\node\\xmlToXls\\files\\2016\\08\\tsm201610p58\\tsm201610p58.xml";

  //const magie = await convertFile(articlePath);
  //console.log(magie);

  const filesPath = path.join(__dirname, "../files");
  const years = await read(filesPath);

  return new Promise(async (res, err) => {
    const out = await years.map(async year => {
      const yearPath = path.join(filesPath, year);
      const issues = await read(yearPath);

      return issues.map(async issue => {
        const issuePath = path.join(yearPath, issue);
        const files = await read(issuePath);

        return files.map(file => {
          const filePath = path.join(issuePath, file);
          const articlePath = path.join(filePath, `${file}.xml`);
          return "filepath";
        });
      });
    });

    console.log(out);
  });
}

module.exports = browse;
