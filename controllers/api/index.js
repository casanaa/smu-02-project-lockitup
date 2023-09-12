const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const lockRoutes = require('./lockRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/locks', lockRoutes);

module.exports = router;
