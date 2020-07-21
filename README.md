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

Initialize app in _app.js_. Add enviromental variables to config.env. When copying MONGO*URI replace <\_dbname*> with the name you want for database. It gets created automatically.

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
    check -> <https://materializecss.com/sidenav.html>

## Step 16

Auth Middleware

Disable access to route `localhost:3000/dashboard` when not logged in. Also don't show login page on `localhost:3000`.  
Middleware is just a function that gets access to request and response objects.

1. New folder _middleware_
2. New file _middleware_/**auth.js**
3. Check if user is authenticated using request method `isAuthenticated()`. If not redirect to homepage. If guest is authenticated redirect to dashboard.
4. In _routes_/**index.js** use { destructuring } to pull in `ensureAuth` and `ensureGuest` from _middleware_/**auth.js**
5. Whenever we want to use middleware in a route, we add it in as a 2nd argument.
   Add `ensureGuest` to Login/Landing page, because only a guest who isnt logged in should see that. Add `ensureAuth` to Dashboard so only logged in user can see the dashboard.

## Step 17

Store sessions to database to prevent logging out while making changes in dashboard.  
We're using `connect-mongo` package.

1. In **app.js** bring in `connect-mongo` and pass in `(session)`. `session` comes from `const session = require('express-session')`. We need to use session middleware and it has to be `required` before `connect-mongo`.
   Also bring in `mongoose`
2. Add `store: newMongoStore({mongooseConnection: mongoose.connection})` to session.
3. Now it should remember the session and keeps logged in. Check MongoDB -> collection if session got stored under storybooks database.
4. Pass in firstname from `request` and set it to `name: req.user.firstname` in _routes_/**index.js**.
   Access it in _views_/**dashboard.js** using `{{name}}`.

## Step 18

Story Model

Every time we're dealing with a `new resource` in our database, we need `model` for that.

1. Create new file _models_/**Story.js** and add StorySchema.
2. We need title, body, status, user and createdAt.

## Step 19

Dashboard Stories

As we need dashboard to render user-specific stories we need to make some changes in our _routes_/**index.js**.

1. Bring in Story model: `const Story = require('../models/Story')`
2. In _@desc Dashboard_ use `try-catch` with `async-await`.
   Set variable stories = to find from Story model, where user matches the same user who is logged in.  
   In order to pass in data to a handlebars template and render it, loop through it and all that we need to call `lean()`. _Documents returned from queries with the `lean` option enabled are `plain javascript objects`, not MongooseDocuments._  
   **Thats what we need** in order to pass it in and use it in template.
3. Pass in `stories` to `res.render()`
4. As we can't just pass in json object(like in React) while handling errors, we need to render `error template`.
   1. Create new folder _views_/_error_
   2. Create new files **500.hbs** & **404.hbs** (500 - server error, 404 - page not found)
   3. In **index.js** under `catch` -> `res.render('error/500')`
5. In _views/_**dashboard.hbs** loop through stories and output them in a table.  
   Check if there is stories to loop.  
   `{{#if stories - if stories exists}}`  
   `{{else - else}}`  
   `{{/if - ends if statement}}`  
   Create table. `<thead>` - heading, `<tr>` - table row. `<th>` - table heading, `<tbody>`- table body, `<td>` - table data.  
   To `loop` through stories -> use `{{#each}}` with ending tag `{{/each}}`

---

When filling table with data we dont have to use stories.\_id because when in the loop it automatically knows that we're dealing with stories so we use `{{_id}}` instead.

## Step 20

Add Story button

1. Create new file in _partials_/**\_add_btn.hbs** (Button will be a partial)
2. Create new btn with link to `href="/stories/add"` and add icon from FontAwesome using classes.
3. Insert it in _layouts_/**main.hbs** using `{{> _add_btn}}`

Add Story

1. As we need new view for viewStories then create new folder _stories_ inside _views_ with new file **add.hbs** inside -> _views/stories_/**add.hbs**
2. Inside **add.hbs** create new form.
   1. It has to make a POST request to /stories -> `action="/stories" method="POST"`
   2. Has a Title with a `name="title"` and `id="title"`
   3. select field with options `value="public"` and `value="private"`. Make "public" selected by default.
   4. We have a body with `textarea` where we implement CKEDITOR.
   5. We have a Save button
   6. We have a Cancel button what takes us to `/dashboard`
   7. Create a route to show **add.hbs**. We need stories route file now. Create new file **stories.js** inside _routes_ folder.
   8. Copy from base from **index.js**. We dont need to keep ensureGuest because only login or home needs it. Make changes to get and render add view.
   9. In order to use the file bring in the route to **app.js**. `app.use('/stories', require('./routes/stories'))` -> means that in **stories.js** you can define `router.get('/add')` and it gets treated like `localhost:3000/stories/add`
   10. When using Materialize form `select` in **add.hbs** you have to initalize it with javascript. In _layouts_/**main.hbs** add `M.FormSelect.init(document.querySelector('#status'))` to the end of the body tag. `#status` comes from **add.hbs** form.

## Step 21

Replace textarea with [CKEDITOR](https://cdnjs.com/libraries/ckeditor).

1. Add  
   `<script src="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.14.1/ckeditor.js" integrity="sha512-P4rrEImABBYtBFdmrFPqF8rjh8iiRiupfQ4KLrBCL8dAivLiM2nh+1bJQeMb2ZglmIlGZdfTtgGdXH6H/hGVeg==" crossorigin="anonymous"></script>` to **main.hbs** below _materialize_ script.
   Initialize with `CKEDITOR.replace('name of a field we want to replace')`- comes from textarea `name="body"`).
2. `plugins: 'wysiwygarea'` whatyouseeiswhatyouget  
   `link` - to use links in editor
3. As saving text is making POST request to /stories, we need to create new route to that in **stories.js**
4. In express request.body gives us the data what was sent in form. However in order to use req.body we need to add a piece of middleware.
5. Add body parser middleware to _app.js_. To accept form data we use`app.use(express.urlencoded( extended: false ))`.
   Now we should be able to get the data from `req.body`. It doesnt include user, only data we receive from the form. You can add **user** data to `req.body` with creating new variable req.body.user = req.user (request gives as user).
   Use async await because of dealing with mongoose model schema. Call create on Story to create and pass in data from req.body. After that redirect to Dashboard
6. Saving stories should work and they should be visible in dashboard and in MongoDB database. Check if logging in with another google account shows you empty dashboard

## Step 22

Format the date using handlebar helper
We want helper to wrap around the date and format it

1. New folder _/root/\_helpers_
2. New file _helpers_/**hbs.js**
3. Bring in `momentjs` and create a function that takes in date and format and formats it with moment(date).format(format)
4. In order to use this in our template we need to register it with handlebars- In **app.js** right above `// Handlebars` bring it in. Use destructuring because we have multiple functions in helpers. `const { formatDate } = require('helpers/hbs')`.
   Add it to `exphbs` object. Add `helpers: {formatDate}`.
5. You can now use it in **dashboard.hbs** with `<td>{{formatDate createdAt 'pass the format what you want'}}</td>`. Check [Moment.js docs]

## Step 23

Create view for public stories (<http://localhost:3000/stories>)

1. New view -> _stories_/**index.hbs**
2. We want to loop through the stories, because when we create the route we're going to render this template and pass the stories in.
3. Create `{{#each stories}}` and inside we can use only `{{else}}` without using `if`
4. We use `cards` to display stories. We create 3 4-columns divs. And for each one we render a `card`.  
   We use class `.card-image` and inside we put an icon to show if it belongs to an user currently logged in. We use handlebar helper editIcon for this.  
   We use `.card-content` along with `.center-align`.  
   For title we render `{{title}}` which is same as `stories.title` and we put `{{body}}` which is story text inside a paragaph. Because of the story length we use another helper.  
   Also we want to strip `<p>` tags coming from rendering `{{body}}`.  
   After paragraph we use line brake and `.chip` class from _Materialize_ [Chips](https://materializecss.com/chips.html). Inside chip we put user image and name. Image comes from `stories.user.image`. We also add link to user what shows all the specific stories of the user. Beside the link we show the user display name.  
   Add `.card-action center-align` class for read more button with link to new page containing the current story. Use `{{_id}}` of the story.
5. Create a GET request to /stories inside _routes_/**stories.js** to show all public stories. Fetch the public stories in and render them in a template. Use `.populate()` to add on **user** data from user model. `.sort({})` by created at descending. Add `.lean()` to pass it in to our template! Use `res.render('stories/index', {stories})` to render correct view and pass in stories.
6. All the public stories should now be visible in our route (localhost:3000/stories)

## Step 24

Truncate & Strip Tags Helpers

1. Add helpers functions to **hbs.js**. `Truncate` function takes in a string and length of how long we want this to be in characters. It then cuts this to given size while taking into account whole words. It then adds ... to the very end and returns a result. `Striptags` function takes in an input and then uses `.replace()` and regular expressions to replace any html tags with empty string/nothing.
2. Include helpers in _stories_/**index.js** and in **app.js**. To wrap `{{body}}` to both of these tags use parenthesis like this `{{ stripTags (truncate body 100) }}`. 100 -> length for truncate

## Step 25

Edit Icon Helper

1. New editIcon helper to **hbs.js**. Function that takes in storyUser - it needs to know which particular user story it is, we need to know which user is logged in and looking at the stories, we need to know the story id and floating is that we can have this edit icon somewhere else. Set to true by default. We use floating button only when viewing all stories. We're checking if story id is equal to the one whos logged in so only owner of the story can change it. If it is we check if it's a floating icon and link takes us to the edit page with a particular id. If the logged in user is not the author of the story we're not going to see the icon.
2. Bring in and register `editIcon` helper in **app.js**
3. Add it also to _stories_/**index.hbs**.  
   `{{{editIcon user user _id}}}` - {{{editIcon stories.user outtheloop.user stories._id}}} because editIcon takes in `storyUser, loggedUser, storyId, floating`. To get `loggedUser` `../user` -> go out from the loop and get the current user. `floating` is set to true so we dont have to add it. Use **triple {{{ }}}** in order to `parse html` from the editIcon helper.
4. It gives TypeError: Cannot read property '\_id' of undefined, what means that we dont have access to this global user -> `../user`. We have access to our req.user with in our routes but in our template id doesnt know what user is. It knows only the `user` because its in the loop. To fix it: go to **app.js** and set a express global variable. We have to set it as middleware `app.use()` pass in a middleware function which has access to request and response object of the cycle and next which we need to call after we're done. Set a global variable by res.locals.user = set that to req.user or null if it doesnt exist. Doing this should allow us access to user in our template. Then call next().  
   `app.use(function(req, res, next) {`  
   `res.locals.user = req.user || null`  
   `next()`  
   `})`
5. Add `.fa-small { font-size: 16px !important }` to **style.css** to make editIcon smaller.

## Step 26

Edit Story

1. In **stories.js** create a route to show the edit page. Pass in particular story to the edit page. @route should be GET request to /stories/edit/:id (:id - id of the story we want to edit).
2. Create stories edit page view in _views/stories_ **edit.hbs** and copy everything from **add.hbs**
3. Add `value="{{story.title}}` to input to show title passed in.
4. For body text add `{{story.body}}` to textarea.
5. For the select option we have to wrap options to #select and pass in story.status argument `{{#select story.status}}`. Create new `select` helper in **hbs.js**. Function takes in whatever the selected option is, and the options themselves that we wrapped and it sets selected depending what gets passed in from story.status. It uses regular expressions to do that.
6. Register `select` helper in **app.js**

## Step 27

Method Override for Put Requests

Edit Story form should make a `PUT` request. We have to use method ovverride.
As we cant just change our edit form method to PUT or DELETE, it needs to be GET or POST, thats when method override package comes in.

1. Bring in `method-override` in **app.js**. Visit method-override [documentation](npmjs.com/package/method-override) for more information.
2. The way this is going to work is -> in our form we'll have standard method="POST". With that override method we should be able to add a hidden input with the method we actually want to use which is going to be PUT and DELETE in this case.
3. This piece of middleware should allow us to do that:  
   app.use(methodOverride(function (req, res) {  
   if (req.body && typeof req.body === 'object' && '\_method' in req.body) {  
    // look in urlencoded POST bodies and delete it  
    let method = req.body.\_method  
    delete req.body.\_method  
    return method  
    }  
    }))  
    Add it in **app.js**
4. In **edit.hbs** as method override deletes form method="POST" and replaces it the one we put as a hidden input.  
   We need to add new input with `type="hidden" name="_method" value="PUT"` value -> value we want this to be.
5. We need to handle this PUT request this form is going to make so we need to make a route to process this edit form in _routes_/**stories.js**
   Use `router.put()` method. Use `let` story because we want to reassign it. First we find the story by its id. Then we check it the story exists and if the story owner is the same as logged in user. If it is the same user then we reassign story using mongoose `findOneAndUpdate()` method, where we want to find by \_id: what we get from req.params.id. Then the second argument after the object ise `req.body` because thats the data we want to replace it with. As a third argument we add some options. `new: true` -> creates a new one if it doesnt exists, `runValidators: true` -> makes sure that mongoose fields are valid. After that redirect to the dashboard.
6. If you try to edit story it gives cannot PUT error. In **edit.hbs** you have to change form action to `action="/stories/{{story._id}}`" because in **stories.js** route PUT request needs to have `/:id`

## Step 28

Delete story

1. In the dashboard we want the edit icon and delete icon. Delete icon will be a button that uses method override to delete. In **dashboard.hbs** add edit icon and delete icon.  
   Delete icon will be in a form with action linking to specific story. We're using hidden input with `type="hidden" name="_method value="DELETE"` for method-override. We add a button with type submit, because we're submitting a form. Inside button we put trash icon.
2. For delete and edit icons to be side by side we add custom style to **style.css** `.btn-float { float: left; margin-right: 10px; }`
3. In _routes_/**stories.js** create a delete route. Use try-catch with `remove()` mongoose method. Remove the story with \_id that matches the story we're handling req-params.id.
4. Also wrap previous Show edit page and Update story to try-catch.
5. Delete story should work now.

## Step 29

Single Story Page

1. New route in _routes_/**stories.js**. It's going to be GET request to /stories/:id. We need to fetch the story from database. Use `.findById()` method and pass in id from req.params.id. Also populate it with user data and use lean to use it in template. Check if story exists, if it doesn't render 404 error page. If story exists render template show and pass in an object with the story we fetched from database so we can display the data.
2. Create a new file for a template(view) `show` in _stories_/**show.hbs**. In `<small> {{{user doesnt have to be in ../user because its not in loop and we have a global user defined in **app.js** under // Set Global Variable. false - for the floating }}} </small>`. `story.body` is wrapped in **{{{ }}}** because we want to parse the html.
3. For the image add custom css to class `.img-small`. In **style.css** add `.img-small { width: 180px; }`
4. We also want to create a route to show all the specific user stories. `<a href="/stories/user/{{story.user._id}}"> More From {{story.user.firstName}}</a>`

## Step 30

User Stories

1. Create new route for user stories in _routes_/**stories.hbs**
2. We want to render the _stories_/**index.hbs** so its the same template the public stories use altough it only shows the stories thst belongs to the user thats in the url. Render the **index.hbs** template and pass in stories object. Stories has already filtered out by id belonging to chosen user.
