const express = require('express');
const router = express.Router();

const { 
    createUser, 
} = require('../controllers/Users');


router.post('/signup', createUser);

module.exports = router;
