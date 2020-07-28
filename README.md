# back-end

/api/users:

Schema --
{
id: 1 // generated on the back end
username: 'barbara', // String, required
password: 'moore', // String, required
email: null, // String, not required
first_name: null, // String, not required
last_name: null, // String, not required
}

GET - /api/users - Get a list of all users
POST - /api/users/register - Register a new user using the username/password provided
POST - /api/users/login - Login in to a user account (returns a token to put in local storage)
(next 2 have same functionality as above)
POST - /api/users/signup - Register a new user using the username/password provided
POST - /api/users/signin - Login in to a user account (returns a token to put in local storage)

/api/recipes (must be logged in to access these):

Schema --
{
id: 1 // generated on the back end,
name: 'Mashed Potatoes', // String, required
source: 'Grandma', //String required
category: 'Side Dish', // String, required
imageURL: 'put-a-link-here' // String, not required
}

GET - /api/recipes - Get a list of all recipes
GET - /api/recipes/:id - Get a recipe by id
POST - /api/recipes - Add a recipe (name, category, source, imageURL) to the server
