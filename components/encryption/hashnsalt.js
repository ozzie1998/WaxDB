// take a plain text password and hash-n-salt it.
async function hashnsalt(password) {
  const crypto = require("crypto");
  const bcrypt = require("bcrypt");
  const salt = crypto.randomBytes(48).toString("hex");
  const { promisify } = require("util");
  const genSalt = promisify(bcrypt.genSalt);
  const hash = promisify(bcrypt.hash);
  if (!password) {
    return Promise.reject("Password not provided");
  } else {
    let generateSalt = await genSalt(10).catch(e => {
      return Promise.reject(e);
    });
    if (generateSalt) {
      console.log(password);
      let hashPassword = await hash(password, generateSalt).catch(e => {
        return Promise.reject(e);
      });
      if (hashPassword) {
        return Promise.resolve({ password: hashPassword, salt: generateSalt });
      }
    }
  }
}

exports.hashnsalt = hashnsalt;
