# back-end

## /api/users

Schema:

```js
{
id: 1 // generated on the back end
username: 'barbara', // String, required
password: 'moore', // String, required
email: null, // String, not required
first_name: null, // String, not required
last_name: null, // String, not required
}
```

| Method | URL                 | Description                                          |
| ------ | ------------------- | ---------------------------------------------------- |
| GET    | /api/users          | Get a list of all users                              |
| POST   | /api/users/register | Register a new user using provided username/password |
| POST   | /api/users/login    | Login to a user account (returns token)              |
| POST   | /api/users/signup   | Register a new user using provided username/password |
| POST   | /api/users/signin   | Login to a user account (returns token)              |

## /api/recipes (must be logged in to access these)

Schema:

```js
{
id: 1 // generated on the back end, do not need to include with request
name: 'Mashed Potatoes', // String, required
source: 'Grandma', //String required
category: 'Side Dish', // String, required
imageURL: 'put-a-link-here' // String, not required
}
```

| Method | URL              | Description                                                   |
| ------ | ---------------- | ------------------------------------------------------------- |
| GET    | /api/recipes     | Get a list of all recipes                                     |
| GET    | /api/recipes/:id | Get a recipe by id                                            |
| POST   | /api/recipes     | Add a recipe (name, category, source, imageURL) to the server |

## /api/recipes/:id/ingredients (must be logged in to access these)

Schema:

```js
{
id: 1 // generated on the back end, do not need to include with request
ingredient: '1/4 tsp salt', // String, required
recipe_id: 5 // generated on the back end, do not need to include with request
}
```

| Method | URL                          | Description                                           |
| ------ | ---------------------------- | ----------------------------------------------------- |
| GET    | /api/recipes/:id/ingredients | Get a list of all ingredients for the provided recipe |

## /api/recipes/:id/instructions (must be logged in to access these)

Schema:

```js
{
id: 1 // generated on the back end, do not need to include with request
instruction: 'Whisk eggs in a large mixing bowl, then add diced green peppers.', // String, required
recipe_id: 5 // generated on the back end, do not need to include with request
}
```

| Method | URL                           | Description                                            |
| ------ | ----------------------------- | ------------------------------------------------------ |
| GET    | /api/recipes/:id/instructions | Get a list of all instructions for the provided recipe |
