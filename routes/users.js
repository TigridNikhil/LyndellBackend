const express = require('express');
const { Login, SignUp } = require('../controllers/LoginController');
const authenticate = require('../middleware/authmiddleware');
const router = express.Router();


/* GET users listing. */
router.post('/login', Login)
router.post('/signup', SignUp)


module.exports = router;
