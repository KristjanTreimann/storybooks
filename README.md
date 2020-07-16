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

## Step 10

Implement login with `google oauth`  
Create API key and API secret in [Google Cloud Console](https://console.cloud.google.com)  
Create new project -> API & Services -> ENABLE APIS AND SERVICES -> GOOGLE+ API -> ENABLE -> MANAGE -> Credentials -> Create credentials -> OAuth client ID ->

1. Application type: Web Application
2. Name: add name
3. Authorized redirect URIs -> + ADD URI -> _here goes your callback uri_ `http://localhost:3000/auth/google/callback`  
   once you deploy change it accordingly
4. Create
5. Add `Your Client ID` & `Your Client Secret` to **config.env**

## Step 11

Authentication using [Passport.js](http://www.passportjs.org/) strategy (way to log in):  
[Google OAuth 2.0API](http://www.passportjs.org/packages/passport-google-oauth20/)

1. In _config_ create **passport.js**
2. In **app.js** `require` passport and passport config. Add passport middleware
3. In order to passport work with sessions, implement `express-session`.  
   Require it in **app.js** and implement it's middleware. Has to be before passport middleware.  
   `app.use(session({`  
    `secret: 'whateveryouwant',`  
    `resave: false,` (we dont want to save session if nothing is modified)  
    `saveUninitialized: false`(dont create session until something is stored)  
   `}))`
4. Define auth strategy in _passport.js_  
   bring in `passport google oauth 2.0` & `mongoose` module
5. Create mongooose User model. Create _models_ folder with **User.js** inside. `require mongoose` and create `UserSchema` to save users to database.
6. Include User model in _passport.js_. Catch passport and create google strategy and export it.  
   Also add serialise and deserialise user code from www.passportjs.org/docs/
   > Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

> `passport.serializeUser((user, done) => { done(null, user.id) })` > `passport.deserializeUser((id, done) => { User.findById(id, (err, user) => done(err, user)) })`

## Step12

Set up Auth Routes

1. Create **auth.js** in _routes_ folder and add auth routes. To authenticate we use google strategy, which we created in our **passport.js** file.

2. In **app.js** bring in auth routes
3. Test out if google login works. - it hangs because we have to call a callback within our GoogleStrategy in **passport.js**
4. Check if `console.log(profile)` in **passport.js** works in terminal

## Step 13

Save Google profile data

1. In **passport.js** construct a newUser object. Object keys have to match with the UserSchema. Data comes from async function (`profile`)
2. `try-catch` to store the user
3. Try to login with google to see if saving to db works. It should redirect to dashboard if successful.
4. Check MongoDB database if user was stored.

## Step 14

Logout

1. Create route for logout in **auth.js**. With the passport middleware, once we log in, we'll have a logout method on the request object. We can simply call `req.logout()`. After logout redirect to homepage.

## Step 15

Navigation

1. Create new folder _partials_ inside _views_ folder
2. Inside _partials_ new file **\_header.hbs**. If working with partials we use \_filename because it's a partial and it's been inserted into another view.
3. Create a navbar in **\_header.hbs** using [Materialize](https://materializecss.com/navbar.html).
4. In _layouts_/**main.hbs** insert partial inside `body` tag using `{{> _header}}`
5. In materialize for sliding navbar to work you have to initialize it in javascript.  
   In **main.hbs** to the bottom of the `body` tag insert  
    `<script> M.Sidenav.init(document.querySelector('.sidenav')) </script>`  
    check -> https://materializecss.com/sidenav.html
