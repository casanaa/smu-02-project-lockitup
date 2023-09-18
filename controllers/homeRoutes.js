const router = require('express').Router();
const { Lock, User } = require('../models');
const withAuth = require('../utils/auth');
const { decrypt } = require('../utils/crypto');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/view_locks', withAuth, async (req, res) => {
  let locksData;
  let locks;
  const name = req.session.user_name;
  try {
    locksData = await Lock.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    // encryptedPassword = locksData.password;
    // decryptedPassword = decrypt(encryptedPassword);

    // The below line is to make Handlebars happy. DO NOT REMOVE!
    locks = locksData.map((lock) => lock.get({ plain: true }));
    
    res.render('view_locks', {
      logged_in: req.session.logged_in,
      locks,
      name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/view_locks');
    return;
  }

  res.render('login');
});

router.get('/add_lock', (req, res) => {
  res.render('add_lock', {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
