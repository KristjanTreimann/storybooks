# Node.js App From Scratch

## Step 1

## Install dependencies

`npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20 colors`

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
colors - for node terminal color

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

# Step 4

Connect database and add morgan for logging.

# Step 5

### Template Engines & Layouts

We have a layout that wraps around everything.  
Layout has html and body tags and stuff we dont want to repeat in different views.  
So basically it wraps around these views.  
Copy code snippet from [here](https://www.npmjs.com/package/express-handlebars)

> `app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));`  
> `app.set('view engine', '.hbs');`

Add _views_ folder and _layouts_ folder  
To create layout add file called **main.hbs** and for login **login.hbs** inside _layouts_ folder

Use `{{{body}}}` to output a view

# Step 6

Create route so we can render some views  
New folder _routes_ -> **index.js**
Set up top level routes  
In _app.js_ link our routing file _// Routes_

> Browser should show messages on http://localhost:3000 & http://localhost:3000/dashboard

Create **dashboard.hbs** & **login.hbs** in _views_ folder
In order to render from these files in _index.js_ replace `res.send()` with `res.render()`  
`.render()` is going to look template or views called (whats passed ind)
