import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

function ProjectGallery({ images }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleClose = () => {
    setLightboxOpen(false)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handlePrevious()
    } else if (e.key === "ArrowRight") {
      handleNext()
    } else if (e.key === "Escape") {
      handleClose()
    }
  }

  if (!images || images.length === 0) {
    return <div className="text-gray-600">No gallery images available.</div>
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image || "/placeholder.svg?height=300&width=300"}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center p-4">
            <img
              src={images[currentImageIndex] || "/placeholder.svg?height=800&width=1200"}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            <button
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
            >
              <X className="h-5 w-5" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectGallery

