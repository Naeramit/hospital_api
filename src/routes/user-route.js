const express = require('express');

const userController = require('../controllers/user-controller')


const router = express.Router();


router.patch('/changePW', userController.changeUserPassword )
router.get('/myWS', userController.myWorkspace)
router.patch('/updateMyWS',  userController.updateSelectedWorkspace)


module.exports = router;