import React, { useState } from "react";
import { GetFormCategory, SubmitFormResponses } from "../API/Users";

const DynamicFormRenderer = () => {
  const [categories, setCategories] = useState([
    "Personal Information",
    "Inventory",
    "Finance",
    "Employee Details",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredForm, setFilteredForm] = useState(null);
  const [responses, setResponses] = useState({}); // <-- New state to capture user responses

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const res = await GetFormCategory(category);
      if (!res) {
        alert("No form found for this category");
        return;
      } else {
        setFilteredForm(res);
        setResponses({}); // Reset responses
      }
    } catch (error) {
      console.error("Failed to fetch form for category:", error);
    }
  };

  const handleChange = (fieldId, value) => {
    setResponses((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const missingFields = filteredForm.fields.filter(
      (field) => field.required && !responses[field.label]
    );
    if (missingFields.length > 0) {
      alert(
        `Please fill required fields: ${missingFields
          .map((f) => f.label)
          .join(", ")}`
      );
      return;
    }

    // Prepare data to submit
    const payload = {
      category: filteredForm.category,
      responses: responses,
    };

    try {
      await SubmitFormResponses(payload);
      alert("Form submitted successfully!");
      setResponses({});
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("Error submitting form!");
    }
  };

  return (
    <>
      <div className="row mb-4">
        {categories.map((cat, i) => (
          <div key={i} className="col-auto mb-2">
            <button
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`btn ${
                selectedCategory === cat ? "btn-primary" : "btn-secondary"
              }`}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      {filteredForm && (
        <form className="container">
          <div className="card p-4">
            <h2 className="h4 mb-4">{filteredForm.category}</h2>

            <div className="row">
              {filteredForm.fields?.map((field, fieldIndex) => {
                switch (field.type) {
                  case "text":
                  case "date":
                  case "email":
                    return (
                      <div key={fieldIndex} className="col-12 mb-3">
                        <label className="form-label">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-danger">*</span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          className="form-control"
                          value={responses[field.label] || ""}
                          onChange={(e) =>
                            handleChange(field.label, e.target.value)
                          }
                        />
                      </div>
                    );
                  case "textarea":
                    return (
                      <div key={fieldIndex} className="col-12 mb-3">
                        <label className="form-label">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-danger">*</span>
                          )}
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={responses[field.label] || ""}
                          onChange={(e) =>
                            handleChange(field.label, e.target.value)
                          }
                        ></textarea>
                      </div>
                    );
                  case "dropdown":
                    return (
                      <div key={fieldIndex} className="col-12 mb-3">
                        <label className="form-label">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-danger">*</span>
                          )}
                        </label>
                        <select
                          className="form-select"
                          value={responses[field.label] || ""}
                          onChange={(e) =>
                            handleChange(field.label, e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          {field.options?.map((opt, optIndex) => (
                            <option key={optIndex} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  case "checkbox":
                    return (
                      <div key={fieldIndex} className="col-12 mb-3">
                        <label className="form-label d-block">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-danger">*</span>
                          )}
                        </label>
                        {field.options?.map((opt, optIndex) => (
                          <div className="form-check" key={optIndex}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={
                                responses[field.label]?.includes(opt) || false
                              }
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setResponses((prev) => {
                                  const currentValues = prev[field.label] || [];
                                  if (isChecked) {
                                    return {
                                      ...prev,
                                      [field.label]: [...currentValues, opt],
                                    };
                                  } else {
                                    return {
                                      ...prev,
                                      [field.label]: currentValues.filter(
                                        (v) => v !== opt
                                      ),
                                    };
                                  }
                                });
                              }}
                              id={`checkbox-${field.label}-${optIndex}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox-${field.label}-${optIndex}`}
                            >
                              {opt}
                            </label>
                          </div>
                        ))}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            <div className="text-end mt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default DynamicFormRenderer;