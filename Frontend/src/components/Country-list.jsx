import { CountryItem } from "./Country-item"

export function CountryList({ countries, onUpdateCountry, onDeleteCountry }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Countries</h2>
      {countries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No countries added yet.</p>
      ) : (
        <ul className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
          {countries.map((country) => (
            <CountryItem key={country._id} country={country} onUpdate={onUpdateCountry} onDelete={onDeleteCountry} />
          ))}
        </ul>
      )}
    </div>
  )
}

