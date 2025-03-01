import { useState } from "react"

export function CountryItem({ country, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(country.name)
  const [code, setCode] = useState(country.code)

  const handleUpdate = () => {
    onUpdate(country._id, name, code)
    setIsEditing(false)
  }

  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Country name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Country code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{country.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{country.code}</p>
          </div>
        )}
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-end space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(country._id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

