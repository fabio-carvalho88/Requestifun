const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// Connect to Mongo
let db = mongoose
  .connect(
    'mongodb+srv://fabio:sABNC65bZKaj0XVR@cluster0-4nwqa.mongodb.net/Requestifun?retryWrites=true', {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

// Handlebars
app.engine('handlebars', hbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/views'));


// BodyParser
app.use(express.urlencoded({
  extended: false
}));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.route'));
app.use('/users', require('./routes/auth.route'));
app.use('/', require('./routes/main.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = {
  db
}