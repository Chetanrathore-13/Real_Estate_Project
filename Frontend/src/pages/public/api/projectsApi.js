import axios from "axios"

const API_BASE_URL = "http://localhost:8000/api/v1/project/projects" // Change this to your actual API base URL

// ✅ Get projects with pagination, search, and filtering
export async function getProjects({ search = "", page = 1, limit = 9, projectType }) {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { search, page, limit,projectType },
    })
    console.log(response.data)
    return response.data // Expecting { formattedProjects, total, page, limit }
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

// ✅ Get a project by ID (including properties)
export async function getProjectBySlug(slug) {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/project/get_project/${slug}`)
    console.log(response.data)
    return response.data // Expecting project with properties
  } catch (error) {
    console.error("Error fetching project details:", error)
    throw error
  }
}

// ✅ Get project types
export async function getProjectTypes() {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/projectType/get_projectTypes",)

    return response.data // Expecting an array of project types
  } catch (error) {
    console.error("Error fetching project types:", error)
    throw error
  }
}
