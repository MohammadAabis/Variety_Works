const Form = require("../models/DynamicForm");
const FormResponse = require("../models/FormResponse"); // Assuming you have a FormResponse model

const insertForm = async (req, res) => {
  try {
    const { category, fields } = req.body;
    const form = new Form({ category, fields });

    await form.save();

    res.status(201).json({ message: "Form saved successfully", form });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFormByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const form = await Form.findOne({ category });

    if (!form) {
      return res.json({ message: "No form found for this category" });
    }

    res.json(form);
  } catch (err) {
    console.error("Error fetching form by category:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Form.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Form not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitFormResponse = async (req, res) => {
  try {
    const newResponse = new FormResponse(req.body);
    await newResponse.save();
    res.status(201).json({ message: "Form response saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  insertForm,
  getAllForms,
  getFormByCategory,
  updateForm,
  submitFormResponse,
};
