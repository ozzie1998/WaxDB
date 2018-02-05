const connectRedis = () => {
  const fs = require("fs");
  let redis_config = require("../../config/redis_connection.json");
  let redisClient;
  const redis = require("redis");

  if (redis_config) {
    redisClient = redis.createClient(redis_config);
  } else {
    return false;
  }
  return redisClient;
};

exports.connectRedis = connectRedis;
