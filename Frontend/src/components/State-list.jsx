import { StateItem } from "./State-item"

export function StateList({ states, onUpdateState, onDeleteState }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">States</h2>
      {states?.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No States added yet.</p>
      ) : (
        <ul className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
          {states?.map((State) => (
            <StateItem key={State._id} State={State} onUpdate={onUpdateState} onDelete={onDeleteState} />
          ))}
        </ul>
      )}
    </div>
  )
}

