function convertData(data) {
  const articleType = data.article.$["article-type"];

  let articleRef,
    title,
    transTitle,
    abstract,
    transAbstract,
    authors = "";

  if (articleType === "magazine") {
  } else if (articleType === "research-article") {
    articleRef = data.article.front[0]["article-meta"][0]["article-id"][1]["_"];

    title =
      data.article.front[0]["article-meta"][0]["title-group"][0][
        "article-title"
      ][0]["_"];

    /*transTitle =
      data.article.front[0]["article-meta"][0]["title-group"][0][
        "trans-title-group"
      ][0]["trans-title"][0];*/
    /*  abstract = data.article.front[0]["article-meta"][0]["abstract"][0]["p"][0];
    transAbstract =
      data.article.front[0]["article-meta"][0]["trans-abstract"][0]["p"][0];*/
    /*authors = data.article.front[0]["article-meta"][0]["contrib-group"][0][
    "contrib"
  ]
    .map(
      entry => `${entry.name[0]["given-names"][0]} ${entry.name[0].surname[0]}`
    )
    .join(", ");*/
    /*const keywordsFr =
      data.article.front[0]["article-meta"][0]["kwd-group"][0]["kwd"];
    const keywordsEn =
      data.article.front[0]["article-meta"][0]["kwd-group"][1]["kwd"];



    /*const addresses = data.article.front[0]["article-meta"][0]["aff"].map(
    (addr, i) => addr["addr-line"][0] //addr["label"][0]:
  );*/
  }

  return { articleRef, title };
}

module.exports = convertData;
