const mongoose = require("mongoose");

const FormResponseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  responses: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

const FormResponse = mongoose.model("FormResponse", FormResponseSchema, "formSubmit");

module.exports = FormResponse;