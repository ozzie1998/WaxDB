(async () => {
  const fs = require("fs");
  const crypto = require("crypto");
  const secret = crypto.randomBytes(48).toString("hex") || false;
  const { promisify } = require("util");
  const readFile = promisify(fs.readFile);
  const writeFile = promisify(fs.writeFile);

  if (fs.existsSync("config.json")) {
    console.log("> config exists");
    let configFile = await readFile("config.json", "utf-8");

    if (configFile) {
      try {
        configFile = JSON.parse(configFile);
      } catch (e) {
        return new Error(e);
      }

      configFile.jwtSecret = secret;

      let write = await writeFile(
        "config.json",
        JSON.stringify(configFile)
      ).catch(e => {
        return new Error(e);
      });
      console.log("> Generated new JWT Secret");
    }
  }
})();
