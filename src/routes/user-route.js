const express = require('express');

const userController = require('../controllers/user-controller')


const router = express.Router();


router.patch('/newpassword', userController.newPassword )

module.exports = router;