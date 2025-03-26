import React from "react"

export function Tabs({ children, activeTab, onChange }) {
  return (
    <div className="mb-10">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && typeof child.type !== "string"
          ? React.cloneElement(child, { activeTab, onChange }) // Ensure onChange is passed
          : child
      )}
    </div>
  )
}

export function Tab({ children, id, activeTab, onChange }) {
  const isActive = id === activeTab

  return (
    <button
      className={`pb-2 px-1 font-medium text-sm border-b-2 transition-colors ${
        isActive ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-900"
      }`}
      onClick={() => onChange && onChange(id)} // Ensure onChange is triggered
    >
      {children}
    </button>
  )
}

export function TabPanel({ children, id, activeTab }) {
  return id === activeTab ? <div className="pt-4">{children}</div> : null
}
