//resources for route paths from /api/users

const express = require('express');
const asyncHandler = require('express-async-handler');
const { Sequelize, Op } = require('sequelize');
const bcrypt = require('bcryptjs');

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
    check('first_name')
      .exists({ checkFalsy: true })
      .withMessage('Please provide your first name'),
    check('last_name')
      .exists({ checkFalsy: true })
      .withMessage('Please provide your last name'),
    check('zip_code')
      .exists({ checkFalsy: true })
      .isLength({ min: 5, max: 5 })
      .withMessage('Please provide a 5-digit zip code for your primary residence'),
    handleValidationErrors,
];


//routing

router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { username, first_name, last_name, email, password, zip_code, mentor, student } = req.body;
    const user = await User.signup({ username, first_name, last_name, email, password, zip_code, mentor, student });

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
  // const conversation = await Message.findAll({
  //   where: {
  //     [Op.or]: [
  //       {
  //         sender_id: {
  //           [Op.or]: [senderId, recipientId]
  //         }
  //       },
  //       {
  //         recipient_id: {
  //           [Op.or]: [senderId, recipientId]
  //         }
  //       }
  //     ]
  //   },
  //   order: ['id']
  // })


  return res.json({newMessage})
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
          attributes: ['id', 'first_name', 'last_name', 'zip_code']
        }
      )

    connections[i].dataValues.OtherUserInfo = {id: userInfo.dataValues.id, first_name: userInfo.dataValues.first_name, last_name: userInfo.dataValues.last_name, zip_code:userInfo.dataValues.zip_code}
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



const validatePatch = [
    check('email')
      .isEmail()
      .optional({ nullable: true })
      .withMessage('Please provide a valid email.'),
    check('username')
      .optional({ nullable: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .optional({ nullable: true })
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .optional({ nullable: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('zip_code')
      .optional({ nullable: true })
      .isLength({ min: 5, max: 5 })
      .withMessage('Please provide a 5-digit zip code for your primary residence'),
    handleValidationErrors,
];


router.patch('/:userId(\\d+)', validatePatch, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const updatedInfo = req.body;

  if (updatedInfo.password) {
    const user = await User.findByPk(userId)

    user.update({hashed_password: bcrypt.hashSync(updatedInfo.password)})

    return res.json({user: user.toSafeObject()})
  }

  const user = await User.findByPk(userId)

  user.update(updatedInfo)


  return res.json({user: user.toSafeObject()})

}))


router.post('/:studentId(\\d+)/connections', asyncHandler(async (req, res) => {
  const student_id = parseInt(req.params.studentId, 10);

  const { mentor_id } = req.body;

  const approved = false;

  const newConnection = await Connection.create({student_id, mentor_id: parseInt(mentor_id, 10), approved})

  return res.json({connection: newConnection})
}))


router.patch('/:userId(\\d+)/messages/:messageId(\\d+)', asyncHandler(async (req, res) => {
  
  const messageId = parseInt(req.params.messageId, 10)

  const messageToUpdate = await Message.findByPk(messageId);

  messageToUpdate.update({read: true})

  return res.json({messageId})


}))



module.exports = router;
