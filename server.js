//WaxJS - NodeJS and Redis NoSQL database with superpowers.
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const knex = require("knex")(require("./knexfile.js"));
const bookshelf = require("bookshelf")(knex);
const bcrypt = require("bcrypt");
const jwt = require("express-jwt");
const session = require("express-session");
const component_ = require("./components/fetchers/componentFetch").component;
const route_ = require("./components/fetchers/routeFetch.js").route;
const connectRedis = require("./components/redisOperations/connectRedis.js")
  .connectRedis;
const Redis = connectRedis();
let deps = {};
deps.users = bookshelf.Model.extend({
  tableName: "users"
});
// quick monkey-patch over the 'component' and 'route' fetch components
// to populate the deps object on each call
component = (path, name) => {
  let location;
  if (path) {
    location = `${path}/${name}`;
  }
  let temp = component_(location);
  if (temp) {
    deps[name] = temp;
    return temp;
  } else {
    return temp;
  }
};
route = name => {
  let temp = route_(name) || false;
  if (temp) {
    deps[name] = temp;
    return temp;
  } else {
    return temp;
  }
};
// routes  the route fetching function needs attention, it will receive attention later.
let register = require("./routes/register.js").register;
let login = require("./routes/login.js").login;
// components
const createJwt = component("/jwt", "createJwt");
const decodeJwt = component("/jwt", "decodeJwt");
const hashnsalt = component("/encryption", "hashnsalt");
const verifyPassword = component("/encryption", "verifyPassword");
deps.findUser = component("/async_dbOperations", "findUser");
const createEntry = component("/async_dbOperations", "createEntry");
const client = component("connectRedis");
const redisDel = component("redisDelete");
const redisGet = component("redisGet");
const redisSet = component("redisSet");
const app = express();

deps.jwtSecret = require("./random.txt") || false;
//app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// generic routes below here

app.post("/register/", async (req, res) => {
  console.log(req.query);
  let registerRoute = await register(deps, req, res).catch(e => console.log(e));
});

app.post("/login", async (req, res) => {
  let loginRoute = await login(deps, req, res).catch(e => {
    console.log(e);
  });
});

app.listen(3000, () => console.log("wax is listening on port 3000"));
