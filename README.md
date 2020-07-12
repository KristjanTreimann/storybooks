# Node.js App From Scratch

## Step 1

## Install dependencies

`npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20`

express - web framework to create routes etc  
mongoose - to work with our database, create models  
connect-mongo - allows to store sessions in db, prevents logout when resetting server  
express-session - for sessions and cookies  
express-handlebars - template engine  
dotenv - for enviromental variables  
method-override - allows to make PUT and DELETE requests from template. By default you can make only GET and POST requests
moment - used to format dates
morgan - for logging
passport - for authentication
passport-google-oauth20 - for google auth

dev dependencies

`npm i -D nodemon cross-env`

nodemon - continuously watches our server when we make changes to our files without having to restart the server every time
cross-env - use when you want to use global enviroment variable inside scripts in package.json. It´s different whether youre in Linux, Win or Mac

# Step 2

add start and dev script to _package.json_ .
`"start": "cross-env NODE_ENV=production node app"`,  
`"dev": "cross-env NODE_ENV=development nodemon app"`  
 `app` is entrypoint to our app (app.js)

# Step 3

Initialize app in _app.js_. Add enviromental variables to config.env. When copying MONGO_URI replace <dbname> with the name you want for database. It gets created automatically.
