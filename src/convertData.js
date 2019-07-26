function convertData(data) {
	const articleType = data.article.$["article-type"];

	let articleRef,
		title,
		transTitle,
		authors,
		affiliations,
		keywordsFr,
		keywordsEn,
		transAbstract = "";

	if (articleType === "magazine") {
	} else if (articleType === "research-article") {
		articleRef = data.article.front[0]["article-meta"][0]["article-id"][1]["_"];

		title = data.article.front[0]["article-meta"][0]["title-group"][0]["article-title"][0]["_"];

		console.log(articleRef);

		if (
			data.article.front[0]["article-meta"][0]["title-group"][0] &&
			data.article.front[0]["article-meta"][0]["title-group"][0]["trans-title-group"] &&
			data.article.front[0]["article-meta"][0]["title-group"][0]["trans-title-group"][0][
				"trans-title"
			] &&
			data.article.front[0]["article-meta"][0]["title-group"][0]["trans-title-group"][0][
				"trans-title"
			][0]
		) {
			transTitle =
				data.article.front[0]["article-meta"][0]["title-group"][0]["trans-title-group"][0][
					"trans-title"
				][0];
		}

		// authors
		if (
			data.article.front[0] &&
			data.article.front[0]["article-meta"] &&
			data.article.front[0]["article-meta"][0] &&
			data.article.front[0]["article-meta"][0]["contrib-group"] &&
			data.article.front[0]["article-meta"][0]["contrib-group"][0] &&
			data.article.front[0]["article-meta"][0]["contrib-group"][0]["contrib"]
		) {
			authors = data.article.front[0]["article-meta"][0]["contrib-group"][0]["contrib"]
				.map(a => {
					let given;
					if (
						a.name &&
						a.name[0]["given-names"] &&
						a.name[0]["given-names"] &&
						a.name[0]["given-names"][0]
					) {
						given = a.name[0]["given-names"][0];
					}

					let surname;
					if (a.name && a.name[0] && a.name[0].surname && a.name[0].surname[0]) {
						surname = a.name[0].surname[0];
					}

					let aff;
					if (a.xref && a.xref && a.xref["_"]) {
						aff = a.xref["_"];
					}

					return `${given ? given : ""}${surname ? surname : ""}${aff ? aff : ""}`;
				})
				.join(", ");
		}

		console.log("\n");
		console
			.log
			//data.article.front[0]["article-meta"][0]["aff"][0]["addr-line"][0]["named-content"]
			();
		console.log("\n");

		// affiliations
		if (
			data.article.front[0]["article-meta"] &&
			data.article.front[0]["article-meta"][0] &&
			data.article.front[0]["article-meta"][0]["aff"]
		) {
			affiliations = data.article.front[0]["article-meta"][0]["aff"]
				.map(aff => {
					const label = aff.label;
					const entreprise = aff["addr-line"][0].institution;
					const addr = aff["addr-line"][0]["named-content"];

					let city, street, postcode, postbox;

					const tmpCity = addr.filter(a => a["$"]["content-type"] === "city");
					if (tmpCity[0] && tmpCity[0]["_"]) {
						city = tmpCity[0]["_"];
					}

					const tmpStreet = addr.filter(a => a["$"]["content-type"] === "street");
					if (tmpStreet[0] && tmpStreet[0]["_"]) {
						street = tmpStreet[0]["_"];
					}

					const tmpPostcode = addr.filter(a => a["$"]["content-type"] === "postcode");
					if (tmpPostcode[0] && tmpPostcode[0]["_"]) {
						postcode = tmpPostcode[0]["_"];
					}

					const tmpPostbox = addr.filter(a => a["$"]["content-type"] === "postbox");
					if (tmpPostbox[0] && tmpPostbox[0]["_"]) {
						postbox = tmpPostbox[0]["_"];
					}

					return `${label}: ${entreprise},${street ? " " + street : null}${
						postbox ? " " + postbox : null
					}${postcode ? " " + postbox : null}${city ? " " + city : null}`;
				})
				.reduce((a, k) => (a = [...a, k]), [])
				.join("\t\r");
		}

		if (
			data.article.front[0] &&
			data.article.front[0]["article-meta"] &&
			data.article.front[0]["article-meta"][0]["kwd-group"] &&
			data.article.front[0]["article-meta"][0]["kwd-group"][0] &&
			data.article.front[0]["article-meta"][0]["kwd-group"][0]["kwd"]
		) {
			keywordsFr = data.article.front[0]["article-meta"][0]["kwd-group"][0]["kwd"];
		}

		if (
			data.article.front[0] &&
			data.article.front[0]["article-meta"] &&
			data.article.front[0]["article-meta"][0]["kwd-group"] &&
			data.article.front[0]["article-meta"][0]["kwd-group"][1] &&
			data.article.front[0]["article-meta"][0]["kwd-group"][1]["kwd"]
		) {
			keywordsEn = data.article.front[0]["article-meta"][0]["kwd-group"][1]["kwd"];
		}
	}

	return { articleRef, title, transTitle, authors, affiliations, keywordsFr, keywordsEn };
}

module.exports = convertData;
