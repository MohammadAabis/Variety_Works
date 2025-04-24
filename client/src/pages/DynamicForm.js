import React, { useState, useEffect } from "react";
import { AddDynamicData, GetFormData, UpdateDynamicData } from "../API/Users";
import { generateFieldName } from "../utils";

const fieldTypes = ["text", "textarea", "dropdown", "checkbox", "date"];

const DynamicForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allForms, setAllForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [category, setCategory] = useState("");

  const categories = [
    "Personal Information",
    "Inventory",
    "Finance",
    "Employee Details",
  ];

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const resp = await GetFormData();
        setAllForms(resp.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    const existingForm = allForms.find((form) => form.category === selected);
    if (existingForm) {
      setCurrentForm({ ...existingForm }); // clone to allow editing
    } else {
      setCurrentForm({
        category: selected,
        fields: [],
      });
    }
  };

  const handleFieldChange = (fieldIndex, key, value) => {
    const updated = [...currentForm.fields];
    const field = updated[fieldIndex];

    if (key === "label") {
      const newLabel = value;
      const newName = generateFieldName(newLabel);

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

    setCurrentForm((prev) => ({ ...prev, fields: updated }));
  };

  const addField = () => {
    const newField = {
      id: Date.now(),
      label: "",
      name: "",
      type: "text",
      required: false,
      options: [],
    };
    setCurrentForm((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
  };

  const handleRemoveField = (index) => {
    const updated = [...currentForm.fields];
    updated.splice(index, 1);
    setCurrentForm((prev) => ({ ...prev, fields: updated }));
  };

  const handleSubmit = async () => {
    const { category, fields } = currentForm;

    if (fields.length === 0) {
      alert("Please add at least one field.");
      return;
    }

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!field.label || field.label.trim() === "") {
        alert(`Field ${i + 1} is missing a label.`);
        return;
      }

      if (["dropdown", "checkbox"].includes(field.type)) {
        if (!field.options || field.options.length === 0) {
          alert(`Field "${field.label}" must have at least one option.`);
          return;
        }
      }
    }

    try {
      console.log("currentForm", currentForm);
      await AddDynamicData(currentForm);
      alert("Form saved!");
      setSelectedCategory("");
      setCurrentForm(null);
    } catch (err) {
      console.error("Failed to save form:", err);
    }
  };

  const handleUpdate = async () => {
    if (!currentForm._id) {
      alert("No existing form to update.");
      return;
    }

    try {
      const res = await UpdateDynamicData(currentForm._id, {
        category: currentForm.category,
        fields: currentForm.fields,
      });

      alert("Form updated successfully!");
      setCurrentForm(null);
      setSelectedCategory("");
      setCategory("");
    } catch (err) {
      console.error("Error updating form:", err);
      alert("Failed to update form");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dynamic Form Builder</h2>

      <select
        className="border p-2 w-full mb-4"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <option value="">Select Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {currentForm?.fields.map((field, index) => (
        <div
          key={index}
          className="border p-3 mb-4 rounded bg-gray-50 shadow relative"
        >
          <input
            className="border p-1 w-full mb-2"
            placeholder="Label"
            value={field.label}
            onChange={(e) => {
              const val = e.target.value;
              if (field.label.length === 0 && val.startsWith(" ")) return;
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
            <>
              <input
                className="border p-1 w-full mb-2"
                placeholder="Comma-separated options (e.g. Option One, Option Two)"
                value={field.options.join(", ")} // to show existing values
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.startsWith(" ")) return;
                  const optionArray = val
                    .split(",")
                    .map((opt) => opt.trim().replace(/\s+/g, "_").toLowerCase())
                    .filter((opt) => opt.length > 0);
                  handleFieldChange(index, "options", optionArray);
                }}
              />
            </>
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
          <button
            className="absolute top-2 right-2 text-red-600"
            onClick={() => handleRemoveField(index)}
          >
            Remove
          </button>
        </div>
      ))}

      {currentForm && (
        <>
          <button onClick={addField} className="text-blue-600 mr-4">
            + Add Field
          </button>

          {currentForm.fields.length > 0 && (
            <>
              {!currentForm._id ? (
                <button onClick={handleSubmit} className="text-green-600">
                  Save Form
                </button>
              ) : (
                <button onClick={handleUpdate} className="text-yellow-600">
                  Update Form
                </button>
              )}

              <button
                className="text-gray-600 ml-4"
                onClick={() => {
                  setCategory("");
                  setSelectedCategory("");
                  setCurrentForm(null);
                }}
              >
                Cancel
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DynamicForm;
