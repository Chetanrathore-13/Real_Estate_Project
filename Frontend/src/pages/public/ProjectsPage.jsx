import { useState, useEffect } from "react"
import ProjectList from "./components/ProjectList"

function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // You could do initial data fetching here if needed
    setIsLoading(false)
  }, [])

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-red-600">Error loading projects</h3>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl  font-semibold mb-8 flex justify-center mt-14">Our Projects</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <ProjectList />
      )}
    </div>
  )
}

export default ProjectsPage

