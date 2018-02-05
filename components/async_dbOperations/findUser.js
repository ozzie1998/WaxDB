// fuck yes
async function findUser(deps, username) {
  const users = deps.users;

  if (!username) {
    return Promise.reject("No username provided - mandatory param missing!");
  } else {
    let query = await users
      .where("username", username)
      .fetch()
      .catch(e => {
        return Promise.reject("An error occured: \n" + e);
      });

    if (query) {
      return Promise.resolve(query.attributes);
    } else {
      // maybe add something more helpful here... meh for later
      return Promise.resolve(false);
    }
  }
}

exports.findUser = findUser;
