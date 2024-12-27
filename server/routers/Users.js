const express = require('express');
const router = express.Router();

const { 
    createUser, 
    loginUser
} = require('../controllers/Users');


router.post('/signup', createUser);
router.post('/signin', loginUser);

module.exports = router;
