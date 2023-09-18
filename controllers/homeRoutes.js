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
  let decryptedLockData;
  let locksData;

  try {
    locksData = await Lock.findAll({
      where: {
        user_id: req.session.user_id
      }
    }).then((locks) => {
      locks.forEach((lock) => {lock.password = decrypt(lock.password)});

    // The below line is to make Handlebars happy. DO NOT REMOVE!
      decryptedLockData = locks.map((lock) => lock.get({ plain: true }));
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
  res.render('view_locks', {
    logged_in: req.session.logged_in,
    locks: decryptedLockData,
    name: req.session.user_name,
  });
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
