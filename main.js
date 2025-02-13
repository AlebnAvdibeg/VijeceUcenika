const express = require('express'), path = require('path'), session = require('express-session'), passport = require('passport');
const { view, admin, api } = require('./routers'), { database } = require('./utils');

const app = express();

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
/*app.use('/admin', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.redirect('/login');
});*/

app.use('/', view);
app.use('/', admin);
app.use('/', api);
app.all('*', (req, res) => res.status(404).sendFile('404.html', { root: './public/html' }));

// Connect to the database
database.connect();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});