import { useState } from "react"
import { Tabs, Tab, TabPanel } from "../../../components/ui/tabs.jsx"
import PropertyCard from "./PropertyCard"
import ProjectGallery from "./ProjectGallery"

function ProjectDetails({ project }) {
  const [activeTab, setActiveTab] = useState("overview")
  console.log(project)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      <div className="lg:col-span-2">
        <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
          <img
            src={project.featureImage || "/placeholder.svg?height=600&width=800"}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.projectType?.map((type) => (
              <span key={type._id} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                {type.name}
              </span>
            ))}
          </div>
          <p className="text-gray-600">{project.description}</p>
        </div>

        {/* ✅ Ensure `onChange` is passed */}
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <div className="border-b border-gray-200 mb-4">
            <div className="flex space-x-4">
              <Tab id="overview" activeTab={activeTab} onChange={setActiveTab}>
                Overview
              </Tab>
              <Tab id="gallery" activeTab={activeTab} onChange={setActiveTab}>
                Gallery
              </Tab>
              <Tab id="features" activeTab={activeTab} onChange={setActiveTab}>
                Features
              </Tab>
            </div>
          </div>

          <TabPanel id="overview" activeTab={activeTab}>
            <p className="text-gray-600 mb-6">{project.description}</p>
            {project.videoLinks && project.videoLinks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Project Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.videoLinks.map((videoLink, index) => (
                    <div key={index} className="aspect-video">
                      <iframe
                        src={videoLink}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                        title={`Project video ${index + 1}`}
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabPanel>

          <TabPanel id="gallery" activeTab={activeTab}>
            <ProjectGallery images={project.imageGallery || []} />
          </TabPanel>

          <TabPanel id="features" activeTab={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.projectFeatures?.map((feature) => (
                <div key={feature._id} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Properties in this Project</h2>
          <hr className="mb-4" />

          <div className="space-y-4">
            {project.properties && project.properties.length > 0 ? (
              project.properties.map((property) => <PropertyCard key={property._id} property={property} compact />)
            ) : (
              <p className="text-gray-600">No properties available in this project.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
