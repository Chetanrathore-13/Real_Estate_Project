import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import  {getProjectBySlug}  from "./api/projectsApi"
import ProjectDetails from "./components/ProjectDetails"

function ProjectDetailsPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        const data = await getProjectBySlug(slug)
        if (!data) {
          navigate("/projects")
          return
        }
        setProject(data)
      } catch (err) {
        setError(err)
        console.error("Error fetching project:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [slug, navigate])

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-red-600">Error loading project</h3>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">Project not found</h3>
          <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 ">
      <ProjectDetails project={project} />
    </div>
  )
}

export default ProjectDetailsPage

