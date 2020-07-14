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

## Step 2

add start and dev script to _package.json_ .
`"start": "cross-env NODE_ENV=production node app"`,  
`"dev": "cross-env NODE_ENV=development nodemon app"`  
 `app` is entrypoint to our app (app.js)

## Step 3

Initialize app in _app.js_. Add enviromental variables to config.env. When copying MONGO_URI replace <dbname> with the name you want for database. It gets created automatically.

## Step 4

Connect database and add morgan for logging.

## Step 5

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

## Step 6

Create route so we can render some views  
New folder _routes_ -> **index.js**
Set up top level routes  
In _app.js_ link our routing file _// Routes_

> Browser should show messages on <http://localhost:3000> & <http://localhost:3000/dashboard>

Create **dashboard.hbs** & **login.hbs** in _views_ folder
In order to render from these files in _index.js_ replace `res.send()` with `res.render()`  
`.render()` is going to look template or views called (whats passed ind)

## Step 7

Add Materialize and Font Awesome to **main.hbs**  
Get Materialize [CDN and Javascipt links](https://materializecss.com/getting-started.html)  
Get Font Awesome [all.min.css](https://cdnjs.com/libraries/font-awesomel)

## Step 8

Set Static folder  
Create and use static folder to be able to include public files - like our own **style.css** or add own images or use front-end javascript frameworks etc. - so basically public assets.

We need to create a folder what is going to be static folder  
In **app.js** define which folder is going to be static  
Create _public_ folder, inside _css_ folder and into that **style.css** file. Include **style.css** in **main.hbs** using `<link rel="stylesheet" href="/css/style.css">`  
add `class="container"` around the body in _main.hbs_ to align center

Add HTML to layout -> _login.hbs_  
Specify which layout route uses.  
In _routes_ **index.js** pass in an object with `{ layout: 'login'}` as 2nd arg

## Step 9

### Login page

Add styling in **public/css/style.css**  
Edit **views/login.hbs** & **layout/login.hbs**
