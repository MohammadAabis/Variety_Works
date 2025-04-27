const express = require('express');
const router = express.Router();

const { 
    insertForm, getAllForms, getFormByCategory, updateForm, submitFormResponse
} = require('../controllers/DynamicForm');

router.post('/form', insertForm);
router.post('/get-all-form', getAllForms);
router.get('/form/:category', getFormByCategory); // Get single form by category
router.put("/form/:id", updateForm);
router.post("/submit", submitFormResponse);

module.exports = router;
