//This is a long file, and I'm sorry. I tried my best to keep it as short as possible. 
//The login route is only to take in user credentials, validate them, and then create a session 
//and JWT token. There is a component to check if a user is authenticated, which is used on **all** routes 
//that require authentication or deal with data or the "database"!;
const login = async (deps, req, res) => {
  const { promisify } = require("util")
  const crypto = require("crypto");
  const username = req.query.username;
  const password = req.query.password;
  const createJwt = deps.createJwt;
  const decodeJwt = deps.decodeJwt;
  const redis = deps.redisSessionsClient;
  const findUser = deps.findUser;
  const verifyPassword = deps.verifyPassword;
  const set = promisify(redis.set).bind(redis)
  const get = promisify(redis.get).bind(redis)
  const del = promisify(redis.del).bind(redis)
  const randomBytesP = promisify(crypto.randomBytes);
  let authToken = req.headers.authorisation
  let login = false;
  if (authToken) {
    let jwtdecode = await decodeJwt(authToken).catch(e => {
      if (e.name === "TokenExpiredError") {
        console.log("token expired")
        login = true;
      } else {
        // return Promise.reject(new Error(e));
      }
    })
    if (jwtdecode && login === false) {
      console.log("verifying JWT Pair with Session Pair")
      // now check that the usernames match before fetching a session
      if (jwtdecode.username === username) {
        let sessionLookup = await get(jwtdecode.id).catch(e => {
          res.send({ success: false, message: "internalSeverError" })
          return Promise.reject(new Error)
        });
        sessionLookup = JSON.parse(sessionLookup)
        if (jwtdecode.pair === sessionLookup.pair) {
          res.send({ success: true, message: "authenticated" })
        } else {
          console.log("JWT and Session Pair doesn't match, reauthenticating")
          // something doesn't make sense... you can reauthenticate
          //login = true;
          console.log(typeof sessionLookup)
          res.send({ jwt: jwtdecode, session: sessionLookup })
        }
      } else {
        console.log("JWT/Session - Username doesn't match")
        // stolen JWT or the client messed up... Reauthenticate
        login = true;
      }
    }
    if (!jwtdecode) {
      login = true;
    }
  } else {
    login = true;
  }
  if (login) {
    if (!username || !password) {
      let missingParams = [];
      if (!username) missingParams.push("username");
      if (!password) missingParams.push('password')
      res.send({ error: "missingParam", params: missingParams, message: "retryAuthenticationProcedure" })
      return Promise.reject({ error: "missingParam", params: missingParams, message: "retryAuthenticationProcedure" })
    }
    // check the user exists, cause you can't login if you don't exist. I don't exist... Apparently. Will i not be able to? My own? shit. 
    let userLookup = await findUser(deps, username).catch(e => { return new Error(e) })
    if (!userLookup) {
      res.send({ success: false, message: "userDoesNotExist" })
    } else {
      // take the password from the database, the "hash", and attempt to verify it against the plaine text password. 
      let verification = await verifyPassword(deps, password, userLookup.password).catch(e => { return new Error(e) })

      if (verification) {
        // hurrah, password is a match. This is good. 
        const sessionId = crypto.randomBytes(48).toString("hex");
        const jwtSessionTokenPair = crypto.randomBytes(48).toString("hex");
        let jwtPayload = { id: sessionId, pair: jwtSessionTokenPair, username: username };
        // now that the payload is sorted out, go ahead and create the jwt token
        let jwtToken = await createJwt(jwtPayload).catch(e => { return Promise.reject(new Error(e)) });

        // create a new session payload, but only include the token pair and the username. 
        console.log(jwtPayload)
        let sessionPayload = { username: username, pair: jwtSessionTokenPair }
        sessionPayload = JSON.stringify(sessionPayload)
        let session = await set(sessionId, sessionPayload).catch(e => { return Promise.reject(new Error(e)) })
        if (jwtToken && session) {
          res.send({ success: true, token: jwtToken.token })
        }
      } else {
        res.send({ success: false, message: "incorrectPassword" })
      }
    }
  }

};

exports.login = login;
