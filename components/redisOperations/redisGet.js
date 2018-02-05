function redisGet(deps, key) {
  const { promisify } = require("util");
  const { redisClient } = deps;
  const redisClientGet = promisify(redisClient.get).bind(redisClient);

  if (!key) {
    return new Error("One or more mandatory params are missing");
  } else {
    let getOperation = redisClientGet(key)
      .then(result => {
        return result;
      })
      .catch(e => {
        return new Error(e);
      });
  }
}

exports.redisGet = redisGet;
