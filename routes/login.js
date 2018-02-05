const login = async (deps, req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const verifyJwt = deps.verifytJwt;
  const createJwt = deps.createJwt;
  const findUser = deps.findUser;
  const verifyPassword = deps.verifyPassword;
  const token = req.body.token || req.headers["x-access-token"] || false;
  const jwtSecret = require(`${process.cwd()}/config.json`);
  const _Date = new Date();
  const jwtSetTime = _Date.getHours() - 12 + ":" + _Date.getMinutes();
  let verifyToken;
  if (token) verifyToken = await verifyJwt(token);

  if (!verifyToken) {
    // authenticate the user.
    let userLookup = await findUser(deps, username).catch(e => {
      return Promise.reject(e);
    });

    if (userLookup) {
      let validatePasswordHash = await verifyPassword(
        deps,
        password,
        userLookup.password
      ).catch(e => {
        return Promise.reject(e);
      });

      if (validatePasswordHash) {
        // generate a new JWT and return it.
        const payload = {
          username: username,
          jwtSetAt: jwtSetTime,
          validated: true
        };
        let newJwt = await createJwt(payload);
        res.send(newJwt);
      }
    }
  } else {
    res.send("authenticated");
  }
};

exports.login = login;
