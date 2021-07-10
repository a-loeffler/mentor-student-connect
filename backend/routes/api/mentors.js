const express = require('express');
const asyncHandler = require('express-async-handler');
const { Sequelize, Op } = require('sequelize');

const { User } = require('../../db/models');


const router = express.Router();

router.get('/:zipcode', asyncHandler(async (req, res) => {
    const zipcode = req.params.zipcode;  //this will be useful for refactoring later

    console.log("in here***", zipcode)

    const mentors = await User.findAll({
        where: {
            mentor: true,
        },
        attributes: ['id', 'first_name', 'last_name', 'zip_code']
    })


    return res.json({mentors})
}))


module.exports = router;
