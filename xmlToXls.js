const browse = require("./src/browse");
const readFile = require("./src/convertFile");
const writeData = require("./src/writeData");

Object.defineProperty(Array.prototype, "flat", {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});

async function exportData() {
  return new Promise(async (res, err) => {
    const dataYears = await browse();
    const articlesArr = dataYears.flat(3);
    await writeData(articlesArr);
    res("done");
  });
}

exportData().then(console.log);
