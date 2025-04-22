import React, { useState } from "react";
import { AddDynamicData } from "../API/Users";
import { generateFieldName } from "../utils";

const fieldTypes = ["text", "textarea", "dropdown", "checkbox"];

const DynamicForm = () => {
  const [category, setCategory] = useState("");
  const [fields, setFields] = useState([]);

  const categories = [
    "Personal Information",
    "Inventory",
    "Finance",
    "Employee Details",
  ];

  const addField = () => {
    const newField = {
      id: Date.now(),
      label: "",
      name: "",
      type: "text",
      required: false,
      options: [],
    };
    setFields([...fields, newField]);
  };

  const handleFieldChange = (fieldIndex, key, value) => {
    const updated = [...fields];
    const field = updated[fieldIndex];

    if (key === "label") {
      const newLabel = value;
      const newName = generateFieldName(newLabel);

      // Prevent duplicate labels (case-insensitive)
      const isDuplicate = updated.some(
        (f, idx) =>
          idx !== fieldIndex &&
          f.label.trim().toLowerCase() === newLabel.trim().toLowerCase()
      );

      if (isDuplicate) {
        alert(`A field with label "${newLabel}" already exists.`);
        return;
      }

      field.label = newLabel;
      field.name = newName;
    } else {
      field[key] = value;
    }

    setFields(updated);
  };

  const handleSubmit = async () => {
    if (fields.length === 0) {
      alert("Please add at least one field before saving the form.");
      return;
    }

    const formData = {
      category,
      fields,
    };

    try {
      await AddDynamicData(formData);
      alert("Form saved!");
      setCategory("");
      setFields([]);
    } catch (err) {
      console.error("Failed to save form:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dynamic Form Builder</h2>

      <select
        className="border p-2 w-full mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border p-3 mb-4 rounded bg-gray-50 shadow"
        >
          <input
            className="border p-1 w-full mb-2"
            placeholder="Label"
            value={field.label}
            onChange={(e) => {
              const val = e.target.value;
              if (field.label.length === 0 && val.startsWith(" ")) return; // Only prevent leading space
              handleFieldChange(index, "label", val);
            }}
          />

          <select
            className="border p-1 w-full mb-2"
            value={field.type}
            onChange={(e) => handleFieldChange(index, "type", e.target.value)}
          >
            {fieldTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {["dropdown", "checkbox"].includes(field.type) && (
            <input
              className="border p-1 w-full mb-2"
              placeholder="Comma-separated options (e.g. Option One, Option Two)"
              onChange={(e) => {
                const val = e.target.value;
                if (val.startsWith(" ")) return; // Prevent leading space
                const optionArray = val
                  .split(",")
                  .map((opt) => opt.trim().replace(/\s+/g, "_").toLowerCase())
                  .filter((opt) => opt.length > 0); // Remove empty entries
                handleFieldChange(index, "options", optionArray);
              }}
            />
          )}

          <label className="block">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) =>
                handleFieldChange(index, "required", e.target.checked)
              }
              className="mr-2"
            />
            Required
          </label>
        </div>
      ))}

      {category && (
        <>
          <button onClick={addField} className="text-blue-600 mr-4">
            + Add Field
          </button>

          <button onClick={handleSubmit} className="text-green-600">
            Save Form
          </button>
        </>
      )}
    </div>
  );
};

export default DynamicForm;
