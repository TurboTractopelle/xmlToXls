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
    /*Promise.all([
      ...[1, 2, 3].map(item => new Promise((res2, err2) => res2(item)))
    ]).then(data => res(data));*/

    Promise.all([
      ...years.map(async year => {
        return new Promise(async (resYear, err2) => {
          const yearPath = path.join(filesPath, year);
          const issues = await read(yearPath);

          Promise.all([
            ...issues.map(issue => {
              return new Promise(async (resIssue, errIssue) => {
                const issuePath = path.join(yearPath, issue);
                const files = await read(issuePath);

                resIssue(files);
              });
            })
          ]).then(dataYear => resYear(dataYear));

          /*issues.map(async issue => {
            const issuePath = path.join(yearPath, issue);
            const files = await read(issuePath);

            /*return files.map(file => {
              const filePath = path.join(issuePath, file);
              const articlePath = path.join(filePath, `${file}.xml`);
              res2("filepath");
            });
          })*/
        });
      })
    ]).then(allYears => res(allYears));
  });
}

module.exports = browse;
