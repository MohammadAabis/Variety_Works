const Form = require("../models/DynamicForm");

const insertForm = async (req, res) => {
  console.log("req.body", req.body);

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
    // console.log("Full Forms JSON:", JSON.stringify(form, null, 2));

    if (!form) {
      return res.json({ message: "No form found for this category" });
    }

    res.json(form);
  } catch (err) {
    console.error("Error fetching form by category:", err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = { insertForm, getAllForms, getFormByCategory };
