// models/Form.js
const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["text", "textarea", "dropdown", "checkbox"], required: true },
  required: { type: Boolean, default: false },
  options: [String], // for dropdown and checkbox
});

const DynamicFormSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }, // prevent duplicates at DB level too
  fields: [FieldSchema],
}, { timestamps: true });

const Form = mongoose.model("Form", DynamicFormSchema, "dynamicForm");

module.exports = Form;
