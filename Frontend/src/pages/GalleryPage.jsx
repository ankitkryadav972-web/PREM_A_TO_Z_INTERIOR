import React, { useState } from 'react';
import { projectsData, galleryCategories } from '../data/projects.js';
import { apiService } from '../services/api.js';
import Container from '../components/common/Container.jsx';
import ProjectCard from '../components/cards/ProjectCard.jsx';
import CategoryFilter from '../components/gallery/CategoryFilter.jsx';
import LightboxModal from '../components/gallery/LightboxModal.jsx';

export const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(projectsData);

  React.useEffect(() => {
    const fetchGallery = async () => {
      try {
        const live = await apiService.getGallery(activeCategory);
        if (live && live.length > 0) {
          setProjects(live);
        } else if (activeCategory === 'All') {
          setProjects(projectsData);
        } else {
          setProjects(projectsData.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase()));
        }
      } catch {
        setProjects(
          activeCategory === 'All'
            ? projectsData
            : projectsData.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
        );
      }
    };
    fetchGallery();
  }, [activeCategory]);

  const filteredProjects = projects;

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] pt-28 pb-24">
      {/* Header */}
      <section className="py-12 md:py-20 border-b border-white/10 bg-[#141417]/50">
        <Container size="lg">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-3 block">
              Visual Portfolio
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.1] mb-6">
              Our Completed Design Projects.
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Explore actual finished installations across living rooms, luxury modular kitchens, custom doors, full-height wardrobes, and artistic false ceilings executed by our team.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-20">
        <Container size="lg">
          <CategoryFilter
            categories={galleryCategories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-stone-500">
              <p className="text-base">No projects found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <LightboxModal
          item={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default GalleryPage;
