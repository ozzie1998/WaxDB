async function readfile(path) {
  const fs = require("fs");
  let content = await fs.readFile(path, "utf8");
  return content;
}

exports.readfile = readfile;
