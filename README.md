# back-end

/api/users:

GET - /api/users - Get a list of all users
POST - /api/users/register - Register a new user using the username/password provided
POST - /api/users/login - Login in to a user account (returns a token to put in local storage)
(next 2 have same functionality as above)
POST - /api/users/signup - Register a new user using the username/password provided
POST - /api/users/signin - Login in to a user account (returns a token to put in local storage)

/api/recipes (must be logged in to access these):

GET - /api/recipes - Get a list of all recipes
GET - /api/recipes/:id - Get a recipe by id
POST - /api/recipes - Add a recipe (name, category, source, imageURL) to the server
