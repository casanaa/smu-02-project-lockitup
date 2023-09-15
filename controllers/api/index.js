const router = require('express').Router();
const userRoutes = require('./userRoutes');
const lockRoutes = require('./lockRoutes')

router.use('/users', userRoutes);
router.use('/locks', lockRoutes);

module.exports = router;
