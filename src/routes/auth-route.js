const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate')
const authController = require('../controllers/auth-controller');


const router = express.Router();


router.post('/registry', authController.registry)
router.post('/login', authController.login);
router.get('/getUser', authenticateMiddleware, authController.getUser)

module.exports = router;