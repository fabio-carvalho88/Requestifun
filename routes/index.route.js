require('../models/item.model.js')
const mongoose = require('mongoose');
const Item = mongoose.model('item');
const path = require('path');

const express = require('express');
const router = express.Router();
const hbs = require('express-handlebars');
const {
  ensureAuthenticated
} = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Home page if user is Authenticated
router.get('/home', ensureAuthenticated, (req, res) => {
  res.render('home');
});

//Post Item form
router.get('/postItem', ensureAuthenticated, (req, res) => {
  res.render('formItem')
});

//Post Req form
router.get('/postReq', ensureAuthenticated, (req, res) => {
  res.render('formReq');
})
module.exports = router;