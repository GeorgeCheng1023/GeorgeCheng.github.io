const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

//get to regist page
router.get('/register', (req, res, next) => {
    res.render('users/register');
});

// post regist 
router.post('/', async(req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, username });
        const registUser = await User.register(user, password);
        req.flash('success', 'You have successfully registered')
        res.redirect('/');
    } catch (e) {
        req.flash('error', 'Username or email already registered')
        res.redirect('/users/register');
    }
});

//get to login page
router.get('/login', async(req, res) => {
    res.render('users/login')
});

//post login authentication
router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }), async(req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/');
});

module.exports = router;