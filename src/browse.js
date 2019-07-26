const fs = require("fs");
const read = require("./read");
const path = require("path");
const convertFile = require("./convertFile");

async function browse() {
	/*const articlePath =
		"C:\\Users\\gdrouen\\Desktop\\dev\\xmlToXls\\files\\2007\\04\\tsm200704p33\\tsm200704p33.xml";
	console.log(await convertFile(articlePath));*/
	//await convertFile(articlePath);

	const filesPath = path.join(__dirname, "../files");

	const years = await read(filesPath);
	return new Promise(async (res, err) => {
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

								Promise.all([
									...files.map(async file => {
										return new Promise(async (resFile, errFile) => {
											const filePath = path.join(issuePath, file);
											const articlePath = path.join(filePath, `${file}.xml`);
											const convertedFile = await convertFile(articlePath);
											resFile(convertedFile);
										});
									})
								]).then(dataFiles => resIssue(dataFiles));
							});
						})
					]).then(dataYear => resYear(dataYear));
				});
			})
		]).then(allYears => res(allYears));
	});
}

module.exports = browse;
