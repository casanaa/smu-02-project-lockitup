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
    const projectData = await Lock.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
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
    // Find the logged in user based on the session ID
    const userData = await this.lock.findAll(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('view_locks', {
      ...user,
      logged_in: true,
      user_name: req.session.user_name,
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

router.get('/view_locks', async (req, res) => {
  try {
    const locks = await Lock.findAll({
      raw: true,
    }).catch((error) => console.log(error));

    console.log('LOCKS:', locks);
    res.render('added', { locks });
  } catch (error) {
    res.status(400).json(err);
  }
});

router.get('/locks/:id', async (req, res) => {
  try {
    const lock = await Lock.findByPk(req.params.id).catch((error) =>
      console.log(error)
    );

    const lockData = lock.get({ plain: true });
    console.log('LOCK:', lockData);
    res.render('new', { lock: lockData });
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
