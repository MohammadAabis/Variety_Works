const express = require('express');
const router = express.Router();

const { 
    insertForm, getAllForms, getFormByCategory
} = require('../controllers/DynamicForm');

router.post('/form', insertForm);
router.post('/get-form-data', getAllForms);
router.get('/form/:category', getFormByCategory); // Get single form by category

module.exports = router;
