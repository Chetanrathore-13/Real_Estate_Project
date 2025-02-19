import { CityItem } from "./City-item"

export function CityList({ cities, onUpdateCity, onDeleteCity }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Cities</h2>
      {cities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No cities added yet.</p>
      ) : (
        <ul className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
          {cities.map((City) => (
            <CityItem key={City._id} City={City} onUpdate={onUpdateCity} onDelete={onDeleteCity} />
          ))}
        </ul>
      )}
    </div>
  )
}

