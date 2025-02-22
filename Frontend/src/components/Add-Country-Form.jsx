import React, { useState, useEffect, use } from "react";

export function AddCountryForm({ onAddCountry }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [icon, setIcon] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setIcon(e.target.files[0]); // Store the selected file
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const codePattern = /^[A-Z]{2}$/;

    if (!codePattern.test(code)) {
      setError("Country code must be exactly two uppercase letters");
      return;
    }

    if (!icon) {
      setError("Please select an icon");
      return;
    }

    setError("");
    onAddCountry({name, code, icon, description});

    // Reset form
    setName("");
    setCode("");
    setIcon(null);
    setDescription("");
  };

  return (
    <div className="w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-[25px] font-semibold text-gray-800 dark:text-white">Add Country</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Country Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter country name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Country Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter country code"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Country Icon
          </label>
          <input
            key={icon ? icon.name : "icon-input"} // Force re-render on reset
            id="icon"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter country description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
        >
          Add Country
        </button>
      </form>
    </div>
  );
}
