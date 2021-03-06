const router = require('express').Router();
const asyncHandler = require('express-async-handler');

//backend routes
const sessionRouter = require('./session');
const usersRouter = require('./users');
const mentorsRouter = require('./mentors');
const connectionsRouter = require('./connections');

//user auth utilities
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


router.use('/session', sessionRouter);

router.use('/mentors', mentorsRouter);

router.use('/users', usersRouter);

router.use('/connections', connectionsRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;
