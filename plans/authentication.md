### **Authentication:**

Authentication will use MySQL to store user logins/etc. 

JWT and "sessions": 

Sessions are an entry in the cache that will expire after 5 minutes of inactivity (open to change on this, not really sure on the best expirary time). They contain a randomly generated 48 character long string that also exists in the JWT token. This is done to validate the two, as in, if a hacker tried to spam the server with randomly generated JWT tokens, and he happened to guess the right secret, he won't be able to login because the session validation key won't match. The JWT token is then destroyed. 

I've also considered using a smaller string to locate the session in the cache instead of the 48 character long string, will be the same as above, but no session will be located if a randomly generated token is used. I'm still planning on sticking with the above, feel free to comment on this. 


### **User registration**

Nothing special herefire


### **Data storage:**

One main object will be stored in the caching server which will look like so: 

```javascript 

  {
  	"username": "Ozzie",
  	"data": ["1", "2", "3"]
  }

```

Where 1,2 and 3 are links to seperate objects owned by `Ozzie`. 

This means the server won't have to return all of the users data to look something up, all it will need to do is search for the user `Ozzie`, check the requested data block exists, then return it, either directly to the user, or to another route for further processing. What ever the user requested. 

A data block will look like so: 

```javascript 
    
    {
    	"1": {
    		// data here in the form of a JSON object
    	}
    }

``` 

If either the requested data doesn't exist, or the data block doesn't exist, the server returns a 404 and one of the following messages: 

If the data does not exist:

```javascript 
{
	success: false,
	message: "dataDoesNotExist"
}
```

If the data block can't be found: 

```javascript 
{
	success: false,
	message: "dataBlockDoesNotExist"
}
```

*Maybe a little too long ^, feel free to comment on this.

