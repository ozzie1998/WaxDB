// these need more attention, I'll export the Postman collection I've been using for testing and add that later. 
tests["response code = 200"] = responseCode.code === 200;

pm.test("Successful registration response", function () {
    pm.response.to.have.body({
        "success": true,
        "message": "createdAccount"
    });
});
pm.test("Duplicate user registration check", function () {
    pm.response.to.have.body(
        {
            "erorr": "userAlreadyExists",
            "success": false,
            "message": "A user is already registered with that username, try another."
        }
    )
})
pm.test("User does not exist, login", function () {
    pm.response.to.have.body(
        {
            "success": false,
            "message": "userDoesNotExist"
        }
    )
})