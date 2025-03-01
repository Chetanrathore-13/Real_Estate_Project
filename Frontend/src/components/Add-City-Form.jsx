import React, { useState } from "react";

export function AddCityForm({ onAddCity }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [icon, setIcon] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const codePattern = /^[A-Z]{3}$/;
    
    if (!codePattern.test(code)) {
      setError("City code must be exactly three uppercase letters");
      return;
    }
    setError("");
    onAddCity(name, code, icon, description);
    setName("");
    setCode("");
    setIcon(null);
    setDescription("");
  };
  const handleFileChange = (e) => {
    setIcon(e.target.files[0]); // Store the selected file
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            City Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter City name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            City Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter City code"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            City Icon
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
          Add City
        </button>
      </form>
    </>
  );
}
