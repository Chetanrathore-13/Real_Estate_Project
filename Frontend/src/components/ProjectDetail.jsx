// ProjectDetail.tsx
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { Button } from '@/components/ui/button';
import ImageGallery from 'react-image-gallery';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const { data: project, loading } = useFetch(`/api/projects/${slug}`);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  const galleryImages = project.imageGallery.map(img => ({
    original: img,
    thumbnail: img
  }));

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={project.featureImage}
            alt={project.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          
          <div className="mt-8">
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
            <ImageGallery items={galleryImages} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            <div className="space-y-2">
              <p><strong>Project Type:</strong> {project.projectType?.name}</p>
              <p><strong>Features:</strong> {project.projectFeatures?.map(f => f.name).join(', ')}</p>
              <p><strong>Agent:</strong> {project.agent?.name}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Associated Properties</h2>
            <div className="grid gap-4">
              {project.properties?.map(property => (
                <div key={property._id} className="border p-4 rounded">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
              ))}
            </div>
          </div>

          <Button asChild className="w-full">
            <Link to={`/projects/edit/${project.slug}`}>Edit Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};