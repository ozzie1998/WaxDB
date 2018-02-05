/*
Takes the Req and Res objects, and the findUser component, and queries the database 
to check if the user is available
*/
const register = async (deps, req, res) => {
  const hashnsalt = deps.hashnsalt;
  const verifyPassword = deps.verifyPassword;
  const findUser = deps.findUser;
  const createAccount = deps.createAccount;
  const username = req.query.username || false;
  const password = req.query.password || false;
  const crypto = require("crypto");
  let saltId = crypto.randomBytes(40).toString("hex");
  let response;
  if (!username || !password) {
    response = {
      success: false,
      message: "one or more mandatory params are missing"
    };
    res.send(response);
  } else {
    let userExistsCheck = await findUser(deps, username).catch(e => {
      return Promise.reject(e);
    });

    if (userExistsCheck) {
      response = {
        erorr: "userAlreadyExists",
        success: false,
        message: "A user is already registered with that username, try another."
      };
      res.send(response).end();
      return Promise.reject(response);
    } else {
      // hash the password now.
      let makeHash = await hashnsalt(password).catch(e => {
        return Promise.reject(e);
      });
      if (makeHash) {
        hash = makeHash.password;
        let salt = makeHash.salt;
        // compare the hash against the plaine text password 'req.query.password';
        let hashVerification = await verifyPassword(deps, password, hash).catch(
          e => {
            return Promise.reject(e);
          }
        );
        if (hashVerification) {
          console.log(makeHash);
          let databaseInsert = await createAccount(deps, {
            username: username,
            password: hash,
            salt: salt
          }).catch(e => {
            return Promise.reject(e);
          });

          if (databaseInsert) {
            res.send(databaseInsert);
            return Promise.resolve(databaseInsert);
          } else {
            return Promise.reject(false);
          }
        }
      }
    }
  }
};

exports.register = register;
