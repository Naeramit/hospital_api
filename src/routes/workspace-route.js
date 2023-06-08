const express = require('express');

const userController = require('../controllers/user-controller')


const router = express.Router();


router.get('/me', userController.selectedWorkspace)
router.get('/all', userController.myWorkspace )
router.patch('/update',  userController.updateMyWorkspace)
router.get('/:workspaceId/task/', userController.getAllTask)


module.exports = router;