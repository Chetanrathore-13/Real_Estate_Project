import { CityItem } from "./City-item";

export function CityList({ cities, onUpdateCity, onDeleteCity }) {
  return (
    <div className="space-y-4 w-full h-full p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Cities</h2>
      {cities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No cities added yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg w-full h-full">
          <table className="w-full h-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white dark:bg-blue-700">
                <th className="px-6 py-3 text-left font-semibold">City</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {cities.map((city, index) => (
                <CityItem key={city._id} City={city} onUpdate={onUpdateCity} onDelete={onDeleteCity} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
