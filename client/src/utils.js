// Converts label to snake_case name
export const generateFieldName = (label) =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, "") // remove special characters
    .replace(/\s+/g, "_"); // replace spaces with underscores


  