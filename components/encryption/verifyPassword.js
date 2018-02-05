async function verifyPassword(deps, password, dbPassword) {
  const { promisify } = require("util");
  const bcrypt = require("bcrypt");
  const verify = promisify(bcrypt.compare);

  if (!password || !dbPassword) {
    return Promise.reject("Mandatory param is missing");
  } else {
    let verification = await verify(password, dbPassword).catch(e => {
      return Promise.reject(e);
    });
    if (verification) {
      return Promise.resolve(verification);
    } else {
      // returns false.
      return Promise.resolve(false);
    }
  }
}

exports.verifyPassword = verifyPassword;
