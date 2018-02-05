async function createAccount(deps, data) {
  // data = JSON Object.
  if (data) {
    // will add more models as I add them to the db etc
    const users = deps.users;
    let insert = new users(data);
    let response;
    let insertQuery = await insert.save(null, { method: "insert" }).catch(e => {
      return Promise.reject(e);
    });

    if (insertQuery) {
      response = { success: true, message: "createdAccount" };
      return Promise.resolve(response);
    } else {
      response = { error: "posssible", data: insertQuery };
      return Promise.resolve(response);
    }
  }
}

exports.createAccount = createAccount;
