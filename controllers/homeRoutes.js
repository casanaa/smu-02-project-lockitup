const router = require('express').Router();
const { Lock, User } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/view_locks/:id', async (req, res) => {
  try {
    const lockData = await Lock.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const lock = lockData.get({ plain: true });

    res.render('view_locks', {
      ...lock,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/view_locks', withAuth, async (req, res) => {
  try {
    const locksData = await Lock.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    console.log(`=== Locks Data: ${JSON.stringify(locksData)}`)

    // const user = userData.get({ plain: true });

    res.render('view_locks', {
      locksData
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
  res.render('add_lock');
});

router.get('/view_locks', (req, res) => {
  res.render('view_locks');
});

module.exports = router;
