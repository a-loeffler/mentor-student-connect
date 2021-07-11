const express = require('express');
const asyncHandler = require('express-async-handler');
const { Sequelize, Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Connection } = require('../../db/models');

const router = express.Router();

//validation error handling
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.patch('/:connectionId(\\d+)', asyncHandler(async (req, res) => {
    const connectionId = parseInt(req.params.connectionId, 10);

    const connection = await Connection.findByPk(connectionId);

    connection.update({approved: true})

    return res.json({connection})

}))


router.delete('/:connectionId(\\d+)', asyncHandler(async (req, res) => {
    const connectionId = parseInt(req.params.connectionId, 10);

    const connectionToDelete = await Connection.findByPk(connectionId);

    connectionToDelete.destroy();

    return res.json({connectionId})
}))


module.exports = router;
