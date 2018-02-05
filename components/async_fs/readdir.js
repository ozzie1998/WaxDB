async function readdir(directory) {
  const fs = require("fs");
  const data = await fs.readdir(directory);
  return data;
}

exports.readidr = readdir;
