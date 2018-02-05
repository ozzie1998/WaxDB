function redisSet(deps, key, data) {
  const redisClient = deps.redisClient;
  const { promisify } = require("util");
  const redisClientSet = promisify(redisClient.set).bind(redisClient);

  return new Promise((resolve, reject) => {
    if (!key || !data) {
      let provided = {
        key: key || false,
        data: data || false
      };
      provided = JSON.stringify(provided);
      reject(
        `One or more mandatory params are missing, provided params: ${provided}`
      );
    } else {
      redisClientSet(key, data)
        .then(result => {
          resolve(result);
        })
        .catch(e => {
          reject(new Error(e));
        });
    }
  });
}

exports.redisSet = redisSet;
