// components/ProjectsSection.tsx
import React from 'react';
import { FolderGit2 } from 'lucide-react';

interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-6 p-8">
      <h2 className="text-2xl font-bold text-secondary mb-6">Projects</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="flex gap-4">
            <div className="w-12 h-12 bg-primary-light rounded flex items-center justify-center flex-shrink-0">
              <FolderGit2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{project.year}</p>
              <h3 className="text-lg font-bold text-secondary mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
