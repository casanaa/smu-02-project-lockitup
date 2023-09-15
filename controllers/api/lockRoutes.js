const router = require('express').Router();
const Lock = require('../../models/Lock');
const withAuth = require('../../utils/auth');

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const lockData = await Lock.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!lockData) {
      res.status(404).json({ message: 'No lock found with this id!' });
      return;
    }

    res.status(200).json(lockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/add_locks', withAuth, async (req, res) => {
  try {
    const newLock = await Lock.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newLock);
    res.status(200).json(newLock);
    // res.render('new', { newLock });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
