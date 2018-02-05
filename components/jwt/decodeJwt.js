const decodeJwt = async token => {
  const jwt = require("jsonwebtoken");
  const crypto = require("crypto");
  const { promisify } = require("util");
  const secret = require(`${process.cwd()}/config.json`);
  const jwtDecode = promisify(jwt.decode);

  if (!token || !secret) {
    return Promise.reject(
      new Error(
        "One or more mandatory params are missing [decodeJwt.component]"
      )
    );
  } else {
    let decoded = await jwtDecode(token, secret).catch(e => {
      return Promise.reject(
        new Error(
          "An error occured while decoding the token: [decodedJwt.component] \n" +
            e
        )
      );
      if (decoded) {
        return Promise.resolve(decoded);
      } else {
        return Promise.reject(
          "The function returned false - for what ever reason. [decodedJwt.component]\n" +
            decode
        );
      }
    });
  }
};

exports.decodeJwt = decodeJwt;
