const browse = require("./src/browse");
const writeData = require("./src/writeData");
const chalk = require("chalk");

Object.defineProperty(Array.prototype, "flat", {
	value: function(depth = 1) {
		return this.reduce(function(flat, toFlatten) {
			return flat.concat(
				Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten
			);
		}, []);
	}
});

async function exportData() {
	return new Promise(async (res, err) => {
		const dataYears = await browse();
		//const articlesArr = dataYears.flat(3);
		//await writeData(articlesArr);
		//res("DONE - File created");
	});
}

exportData().then(res => console.log(chalk`{green.bold ${res}}`));
