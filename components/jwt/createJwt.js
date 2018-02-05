const createJwt = async payload => {
  const jwt = require("jsonwebtoken");
  const crypto = require("crypto");
  const secret = require(`${process.cwd()}/config.json`);
  const { promisify } = require("util");
  const jwtEncode = promisify(jwt.sign);
  if (!payload) {
    return Promise.reject(false);
  } else {
    let encodeToken = await jwtEncode(payload, secret, { expiresIn: 20 }).catch(
      e => {
        return Promise.reject(e);
      }
    );

    if (encodeToken) {
      let returnData = { token: encodeToken, secret: secret };
      return Promise.reject(returnData);
    } else {
      // for security reasons, just return false
      return Promise.reject(false);
    }
  }
};

exports.createJwt = createJwt;
