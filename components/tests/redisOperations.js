async function tests() {
  require_ = file => {
    let temp = require(require("path").resolve(__dirname, `../${file}.js`));

    return temp[Object.keys(temp)];
  };

  return new Promise((resolve, reject) => {
    let deps = {};
    const connection = require_("redisConnect");
    deps.client = connection();
    const get = require_("redisGet");
    const set = require_("redisSet");
    const del = require("redisDel");
    // test each operation;
    let setTest = set(deps, 1, 2).catch(e => {
      return new Error(e);
    });
    let getTest = get(deps, 1).catch(e => {
      return new Error(e);
    });
    return { set: setTest, get: getTest };
  });
}

exports.test = tests;
