//resources for route paths from /api/users

const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Message } = require('../../db/models');

const router = express.Router();

//validation error handling
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];


//routing

router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({ user, });
}));


router.get('/:userId(\\d+)/messages', asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  //Begin Query
  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        {sender_id: userId},
        {recipient_id: userId},
      ]
    },
    order: ['id']
  })
  //End Query

  console.log("messages", messages)


  return res.json({messages})
}))

module.exports = router;
