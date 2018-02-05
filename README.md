# WaxDB

A NoSQL REST database using Redis written in NodeJS.

**_Documentation is currently in the works!_**

Documentation:

The server is made up of reusable functions called components.

Documentation for each component:

### Async DB operations

1. createAccount

This component is used to create an entry in the database.

```javascript
const createAccount = component("/async_dbOperations", "createAccount");
// working on a better component function
// probably better to use an async IFFE
const performQuery = async data => {
  const query = await createEntry(data).catch(e => {
    return new Error(e);
  });
  // query => { error: "posssible", data: insertQuery };
};
```

1. findUser

This component can be used to check if an account exists and
to fetch the info from the database about the user

```javascript
const deleteUser = component("/async_dbOperations", "findUser");

const performQuery = async username => {
  const query = await deleteUser(username).catch(e => {
    return new Error(e);
  });
  // query => user data*
};
```
