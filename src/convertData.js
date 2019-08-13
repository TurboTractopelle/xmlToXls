function convertData(data) {
	const articleType = data.article.$["article-type"];

	let articleRef,
		category,
		title,
		transTitle,
		authors,
		affiliations,
		keywordsFr,
		keywordsEn,
		abstract,
		transAbstract = "";

	let authorsAffilliations = [];

	articleRef = data.article.front[0]["article-meta"][0]["article-id"][1]["_"];
	console.log(articleRef);

	title = data.article.front[0]["article-meta"][0]["title-group"][0]["article-title"][0]["_"];

	// category
	if (
		data.article.front[0]["article-meta"][0]["article-categories"] &&
		data.article.front[0]["article-meta"][0]["article-categories"][0] &&
		data.article.front[0]["article-meta"][0]["article-categories"][0]["subj-group"] &&
		data.article.front[0]["article-meta"][0]["article-categories"][0]["subj-group"][0] &&
		data.article.front[0]["article-meta"][0]["article-categories"][0]["subj-group"][0]["subject"] &&
		data.article.front[0]["article-meta"][0]["article-categories"][0]["subj-group"][0]["subject"][0]
	) {
		category =
			data.article.front[0]["article-meta"][0]["article-categories"][0]["subj-group"][0][
				"subject"
			][0];
	}

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
				if (a.xref && a.xref && a.xref[0]["_"]) {
					aff = a.xref[0]["_"];
				}

				const authorWithoutAff = `${given ? given : ""}${surname ? " " + surname : ""}`;
				authorsAffilliations.push(`${authorWithoutAff}${aff ? " " + aff : ""}`);
				return authorWithoutAff;
			})
			.join(", ");
	}

	// affiliations
	if (
		data.article.front[0]["article-meta"] &&
		data.article.front[0]["article-meta"][0] &&
		data.article.front[0]["article-meta"][0]["aff"]
	) {
		affiliations = data.article.front[0]["article-meta"][0]["aff"]
			.map(aff => {
				const label = aff.label;
				let entreprise;
				if (aff["addr-line"] && aff["addr-line"][0] && aff["addr-line"][0].institution) {
					entreprise = aff["addr-line"][0].institution;
				}

				if (aff["addr-line"] && aff["addr-line"][0] && aff["addr-line"][0]["named-content"]) {
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

					return `${label}: ${entreprise},${street ? " " + street : ""}${
						postbox ? " " + postbox : ""
					}${postcode ? " " + postbox : ""}${city ? " " + city : ""}`;
				} else {
					return entreprise;
				}
			})
			.reduce((a, k) => (a = [...a, k]), [])
			.join("; ");
	}

	// keywordsFr
	if (
		data.article.front[0] &&
		data.article.front[0]["article-meta"] &&
		data.article.front[0]["article-meta"][0]["kwd-group"] &&
		data.article.front[0]["article-meta"][0]["kwd-group"][0] &&
		data.article.front[0]["article-meta"][0]["kwd-group"][0]["kwd"]
	) {
		keywordsFr = data.article.front[0]["article-meta"][0]["kwd-group"][0]["kwd"].join(", ");
	}

	// keywordsEn
	if (
		data.article.front[0] &&
		data.article.front[0]["article-meta"] &&
		data.article.front[0]["article-meta"][0]["kwd-group"] &&
		data.article.front[0]["article-meta"][0]["kwd-group"][1] &&
		data.article.front[0]["article-meta"][0]["kwd-group"][1]["kwd"]
	) {
		keywordsEn = data.article.front[0]["article-meta"][0]["kwd-group"][1]["kwd"].join(", ");
	}

	// abstract
	if (
		data.article.front[0]["article-meta"][0]["abstract"] &&
		data.article.front[0]["article-meta"][0]["abstract"][0] &&
		data.article.front[0]["article-meta"][0]["abstract"][0]["p"] &&
		data.article.front[0]["article-meta"][0]["abstract"][0]["p"][0]
	) {
		if (data.article.front[0]["article-meta"][0]["abstract"][0]["p"][0]["_"]) {
			abstract = data.article.front[0]["article-meta"][0]["abstract"][0]["p"][0]["_"];
		} else {
			abstract = data.article.front[0]["article-meta"][0]["abstract"][0]["p"][0];
		}
	}

	// transAbstract
	if (
		data.article.front[0]["article-meta"][0]["trans-abstract"] &&
		data.article.front[0]["article-meta"][0]["trans-abstract"][0] &&
		data.article.front[0]["article-meta"][0]["trans-abstract"][0]["p"] &&
		data.article.front[0]["article-meta"][0]["trans-abstract"][0]["p"][0]
	) {
		if (data.article.front[0]["article-meta"][0]["trans-abstract"][0]["p"][0]["_"]) {
			transAbstract = data.article.front[0]["article-meta"][0]["trans-abstract"][0]["p"][0]["_"];
		} else {
			transAbstract = data.article.front[0]["article-meta"][0]["trans-abstract"][0]["p"][0];
		}
	}

	if (authorsAffilliations.length) {
		authorsAffilliations = authorsAffilliations.join(", ");
	}

	return {
		articleRef,
		category,
		title,
		transTitle,
		authors,
		authorsAffilliations,
		affiliations,
		keywordsFr,
		keywordsEn,
		abstract,
		transAbstract
	};
}

module.exports = convertData;
