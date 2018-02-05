function redisDelete(deps, key) {
  const { promisify } = require("util");
  const { redisClient } = deps;
  const redisClientDel = promisify(redisClient.del).bind(redisClient);
  if (!key) {
    new Error("One or more mandatory parameters are missing");
  } else {
    let redisDelOperation = redisClientDel(key)
      .then(result => {
        return result;
      })
      .catch(e => {
        return new Error(e);
      });
  }
}

exports.redisDel = redisDelete;
