//resources for route paths from /api/users

const express = require('express');
const asyncHandler = require('express-async-handler');
const { Sequelize, Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Message, Connection } = require('../../db/models');

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
  const userId = parseInt(req.params.userId, 10);

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



  return res.json({messages})
}))


router.post('/:userId(\\d+)/messages/:recipientId(\\d+)', asyncHandler(async (req, res) => {
  const senderId = parseInt(req.params.userId, 10);

  const recipientId = parseInt(req.params.recipientId, 10);

  const { contents } = req.body;



  const read = false;

  const newMessage = await Message.create({sender_id: senderId, recipient_id: recipientId, contents, read})


  //get updated full conversation to add to store
  const conversation = await Message.findAll({
    where: {
      [Op.or]: [
        {
          sender_id: {
            [Op.or]: [senderId, recipientId]
          }
        },
        {
          recipient_id: {
            [Op.or]: [senderId, recipientId]
          }
        }
      ]
    },
    order: ['id']
  })


  return res.json({conversation})
}))


router.get('/:userId(\\d+)/connections', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  //Begin Query
  const connections = await Connection.findAll(
    {
      where: {
        [Op.or]: [{student_id: userId}, {mentor_id: userId}]
      },
      // include: [
      //   {
      //     model: User,
      //     // where: {
      //     //   [Op.or]: [{id: Sequelize.col('Connection.student_id')}, {id: Sequelize.col('Connection.mentor_id')}]
      //     // },
      //     // where: {
      //     //   [Op.or]: []
      //     // }
      //     attributes: ['first_name', 'last_name']
      //   }
      // ]
    }
  )

  const otherUsers = []

  connections.forEach(connection => {
    if (connection.dataValues.student_id === userId) {
      otherUsers.push(connection.dataValues.mentor_id)
    }

    if (connection.dataValues.mentor_id === userId) {
      otherUsers.push(connection.dataValues.student_id)
    }

  })

  

  for (let i = 0; i < otherUsers.length; i++) {
    let otherUserId = otherUsers[i];

    let userInfo = await User.findByPk(otherUserId,
        {
          attributes: ['id', 'first_name', 'last_name']
        }
      )

    connections[i].dataValues.OtherUserInfo = {id: userInfo.dataValues.id, first_name: userInfo.dataValues.first_name, last_name: userInfo.dataValues.last_name}
  }

  // otherUsers.forEach((otherUserId, index) => {
  //   userInfo = await Connection.findAll(
  //     {
  //       where: {
  //         id: otherUserId
  //       },
  //       attributes: [id, first_name, last_name]
  //     }
  //     )

  //   connections[index].dataValues.UserInfo = {id: userInfo.dataValues.id, first_name: userInfo.dataValues.first_name, last_name: userInfo.dataValues.last_name}
  // })



  return res.json({connections})
}))



module.exports = router;
