# week7-test



### Tasks:



*In this task you need to restructure the database because we are going to change the user schema, follow these steps to get it done. If you stucked in one of them ask any of the mentors



#### Setting the test

- clone this repo
- create `config.env` file
- Add the database url in the `config.env` as `DB_URL = <Week 6 DBURL/>`
- run `npm i` to install the needed pacakges

#### Build The database
-  Chage the `build.sql` file so that it creates a `user` table that has  `email` (**unique**) and `password` attributes
-  Run your `db_build.js` file
- You should get this `Everdything is Okay`.


#### Build the needed queries

- Write function in `/src/database/queries/addUser` that takes `email` and `password` and add them to the database (needed for signup handler)
- Write function in `/src/database/queries/getUser` that takes `email` and then returns their password (needed to handle user login)


#### Write the handlers

if you go to the `router.js` file you will see that we are missing two handler:

-  `signup post` that should handle the request that adds a user to the database, if the email already exists it should respond accordingly.

- `login in` that should handle login request, if the login  details are correct then user should be logged by checking adding **cookies** and then redirect to the `cities` page.

#### Secure Authenticated endpoints

Two endpoint should be secured, the server shouldn't add/return data in the following endpoint if the user is not logged in

- Add a city `POST /addcity`
- get cities `GET /cities`

I left comment in the `router.js` file.


#### Good Luck
