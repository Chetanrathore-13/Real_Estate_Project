import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ProjectCard from "./ProjectCard"
import Pagination from "./Pagination"
import FilterSection from "./FilterSection"
import { getProjects } from "../api/projectsApi"

function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page") || "1")
  const projectType = searchParams.get("projectType") || ""

  const [projects, setProjects] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const data = await getProjects({ page, limit: 9, projectType })
        console.log(data)
        // Ensure that projects is always an array
         setProjects(Array.isArray(data) ? data : [])
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        setError(err)
        console.error("Error fetching projects:", err)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchProjects()
  }, [page, projectType])

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    setSearchParams(params)
  }

  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(type, value)
    } else {
      params.delete(type)
    }
    params.set("page", "1") // Reset to first page when filter changes
    setSearchParams(params)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-red-600">Error loading projects</h3>
        <p className="text-gray-600 mt-2">{error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <FilterSection selectedType={projectType} onFilterChange={handleFilterChange} />

      {projects?.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">No projects found</h3>
          <p className="text-gray-600 mt-2">Try changing your filters or check back later.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectList

