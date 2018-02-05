async function deleteUser(deps, username) {
    const users = deps.users;
    const deleteUserQuery = await new users().select(username).delete()
        .catch(e => Promise.reject(new Error(e)));

    if (deleteUserQuery) {
        // I think it returns the amount of rows affected by the 
        // delete operation, or false. I'm not sure the docs are a little rubish. 
        Promise.resolve(deleteUserQuery);
    } else {
        Promise.reject(false) // something else failed. 
    }
}