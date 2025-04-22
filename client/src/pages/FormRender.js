import React, { useState } from "react";
import { GetFormCategory } from "../API/Users";

const DynamicFormRenderer = () => {
  const [categories, setCategories] = useState([
    "Personal Information",
    "Inventory",
    "Finance",
    "Employee Details",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredForm, setFilteredForm] = useState(null);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const res = await GetFormCategory(category);
      if (!res) {
        alert("No form found for this category");
        return;
      } else {
        setFilteredForm(res);
      }
    } catch (error) {
      console.error("Failed to fetch form for category:", error);
    }
  };

  // const handleChange = (fieldId, value) => {
  //   setResponses((prev) => ({ ...prev, [fieldId]: value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("User Responses:", responses);
  //   // Submit responses to another collection or store as per use case
  // };

  // if (!filteredForm) return <p>Loading form...</p>;
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredForm && (
        <div className="p-4">
          <div className="mb-6 border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">{filteredForm.category}</h2>

            {filteredForm.fields?.map((field, fieldIndex) => {
              switch (field.type) {
                case "text":
                  return (
                    <div key={fieldIndex} className="mb-2">
                      <label className="block mb-1">{field.label}</label>
                      <input
                        type="text"
                        className="border px-2 py-1 rounded w-full"
                      />
                    </div>
                  );
                case "textarea":
                  return (
                    <div key={fieldIndex} className="mb-2">
                      <label className="block mb-1">{field.label}</label>
                      <textarea className="border px-2 py-1 rounded w-full" />
                    </div>
                  );
                case "dropdown":
                  return (
                    <div key={fieldIndex} className="mb-2">
                      <label className="block mb-1">{field.label}</label>
                      <select className="border px-2 py-1 rounded w-full">
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
                    <div key={fieldIndex} className="mb-2">
                      <label className="block mb-1">{field.label}</label>
                      {field.options?.map((opt, optIndex) => (
                        <label key={optIndex} className="block">
                          <input type="checkbox" value={opt} className="mr-2" />
                          {opt}
                        </label>
                      ))}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicFormRenderer;
