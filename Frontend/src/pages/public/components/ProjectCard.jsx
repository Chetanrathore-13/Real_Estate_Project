import { Link } from "react-router-dom"
import { Building2, MapPin } from "lucide-react"

function ProjectCard({ project }) {
  // Create a slug from the project name if not provided
  console.log(project)
  const slug = project.slug || project.name.toLowerCase().replace(/\s+/g, "-")

  // Get the first property for preview
  const previewProperty = project.properties && project.properties.length > 0 ? project.properties[0] : null

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col border border-gray-200">
      <div className="relative aspect-video">
        <img
          src={project.featureImage || "/placeholder.svg?height=400&width=600"}
          alt={project.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        {project.projectType && project.projectType.length > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
              {project.typeName[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 pb-2">
        <Link to={`/projects/${slug}`} className="hover:underline">
          <h3 className="text-xl font-semibold">{project.name}</h3>
        </Link>
      </div>

      <div className="px-4 flex-grow">
        <p className="text-gray-600 line-clamp-2 mb-4">{project.description}</p>

        {/* {previewProperty && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-gray-500" />
              <span>
                {previewProperty.totalBedRooms} Beds • {previewProperty.totalRooms - previewProperty.totalBedRooms}{" "}
                Baths • {previewProperty.areaSize} {previewProperty.areaSizePostfix}
              </span>
            </div>

            {previewProperty.city && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>
                  {previewProperty.city.name}
                  {previewProperty.state?.name ? `, ${previewProperty.state.name}` : ""}
                </span>
              </div>
            )}

            <div className="mt-3">
              <span className="text-lg font-semibold">
                {previewProperty.pricePrefix || ""} {previewProperty.sellingPrice}{" "}
                {previewProperty.pricePostfix || ""}
              </span>
              {previewProperty.regularPrice > previewProperty.sellingPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {previewProperty.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )} */}
      </div>

      <div className="px-4 pb-4 pt-2">
        <Link to={`/projects/${slug}`} className="text-blue-600 hover:underline text-sm font-medium">
          View Project Details
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard

