const fs = require("fs");
const parseString = require("xml2js").parseString;
const testPath =
  "C:\\Users\\neroptik\\Desktop\\var\\node\\xmlToXls\\files\\2019\\05\\tsm20196p39\\tsm20196p39.xml";
function readFile(file = testPath) {
  fs.readFile(file, "utf-8", (err, raw) => {
    //const data = JSON.stringify(parseString(raw));
    parseString(raw, (err, data) => {
      const articleType = data.article.$["article-type"];

      if (articleType === "magazine") {
      } else if (articleType === "research-article") {
        const title =
          data.article.front[0]["article-meta"][0]["title-group"][0][
            "article-title"
          ][0]["_"];
        const transTitle =
          data.article.front[0]["article-meta"][0]["title-group"][0][
            "trans-title-group"
          ][0]["trans-title"][0];

        const abstract =
          data.article.front[0]["article-meta"][0]["abstract"][0]["p"][0];
        const transAbstract =
          data.article.front[0]["article-meta"][0]["trans-abstract"][0]["p"][0];
      }

      const authors = data.article.front[0]["article-meta"][0][
        "contrib-group"
      ][0]["contrib"]
        .map(
          entry =>
            `${entry.name[0]["given-names"][0]} ${entry.name[0].surname[0]}`
        )
        .join(", ");

      console.log(authors);
    });
  });
}

module.exports = readFile;
