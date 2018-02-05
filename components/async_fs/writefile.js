async function writefile(path, data) {
  const fs = require("fs");
  const write = await fs.writeFile(path, data);

  return write;
}

exports.writefile = writefile;
